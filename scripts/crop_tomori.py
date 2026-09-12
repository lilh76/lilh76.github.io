#!/usr/bin/env python3
"""Crop the reviewed Tomori photos to height:width 293:200 (macOS/FFmpeg).

Subject boxes are visually reviewed annotations, not an automatic detector.
New or changed images require an entry in tomori_subjects.json.
Originals are never modified; existing output files are never overwritten.
"""
import argparse
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
EXTENSIONS = {'.heic', '.heif', '.jpg', '.jpeg', '.png', '.webp'}


def run(*args):
    return subprocess.run([str(a) for a in args], check=True, capture_output=True, text=True).stdout


def dimensions(path):
    data = json.loads(run('ffprobe', '-v', 'error', '-select_streams', 'v:0',
                          '-show_entries', 'stream=width,height', '-of', 'json', path))
    stream = data['streams'][0]
    return stream['width'], stream['height']


def crop_box(width, height, box):
    """Normalized top-left xyxy subject box -> integer xywh crop, no stretching."""
    x0, y0, x1, y1 = box
    if not (0 <= x0 < x1 <= 1 and 0 <= y0 < y1 <= 1):
        raise ValueError(f'Invalid subject box: {box}')
    left, top, right, bottom = x0*width, y0*height, x1*width, y1*height
    # Keep the largest possible frame. Preserve one original dimension exactly;
    # round only the other dimension to the nearest pixel (no resampling).
    if height / width <= 1.465:
        ch = height
        cw = min(width, max(1, round(height / 1.465)))
    else:
        cw = width
        ch = min(height, max(1, round(width * 1.465)))
    x = max(0, min(width-cw, round((left+right-cw)/2)))
    y = max(0, min(height-ch, round((top+bottom-ch)/2)))
    clipped = left < x or top < y or right > x+cw or bottom > y+ch
    return x, y, cw, ch, clipped


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source', nargs='?', type=Path, default=ROOT/'data/images/tomori')
    parser.add_argument('--output', type=Path, default=ROOT/'data/images/tomori-cropped-wide')
    parser.add_argument('--subjects', type=Path, default=Path(__file__).with_name('tomori_subjects.json'))
    args = parser.parse_args()
    for program in ['ffmpeg', 'ffprobe']:
        if not shutil.which(program):
            parser.error(f'{program} is required (brew install ffmpeg)')
    if args.source.resolve() == args.output.resolve():
        parser.error('Output must be a separate directory to preserve originals')
    subjects = json.loads(args.subjects.read_text())['images']
    files = sorted(p for p in args.source.iterdir() if p.is_file() and p.suffix.lower() in EXTENSIONS)
    if not files:
        parser.error('No supported images found')
    # Validate the entire batch before writing anything.
    for path in files:
        entry = subjects.get(path.name)
        if not entry or entry['sha256'] != hashlib.sha256(path.read_bytes()).hexdigest():
            parser.error(f'{path.name}: missing/stale subject annotation; update {args.subjects}')
        if (args.output/f'{path.name}.jpg').exists():
            parser.error(f'Output already exists: {path.name}.jpg; choose a new --output directory')
    args.output.mkdir(parents=True, exist_ok=True)
    report = []
    for path in files:
        with tempfile.TemporaryDirectory(prefix='tomori-crop-') as temp:
            decoded = Path(temp)/'decoded.bmp'
            # Separate decode from crop: HEIC grids use FFmpeg's internal complex filter.
            # Default autorotation applies HEIC/EXIF orientation before subject coordinates.
            run('ffmpeg', '-v', 'error', '-nostdin', '-i', path, '-frames:v', '1', decoded)
            width, height = dimensions(decoded)
            x, y, cw, ch, clipped = crop_box(width, height, subjects[path.name]['box'])
            output = args.output/f'{path.name}.jpg'
            run('ffmpeg', '-v', 'error', '-nostdin', '-n', '-i', decoded,
                '-vf', f'crop={cw}:{ch}:{x}:{y}:exact=1', '-frames:v', '1',
                '-q:v', '2', '-pix_fmt', 'yuvj444p', '-map_metadata', '-1', output)
            if dimensions(output) != (cw, ch):
                raise RuntimeError(f'Unexpected output dimensions: {output}')
            report.append({'source': path.name, 'output': output.name,
                           'source_size': [width, height], 'crop_xywh': [x, y, cw, ch],
                           'subject_clipped': clipped,
                           'retained_area': round(cw*ch/(width*height), 6),
                           'full_height_preserved': ch == height,
                           'full_width_preserved': cw == width})
            print(f'{path.name} -> {output.name} ({cw}x{ch})' +
                  (' WARNING: subject exceeds the largest possible crop' if clipped else ''), flush=True)
    (args.output/'crop-report.json').write_text(json.dumps(report, indent=2)+'\n')
    print(f'Done: {len(report)} images saved to {args.output}')


if __name__ == '__main__':
    main()

# Tomori 主体裁剪

在仓库根目录运行：

```sh
python3 scripts/crop_tomori.py
```

依赖 Python 3 和 FFmpeg（`brew install ffmpeg`），不需要 Python 第三方库或在线 API。
默认读取 `data/images/tomori/`，另存到 `data/images/tomori-cropped-wide/`，原图不变。
输出文件保留原扩展名再加 `.jpg`，避免同名不同格式覆盖。
再次运行时请指定新输出目录：

```sh
python3 scripts/crop_tomori.py --output /tmp/tomori-cropped-v2
```

- 目标高:宽 = 1.465:1，只将裁剪尺寸四舍五入到整数像素，误差不超过半个像素；不拉伸、不放大。
- 优先保留最大画幅：原图较宽时保留完整高度，只裁左右；原图较窄时保留完整宽度，只裁上下。
- 在需要裁剪的方向上，以娃娃边界框的中心定位；碰到原图边缘时限制移动，不再缩小画幅来强求居中。
- HEIC 先转换并应用方向信息，再裁剪；输出 JPG 不复制原照片 EXIF/GPS。
- 原图已经缺失的身体部分无法通过裁剪补回。
- `crop-report.json` 记录每张图的尺寸、裁剪框，保留面积比例、完整保留的方向，以及主体是否超出可用画幅。
- 不覆盖已有图片；存在同名输出时在开始前报错。

## 主体位置

**此版本使用针对当前 41 张图片逐张视觉核对的标注，不是通用自动检测模型。**
`tomori_subjects.json` 的 `box` 是校正方向后、左上角为原点的归一化
`[left, top, right, bottom]`。标注棉花娃娃的可见范围；`1.jpg` 连同承托它的长角牛玩偶保留。

新增或修改照片时，需要先查看照片并补充/更新主体框和源文件 SHA-256。
脚本遇到未标注或源文件内容变化的图片会在写入前停止，避免错误使用旧坐标。
SHA-256 可用 `shasum -a 256 图片路径` 获取。

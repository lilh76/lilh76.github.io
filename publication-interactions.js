/** Show or hide a publication's BibTeX block. */
function toggle_vis(elementId) {
  const element = document.getElementById(elementId);
  const isHidden = window.getComputedStyle(element).display === 'none';

  element.style.display = isHidden ? 'block' : 'none';
}

/** Copy BibTeX text and briefly acknowledge the action on its button. */
function copyText(elementId, buttonId) {
  const codeElement = document.getElementById(elementId);
  const buttonElement = document.getElementById(buttonId);
  const textToCopy = codeElement.innerHTML
    .replace(/<br>/g, '')
    .replace(/&nbsp;/g, ' ');

  const textArea = document.createElement('textarea');
  textArea.value = textToCopy;
  document.body.appendChild(textArea);
  textArea.select();
  textArea.setSelectionRange(0, 99999);
  document.execCommand('copy');
  document.body.removeChild(textArea);

  buttonElement.innerText = 'Copied';
  buttonElement.style.backgroundColor = '#cdeeb5';

  window.setTimeout(function resetCopyButton() {
    buttonElement.innerText = 'Copy';
    buttonElement.style.backgroundColor = '#FFFFFF';
  }, 2000);
}

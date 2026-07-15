/** Send selected publication rows to index.html when this page is framed. */
function sendHomepagePublicationsToParent() {
  if (window.parent === window || window.location.hash !== '#homepage-source') {
    return;
  }

  const rows = Array.from(
    document.querySelectorAll('.publication-row[data-show-on-home]')
  ).map((row) => row.outerHTML);

  window.parent.postMessage(
    {
      type: 'homepage-publications',
      rows
    },
    '*'
  );
}

sendHomepagePublicationsToParent();

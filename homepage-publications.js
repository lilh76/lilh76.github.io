const HOMEPAGE_PUBLICATIONS_MESSAGE = 'homepage-publications';

function sortHomepagePublications(rows) {
  rows.sort((left, right) => {
    const leftOrder = Number(left.dataset.homeOrder);
    const rightOrder = Number(right.dataset.homeOrder);
    const leftHasOrder = left.hasAttribute('data-home-order');
    const rightHasOrder = right.hasAttribute('data-home-order');

    if (leftHasOrder && rightHasOrder) {
      return leftOrder - rightOrder;
    }

    if (leftHasOrder) {
      return 1;
    }

    if (rightHasOrder) {
      return -1;
    }

    return 0;
  });

  return rows;
}

function renderHomepagePublications(container, rows) {
  const fragment = document.createDocumentFragment();

  sortHomepagePublications(rows).forEach((row) => {
    fragment.appendChild(document.importNode(row, true));
  });

  container.replaceChildren(fragment);
}

function findHomepagePublications(sourceDocument) {
  return Array.from(
    sourceDocument.querySelectorAll('.publication-row[data-show-on-home]')
  );
}

async function loadHomepagePublicationsOverHttp(container) {
  const response = await fetch('publications.html', { cache: 'no-cache' });

  if (!response.ok) {
    throw new Error(`Unable to load publications (${response.status})`);
  }

  const source = await response.text();
  const sourceDocument = new DOMParser().parseFromString(source, 'text/html');
  renderHomepagePublications(container, findHomepagePublications(sourceDocument));
}

/**
 * Browsers block fetch() between local file:// pages. In that mode, load the
 * publication page in a hidden frame and receive its selected rows by message.
 */
function loadHomepagePublicationsFromLocalFile(container) {
  return new Promise((resolve, reject) => {
    const sourceFrame = document.createElement('iframe');
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error('Timed out while loading local publications'));
    }, 5000);

    function cleanup() {
      window.clearTimeout(timeout);
      window.removeEventListener('message', handleMessage);
      sourceFrame.remove();
    }

    function handleMessage(event) {
      if (event.source !== sourceFrame.contentWindow) {
        return;
      }

      const message = event.data;

      if (
        !message ||
        message.type !== HOMEPAGE_PUBLICATIONS_MESSAGE ||
        !Array.isArray(message.rows)
      ) {
        return;
      }

      const source = `<table><tbody>${message.rows.join('')}</tbody></table>`;
      const sourceDocument = new DOMParser().parseFromString(source, 'text/html');
      renderHomepagePublications(container, findHomepagePublications(sourceDocument));
      cleanup();
      resolve();
    }

    window.addEventListener('message', handleMessage);
    sourceFrame.hidden = true;
    sourceFrame.tabIndex = -1;
    sourceFrame.setAttribute('aria-hidden', 'true');
    sourceFrame.src = 'publications.html#homepage-source';
    document.body.appendChild(sourceFrame);
  });
}

/** Load the publications selected for the homepage from the full list. */
async function loadHomepagePublications() {
  const container = document.getElementById('selected-publications');

  if (!container) {
    return;
  }

  try {
    if (window.location.protocol === 'file:') {
      await loadHomepagePublicationsFromLocalFile(container);
    } else {
      await loadHomepagePublicationsOverHttp(container);
    }
  } catch (error) {
    console.error('Failed to load homepage publications:', error);
  }
}

loadHomepagePublications();

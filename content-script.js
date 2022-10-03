const _allCodeLinesCssSelector = "[data-qa=code-line] pre > span:last-child";
const _diffFileSelector = "article[data-qa=pr-diff-file-styles]";

runWhenUrlChanges(() => {
  waitForElement('section[aria-label="Diffs"]').then((diffSection) => {
    allDiffsObserver.observe(diffSection, {
      childList: true,
      subtree: true,
    });
  });
});

const allDiffsObserver = new MutationObserver((mutations) => {
  mutations
    .filter((mutation) => mutation.type === "childList")
    .filter((mutation) => mutation.addedNodes.length > 0)
    .forEach((mutation) => {
      const diffFile = mutation.target.querySelector(_diffFileSelector);
      if (diffFile !== null) {
        highlightDiff(diffFile);
      }
    });
});

function highlightDiff(diffFile) {
  diffFile.querySelectorAll(_allCodeLinesCssSelector).forEach((node) => {
    node.classList.add("language-java");
    Prism.highlightElement(node);
  });
}

function waitForElement(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

function runWhenUrlChanges(callback) {
  let lastUrl = location.url;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      callback();
    }
  }).observe(document, { subtree: true, childList: true });
}

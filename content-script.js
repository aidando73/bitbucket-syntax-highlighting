const _allCodeLinesCssSelector = "[data-qa=code-line] pre > span:last-child";

const allDiffsObserver = new MutationObserver((mutations) => {
	mutations
		.filter((mutation) => mutation.type === "childList")
		.filter((mutation) => mutation.addedNodes.length > 0)
		.forEach((mutation) => {
			mutation.target
				.querySelectorAll(_allCodeLinesCssSelector)
				.forEach((elem) => {
					highlightDiff(elem);
				});
		})
});

waitForElement('section[aria-label="Diffs"]').then((diffSection) => {
  allDiffsObserver.observe(diffSection, {
    childList: true,
    subtree: true,
  });
});

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

function highlightDiff(codeLine) {
  // Try to get the extension of the file
  const article = codeLine.closest('article[data-qa="pr-diff-file-styles"]');
  const ariaAttribute = article.getAttribute("aria-label");

  const extension = getExtension(ariaAttribute);

  article.querySelectorAll(_allCodeLinesCssSelector).forEach((node) => {
    node.classList.add("language-java");
    // node.classList.add("__rbb_syntax_highlight")
    Prism.highlightElement(node);
  });
}

function getExtension(filepath) {
  return `.${filepath.slice(((filepath.lastIndexOf(".") - 1) >>> 0) + 2)}`;
}

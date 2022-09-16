// new SelectorObserver(
// 	document.body,
// 	'section[aria-label="Diffs"]',
// 	function() {
// 		// syntaxHighlightNewUI(this, config.syntaxHighlightTheme)
// 		console.log("Hello within selection observer!!!")
// 	}
// )
console.log("Hello World from Bitbucket DIFF!")

waitForElement('section[aria-label="Diffs"]')
	.then(diffSection => {
		console.log("diffSection", diffSection);
		setTimeout(() => {
			const allCodeLines = diffSection.querySelectorAll("[data-qa=code-line] pre > span:last-child");
			console.log(allCodeLines);
			allCodeLines.forEach(codeLine => {
				console.log(codeLine);
				// Try to get the extension of the file
				const article = codeLine.closest(
					'article[data-qa="pr-diff-file-styles"]'
				)
				const ariaAttribute = article.getAttribute('aria-label')

				const extension = getExtension(ariaAttribute)

				const nodes = article.querySelectorAll("[data-qa=code-line] pre > span:last-child");
				nodes.forEach(node => {
					node.classList.add("language-java")
					// node.classList.add("__rbb_syntax_highlight")
					Prism.highlightElement(node)
				})
			});
		}, 2000);
	});

function waitForElement(selector) {
	return new Promise(resolve => {
			if (document.querySelector(selector)) {
					return resolve(document.querySelector(selector));
			}

			const observer = new MutationObserver(mutations => {
					if (document.querySelector(selector)) {
							resolve(document.querySelector(selector));
							observer.disconnect();
					}
			});

			observer.observe(document.body, {
					childList: true,
					subtree: true
			});
	});
}

function getExtension(filepath) {
	return `.${filepath.slice(((filepath.lastIndexOf('.') - 1) >>> 0) + 2)}`
}
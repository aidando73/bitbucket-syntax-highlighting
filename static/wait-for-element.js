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

// This is to allow for jest testing (The JEST_WORKER_ID is set by jest)
if (!isContentScript && process?.env?.JEST_WORKER_ID !== undefined) {
    global.waitForElement = waitForElement;
}
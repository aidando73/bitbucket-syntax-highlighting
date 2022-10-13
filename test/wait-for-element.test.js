require("../static/wait-for-element.js")

describe("waitForElement", () => {
    it("should not resolve when element is not present", async () => {
        let resolved = false
        waitForElement("div")
            .then(() => {
                resolved = true
            });

        setTimeout(() => {
            expect(resolved).toBe(false)
        }, 250);
    });

    it("should resolve when the element is present", async () => {
        document.body.innerHTML = `
            <div id="foo"></div>
        `;

        const foo = await waitForElement("#foo");

        expect(foo).toBe(document.querySelector("#foo"));
    });

    it("should resolve when the element is added", async () => {
        document.body.innerHTML = ``;

        const foo = waitForElement("#foo");

        document.body.innerHTML = `
            <div id="foo"></div>
        `;

        expect(await foo).toBe(document.querySelector("#foo"));
    });

    it("should work as a querySelector", async () => {
        document.body.innerHTML = `
            <div some-attribute="foo"></div>
        `;

        const foo = await waitForElement("[some-attribute=foo]");

        expect(foo).toBe(document.querySelector("div"));
    })
});
var assert = require("assert");

describe("deli", () => {
  it("can do oles test", async function () {
    await browser.url(
      "https://checkout.prod.ps.bild.de/?promotionId=000000010003538&shopId=BDEP&successUrl=https%3A%2F%2Fwww.bild.de&errorUrl=https%3A%2F%2Foffers.bild.de%2F"
    );
    await browser.waitUntil(
      () => {
        return browser.execute(() => document.readyState === "complete");
      },
      {
        timeout: 60 * 1000, // 60 seconds
        timeoutMsg: "Document not ready",
      }
    );
    await browser.maximizeWindow();
    const element = await $('a[data-testid="icon-login"]');
    await element.waitForDisplayed({ timeout: 60000 });
    const isInViewport = await element.isDisplayedInViewport();
    assert.equal(isInViewport, true);
  });
});

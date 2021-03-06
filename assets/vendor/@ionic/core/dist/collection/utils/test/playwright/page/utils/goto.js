/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
/**
 * This is an extended version of Playwright's
 * page.goto method. In addition to performing
 * the normal page.goto work, this code also
 * automatically waits for the Stencil components
 * to be hydrated before proceeding with the test.
 */
export const goto = async (page, url, options, testInfo, originalFn) => {
  var _a, _b, _c;
  const { mode, rtl, _testing } = testInfo.project.metadata;
  const splitUrl = url.split('?');
  const paramsString = splitUrl[1];
  /**
   * This allows developers to force a
   * certain mode or LTR/RTL config per test.
   */
  const urlToParams = new URLSearchParams(paramsString);
  const formattedMode = (_a = urlToParams.get('ionic:mode')) !== null && _a !== void 0 ? _a : mode;
  const formattedRtl = (_b = urlToParams.get('rtl')) !== null && _b !== void 0 ? _b : rtl;
  const ionicTesting = (_c = urlToParams.get('ionic:_testing')) !== null && _c !== void 0 ? _c : _testing;
  const formattedUrl = `${splitUrl[0]}?ionic:_testing=${ionicTesting}&ionic:mode=${formattedMode}&rtl=${formattedRtl}`;
  testInfo.annotations.push({
    type: 'mode',
    description: formattedMode,
  });
  if (rtl) {
    testInfo.annotations.push({
      type: 'rtl',
      description: 'true',
    });
  }
  const result = await Promise.all([
    page.waitForFunction(() => window.testAppLoaded === true, { timeout: 4750 }),
    originalFn(formattedUrl, options),
  ]);
  return result[1];
};

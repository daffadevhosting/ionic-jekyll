/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { dragElementByYAxis } from '@utils/test/playwright';
/**
 * Emulates a pull-to-refresh drag gesture (pulls down and releases).
 *
 * You will need to manually dispatch an event called `ionRefreshComplete`
 * in your `complete()` handler for the refresh event. Otherwise the `waitForEvent`
 * will complete when the timeout completes (5000ms).
 *
 * @param page The E2E Page object.
 * @param selector The element selector to center the drag gesture on. Defaults to `body`.
 */
const pullToRefresh = async (page, selector = 'body') => {
  const target = page.locator(selector);
  await page.waitForSelector('ion-refresher.hydrated', { state: 'attached' });
  const ev = await page.spyOnEvent('ionRefreshComplete');
  await dragElementByYAxis(target, page, 400);
  await ev.next();
};
export { pullToRefresh };

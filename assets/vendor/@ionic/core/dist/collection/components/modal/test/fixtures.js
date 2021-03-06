/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { dragElementBy } from '@utils/test/playwright';
export class CardModalPage {
  constructor(page) {
    this.page = page;
  }
  async navigate(url) {
    const { page } = this;
    await page.goto(url);
    this.ionModalDidPresent = await page.spyOnEvent('ionModalDidPresent');
    this.ionModalDidDismiss = await page.spyOnEvent('ionModalDidDismiss');
  }
  async openModalByTrigger(selector) {
    await this.page.click(selector);
    await this.ionModalDidPresent.next();
    return this.page.locator('ion-modal');
  }
  async swipeToCloseModal(selector, waitForDismiss = true, swipeY = 500) {
    const { page } = this;
    const elementRef = await page.locator(selector);
    await dragElementBy(elementRef, page, 0, swipeY);
    if (waitForDismiss) {
      await this.ionModalDidDismiss.next();
    }
  }
}

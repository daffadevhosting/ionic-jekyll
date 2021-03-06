import type { E2EPage } from '@utils/test/playwright';
export declare class CardModalPage {
  private ionModalDidPresent;
  private ionModalDidDismiss;
  private page;
  constructor(page: E2EPage);
  navigate(url: string): Promise<void>;
  openModalByTrigger(selector: string): Promise<import("../../../utils/test/playwright/page/utils").E2ELocator>;
  swipeToCloseModal(selector: string, waitForDismiss?: boolean, swipeY?: number): Promise<void>;
}

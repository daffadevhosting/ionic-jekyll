import type { E2EPage } from '@utils/test/playwright';
/**
 * Visual regression tests for picker-column.
 * @param page - The page to run the tests on.
 * @param buttonSelector - The selector for the button that opens the picker.
 * @param description - The description to amend to the screenshot names (typically 'single' or 'multiple').
 */
export declare function testPickerColumn(page: E2EPage, buttonSelector: string, description: string): Promise<void>;

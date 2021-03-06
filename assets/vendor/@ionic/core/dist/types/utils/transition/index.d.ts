import type { Animation, NavOptions } from '../../interface';
export declare const transition: (opts: TransitionOptions) => Promise<TransitionResult>;
export declare const lifecycle: (el: HTMLElement | undefined, eventName: string) => void;
export declare const deepReady: (el: any | undefined) => Promise<void>;
export declare const setPageHidden: (el: HTMLElement, hidden: boolean) => void;
export declare const getIonPageElement: (element: HTMLElement) => Element;
export interface TransitionOptions extends NavOptions {
  progressCallback?: (ani: Animation | undefined) => void;
  baseEl: any;
  enteringEl: HTMLElement;
  leavingEl: HTMLElement | undefined;
}
export interface TransitionResult {
  hasCompleted: boolean;
  animation?: Animation;
}

/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-e8e84432.js');
const index$1 = require('./index-92f1bbf7.js');
const ionicGlobal = require('./ionic-global-0bc925ec.js');
const helpers = require('./helpers-cb31c69a.js');

const accordionIosCss = ":host{display:block;position:relative;width:100%;background-color:var(--ion-background-color, #ffffff);overflow:hidden;z-index:0}:host(.accordion-expanding) ::slotted(ion-item[slot=header]),:host(.accordion-expanded) ::slotted(ion-item[slot=header]){--border-width:0px}:host(.accordion-animated){-webkit-transition:all 300ms cubic-bezier(0.25, 0.8, 0.5, 1);transition:all 300ms cubic-bezier(0.25, 0.8, 0.5, 1)}:host(.accordion-animated) #content{-webkit-transition:max-height 300ms cubic-bezier(0.25, 0.8, 0.5, 1);transition:max-height 300ms cubic-bezier(0.25, 0.8, 0.5, 1)}#content{overflow:hidden;will-change:max-height}:host(.accordion-collapsing) #content{max-height:0 !important}:host(.accordion-collapsed) #content{display:none}:host(.accordion-expanding) #content{max-height:0}:host(.accordion-disabled) #header,:host(.accordion-readonly) #header,:host(.accordion-disabled) #content,:host(.accordion-readonly) #content{pointer-events:none}:host(.accordion-disabled) #header,:host(.accordion-disabled) #content{opacity:0.4}@media (prefers-reduced-motion: reduce){:host,#content{-webkit-transition:none !important;transition:none !important}}:host(.accordion-next) ::slotted(ion-item[slot=header]){--border-width:0.55px 0px 0.55px 0px}";

const accordionMdCss = ":host{display:block;position:relative;width:100%;background-color:var(--ion-background-color, #ffffff);overflow:hidden;z-index:0}:host(.accordion-expanding) ::slotted(ion-item[slot=header]),:host(.accordion-expanded) ::slotted(ion-item[slot=header]){--border-width:0px}:host(.accordion-animated){-webkit-transition:all 300ms cubic-bezier(0.25, 0.8, 0.5, 1);transition:all 300ms cubic-bezier(0.25, 0.8, 0.5, 1)}:host(.accordion-animated) #content{-webkit-transition:max-height 300ms cubic-bezier(0.25, 0.8, 0.5, 1);transition:max-height 300ms cubic-bezier(0.25, 0.8, 0.5, 1)}#content{overflow:hidden;will-change:max-height}:host(.accordion-collapsing) #content{max-height:0 !important}:host(.accordion-collapsed) #content{display:none}:host(.accordion-expanding) #content{max-height:0}:host(.accordion-disabled) #header,:host(.accordion-readonly) #header,:host(.accordion-disabled) #content,:host(.accordion-readonly) #content{pointer-events:none}:host(.accordion-disabled) #header,:host(.accordion-disabled) #content{opacity:0.4}@media (prefers-reduced-motion: reduce){:host,#content{-webkit-transition:none !important;transition:none !important}}";

const Accordion = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.updateListener = () => this.updateState(false);
    this.state = 1 /* Collapsed */;
    this.isNext = false;
    this.isPrevious = false;
    /**
     * The value of the accordion. Defaults to an autogenerated
     * value.
     */
    this.value = `ion-accordion-${accordionIds++}`;
    /**
     * If `true`, the accordion cannot be interacted with.
     */
    this.disabled = false;
    /**
     * If `true`, the accordion cannot be interacted with,
     * but does not alter the opacity.
     */
    this.readonly = false;
    /**
     * The toggle icon to use. This icon will be
     * rotated when the accordion is expanded
     * or collapsed.
     */
    this.toggleIcon = index$1.chevronDown;
    /**
     * The slot inside of `ion-item` to
     * place the toggle icon. Defaults to `'end'`.
     */
    this.toggleIconSlot = 'end';
    this.setItemDefaults = () => {
      const ionItem = this.getSlottedHeaderIonItem();
      if (!ionItem) {
        return;
      }
      /**
       * For a11y purposes, we make
       * the ion-item a button so users
       * can tab to it and use keyboard
       * navigation to get around.
       */
      ionItem.button = true;
      ionItem.detail = false;
      /**
       * By default, the lines in an
       * item should be full here, but
       * only do that if a user has
       * not explicitly overridden them
       */
      if (ionItem.lines === undefined) {
        ionItem.lines = 'full';
      }
    };
    this.getSlottedHeaderIonItem = () => {
      const { headerEl } = this;
      if (!headerEl) {
        return;
      }
      /**
       * Get the first ion-item
       * slotted in the header slot
       */
      const slot = headerEl.querySelector('slot');
      if (!slot) {
        return;
      }
      // This is not defined in unit tests
      const ionItem = slot.assignedElements &&
        slot.assignedElements().find((el) => el.tagName === 'ION-ITEM');
      return ionItem;
    };
    this.setAria = (expanded = false) => {
      const ionItem = this.getSlottedHeaderIonItem();
      if (!ionItem) {
        return;
      }
      /**
       * Get the native <button> element inside of
       * ion-item because that is what will be focused
       */
      const root = helpers.getElementRoot(ionItem);
      const button = root.querySelector('button');
      if (!button) {
        return;
      }
      button.setAttribute('aria-expanded', `${expanded}`);
    };
    this.slotToggleIcon = () => {
      const ionItem = this.getSlottedHeaderIonItem();
      if (!ionItem) {
        return;
      }
      const { toggleIconSlot, toggleIcon } = this;
      /**
       * Check if there already is a toggle icon.
       * If so, do not add another one.
       */
      const existingToggleIcon = ionItem.querySelector('.ion-accordion-toggle-icon');
      if (existingToggleIcon) {
        return;
      }
      const iconEl = document.createElement('ion-icon');
      iconEl.slot = toggleIconSlot;
      iconEl.lazy = false;
      iconEl.classList.add('ion-accordion-toggle-icon');
      iconEl.icon = toggleIcon;
      iconEl.setAttribute('aria-hidden', 'true');
      ionItem.appendChild(iconEl);
    };
    this.expandAccordion = (initialUpdate = false) => {
      const { contentEl, contentElWrapper } = this;
      if (initialUpdate || contentEl === undefined || contentElWrapper === undefined) {
        this.state = 4 /* Expanded */;
        return;
      }
      if (this.state === 4 /* Expanded */) {
        return;
      }
      if (this.currentRaf !== undefined) {
        cancelAnimationFrame(this.currentRaf);
      }
      if (this.shouldAnimate()) {
        helpers.raf(() => {
          this.state = 8 /* Expanding */;
          this.currentRaf = helpers.raf(async () => {
            const contentHeight = contentElWrapper.offsetHeight;
            const waitForTransition = helpers.transitionEndAsync(contentEl, 2000);
            contentEl.style.setProperty('max-height', `${contentHeight}px`);
            await waitForTransition;
            this.state = 4 /* Expanded */;
            contentEl.style.removeProperty('max-height');
          });
        });
      }
      else {
        this.state = 4 /* Expanded */;
      }
    };
    this.collapseAccordion = (initialUpdate = false) => {
      const { contentEl } = this;
      if (initialUpdate || contentEl === undefined) {
        this.state = 1 /* Collapsed */;
        return;
      }
      if (this.state === 1 /* Collapsed */) {
        return;
      }
      if (this.currentRaf !== undefined) {
        cancelAnimationFrame(this.currentRaf);
      }
      if (this.shouldAnimate()) {
        this.currentRaf = helpers.raf(async () => {
          const contentHeight = contentEl.offsetHeight;
          contentEl.style.setProperty('max-height', `${contentHeight}px`);
          helpers.raf(async () => {
            const waitForTransition = helpers.transitionEndAsync(contentEl, 2000);
            this.state = 2 /* Collapsing */;
            await waitForTransition;
            this.state = 1 /* Collapsed */;
            contentEl.style.removeProperty('max-height');
          });
        });
      }
      else {
        this.state = 1 /* Collapsed */;
      }
    };
    /**
     * Helper function to determine if
     * something should animate.
     * If prefers-reduced-motion is set
     * then we should not animate, regardless
     * of what is set in the config.
     */
    this.shouldAnimate = () => {
      if (typeof window === 'undefined') {
        return false;
      }
      const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        return false;
      }
      const animated = ionicGlobal.config.get('animated', true);
      if (!animated) {
        return false;
      }
      if (this.accordionGroupEl && !this.accordionGroupEl.animated) {
        return false;
      }
      return true;
    };
    this.updateState = async (initialUpdate = false) => {
      const accordionGroup = this.accordionGroupEl;
      const accordionValue = this.value;
      if (!accordionGroup) {
        return;
      }
      const value = accordionGroup.value;
      const shouldExpand = Array.isArray(value) ? value.includes(accordionValue) : value === accordionValue;
      if (shouldExpand) {
        this.expandAccordion(initialUpdate);
        this.isNext = this.isPrevious = false;
      }
      else {
        this.collapseAccordion(initialUpdate);
        /**
         * When using popout or inset,
         * the collapsed accordion items
         * may need additional border radius
         * applied. Check to see if the
         * next or previous accordion is selected.
         */
        const nextAccordion = this.getNextSibling();
        const nextAccordionValue = nextAccordion === null || nextAccordion === void 0 ? void 0 : nextAccordion.value;
        if (nextAccordionValue !== undefined) {
          this.isPrevious = Array.isArray(value) ? value.includes(nextAccordionValue) : value === nextAccordionValue;
        }
        const previousAccordion = this.getPreviousSibling();
        const previousAccordionValue = previousAccordion === null || previousAccordion === void 0 ? void 0 : previousAccordion.value;
        if (previousAccordionValue !== undefined) {
          this.isNext = Array.isArray(value) ? value.includes(previousAccordionValue) : value === previousAccordionValue;
        }
      }
    };
    this.getNextSibling = () => {
      if (!this.el) {
        return;
      }
      const nextSibling = this.el.nextElementSibling;
      if ((nextSibling === null || nextSibling === void 0 ? void 0 : nextSibling.tagName) !== 'ION-ACCORDION') {
        return;
      }
      return nextSibling;
    };
    this.getPreviousSibling = () => {
      if (!this.el) {
        return;
      }
      const previousSibling = this.el.previousElementSibling;
      if ((previousSibling === null || previousSibling === void 0 ? void 0 : previousSibling.tagName) !== 'ION-ACCORDION') {
        return;
      }
      return previousSibling;
    };
  }
  connectedCallback() {
    var _a;
    const accordionGroupEl = (this.accordionGroupEl = (_a = this.el) === null || _a === void 0 ? void 0 : _a.closest('ion-accordion-group'));
    if (accordionGroupEl) {
      this.updateState(true);
      helpers.addEventListener(accordionGroupEl, 'ionChange', this.updateListener);
    }
  }
  disconnectedCallback() {
    const accordionGroupEl = this.accordionGroupEl;
    if (accordionGroupEl) {
      helpers.removeEventListener(accordionGroupEl, 'ionChange', this.updateListener);
    }
  }
  componentDidLoad() {
    this.setItemDefaults();
    this.slotToggleIcon();
    /**
     * We need to wait a tick because we
     * just set ionItem.button = true and
     * the button has not have been rendered yet.
     */
    helpers.raf(() => {
      /**
       * Set aria label on button inside of ion-item
       * once the inner content has been rendered.
       */
      const expanded = this.state === 4 /* Expanded */ || this.state === 8 /* Expanding */;
      this.setAria(expanded);
    });
  }
  toggleExpanded() {
    const { accordionGroupEl, value, state } = this;
    if (accordionGroupEl) {
      /**
       * Because the accordion group may or may
       * not allow multiple accordions open, we
       * need to request the toggling of this
       * accordion and the accordion group will
       * make the decision on whether or not
       * to allow it.
       */
      const expand = state === 1 /* Collapsed */ || state === 2 /* Collapsing */;
      accordionGroupEl.requestAccordionToggle(value, expand);
    }
  }
  render() {
    const { disabled, readonly } = this;
    const mode = ionicGlobal.getIonMode(this);
    const expanded = this.state === 4 /* Expanded */ || this.state === 8 /* Expanding */;
    const headerPart = expanded ? 'header expanded' : 'header';
    const contentPart = expanded ? 'content expanded' : 'content';
    this.setAria(expanded);
    return (index.h(index.Host, { class: {
        [mode]: true,
        'accordion-expanding': this.state === 8 /* Expanding */,
        'accordion-expanded': this.state === 4 /* Expanded */,
        'accordion-collapsing': this.state === 2 /* Collapsing */,
        'accordion-collapsed': this.state === 1 /* Collapsed */,
        'accordion-next': this.isNext,
        'accordion-previous': this.isPrevious,
        'accordion-disabled': disabled,
        'accordion-readonly': readonly,
        'accordion-animated': ionicGlobal.config.getBoolean('animated', true),
      } }, index.h("div", { onClick: () => this.toggleExpanded(), id: "header", part: headerPart, "aria-controls": "content", ref: (headerEl) => (this.headerEl = headerEl) }, index.h("slot", { name: "header" })), index.h("div", { id: "content", part: contentPart, role: "region", "aria-labelledby": "header", ref: (contentEl) => (this.contentEl = contentEl) }, index.h("div", { id: "content-wrapper", ref: (contentElWrapper) => (this.contentElWrapper = contentElWrapper) }, index.h("slot", { name: "content" })))));
  }
  static get delegatesFocus() { return true; }
  get el() { return index.getElement(this); }
};
let accordionIds = 0;
Accordion.style = {
  ios: accordionIosCss,
  md: accordionMdCss
};

const accordionGroupIosCss = ":host{display:block}:host(.accordion-group-expand-inset){margin-left:16px;margin-right:16px;margin-top:16px;margin-bottom:16px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.accordion-group-expand-inset){margin-left:unset;margin-right:unset;-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:16px;margin-inline-end:16px}}:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-expanding),:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-expanded){border-bottom:none}";

const accordionGroupMdCss = ":host{display:block}:host(.accordion-group-expand-inset){margin-left:16px;margin-right:16px;margin-top:16px;margin-bottom:16px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.accordion-group-expand-inset){margin-left:unset;margin-right:unset;-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:16px;margin-inline-end:16px}}:host(.accordion-group-expand-inset) ::slotted(ion-accordion){-webkit-box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)}:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-expanding),:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-expanded){margin-left:0;margin-right:0;margin-top:16px;margin-bottom:16px;border-radius:6px}:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-previous){border-bottom-right-radius:6px;border-bottom-left-radius:6px}:host-context([dir=rtl]):host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-previous),:host-context([dir=rtl]).accordion-group-expand-inset ::slotted(ion-accordion.accordion-previous){border-bottom-right-radius:6px;border-bottom-left-radius:6px}:host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-next){border-top-left-radius:6px;border-top-right-radius:6px}:host-context([dir=rtl]):host(.accordion-group-expand-inset) ::slotted(ion-accordion.accordion-next),:host-context([dir=rtl]).accordion-group-expand-inset ::slotted(ion-accordion.accordion-next){border-top-left-radius:6px;border-top-right-radius:6px}:host(.accordion-group-expand-inset) ::slotted(ion-accordion):first-of-type{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}";

const AccordionGroup = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.ionChange = index.createEvent(this, "ionChange", 7);
    /**
     * If `true`, all accordions inside of the
     * accordion group will animate when expanding
     * or collapsing.
     */
    this.animated = true;
    /**
     * If `true`, the accordion group cannot be interacted with.
     */
    this.disabled = false;
    /**
     * If `true`, the accordion group cannot be interacted with,
     * but does not alter the opacity.
     */
    this.readonly = false;
    /**
     * Describes the expansion behavior for each accordion.
     * Possible values are `"compact"` and `"inset"`.
     * Defaults to `"compact"`.
     */
    this.expand = 'compact';
  }
  valueChanged() {
    const { value, multiple } = this;
    /**
     * If accordion group does not
     * let multiple accordions be open
     * at once, but user passes an array
     * just grab the first value.
     */
    if (!multiple && Array.isArray(value)) {
      this.value = value[0];
    }
    else {
      this.ionChange.emit({ value: this.value });
    }
  }
  async disabledChanged() {
    const { disabled } = this;
    const accordions = await this.getAccordions();
    for (const accordion of accordions) {
      accordion.disabled = disabled;
    }
  }
  async readonlyChanged() {
    const { readonly } = this;
    const accordions = await this.getAccordions();
    for (const accordion of accordions) {
      accordion.readonly = readonly;
    }
  }
  async onKeydown(ev) {
    const activeElement = document.activeElement;
    if (!activeElement) {
      return;
    }
    /**
     * Make sure focus is in the header, not the body, of the accordion. This ensures
     * that if there are any interactable elements in the body, their keyboard
     * interaction doesn't get stolen by the accordion. Example: using up/down keys
     * in ion-textarea.
     */
    const activeAccordionHeader = activeElement.closest('ion-accordion [slot="header"]');
    if (!activeAccordionHeader) {
      return;
    }
    const accordionEl = activeElement.tagName === 'ION-ACCORDION' ? activeElement : activeElement.closest('ion-accordion');
    if (!accordionEl) {
      return;
    }
    const closestGroup = accordionEl.closest('ion-accordion-group');
    if (closestGroup !== this.el) {
      return;
    }
    // If the active accordion is not in the current array of accordions, do not do anything
    const accordions = await this.getAccordions();
    const startingIndex = accordions.findIndex((a) => a === accordionEl);
    if (startingIndex === -1) {
      return;
    }
    let accordion;
    if (ev.key === 'ArrowDown') {
      accordion = this.findNextAccordion(accordions, startingIndex);
    }
    else if (ev.key === 'ArrowUp') {
      accordion = this.findPreviousAccordion(accordions, startingIndex);
    }
    else if (ev.key === 'Home') {
      accordion = accordions[0];
    }
    else if (ev.key === 'End') {
      accordion = accordions[accordions.length - 1];
    }
    if (accordion !== undefined && accordion !== activeElement) {
      accordion.focus();
    }
  }
  async componentDidLoad() {
    if (this.disabled) {
      this.disabledChanged();
    }
    if (this.readonly) {
      this.readonlyChanged();
    }
  }
  /**
   * @internal
   */
  async requestAccordionToggle(accordionValue, accordionExpand) {
    const { multiple, value, readonly, disabled } = this;
    if (readonly || disabled) {
      return;
    }
    if (accordionExpand) {
      /**
       * If group accepts multiple values
       * check to see if value is already in
       * in values array. If not, add it
       * to the array.
       */
      if (multiple) {
        const groupValue = value || [];
        const processedValue = Array.isArray(groupValue) ? groupValue : [groupValue];
        const valueExists = processedValue.find((v) => v === accordionValue);
        if (valueExists === undefined && accordionValue !== undefined) {
          this.value = [...processedValue, accordionValue];
        }
      }
      else {
        this.value = accordionValue;
      }
    }
    else {
      /**
       * If collapsing accordion, either filter the value
       * out of the values array or unset the value.
       */
      if (multiple) {
        const groupValue = value || [];
        const processedValue = Array.isArray(groupValue) ? groupValue : [groupValue];
        this.value = processedValue.filter((v) => v !== accordionValue);
      }
      else {
        this.value = undefined;
      }
    }
  }
  findNextAccordion(accordions, startingIndex) {
    const nextAccordion = accordions[startingIndex + 1];
    if (nextAccordion === undefined) {
      return accordions[0];
    }
    return nextAccordion;
  }
  findPreviousAccordion(accordions, startingIndex) {
    const prevAccordion = accordions[startingIndex - 1];
    if (prevAccordion === undefined) {
      return accordions[accordions.length - 1];
    }
    return prevAccordion;
  }
  /**
   * @internal
   */
  async getAccordions() {
    return Array.from(this.el.querySelectorAll(':scope > ion-accordion'));
  }
  render() {
    const { disabled, readonly, expand } = this;
    const mode = ionicGlobal.getIonMode(this);
    return (index.h(index.Host, { class: {
        [mode]: true,
        'accordion-group-disabled': disabled,
        'accordion-group-readonly': readonly,
        [`accordion-group-expand-${expand}`]: true,
      }, role: "presentation" }, index.h("slot", null)));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "value": ["valueChanged"],
    "disabled": ["disabledChanged"],
    "readonly": ["readonlyChanged"]
  }; }
};
AccordionGroup.style = {
  ios: accordionGroupIosCss,
  md: accordionGroupMdCss
};

exports.ion_accordion = Accordion;
exports.ion_accordion_group = AccordionGroup;

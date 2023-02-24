/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import{r as registerInstance,e as createEvent,h,H as Host,i as getElement}from"./index-88bdeaae.js";import{g as getElementRoot}from"./helpers-4d272360.js";var pickerInternalIosCss=":host{display:-ms-flexbox;display:flex;position:relative;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:200px;direction:ltr;z-index:0}:host .picker-before,:host .picker-after{position:absolute;width:100%;z-index:1;pointer-events:none}:host .picker-before{left:0;top:0;height:83px}:host-context([dir=rtl]){left:unset;right:unset;right:0}:host .picker-after{left:0;top:116px;height:84px}:host-context([dir=rtl]){left:unset;right:unset;right:0}:host .picker-highlight{border-radius:8px;left:0;right:0;top:50%;bottom:0;margin-left:auto;margin-right:auto;margin-top:0;margin-bottom:0;position:absolute;width:calc(100% - 16px);height:34px;-webkit-transform:translateY(-50%);transform:translateY(-50%);z-index:-1}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host .picker-highlight{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}:host input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}:host ::slotted(ion-picker-column-internal:first-of-type){text-align:start}:host ::slotted(ion-picker-column-internal:last-of-type){text-align:end}:host .picker-before{background:-webkit-gradient(linear, left top, left bottom, color-stop(20%, var(--background, var(--ion-background-color, #fff))), to(rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0.8)));background:linear-gradient(to bottom, var(--background, var(--ion-background-color, #fff)) 20%, rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0.8) 100%)}:host .picker-after{background:-webkit-gradient(linear, left bottom, left top, color-stop(20%, var(--background, var(--ion-background-color, #fff))), to(rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0.8)));background:linear-gradient(to top, var(--background, var(--ion-background-color, #fff)) 20%, rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0.8) 100%)}:host .picker-highlight{background:var(--ion-color-step-150, #eeeeef)}";var pickerInternalMdCss=":host{display:-ms-flexbox;display:flex;position:relative;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:200px;direction:ltr;z-index:0}:host .picker-before,:host .picker-after{position:absolute;width:100%;z-index:1;pointer-events:none}:host .picker-before{left:0;top:0;height:83px}:host-context([dir=rtl]){left:unset;right:unset;right:0}:host .picker-after{left:0;top:116px;height:84px}:host-context([dir=rtl]){left:unset;right:unset;right:0}:host .picker-highlight{border-radius:8px;left:0;right:0;top:50%;bottom:0;margin-left:auto;margin-right:auto;margin-top:0;margin-bottom:0;position:absolute;width:calc(100% - 16px);height:34px;-webkit-transform:translateY(-50%);transform:translateY(-50%);z-index:-1}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host .picker-highlight{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}:host input{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;outline:0;clip:rect(0 0 0 0);opacity:0;overflow:hidden;-webkit-appearance:none;-moz-appearance:none}:host ::slotted(ion-picker-column-internal:first-of-type){text-align:start}:host ::slotted(ion-picker-column-internal:last-of-type){text-align:end}:host .picker-before{background:-webkit-gradient(linear, left top, left bottom, color-stop(20%, var(--background, var(--ion-background-color, #fff))), color-stop(90%, rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0)));background:linear-gradient(to bottom, var(--background, var(--ion-background-color, #fff)) 20%, rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0) 90%)}:host .picker-after{background:-webkit-gradient(linear, left bottom, left top, color-stop(30%, var(--background, var(--ion-background-color, #fff))), color-stop(90%, rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0)));background:linear-gradient(to top, var(--background, var(--ion-background-color, #fff)) 30%, rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0) 90%)}";var PickerInternal=function(){function e(e){var t=this;registerInstance(this,e);this.ionInputModeChange=createEvent(this,"ionInputModeChange",7);this.useInputMode=false;this.isInHighlightBounds=function(e){var n=t.highlightEl;if(!n){return false}var r=n.getBoundingClientRect();var i=e.clientX<r.left||e.clientX>r.right;var o=e.clientY<r.top||e.clientY>r.bottom;if(i||o){return false}return true};this.onFocusOut=function(e){var n=e.relatedTarget;if(!n||n.tagName!=="ION-PICKER-COLUMN-INTERNAL"&&n!==t.inputEl){t.exitInputMode()}};this.onFocusIn=function(e){var n=e.target;if(n.tagName!=="ION-PICKER-COLUMN-INTERNAL"){return}if(!t.actionOnClick){var r=n;var i=r.numericInput;if(i){t.enterInputMode(r,false)}else{t.exitInputMode()}}};this.onClick=function(){var e=t.actionOnClick;if(e){e();t.actionOnClick=undefined}};this.onPointerDown=function(e){var n=t,r=n.useInputMode,i=n.inputModeColumn,o=n.el;if(t.isInHighlightBounds(e)){if(r){if(e.target.tagName==="ION-PICKER-COLUMN-INTERNAL"){if(i&&i===e.target){t.actionOnClick=function(){t.enterInputMode()}}else{t.actionOnClick=function(){t.enterInputMode(e.target)}}}else{t.actionOnClick=function(){t.exitInputMode()}}}else{var a=o.querySelectorAll("ion-picker-column-internal.picker-column-numeric-input");var u=a.length===1?e.target:undefined;t.actionOnClick=function(){t.enterInputMode(u)}}return}t.actionOnClick=function(){t.exitInputMode()}};this.enterInputMode=function(e,n){if(n===void 0){n=true}var r=t,i=r.inputEl,o=r.el;if(!i){return}var a=o.querySelector("ion-picker-column-internal.picker-column-numeric-input");if(!a){return}t.useInputMode=true;t.inputModeColumn=e;if(n){if(t.destroyKeypressListener){t.destroyKeypressListener();t.destroyKeypressListener=undefined}i.focus()}else{o.addEventListener("keypress",t.onKeyPress);t.destroyKeypressListener=function(){o.removeEventListener("keypress",t.onKeyPress)}}t.emitInputModeChange()};this.exitInputMode=function(){var e=t,n=e.inputEl,r=e.useInputMode;if(!r||!n){return}t.useInputMode=false;t.inputModeColumn=undefined;n.blur();n.value="";if(t.destroyKeypressListener){t.destroyKeypressListener();t.destroyKeypressListener=undefined}t.emitInputModeChange()};this.onKeyPress=function(e){var n=t.inputEl;if(!n){return}var r=parseInt(e.key,10);if(!Number.isNaN(r)){n.value+=e.key;t.onInputChange()}};this.selectSingleColumn=function(){var e=t,n=e.inputEl,r=e.inputModeColumn,i=e.singleColumnSearchTimeout;if(!n||!r){return}var o=r.items;if(i){clearTimeout(i)}t.singleColumnSearchTimeout=setTimeout((function(){n.value="";t.singleColumnSearchTimeout=undefined}),1e3);if(n.value.length>=3){var a=n.value.length-2;var u=n.value.substring(a);n.value=u;t.selectSingleColumn();return}var l=o.find((function(e){var t=e.text;return t.replace(/^0+/,"")===n.value}));if(l){r.setValue(l.value);return}if(n.value.length===2){var s=n.value.substring(n.value.length-1);n.value=s;t.selectSingleColumn()}};this.searchColumn=function(e,t,n){if(n===void 0){n="start"}var r=n==="start"?/^0+/:/0$/;var i=e.items.find((function(e){var n=e.text;return n.replace(r,"")===t}));if(i){e.setValue(i.value)}};this.selectMultiColumn=function(){var e=t,n=e.inputEl,r=e.el;if(!n){return}var i=Array.from(r.querySelectorAll("ion-picker-column-internal")).filter((function(e){return e.numericInput}));var o=i[0];var a=i[1];var u=n.value;var l;switch(u.length){case 1:t.searchColumn(o,u);break;case 2:var s=n.value.substring(0,1);u=s==="0"||s==="1"?n.value:s;t.searchColumn(o,u);if(u.length===1){l=n.value.substring(n.value.length-1);t.searchColumn(a,l,"end")}break;case 3:var c=n.value.substring(0,1);u=c==="0"||c==="1"?n.value.substring(0,2):c;t.searchColumn(o,u);l=u.length===1?n.value.substring(1):n.value.substring(2);t.searchColumn(a,l,"end");break;case 4:var g=n.value.substring(0,1);u=g==="0"||g==="1"?n.value.substring(0,2):g;t.searchColumn(o,u);var p=u.length===1?n.value.substring(1,n.value.length):n.value.substring(2,n.value.length);t.searchColumn(a,p,"end");break;default:var d=n.value.length-4;var f=n.value.substring(d);n.value=f;t.selectMultiColumn();break}};this.onInputChange=function(){var e=t,n=e.useInputMode,r=e.inputEl,i=e.inputModeColumn;if(!n||!r){return}if(i){t.selectSingleColumn()}else{t.selectMultiColumn()}};this.emitInputModeChange=function(){var e=t,n=e.useInputMode,r=e.inputModeColumn;t.ionInputModeChange.emit({useInputMode:n,inputModeColumn:r})}}e.prototype.componentWillLoad=function(){getElementRoot(this.el).addEventListener("focusin",this.onFocusIn);getElementRoot(this.el).addEventListener("focusout",this.onFocusOut)};e.prototype.render=function(){var e=this;return h(Host,{onPointerDown:function(t){return e.onPointerDown(t)},onClick:function(){return e.onClick()}},h("input",{"aria-hidden":"true",tabindex:-1,inputmode:"numeric",type:"number",ref:function(t){return e.inputEl=t},onInput:function(){return e.onInputChange()},onBlur:function(){return e.exitInputMode()}}),h("div",{class:"picker-before"}),h("div",{class:"picker-after"}),h("div",{class:"picker-highlight",ref:function(t){return e.highlightEl=t}}),h("slot",null))};Object.defineProperty(e.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});return e}();PickerInternal.style={ios:pickerInternalIosCss,md:pickerInternalMdCss};export{PickerInternal as ion_picker_internal};
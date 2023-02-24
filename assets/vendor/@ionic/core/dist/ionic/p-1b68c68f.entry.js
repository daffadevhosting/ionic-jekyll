/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import{r as t,e as o,c as a,h as i,H as r,i as e}from"./p-48f74811.js";import{b as s,c as n}from"./p-0d7ac9e6.js";import{f as d,i as h,d as p,r as l,a as c,p as m}from"./p-72cbee20.js";import{C as f,a as b,d as u}from"./p-040288bc.js";import{g as w,l as v,r as g}from"./p-18d5f1a9.js";import{KEYBOARD_DID_OPEN as x}from"./p-b556327c.js";import{p as k}from"./p-89cb27c4.js";import{B as y,e as D,d as A,h as Y,f as B,g as C}from"./p-79aef531.js";import{g as M}from"./p-fe01417c.js";import{e as j}from"./p-bed1e616.js";import{c as E}from"./p-5c1dd2e1.js";import{g as S}from"./p-a60c30b8.js";import{createGesture as T}from"./p-14a5a46e.js";import"./p-6561b0e5.js";import"./p-49ecbc15.js";const I="undefined"!=typeof window?window:void 0;var O;!function(t){t.Dark="DARK",t.Light="LIGHT",t.Default="DEFAULT"}(O||(O={}));const $={getEngine(){var t,o,a;return(null===(o=null===(t=I)||void 0===t?void 0:t.Capacitor)||void 0===o?void 0:o.isPluginAvailable("StatusBar"))&&(null===(a=I)||void 0===a?void 0:a.Capacitor.Plugins.StatusBar)},supportsDefaultStatusBarStyle(){var t,o;return!!(null===(o=null===(t=I)||void 0===t?void 0:t.Capacitor)||void 0===o?void 0:o.PluginHeaders)},setStyle(t){const o=this.getEngine();o&&o.setStyle(t)}},P=(t,o)=>{if(1===o)return 0;const a=1/(1-o);return t*a+-o*a},W=()=>{!I||I.innerWidth>=768||!$.supportsDefaultStatusBarStyle()||$.setStyle({style:O.Dark})},z=()=>{!I||I.innerWidth>=768||!$.supportsDefaultStatusBarStyle()||$.setStyle({style:O.Default})},L=async(t,o)=>{"function"==typeof t.canDismiss&&await t.canDismiss()&&(o.isRunning()?o.onFinish((()=>{t.dismiss(void 0,"handler")}),{oneTimeCallback:!0}):t.dismiss(void 0,"handler"))},R=t=>.00255275*2.71828**(-14.9619*t)-1.00255*2.71828**(-.0380968*t)+1,K=(t,o)=>v(400,t/Math.abs(1.1*o),500),N=t=>{const{currentBreakpoint:o,backdropBreakpoint:a}=t,i=void 0===a||a<o,r=i?`calc(var(--backdrop-opacity) * ${o})`:"0",e=E("backdropAnimation").fromTo("opacity",0,r);return i&&e.beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),{wrapperAnimation:E("wrapperAnimation").keyframes([{offset:0,opacity:1,transform:"translateY(100%)"},{offset:1,opacity:1,transform:`translateY(${100-100*o}%)`}]),backdropAnimation:e}},V=t=>{const{currentBreakpoint:o,backdropBreakpoint:a}=t,i=`calc(var(--backdrop-opacity) * ${P(o,a)})`,r=[{offset:0,opacity:i},{offset:1,opacity:0}],e=[{offset:0,opacity:i},{offset:a,opacity:0},{offset:1,opacity:0}],s=E("backdropAnimation").keyframes(0!==a?e:r);return{wrapperAnimation:E("wrapperAnimation").keyframes([{offset:0,opacity:1,transform:`translateY(${100-100*o}%)`},{offset:1,opacity:1,transform:"translateY(100%)"}]),backdropAnimation:s}},Z=(t,o)=>{const{presentingEl:a,currentBreakpoint:i}=o,r=w(t),{wrapperAnimation:e,backdropAnimation:s}=void 0!==i?N(o):{backdropAnimation:E().fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),wrapperAnimation:E().fromTo("transform","translateY(100vh)","translateY(0vh)")};s.addElement(r.querySelector("ion-backdrop")),e.addElement(r.querySelectorAll(".modal-wrapper, .modal-shadow")).beforeStyles({opacity:1});const n=E("entering-base").addElement(t).easing("cubic-bezier(0.32,0.72,0,1)").duration(500).addAnimation(e);if(a){const t=window.innerWidth<768,o="ION-MODAL"===a.tagName&&void 0!==a.presentingElement,i=w(a),r=E().beforeStyles({transform:"translateY(0)","transform-origin":"top center",overflow:"hidden"}),d=document.body;if(t){const t=CSS.supports("width","max(0px, 1px)")?"max(30px, var(--ion-safe-area-top))":"30px",i=`translateY(${o?"-10px":t}) scale(0.93)`;r.afterStyles({transform:i}).beforeAddWrite((()=>d.style.setProperty("background-color","black"))).addElement(a).keyframes([{offset:0,filter:"contrast(1)",transform:"translateY(0px) scale(1)",borderRadius:"0px"},{offset:1,filter:"contrast(0.85)",transform:i,borderRadius:"10px 10px 0 0"}]),n.addAnimation(r)}else if(n.addAnimation(s),o){const t=`translateY(-10px) scale(${o?.93:1})`;r.afterStyles({transform:t}).addElement(i.querySelector(".modal-wrapper")).keyframes([{offset:0,filter:"contrast(1)",transform:"translateY(0) scale(1)"},{offset:1,filter:"contrast(0.85)",transform:t}]);const a=E().afterStyles({transform:t}).addElement(i.querySelector(".modal-shadow")).keyframes([{offset:0,opacity:"1",transform:"translateY(0) scale(1)"},{offset:1,opacity:"0",transform:t}]);n.addAnimation([r,a])}else e.fromTo("opacity","0","1")}else n.addAnimation(s);return n},F=(t,o,a=500)=>{const{presentingEl:i,currentBreakpoint:r}=o,e=w(t),{wrapperAnimation:s,backdropAnimation:n}=void 0!==r?V(o):{backdropAnimation:E().fromTo("opacity","var(--backdrop-opacity)",0),wrapperAnimation:E().fromTo("transform","translateY(0vh)","translateY(100vh)")};n.addElement(e.querySelector("ion-backdrop")),s.addElement(e.querySelectorAll(".modal-wrapper, .modal-shadow")).beforeStyles({opacity:1});const d=E("leaving-base").addElement(t).easing("cubic-bezier(0.32,0.72,0,1)").duration(a).addAnimation(s);if(i){const t=window.innerWidth<768,o="ION-MODAL"===i.tagName&&void 0!==i.presentingElement,a=w(i),r=E().beforeClearStyles(["transform"]).afterClearStyles(["transform"]).onFinish((t=>{1===t&&(i.style.setProperty("overflow",""),Array.from(e.querySelectorAll("ion-modal")).filter((t=>void 0!==t.presentingElement)).length<=1&&e.style.setProperty("background-color",""))})),e=document.body;if(t){const t=CSS.supports("width","max(0px, 1px)")?"max(30px, var(--ion-safe-area-top))":"30px",a=`translateY(${o?"-10px":t}) scale(0.93)`;r.addElement(i).keyframes([{offset:0,filter:"contrast(0.85)",transform:a,borderRadius:"10px 10px 0 0"},{offset:1,filter:"contrast(1)",transform:"translateY(0px) scale(1)",borderRadius:"0px"}]),d.addAnimation(r)}else if(d.addAnimation(n),o){const t=`translateY(-10px) scale(${o?.93:1})`;r.addElement(a.querySelector(".modal-wrapper")).afterStyles({transform:"translate3d(0, 0, 0)"}).keyframes([{offset:0,filter:"contrast(0.85)",transform:t},{offset:1,filter:"contrast(1)",transform:"translateY(0) scale(1)"}]);const i=E().addElement(a.querySelector(".modal-shadow")).afterStyles({transform:"translateY(0) scale(1)"}).keyframes([{offset:0,opacity:"0",transform:t},{offset:1,opacity:"1",transform:"translateY(0) scale(1)"}]);d.addAnimation([r,i])}else s.fromTo("opacity","1","0")}else d.addAnimation(n);return d},_=(t,o)=>{const{currentBreakpoint:a}=o,i=w(t),{wrapperAnimation:r,backdropAnimation:e}=void 0!==a?N(o):{backdropAnimation:E().fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),wrapperAnimation:E().keyframes([{offset:0,opacity:.01,transform:"translateY(40px)"},{offset:1,opacity:1,transform:"translateY(0px)"}])};return e.addElement(i.querySelector("ion-backdrop")),r.addElement(i.querySelector(".modal-wrapper")),E().addElement(t).easing("cubic-bezier(0.36,0.66,0.04,1)").duration(280).addAnimation([e,r])},G=(t,o)=>{const{currentBreakpoint:a}=o,i=w(t),{wrapperAnimation:r,backdropAnimation:e}=void 0!==a?V(o):{backdropAnimation:E().fromTo("opacity","var(--backdrop-opacity)",0),wrapperAnimation:E().keyframes([{offset:0,opacity:.99,transform:"translateY(0px)"},{offset:1,opacity:0,transform:"translateY(40px)"}])};return e.addElement(i.querySelector("ion-backdrop")),r.addElement(i.querySelector(".modal-wrapper")),E().easing("cubic-bezier(0.47,0,0.745,0.715)").duration(200).addAnimation([e,r])},H=class{constructor(a){t(this,a),this.didPresent=o(this,"ionModalDidPresent",7),this.willPresent=o(this,"ionModalWillPresent",7),this.willDismiss=o(this,"ionModalWillDismiss",7),this.didDismiss=o(this,"ionModalDidDismiss",7),this.ionBreakpointDidChange=o(this,"ionBreakpointDidChange",7),this.didPresentShorthand=o(this,"didPresent",7),this.willPresentShorthand=o(this,"willPresent",7),this.willDismissShorthand=o(this,"willDismiss",7),this.didDismissShorthand=o(this,"didDismiss",7),this.modalIndex=q++,this.coreDelegate=f(),this.isSheetModal=!1,this.inline=!1,this.gestureAnimationDismissing=!1,this.presented=!1,this.hasController=!1,this.keyboardClose=!0,this.backdropBreakpoint=0,this.backdropDismiss=!0,this.showBackdrop=!0,this.animated=!0,this.swipeToClose=!1,this.isOpen=!1,this.configureTriggerInteraction=()=>{const{trigger:t,el:o,destroyTriggerInteraction:a}=this;a&&a();const i=void 0!==t?document.getElementById(t):null;i&&(this.destroyTriggerInteraction=((t,o)=>{const a=()=>{o.present()};return t.addEventListener("click",a),()=>{t.removeEventListener("click",a)}})(i,o))},this.onBackdropTap=()=>{this.dismiss(void 0,y)},this.onLifecycle=t=>{const o=this.usersElement,a=U[t.type];if(o&&a){const i=new CustomEvent(a,{bubbles:!1,cancelable:!1,detail:t.detail});o.dispatchEvent(i)}}}onIsOpenChange(t,o){!0===t&&!1===o?this.present():!1===t&&!0===o&&this.dismiss()}onTriggerChange(){this.configureTriggerInteraction()}async swipeToCloseChanged(t){this.gesture?this.gesture.enable(t):t&&await this.initSwipeToClose()}breakpointsChanged(t){void 0!==t&&(this.sortedBreakpoints=t.sort(((t,o)=>t-o)))}connectedCallback(){D(this.el)}componentWillLoad(){const{breakpoints:t,initialBreakpoint:o,swipeToClose:a}=this;this.modalId=this.el.hasAttribute("id")?this.el.getAttribute("id"):`ion-modal-${this.modalIndex}`,(this.isSheetModal=void 0!==t&&void 0!==o)&&(this.currentBreakpoint=this.initialBreakpoint),void 0===t||void 0===o||t.includes(o)||k("Your breakpoints array must include the initialBreakpoint value."),a&&k("swipeToClose has been deprecated in favor of canDismiss.\n\nIf you want a card modal to be swipeable, set canDismiss to `true`. In the next major release of Ionic, swipeToClose will be removed, and all card modals will be swipeable by default.")}componentDidLoad(){!0===this.isOpen&&g((()=>this.present())),this.breakpointsChanged(this.breakpoints),this.configureTriggerInteraction()}getDelegate(t=!1){if(this.workingDelegate&&!t)return{delegate:this.workingDelegate,inline:this.inline};const o=this.inline=null!==this.el.parentNode&&!this.hasController;return{inline:o,delegate:this.workingDelegate=o?this.delegate||this.coreDelegate:this.delegate}}async checkCanDismiss(){const{canDismiss:t}=this;return void 0===t||("function"==typeof t?t():t)}async present(){if(this.presented)return;void 0!==this.currentTransition&&await this.currentTransition,this.currentBreakpoint=this.initialBreakpoint;const t=Object.assign(Object.assign({},this.componentProps),{modal:this.el}),{inline:o,delegate:i}=this.getDelegate(!0);this.usersElement=await b(i,this.el,this.component,["ion-page"],t,o),await j(this.usersElement),a((()=>this.el.classList.add("show-modal"))),this.currentTransition=A(this,"modalEnter",Z,_,{presentingEl:this.presentingElement,currentBreakpoint:this.initialBreakpoint,backdropBreakpoint:this.backdropBreakpoint});const r=this.swipeToClose||void 0!==this.canDismiss&&void 0!==this.presentingElement;r&&"ios"===s(this)&&W(),await this.currentTransition,this.isSheetModal?this.initSheetGesture():r&&await this.initSwipeToClose(),"undefined"!=typeof window&&(this.keyboardOpenCallback=()=>{this.gesture&&(this.gesture.enable(!1),g((()=>{this.gesture&&this.gesture.enable(!0)})))},window.addEventListener(x,this.keyboardOpenCallback)),this.currentTransition=void 0}initSwipeToClose(){if("ios"!==s(this))return;const{el:t}=this,o=this.leaveAnimation||n.get("modalLeave",F),a=this.animation=o(t,{presentingEl:this.presentingElement});c(t)?(this.gesture=((t,o,a)=>{const i=.5,r=t.offsetHeight;let e=!1,s=!1,n=null,c=null,m=!0,f=0;const b=T({el:t,gestureName:"modalSwipeToClose",gesturePriority:39,direction:"y",threshold:10,canStart:t=>{const o=t.event.target;if(null===o||!o.closest)return!0;if(n=d(o),n){if(h(n)){const t=w(n);c=t.querySelector(".inner-scroll")}else c=n;return!n.querySelector("ion-refresher")&&0===c.scrollTop}return null===o.closest("ion-footer")},onStart:a=>{const{deltaY:i}=a;m=!n||!h(n)||n.scrollY,s=void 0!==t.canDismiss&&!0!==t.canDismiss,i>0&&n&&p(n),o.progressStart(!0,e?1:0)},onMove:t=>{const{deltaY:a}=t;a>0&&n&&p(n);const e=t.deltaY/r,d=e>=0&&s,h=d?.2:.9999,l=d?R(e/h):e,c=v(1e-4,l,h);o.progressStep(c),c>=i&&f<i?z():c<i&&f>=i&&W(),f=c},onEnd:d=>{const h=d.velocityY,p=d.deltaY/r,c=p>=0&&s,f=c?.2:.9999,u=c?R(p/f):p,w=v(1e-4,u,f),g=!c&&(d.deltaY+1e3*h)/r>=i;let x=g?-.001:.001;g?(o.easing("cubic-bezier(0.32, 0.72, 0, 1)"),x+=S([0,0],[.32,.72],[0,1],[1,1],w)[0]):(o.easing("cubic-bezier(1, 0, 0.68, 0.28)"),x+=S([0,0],[1,0],[.68,.28],[1,1],w)[0]);const k=K(g?p*r:(1-w)*r,h);e=g,b.enable(!1),n&&l(n,m),o.onFinish((()=>{g||b.enable(!0)})).progressEnd(g?1:0,x,k),c&&w>f/4?L(t,o):g&&a()}});return b})(t,a,(()=>{this.gestureAnimationDismissing=!0,this.animation.onFinish((async()=>{await this.dismiss(void 0,"gesture"),this.gestureAnimationDismissing=!1}))})),this.gesture.enable(!0)):m(t)}initSheetGesture(){const{wrapperEl:t,initialBreakpoint:o,backdropBreakpoint:a}=this;if(!t||void 0===o)return;const i=this.enterAnimation||n.get("modalEnter",Z),r=this.animation=i(this.el,{presentingEl:this.presentingElement,currentBreakpoint:o,backdropBreakpoint:a});r.progressStart(!0,1);const{gesture:e,moveSheetToBreakpoint:s}=((t,o,a,i,r,e,s=[],n,d,h)=>{const p={WRAPPER_KEYFRAMES:[{offset:0,transform:"translateY(0%)"},{offset:1,transform:"translateY(100%)"}],BACKDROP_KEYFRAMES:0!==r?[{offset:0,opacity:"var(--backdrop-opacity)"},{offset:1-r,opacity:0},{offset:1,opacity:0}]:[{offset:0,opacity:"var(--backdrop-opacity)"},{offset:1,opacity:.01}]},l=t.querySelector("ion-content"),c=a.clientHeight;let m=i,f=0,b=!1;const u=e.childAnimations.find((t=>"wrapperAnimation"===t.id)),w=e.childAnimations.find((t=>"backdropAnimation"===t.id)),x=s[s.length-1],k=s[0],y=()=>{t.style.setProperty("pointer-events","auto"),o.style.setProperty("pointer-events","auto"),t.classList.remove("ion-disable-focus-trap")},D=()=>{t.style.setProperty("pointer-events","none"),o.style.setProperty("pointer-events","none"),t.classList.add("ion-disable-focus-trap")};u&&w&&(u.keyframes([...p.WRAPPER_KEYFRAMES]),w.keyframes([...p.BACKDROP_KEYFRAMES]),e.progressStart(!0,1-m),m>r?y():D()),l&&m!==x&&(l.scrollY=!1);const A=o=>{const{breakpoint:a,canDismiss:i,breakpointOffset:n}=o,c=i&&0===a,f=c?m:a,b=0!==f;m=0,u&&w&&(u.keyframes([{offset:0,transform:`translateY(${100*n}%)`},{offset:1,transform:`translateY(${100*(1-f)}%)`}]),w.keyframes([{offset:0,opacity:`calc(var(--backdrop-opacity) * ${P(1-n,r)})`},{offset:1,opacity:`calc(var(--backdrop-opacity) * ${P(f,r)})`}]),e.progressStep(0)),Y.enable(!1),e.onFinish((()=>{b&&(u&&w?g((()=>{u.keyframes([...p.WRAPPER_KEYFRAMES]),w.keyframes([...p.BACKDROP_KEYFRAMES]),e.progressStart(!0,1-f),m=f,h(m),l&&m===s[s.length-1]&&(l.scrollY=!0),m>r?y():D(),Y.enable(!0)})):Y.enable(!0))}),{oneTimeCallback:!0}).progressEnd(1,0,500),c?L(t,e):b||d()},Y=T({el:a,gestureName:"modalSheet",gesturePriority:40,direction:"y",threshold:10,canStart:t=>{const o=t.event.target.closest("ion-content");return m=n(),1!==m||!o},onStart:()=>{b=void 0!==t.canDismiss&&!0!==t.canDismiss&&0===k,l&&(l.scrollY=!1),g((()=>{t.focus()})),e.progressStart(!0,1-m)},onMove:t=>{const o=s.length>1?1-s[1]:void 0,a=1-m+t.deltaY/c,i=void 0!==o&&a>=o&&b,r=i?.95:.9999,n=i&&void 0!==o?o+R((a-o)/(r-o)):a;f=v(1e-4,n,r),e.progressStep(f)},onEnd:t=>{const o=m-(t.deltaY+100*t.velocityY)/c,a=s.reduce(((t,a)=>Math.abs(a-o)<Math.abs(t-o)?a:t));A({breakpoint:a,breakpointOffset:f,canDismiss:b})}});return{gesture:Y,moveSheetToBreakpoint:A}})(this.el,this.backdropEl,t,o,a,r,this.sortedBreakpoints,(()=>{var t;return null!==(t=this.currentBreakpoint)&&void 0!==t?t:0}),(()=>this.sheetOnDismiss()),(t=>{this.currentBreakpoint!==t&&(this.currentBreakpoint=t,this.ionBreakpointDidChange.emit({breakpoint:t}))}));this.gesture=e,this.moveSheetToBreakpoint=s,this.gesture.enable(!0)}sheetOnDismiss(){this.gestureAnimationDismissing=!0,this.animation.onFinish((async()=>{this.currentBreakpoint=0,this.ionBreakpointDidChange.emit({breakpoint:this.currentBreakpoint}),await this.dismiss(void 0,"gesture"),this.gestureAnimationDismissing=!1}))}async dismiss(t,o){if(this.gestureAnimationDismissing&&"gesture"!==o)return!1;if("handler"!==o&&!await this.checkCanDismiss())return!1;(this.swipeToClose||void 0!==this.canDismiss&&void 0!==this.presentingElement)&&"ios"===s(this)&&z(),"undefined"!=typeof window&&this.keyboardOpenCallback&&window.removeEventListener(x,this.keyboardOpenCallback),void 0!==this.currentTransition&&await this.currentTransition;const i=Y.get(this)||[];this.currentTransition=B(this,t,o,"modalLeave",F,G,{presentingEl:this.presentingElement,currentBreakpoint:this.currentBreakpoint||this.initialBreakpoint,backdropBreakpoint:this.backdropBreakpoint});const r=await this.currentTransition;if(r){const{delegate:t}=this.getDelegate();await u(t,this.usersElement),a((()=>this.el.classList.remove("show-modal"))),this.animation&&this.animation.destroy(),this.gesture&&this.gesture.destroy(),i.forEach((t=>t.destroy()))}return this.currentBreakpoint=void 0,this.currentTransition=void 0,this.animation=void 0,r}onDidDismiss(){return C(this.el,"ionModalDidDismiss")}onWillDismiss(){return C(this.el,"ionModalWillDismiss")}async setCurrentBreakpoint(t){if(!this.isSheetModal)return void k("setCurrentBreakpoint is only supported on sheet modals.");if(!this.breakpoints.includes(t))return void k(`Attempted to set invalid breakpoint value ${t}. Please double check that the breakpoint value is part of your defined breakpoints.`);const{currentBreakpoint:o,moveSheetToBreakpoint:a,canDismiss:i,breakpoints:r}=this;o!==t&&a&&a({breakpoint:t,breakpointOffset:1-o,canDismiss:void 0!==i&&!0!==i&&0===r[0]})}async getCurrentBreakpoint(){return this.currentBreakpoint}render(){const{handle:t,isSheetModal:o,presentingElement:a,htmlAttributes:e}=this,n=!1!==t&&o,d=s(this),{modalId:h}=this,p=void 0!==a&&"ios"===d;return i(r,Object.assign({"no-router":!0,"aria-modal":"true",tabindex:"-1"},e,{style:{zIndex:`${2e4+this.overlayIndex}`},class:Object.assign({[d]:!0,"modal-default":!p&&!o,"modal-card":p,"modal-sheet":o,"overlay-hidden":!0},M(this.cssClass)),id:h,onIonBackdropTap:this.onBackdropTap,onIonModalDidPresent:this.onLifecycle,onIonModalWillPresent:this.onLifecycle,onIonModalWillDismiss:this.onLifecycle,onIonModalDidDismiss:this.onLifecycle}),i("ion-backdrop",{ref:t=>this.backdropEl=t,visible:this.showBackdrop,tappable:this.backdropDismiss,part:"backdrop"}),"ios"===d&&i("div",{class:"modal-shadow"}),i("div",{role:"dialog",class:"modal-wrapper ion-overlay-wrapper",part:"content",ref:t=>this.wrapperEl=t},n&&i("div",{class:"modal-handle",part:"handle"}),i("slot",null)))}get el(){return e(this)}static get watchers(){return{isOpen:["onIsOpenChange"],trigger:["onTriggerChange"],swipeToClose:["swipeToCloseChanged"]}}},U={ionModalDidPresent:"ionViewDidEnter",ionModalWillPresent:"ionViewWillEnter",ionModalWillDismiss:"ionViewWillLeave",ionModalDidDismiss:"ionViewDidLeave"};let q=0;H.style={ios:":host{--width:100%;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--overflow:hidden;--border-radius:0;--border-width:0;--border-style:none;--border-color:transparent;--background:var(--ion-background-color, #fff);--box-shadow:none;--backdrop-opacity:0;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;contain:strict}.modal-wrapper,ion-backdrop{pointer-events:auto}:host(.overlay-hidden){display:none}.modal-wrapper,.modal-shadow{border-radius:var(--border-radius);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:var(--overflow);z-index:10}.modal-shadow{position:absolute;background:transparent}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--width:600px;--height:500px;--ion-safe-area-top:0px;--ion-safe-area-bottom:0px;--ion-safe-area-right:0px;--ion-safe-area-left:0px}}@media only screen and (min-width: 768px) and (min-height: 768px){:host{--width:600px;--height:600px}}.modal-handle{left:0px;right:0px;top:5px;border-radius:8px;margin-left:auto;margin-right:auto;position:absolute;width:36px;height:5px;-webkit-transform:translateZ(0);transform:translateZ(0);background:var(--ion-color-step-350, #c0c0be);z-index:11}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.modal-handle{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}:host(.modal-sheet){--height:calc(100% - (var(--ion-safe-area-top) + 10px))}:host(.modal-sheet) .modal-wrapper,:host(.modal-sheet) .modal-shadow{position:absolute;bottom:0}:host{--backdrop-opacity:var(--ion-backdrop-opacity, 0.4)}:host(.modal-card),:host(.modal-sheet){--border-radius:10px}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--border-radius:10px}}.modal-wrapper{-webkit-transform:translate3d(0,  100%,  0);transform:translate3d(0,  100%,  0)}@media screen and (max-width: 767px){@supports (width: 1px){:host(.modal-card){--height:calc(100% - max(30px, var(--ion-safe-area-top)) - 10px)}}@supports not (width: 1px){:host(.modal-card){--height:calc(100% - 40px)}}:host(.modal-card) .modal-wrapper{border-top-left-radius:var(--border-radius);border-top-right-radius:var(--border-radius);border-bottom-right-radius:0;border-bottom-left-radius:0}:host-context([dir=rtl]):host(.modal-card) .modal-wrapper,:host-context([dir=rtl]).modal-card .modal-wrapper{border-top-left-radius:var(--border-radius);border-top-right-radius:var(--border-radius);border-bottom-right-radius:0;border-bottom-left-radius:0}:host(.modal-card){--backdrop-opacity:0;--width:100%;-ms-flex-align:end;align-items:flex-end}:host(.modal-card) .modal-shadow{display:none}:host(.modal-card) ion-backdrop{pointer-events:none}}@media screen and (min-width: 768px){:host(.modal-card){--width:calc(100% - 120px);--height:calc(100% - (120px + var(--ion-safe-area-top) + var(--ion-safe-area-bottom)));--max-width:720px;--max-height:1000px;--backdrop-opacity:0;--box-shadow:0px 0px 30px 10px rgba(0, 0, 0, 0.1);-webkit-transition:all 0.5s ease-in-out;transition:all 0.5s ease-in-out}:host(.modal-card) .modal-wrapper{-webkit-box-shadow:none;box-shadow:none}:host(.modal-card) .modal-shadow{-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow)}}:host(.modal-sheet) .modal-wrapper{border-top-left-radius:var(--border-radius);border-top-right-radius:var(--border-radius);border-bottom-right-radius:0;border-bottom-left-radius:0}:host-context([dir=rtl]):host(.modal-sheet) .modal-wrapper,:host-context([dir=rtl]).modal-sheet .modal-wrapper{border-top-left-radius:var(--border-radius);border-top-right-radius:var(--border-radius);border-bottom-right-radius:0;border-bottom-left-radius:0}",md:":host{--width:100%;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--overflow:hidden;--border-radius:0;--border-width:0;--border-style:none;--border-color:transparent;--background:var(--ion-background-color, #fff);--box-shadow:none;--backdrop-opacity:0;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;contain:strict}.modal-wrapper,ion-backdrop{pointer-events:auto}:host(.overlay-hidden){display:none}.modal-wrapper,.modal-shadow{border-radius:var(--border-radius);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:var(--overflow);z-index:10}.modal-shadow{position:absolute;background:transparent}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--width:600px;--height:500px;--ion-safe-area-top:0px;--ion-safe-area-bottom:0px;--ion-safe-area-right:0px;--ion-safe-area-left:0px}}@media only screen and (min-width: 768px) and (min-height: 768px){:host{--width:600px;--height:600px}}.modal-handle{left:0px;right:0px;top:5px;border-radius:8px;margin-left:auto;margin-right:auto;position:absolute;width:36px;height:5px;-webkit-transform:translateZ(0);transform:translateZ(0);background:var(--ion-color-step-350, #c0c0be);z-index:11}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.modal-handle{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}:host(.modal-sheet){--height:calc(100% - (var(--ion-safe-area-top) + 10px))}:host(.modal-sheet) .modal-wrapper,:host(.modal-sheet) .modal-shadow{position:absolute;bottom:0}:host{--backdrop-opacity:var(--ion-backdrop-opacity, 0.32)}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--border-radius:2px;--box-shadow:0 28px 48px rgba(0, 0, 0, 0.4)}}.modal-wrapper{-webkit-transform:translate3d(0,  40px,  0);transform:translate3d(0,  40px,  0);opacity:0.01}"};export{H as ion_modal}
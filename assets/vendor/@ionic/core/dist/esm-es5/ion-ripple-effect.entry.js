import{__awaiter,__generator}from"tslib";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */import{r as registerInstance,f as readTask,c as writeTask,h,i as getElement,H as Host}from"./index-88bdeaae.js";import{b as getIonMode}from"./ionic-global-00475c3a.js";var rippleEffectCss=":host{left:0;right:0;top:0;bottom:0;position:absolute;contain:strict;pointer-events:none}:host(.unbounded){contain:layout size style}.ripple-effect{border-radius:50%;position:absolute;background-color:currentColor;color:inherit;contain:strict;opacity:0;-webkit-animation:225ms rippleAnimation forwards, 75ms fadeInAnimation forwards;animation:225ms rippleAnimation forwards, 75ms fadeInAnimation forwards;will-change:transform, opacity;pointer-events:none}.fade-out{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale, 1));transform:translate(var(--translate-end)) scale(var(--final-scale, 1));-webkit-animation:150ms fadeOutAnimation forwards;animation:150ms fadeOutAnimation forwards}@-webkit-keyframes rippleAnimation{from{-webkit-animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale, 1));transform:translate(var(--translate-end)) scale(var(--final-scale, 1))}}@keyframes rippleAnimation{from{-webkit-animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale, 1));transform:translate(var(--translate-end)) scale(var(--final-scale, 1))}}@-webkit-keyframes fadeInAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:0.16}}@keyframes fadeInAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:0.16}}@-webkit-keyframes fadeOutAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0.16}to{opacity:0}}@keyframes fadeOutAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0.16}to{opacity:0}}";var RippleEffect=function(){function t(t){registerInstance(this,t);this.type="bounded"}t.prototype.addRipple=function(t,e){return __awaiter(this,void 0,void 0,(function(){var n=this;return __generator(this,(function(a){return[2,new Promise((function(a){readTask((function(){var i=n.el.getBoundingClientRect();var r=i.width;var o=i.height;var s=Math.sqrt(r*r+o*o);var f=Math.max(o,r);var c=n.unbounded?f:s+PADDING;var l=Math.floor(f*INITIAL_ORIGIN_SCALE);var m=c/l;var u=t-i.left;var p=e-i.top;if(n.unbounded){u=r*.5;p=o*.5}var d=u-l*.5;var b=p-l*.5;var v=r*.5-u;var g=o*.5-p;writeTask((function(){var t=document.createElement("div");t.classList.add("ripple-effect");var e=t.style;e.top=b+"px";e.left=d+"px";e.width=e.height=l+"px";e.setProperty("--final-scale","".concat(m));e.setProperty("--translate-end","".concat(v,"px, ").concat(g,"px"));var i=n.el.shadowRoot||n.el;i.appendChild(t);setTimeout((function(){a((function(){removeRipple(t)}))}),225+100)}))}))}))]}))}))};Object.defineProperty(t.prototype,"unbounded",{get:function(){return this.type==="unbounded"},enumerable:false,configurable:true});t.prototype.render=function(){var t;var e=getIonMode(this);return h(Host,{role:"presentation",class:(t={},t[e]=true,t.unbounded=this.unbounded,t)})};Object.defineProperty(t.prototype,"el",{get:function(){return getElement(this)},enumerable:false,configurable:true});return t}();var removeRipple=function(t){t.classList.add("fade-out");setTimeout((function(){t.remove()}),200)};var PADDING=10;var INITIAL_ORIGIN_SCALE=.5;RippleEffect.style=rippleEffectCss;export{RippleEffect as ion_ripple_effect};
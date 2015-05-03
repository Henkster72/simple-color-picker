(function t(e,r,n){function i(a,s){if(!r[a]){if(!e[a]){var u=typeof require=="function"&&require;if(!s&&u)return u(a,!0);if(o)return o(a,!0);var f=new Error("Cannot find module '"+a+"'");throw f.code="MODULE_NOT_FOUND",f}var l=r[a]={exports:{}};e[a][0].call(l.exports,function(t){var r=e[a][1][t];return i(r?r:t)},l,l.exports,t,e,r,n)}return r[a].exports}var o=typeof require=="function"&&require;for(var a=0;a<n.length;a++)i(n[a]);return i})({1:[function(t,e,r){var n=t("domready");var i=t("../index.js");n(function(){var t=new i({el:document.body,color:"#123456",background:"#656565"});t.onChange(function(e){document.body.style.background=e;document.querySelector("h1 a").style.color=t.color.isDark()?"#FFFFFF":"#000000"})})},{"../index.js":2,domready:9}],2:[function(t,e,r){"use strict";var n=t("lodash.bindall");var i=t("dom-transform");var o=t("tinycolor2");var a=t("component-emitter");var s=t("is-number");var u=t("./src/utils/dom/offset");var f=t("./src/utils/maths/clamp");function l(t){t=t||{};this.color=null;this.width=0;this.height=0;this.hue=0;this.choosing=false;this.position={x:0,y:0};this.huePosition=0;this.saturationWidth=0;this.maxHue=0;n(this,"_onSaturationMouseMove","_onSaturationMouseDown","_onSaturationMouseUp","_onHueMouseDown","_onHueMouseUp","_onHueMouseMove");this.$el=document.createElement("div");this.$el.className="Scp";this.$el.innerHTML=['<div class="Scp-saturation">','<div class="Scp-brightness"></div>','<div class="Scp-sbSelector"></div>',"</div>",'<div class="Scp-hue">','<div class="Scp-hSelector"></div>',"</div>"].join("\n");this.$saturation=this.$el.querySelector(".Scp-saturation");this.$hue=this.$el.querySelector(".Scp-hue");this.$sbSelector=this.$el.querySelector(".Scp-sbSelector");this.$hSelector=this.$el.querySelector(".Scp-hSelector");this.$saturation.addEventListener("mousedown",this._onSaturationMouseDown);this.$hue.addEventListener("mousedown",this._onHueMouseDown);if(t.el){this.appendTo(t.el)}if(t.background){this.setBackgroundColor(t.background)}this.setSize(t.width||175,t.height||150);this.setColor(t.color);return this}a(l.prototype);l.prototype.setSize=function(t,e){this.width=t;this.height=e;this.$el.style.width=this.width+"px";this.$el.style.height=this.height+"px";this.saturationWidth=this.width-25;this.maxHue=this.height-2;return this};l.prototype.setBackgroundColor=function(t){if(s(t)){t=t.toString(16)}this.$el.style.padding="5px";this.$el.style.background=o(t).toHexString()};l.prototype.setNoBackground=function(){this.$el.style.padding="0px";this.$el.style.background="none"};l.prototype.setColor=function(t){if(s(t)){t=t.toString(16)}this.color=o(t);var e=this.color.toHsv();if(!isNaN(e.h)){this.hue=e.h}this._moveSelectorTo(this.saturationWidth*e.s,(1-e.v)*this.height);this._moveHueTo((1-this.hue/360)*this.height);this._updateHue();return this};l.prototype.remove=function(){this.$saturation.removeEventListener("mousedown",this._onSaturationMouseDown);this.$hue.removeEventListener("mousedown",this._onHueMouseDown);this._onSaturationMouseUp();this._onHueMouseUp();this.off();if(this.$el.parentNode){this.$el.parentNode.removeChild(this.$el)}};l.prototype.appendTo=function(t){t.appendChild(this.$el);return this};l.prototype.onChange=function(t){this.on("update",t);this.emit("update",this.getHexString());return this};l.prototype.close=function(){this._onSaturationMouseUp();this._onHueMouseUp();return this};l.prototype.getHexString=function(){return this.color.toHexString().toUpperCase()};l.prototype.getHexNumber=function(){return parseInt(this.color.toHex(),16)};l.prototype.getRGB=function(){return this.color.toRgb()};l.prototype.getHSV=function(){return this.color.toHsv()};l.prototype.isDark=function(){return this.color.isDark()};l.prototype.isLight=function(){return this.color.isLight()};l.prototype._moveSelectorTo=function(t,e){this.position.x=f(t,0,this.saturationWidth);this.position.y=f(e,0,this.height);i(this.$sbSelector,{x:this.position.x,y:this.position.y})};l.prototype._updateColorFromPosition=function(){this.color=o({h:this.hue,s:this.position.x/this.saturationWidth,v:1-this.position.y/this.height});this._updateColor()};l.prototype._moveHueTo=function(t){this.huePosition=f(t,0,this.maxHue);i(this.$hSelector,{y:this.huePosition})};l.prototype._updateHueFromPosition=function(){var t=this.color.toHsv();this.hue=360*(1-this.huePosition/this.maxHue);this.color=o({h:this.hue,s:t.s,v:t.v});this._updateHue()};l.prototype._updateHue=function(){var t=o({h:this.hue,s:1,v:1});this.$saturation.style.background="linear-gradient(to right, #fff 0%, "+t.toHexString()+" 100%)";this._updateColor()};l.prototype._updateColor=function(){this.$sbSelector.style.background=this.color.toHexString();this.$sbSelector.style.borderColor=this.color.isDark()?"#FFF":"#000";this.emit("update",this.color.toHexString())};l.prototype._onSaturationMouseDown=function(t){this.choosing=true;var e=u(this.$saturation);this._moveSelectorTo(t.clientX-e.left,t.clientY-e.top);this._updateColorFromPosition();window.addEventListener("mouseup",this._onSaturationMouseUp);window.addEventListener("mousemove",this._onSaturationMouseMove);t.preventDefault()};l.prototype._onSaturationMouseMove=function(t){var e=u(this.$saturation);this._moveSelectorTo(t.clientX-e.left,t.clientY-e.top);this._updateColorFromPosition()};l.prototype._onSaturationMouseUp=function(t){this.choosing=false;window.removeEventListener("mouseup",this._onSaturationMouseUp);window.removeEventListener("mousemove",this._onSaturationMouseMove)};l.prototype._onHueMouseDown=function(t){this.choosing=true;var e=u(this.$hue);this._moveHueTo(t.clientY-e.top);this._updateHueFromPosition();window.addEventListener("mouseup",this._onHueMouseUp);window.addEventListener("mousemove",this._onHueMouseMove);t.preventDefault()};l.prototype._onHueMouseMove=function(t){var e=u(this.$hue);this._moveHueTo(t.clientY-e.top);this._updateHueFromPosition()};l.prototype._onHueMouseUp=function(t){this.choosing=false;window.removeEventListener("mouseup",this._onHueMouseUp);window.removeEventListener("mousemove",this._onHueMouseMove)};e.exports=l},{"./src/utils/dom/offset":27,"./src/utils/maths/clamp":28,"component-emitter":3,"dom-transform":4,"is-number":10,"lodash.bindall":11,tinycolor2:26}],3:[function(t,e,r){e.exports=n;function n(t){if(t)return i(t)}function i(t){for(var e in n.prototype){t[e]=n.prototype[e]}return t}n.prototype.on=n.prototype.addEventListener=function(t,e){this._callbacks=this._callbacks||{};(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e);return this};n.prototype.once=function(t,e){function r(){this.off(t,r);e.apply(this,arguments)}r.fn=e;this.on(t,r);return this};n.prototype.off=n.prototype.removeListener=n.prototype.removeAllListeners=n.prototype.removeEventListener=function(t,e){this._callbacks=this._callbacks||{};if(0==arguments.length){this._callbacks={};return this}var r=this._callbacks["$"+t];if(!r)return this;if(1==arguments.length){delete this._callbacks["$"+t];return this}var n;for(var i=0;i<r.length;i++){n=r[i];if(n===e||n.fn===e){r.splice(i,1);break}}return this};n.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),r=this._callbacks["$"+t];if(r){r=r.slice(0);for(var n=0,i=r.length;n<i;++n){r[n].apply(this,e)}}return this};n.prototype.listeners=function(t){this._callbacks=this._callbacks||{};return this._callbacks["$"+t]||[]};n.prototype.hasListeners=function(t){return!!this.listeners(t).length}},{}],4:[function(t,e,r){"use strict";var n=t("trim");var i=t("prefix");var o=i("transform");var a=i("transformOrigin");var s=t("./lib/properties");var u=Object.prototype.hasOwnProperty;var f={x:"translateX",y:"translateY",z:"translateZ"};r=e.exports=l;function l(t,e){var r=[];var n;var i;var l;for(n in e){l=e[n];i=u.call(f,n)?i=f[n]:i=n;if(u.call(s,i)){r.push(s[i](g(l)));continue}if(i==="origin"){t.style[a]=l;continue}console.warn(i,"is not a valid property")}t.style[o]=r.join(" ")}r.get=h;function h(t){return d(t)}r.none=c;function c(t){t.style[o]="";t.style[a]=""}r.isSupported=p;function p(){return o.length>0}function d(t){return t.style[o]}function g(t){if(typeof t==="number"){t+=""}else{t=n(t)}return t}},{"./lib/properties":6,prefix:7,trim:8}],5:[function(t,e,r){"use strict";r=e.exports=n;function n(){var t=arguments;return function(){var e=arguments;for(var r=t.length-1;r>=0;r--){e=[t[r].apply(this,e)]}return e[0]}}},{}],6:[function(t,e,r){"use strict";var n=t("trim");var i=t("./compose");var o=/^-?\d+(\.\d+)?$/;e.exports={translate:i(function(t){return"translate("+t+")"},s("px"),a),translate3d:i(function(t){return"translate3d("+t+")"},s("px"),a),translateX:i(function(t){return"translateX("+t+")"},s("px")),translateY:i(function(t){return"translateY("+t+")"},s("px")),translateZ:i(function(t){return"translateZ("+t+")"},s("px")),scale:i(function(t){return"scale("+t+")"},a),scale3d:i(function(t){return"scale3d("+t+")"},a),scaleX:function(t){return"scaleX("+t+")"},scaleY:function(t){return"scaleY("+t+")"},scaleZ:function(t){return"scaleZ("+t+")"},rotate:i(function(t){return"rotate("+t+")"},s("deg"),a),rotate3d:i(function(t){return"rotate3d("+t+")"},a),rotateX:i(function(t){return"rotateX("+t+")"},s("deg")),rotateY:i(function(t){return"rotateY("+t+")"},s("deg")),rotateZ:i(function(t){return"rotateZ("+t+")"},s("deg")),skew:i(function(t){return"skew("+t+")"},s("deg"),a),skewX:i(function(t){return"skewX("+t+")"},s("deg")),skewY:i(function(t){return"skewY("+t+")"},s("deg")),matrix:i(function(t){return"matrix("+t+")"},a),matrix3d:i(function(t){return"matrix3d("+t+")"},a),perspective:i(function(t){return"perspective("+t+")"},s("px"))};function a(t){if(!/,/.test(t)){t=t.split(" ").join(",")}return t}function s(t){return function(e){return e.split(",").map(function(e){e=n(e);if(o.test(e)){e+=t}return e}).join(",")}}},{"./compose":5,trim:8}],7:[function(t,e,r){var n=document.createElement("p").style;var i="O ms Moz webkit".split(" ");var o=/([A-Z])/g;var a={};e.exports=r=function(t){return t in a?a[t]:a[t]=s(t)};r.prefix=s;r.dash=f;function s(t){t=t.replace(/-([a-z])/g,function(t,e){return e.toUpperCase()});if(n[t]!==undefined)return t;var e=u(t);var r=i.length;while(r--){var o=i[r]+e;if(n[o]!==undefined)return o}throw new Error("unable to prefix "+t)}function u(t){return t.charAt(0).toUpperCase()+t.slice(1)}function f(t){t=s(t);if(o.test(t))t="-"+t.replace(o,"-$1");return t.toLowerCase()}},{}],8:[function(t,e,r){r=e.exports=n;function n(t){return t.replace(/^\s*|\s*$/g,"")}r.left=function(t){return t.replace(/^\s*/,"")};r.right=function(t){return t.replace(/\s*$/,"")}},{}],9:[function(t,e,r){!function(t,r){if(typeof e!="undefined")e.exports=r();else if(typeof define=="function"&&typeof define.amd=="object")define(r);else this[t]=r()}("domready",function(){var t=[],e,r=document,n=r.documentElement.doScroll,i="DOMContentLoaded",o=(n?/^loaded|^c/:/^loaded|^i|^c/).test(r.readyState);if(!o)r.addEventListener(i,e=function(){r.removeEventListener(i,e);o=1;while(e=t.shift())e()});return function(e){o?setTimeout(e,0):t.push(e)}})},{}],10:[function(t,e,r){"use strict";e.exports=function n(t){return!!+t&&!Array.isArray(t)&&isFinite(t)||t==="0"||t===0}},{}],11:[function(t,e,r){var n=t("lodash._baseflatten"),i=t("lodash._createwrapper"),o=t("lodash.functions"),a=t("lodash.restparam");var s=1;var u=a(function(t,e){e=e.length?n(e):o(t);var r=-1,a=e.length;while(++r<a){var u=e[r];t[u]=i(t[u],s,t)}return t});e.exports=u},{"lodash._baseflatten":12,"lodash._createwrapper":15,"lodash.functions":19,"lodash.restparam":25}],12:[function(t,e,r){var n=t("lodash.isarguments"),i=t("lodash.isarray");function o(t){return!!t&&typeof t=="object"}var a=Math.pow(2,53)-1;function s(t,e,r){var a=-1,f=t.length,l=-1,h=[];while(++a<f){var c=t[a];if(o(c)&&u(c.length)&&(i(c)||n(c))){if(e){c=s(c,e,r)}var p=-1,d=c.length;h.length+=d;while(++p<d){h[++l]=c[p]}}else if(!r){h[++l]=c}}return h}function u(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=a}e.exports=s},{"lodash.isarguments":13,"lodash.isarray":14}],13:[function(t,e,r){var n="[object Arguments]";function i(t){return!!t&&typeof t=="object"}var o=Object.prototype;var a=o.toString;var s=Math.pow(2,53)-1;function u(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=s}function f(t){var e=i(t)?t.length:undefined;return u(e)&&a.call(t)==n}e.exports=f},{}],14:[function(t,e,r){var n="[object Array]",i="[object Function]";var o=/[.*+?^${}()|[\]\/\\]/g,a=RegExp(o.source);var s=/^\[object .+?Constructor\]$/;function u(t){if(typeof t=="string"){return t}return t==null?"":t+""}function f(t){return!!t&&typeof t=="object"}var l=Object.prototype;var h=Function.prototype.toString;var c=l.toString;var p=RegExp("^"+y(c).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");var d=m(d=Array.isArray)&&d;var g=Math.pow(2,53)-1;function v(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=g}var b=d||function(t){return f(t)&&v(t.length)&&c.call(t)==n};function m(t){if(t==null){return false}if(c.call(t)==i){return p.test(h.call(t))}return f(t)&&s.test(t)}function y(t){t=u(t);return t&&a.test(t)?t.replace(o,"\\$&"):t}e.exports=b},{}],15:[function(t,e,r){(function(r){var n=t("lodash._arraycopy"),i=t("lodash._basecreate"),o=t("lodash._replaceholders");var a=1,s=2,u=4,f=8,l=16,h=32,c=64,p=128;var d="Expected a function";var g=Math.max,v=Math.min;var b=Math.pow(2,53)-1;function m(t,e,r){var n=r.length,i=-1,o=g(t.length-n,0),a=-1,s=e.length,u=Array(o+s);while(++a<s){u[a]=e[a]}while(++i<n){u[r[i]]=t[i]}while(o--){u[a++]=t[i++]}return u}function y(t,e,r){var n=-1,i=r.length,o=-1,a=g(t.length-i,0),s=-1,u=e.length,f=Array(a+u);while(++o<a){f[o]=t[o]}var l=o;while(++s<u){f[l+s]=e[s]}while(++n<i){f[l+r[n]]=t[o++]}return f}function _(t,e){var n=w(t);function i(){var o=this&&this!==r&&this instanceof i?n:t;return o.apply(e,arguments)}return i}function w(t){return function(){var e=i(t.prototype),r=t.apply(e,arguments);return M(r)?r:e}}function x(t,e,i,d,v,b,_,k,S,A){var M=e&p,$=e&a,E=e&s,F=e&f,C=e&u,L=e&l;var j=!E&&w(t),R=t;function O(){var u=arguments.length,f=u,l=Array(u);while(f--){l[f]=arguments[f]}if(d){l=m(l,d,v)}if(b){l=y(l,b,_)}if(F||L){var p=O.placeholder,P=o(l,p);u-=P.length;if(u<A){var T=k?n(k):null,D=g(A-u,0),q=F?P:null,U=F?null:P,N=F?l:null,Y=F?null:l;e|=F?h:c;e&=~(F?c:h);if(!C){e&=~(a|s)}var z=x(t,e,i,N,q,Y,U,T,S,D);z.placeholder=p;return z}}var X=$?i:this;if(E){t=X[R]}if(k){l=H(l,k)}if(M&&S<l.length){l.length=S}var I=this&&this!==r&&this instanceof O?j||w(t):t;return I.apply(X,l)}return O}function k(t,e,n,i){var o=e&a,s=w(t);function u(){var e=-1,a=arguments.length,f=-1,l=i.length,h=Array(a+l);while(++f<l){h[f]=i[f]}while(a--){h[f++]=arguments[++e]}var c=this&&this!==r&&this instanceof u?s:t;return c.apply(o?n:this,h)}return u}function S(t,e,r,n,i,o,u,f){var l=e&s;if(!l&&typeof t!="function"){throw new TypeError(d)}var p=n?n.length:0;if(!p){e&=~(h|c);n=i=null}p-=i?i.length:0;if(e&c){var v=n,b=i;n=i=null}var m=[t,e,r,n,i,v,b,o,u,f];m[9]=f==null?l?0:t.length:g(f-p,0)||0;if(e==a){var y=_(m[0],m[2])}else if((e==h||e==(a|h))&&!m[4].length){y=k.apply(undefined,m)}else{y=x.apply(undefined,m)}return y}function A(t,e){t=+t;e=e==null?b:e;return t>-1&&t%1==0&&t<e}function H(t,e){var r=t.length,i=v(e.length,r),o=n(t);while(i--){var a=e[i];t[i]=A(a,r)?o[a]:undefined}return t}function M(t){var e=typeof t;return e=="function"||!!t&&e=="object"}e.exports=S}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"lodash._arraycopy":16,"lodash._basecreate":17,"lodash._replaceholders":18}],16:[function(t,e,r){function n(t,e){var r=-1,n=t.length;e||(e=Array(n));while(++r<n){e[r]=t[r]}return e}e.exports=n},{}],17:[function(t,e,r){(function(t){var r=function(){function e(){}return function(r){if(n(r)){e.prototype=r;var i=new e;e.prototype=null}return i||t.Object()}}();function n(t){var e=typeof t;return e=="function"||!!t&&e=="object"}e.exports=r}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}],18:[function(t,e,r){var n="__lodash_placeholder__";function i(t,e){var r=-1,i=t.length,o=-1,a=[];while(++r<i){if(t[r]===e){t[r]=n;a[++o]=r}}return a}e.exports=i},{}],19:[function(t,e,r){var n=t("lodash._basefunctions"),i=t("lodash.keysin");function o(t){return n(t,i(t))}e.exports=o},{"lodash._basefunctions":20,"lodash.keysin":22}],20:[function(t,e,r){var n=t("lodash.isfunction");function i(t,e){var r=-1,i=e.length,o=-1,a=[];while(++r<i){var s=e[r];if(n(t[s])){a[++o]=s}}return a}e.exports=i},{"lodash.isfunction":21}],21:[function(t,e,r){(function(t){var r="[object Function]";var n=/[.*+?^${}()|[\]\/\\]/g,i=RegExp(n.source);var o=/^\[object .+?Constructor\]$/;function a(t){return typeof t=="function"||false}function s(t){if(typeof t=="string"){return t}return t==null?"":t+""}function u(t){return!!t&&typeof t=="object"}var f=Object.prototype;var l=Function.prototype.toString;var h=f.toString;var c=RegExp("^"+v(h).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");var p=g(p=t.Uint8Array)&&p;var d=!(a(/x/)||p&&!a(p))?a:function(t){return h.call(t)==r};function g(t){if(t==null){return false}if(h.call(t)==r){return c.test(l.call(t))}return u(t)&&o.test(t)}function v(t){t=s(t);return t&&i.test(t)?t.replace(n,"\\$&"):t}e.exports=d}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}],22:[function(t,e,r){var n=t("lodash.isarguments"),i=t("lodash.isarray");var o=Object.prototype;var a=o.hasOwnProperty;var s=o.propertyIsEnumerable;var u=Math.pow(2,53)-1;var f={};(function(t){var e=function(){this.x=t},r={0:t,length:t},n=[];e.prototype={valueOf:t,y:t};for(var i in new e){n.push(i)}try{f.nonEnumArgs=!s.call(arguments,1)}catch(o){f.nonEnumArgs=true}})(1,0);function l(t,e){t=+t;e=e==null?u:e;return t>-1&&t%1==0&&t<e}function h(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=u}function c(t){var e=typeof t;return e=="function"||!!t&&e=="object"}function p(t){if(t==null){return[]}if(!c(t)){t=Object(t)}var e=t.length;e=e&&h(e)&&(i(t)||f.nonEnumArgs&&n(t))&&e||0;var r=t.constructor,o=-1,s=typeof r=="function"&&r.prototype===t,u=Array(e),p=e>0;while(++o<e){u[o]=o+""}for(var d in t){if(!(p&&l(d,e))&&!(d=="constructor"&&(s||!a.call(t,d)))){u.push(d)}}return u}e.exports=p},{"lodash.isarguments":23,"lodash.isarray":24}],23:[function(t,e,r){arguments[4][13][0].apply(r,arguments)},{dup:13}],24:[function(t,e,r){arguments[4][14][0].apply(r,arguments)},{dup:14}],25:[function(t,e,r){var n="Expected a function";var i=Math.max;function o(t,e){if(typeof t!="function"){throw new TypeError(n)}e=i(e===undefined?t.length-1:+e||0,0);return function(){var r=arguments,n=-1,o=i(r.length-e,0),a=Array(o);while(++n<o){a[n]=r[e+n]}switch(e){case 0:return t.call(this,a);case 1:return t.call(this,r[0],a);case 2:return t.call(this,r[0],r[1],a)}var s=Array(e+1);n=-1;while(++n<e){s[n]=r[n]}s[e]=a;return t.apply(this,s)}}e.exports=o},{}],26:[function(t,e,r){(function(){var t=/^[\s,#]+/,r=/\s+$/,n=0,i=Math,o=i.round,a=i.min,s=i.max,u=i.random;function f(t,e){t=t?t:"";e=e||{};if(t instanceof f){return t}if(!(this instanceof f)){return new f(t,e)}var r=l(t);this._originalInput=t,this._r=r.r,this._g=r.g,this._b=r.b,this._a=r.a,this._roundA=o(100*this._a)/100,this._format=e.format||r.format;this._gradientType=e.gradientType;if(this._r<1){this._r=o(this._r)}if(this._g<1){this._g=o(this._g)}if(this._b<1){this._b=o(this._b)}this._ok=r.ok;this._tc_id=n++}f.prototype={isDark:function(){return this.getBrightness()<128},isLight:function(){return!this.isDark()},isValid:function(){return this._ok},getOriginalInput:function(){return this._originalInput},getFormat:function(){return this._format},getAlpha:function(){return this._a},getBrightness:function(){var t=this.toRgb();return(t.r*299+t.g*587+t.b*114)/1e3},getLuminance:function(){var t=this.toRgb();var e,r,n,i,o,a;e=t.r/255;r=t.g/255;n=t.b/255;if(e<=.03928){i=e/12.92}else{i=Math.pow((e+.055)/1.055,2.4)}if(r<=.03928){o=r/12.92}else{o=Math.pow((r+.055)/1.055,2.4)}if(n<=.03928){a=n/12.92}else{a=Math.pow((n+.055)/1.055,2.4)}return.2126*i+.7152*o+.0722*a},setAlpha:function(t){this._a=R(t);this._roundA=o(100*this._a)/100;return this},toHsv:function(){var t=d(this._r,this._g,this._b);return{h:t.h*360,s:t.s,v:t.v,a:this._a}},toHsvString:function(){var t=d(this._r,this._g,this._b);var e=o(t.h*360),r=o(t.s*100),n=o(t.v*100);return this._a==1?"hsv("+e+", "+r+"%, "+n+"%)":"hsva("+e+", "+r+"%, "+n+"%, "+this._roundA+")"},toHsl:function(){var t=c(this._r,this._g,this._b);return{h:t.h*360,s:t.s,l:t.l,a:this._a}},toHslString:function(){var t=c(this._r,this._g,this._b);var e=o(t.h*360),r=o(t.s*100),n=o(t.l*100);return this._a==1?"hsl("+e+", "+r+"%, "+n+"%)":"hsla("+e+", "+r+"%, "+n+"%, "+this._roundA+")"},toHex:function(t){return v(this._r,this._g,this._b,t)},toHexString:function(t){return"#"+this.toHex(t)},toHex8:function(){return b(this._r,this._g,this._b,this._a)},toHex8String:function(){return"#"+this.toHex8()},toRgb:function(){return{r:o(this._r),g:o(this._g),b:o(this._b),a:this._a}},toRgbString:function(){return this._a==1?"rgb("+o(this._r)+", "+o(this._g)+", "+o(this._b)+")":"rgba("+o(this._r)+", "+o(this._g)+", "+o(this._b)+", "+this._roundA+")"},toPercentageRgb:function(){return{r:o(O(this._r,255)*100)+"%",g:o(O(this._g,255)*100)+"%",b:o(O(this._b,255)*100)+"%",a:this._a}},toPercentageRgbString:function(){return this._a==1?"rgb("+o(O(this._r,255)*100)+"%, "+o(O(this._g,255)*100)+"%, "+o(O(this._b,255)*100)+"%)":"rgba("+o(O(this._r,255)*100)+"%, "+o(O(this._g,255)*100)+"%, "+o(O(this._b,255)*100)+"%, "+this._roundA+")"},toName:function(){if(this._a===0){return"transparent"}if(this._a<1){return false}return L[v(this._r,this._g,this._b,true)]||false},toFilter:function(t){var e="#"+b(this._r,this._g,this._b,this._a);var r=e;var n=this._gradientType?"GradientType = 1, ":"";if(t){var i=f(t);r=i.toHex8String()}return"progid:DXImageTransform.Microsoft.gradient("+n+"startColorstr="+e+",endColorstr="+r+")"},toString:function(t){var e=!!t;t=t||this._format;var r=false;var n=this._a<1&&this._a>=0;var i=!e&&n&&(t==="hex"||t==="hex6"||t==="hex3"||t==="name");if(i){if(t==="name"&&this._a===0){return this.toName()}return this.toRgbString()}if(t==="rgb"){r=this.toRgbString()}if(t==="prgb"){r=this.toPercentageRgbString()}if(t==="hex"||t==="hex6"){r=this.toHexString()}if(t==="hex3"){r=this.toHexString(true)}if(t==="hex8"){r=this.toHex8String()}if(t==="name"){r=this.toName()}if(t==="hsl"){r=this.toHslString()}if(t==="hsv"){r=this.toHsvString()}return r||this.toHexString()},_applyModification:function(t,e){var r=t.apply(null,[this].concat([].slice.call(e)));this._r=r._r;this._g=r._g;this._b=r._b;this.setAlpha(r._a);return this},lighten:function(){return this._applyModification(w,arguments)},brighten:function(){return this._applyModification(x,arguments)},darken:function(){return this._applyModification(k,arguments)},desaturate:function(){return this._applyModification(m,arguments)},saturate:function(){return this._applyModification(y,arguments)},greyscale:function(){return this._applyModification(_,arguments)},spin:function(){return this._applyModification(S,arguments)},_applyCombination:function(t,e){return t.apply(null,[this].concat([].slice.call(e)))},analogous:function(){return this._applyCombination(E,arguments)},complement:function(){return this._applyCombination(A,arguments)},monochromatic:function(){return this._applyCombination(F,arguments)},splitcomplement:function(){return this._applyCombination($,arguments)},triad:function(){return this._applyCombination(H,arguments)},tetrad:function(){return this._applyCombination(M,arguments)}};f.fromRatio=function(t,e){if(typeof t=="object"){var r={};for(var n in t){if(t.hasOwnProperty(n)){if(n==="a"){r[n]=t[n]}else{r[n]=N(t[n])}}}t=r}return f(t,e)};function l(t){var e={r:0,g:0,b:0};var r=1;var n=false;var i=false;if(typeof t=="string"){t=I(t)}if(typeof t=="object"){if(t.hasOwnProperty("r")&&t.hasOwnProperty("g")&&t.hasOwnProperty("b")){e=h(t.r,t.g,t.b);n=true;i=String(t.r).substr(-1)==="%"?"prgb":"rgb"}else if(t.hasOwnProperty("h")&&t.hasOwnProperty("s")&&t.hasOwnProperty("v")){t.s=N(t.s);t.v=N(t.v);e=g(t.h,t.s,t.v);n=true;i="hsv"}else if(t.hasOwnProperty("h")&&t.hasOwnProperty("s")&&t.hasOwnProperty("l")){t.s=N(t.s);t.l=N(t.l);e=p(t.h,t.s,t.l);n=true;i="hsl"}if(t.hasOwnProperty("a")){r=t.a}}r=R(r);return{ok:n,format:t.format||i,r:a(255,s(e.r,0)),g:a(255,s(e.g,0)),b:a(255,s(e.b,0)),a:r}}function h(t,e,r){return{r:O(t,255)*255,g:O(e,255)*255,b:O(r,255)*255}}function c(t,e,r){t=O(t,255);e=O(e,255);r=O(r,255);var n=s(t,e,r),i=a(t,e,r);var o,u,f=(n+i)/2;if(n==i){o=u=0}else{var l=n-i;u=f>.5?l/(2-n-i):l/(n+i);switch(n){case t:o=(e-r)/l+(e<r?6:0);break;case e:o=(r-t)/l+2;break;case r:o=(t-e)/l+4;break}o/=6}return{h:o,s:u,l:f}}function p(t,e,r){var n,i,o;t=O(t,360);e=O(e,100);r=O(r,100);function a(t,e,r){if(r<0)r+=1;if(r>1)r-=1;if(r<1/6)return t+(e-t)*6*r;if(r<1/2)return e;if(r<2/3)return t+(e-t)*(2/3-r)*6;return t}if(e===0){n=i=o=r}else{var s=r<.5?r*(1+e):r+e-r*e;var u=2*r-s;n=a(u,s,t+1/3);i=a(u,s,t);o=a(u,s,t-1/3)}return{r:n*255,g:i*255,b:o*255}}function d(t,e,r){t=O(t,255);e=O(e,255);r=O(r,255);var n=s(t,e,r),i=a(t,e,r);var o,u,f=n;var l=n-i;u=n===0?0:l/n;if(n==i){o=0}else{switch(n){case t:o=(e-r)/l+(e<r?6:0);break;case e:o=(r-t)/l+2;break;case r:o=(t-e)/l+4;break}o/=6}return{h:o,s:u,v:f}}function g(t,e,r){t=O(t,360)*6;e=O(e,100);r=O(r,100);var n=i.floor(t),o=t-n,a=r*(1-e),s=r*(1-o*e),u=r*(1-(1-o)*e),f=n%6,l=[r,s,a,a,u,r][f],h=[u,r,r,s,a,a][f],c=[a,a,u,r,r,s][f];return{r:l*255,g:h*255,b:c*255}}function v(t,e,r,n){var i=[U(o(t).toString(16)),U(o(e).toString(16)),U(o(r).toString(16))];if(n&&i[0].charAt(0)==i[0].charAt(1)&&i[1].charAt(0)==i[1].charAt(1)&&i[2].charAt(0)==i[2].charAt(1)){return i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0)}return i.join("")}function b(t,e,r,n){var i=[U(Y(n)),U(o(t).toString(16)),U(o(e).toString(16)),U(o(r).toString(16))];return i.join("")}f.equals=function(t,e){if(!t||!e){return false}return f(t).toRgbString()==f(e).toRgbString()};f.random=function(){return f.fromRatio({r:u(),g:u(),b:u()})};function m(t,e){e=e===0?0:e||10;var r=f(t).toHsl();r.s-=e/100;r.s=P(r.s);return f(r)}function y(t,e){e=e===0?0:e||10;var r=f(t).toHsl();r.s+=e/100;r.s=P(r.s);return f(r)}function _(t){return f(t).desaturate(100)}function w(t,e){e=e===0?0:e||10;var r=f(t).toHsl();r.l+=e/100;r.l=P(r.l);return f(r)}function x(t,e){e=e===0?0:e||10;var r=f(t).toRgb();r.r=s(0,a(255,r.r-o(255*-(e/100))));r.g=s(0,a(255,r.g-o(255*-(e/100))));r.b=s(0,a(255,r.b-o(255*-(e/100))));return f(r)}function k(t,e){e=e===0?0:e||10;var r=f(t).toHsl();r.l-=e/100;r.l=P(r.l);return f(r)}function S(t,e){var r=f(t).toHsl();var n=(o(r.h)+e)%360;r.h=n<0?360+n:n;return f(r)}function A(t){var e=f(t).toHsl();e.h=(e.h+180)%360;return f(e)}function H(t){var e=f(t).toHsl();var r=e.h;return[f(t),f({h:(r+120)%360,s:e.s,l:e.l}),f({h:(r+240)%360,s:e.s,l:e.l})]}function M(t){var e=f(t).toHsl();var r=e.h;return[f(t),f({h:(r+90)%360,s:e.s,l:e.l}),f({h:(r+180)%360,s:e.s,l:e.l}),f({h:(r+270)%360,s:e.s,l:e.l})]}function $(t){var e=f(t).toHsl();var r=e.h;return[f(t),f({h:(r+72)%360,s:e.s,l:e.l}),f({h:(r+216)%360,s:e.s,l:e.l})]}function E(t,e,r){e=e||6;r=r||30;var n=f(t).toHsl();var i=360/r;var o=[f(t)];for(n.h=(n.h-(i*e>>1)+720)%360;--e;){n.h=(n.h+i)%360;o.push(f(n))}return o}function F(t,e){e=e||6;var r=f(t).toHsv();var n=r.h,i=r.s,o=r.v;var a=[];var s=1/e;while(e--){a.push(f({h:n,s:i,v:o}));o=(o+s)%1}return a}f.mix=function(t,e,r){r=r===0?0:r||50;var n=f(t).toRgb();var i=f(e).toRgb();var o=r/100;var a=o*2-1;var s=i.a-n.a;var u;if(a*s==-1){u=a}else{u=(a+s)/(1+a*s)}u=(u+1)/2;var l=1-u;var h={r:i.r*u+n.r*l,g:i.g*u+n.g*l,b:i.b*u+n.b*l,a:i.a*o+n.a*(1-o)};return f(h)};f.readability=function(t,e){var r=f(t);var n=f(e);return(Math.max(r.getLuminance(),n.getLuminance())+.05)/(Math.min(r.getLuminance(),n.getLuminance())+.05)};f.isReadable=function(t,e,r){var n=f.readability(t,e);var i,o;o=false;i=Z(r);switch(i.level+i.size){case"AAsmall":case"AAAlarge":o=n>=4.5;break;case"AAlarge":o=n>=3;break;case"AAAsmall":o=n>=7;break}return o};f.mostReadable=function(t,e,r){var n=null;var i=0;var o;var a,s,u;r=r||{};a=r.includeFallbackColors;s=r.level;u=r.size;for(var l=0;l<e.length;l++){o=f.readability(t,e[l]);if(o>i){i=o;n=f(e[l])}}if(f.isReadable(t,n,{level:s,size:u})||!a){return n}else{r.includeFallbackColors=false;return f.mostReadable(t,["#fff","#000"],r)}};var C=f.names={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",burntsienna:"ea7e5d",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"663399",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"};var L=f.hexNames=j(C);function j(t){var e={};for(var r in t){if(t.hasOwnProperty(r)){e[t[r]]=r}}return e}function R(t){t=parseFloat(t);if(isNaN(t)||t<0||t>1){t=1}return t}function O(t,e){if(D(t)){t="100%"}var r=q(t);t=a(e,s(0,parseFloat(t)));if(r){t=parseInt(t*e,10)/100}if(i.abs(t-e)<1e-6){return 1}return t%e/parseFloat(e)}function P(t){return a(1,s(0,t))}function T(t){return parseInt(t,16)}function D(t){return typeof t=="string"&&t.indexOf(".")!=-1&&parseFloat(t)===1}function q(t){return typeof t==="string"&&t.indexOf("%")!=-1}function U(t){return t.length==1?"0"+t:""+t}function N(t){if(t<=1){t=t*100+"%"}return t}function Y(t){return Math.round(parseFloat(t)*255).toString(16)}function z(t){return T(t)/255}var X=function(){var t="[-\\+]?\\d+%?";var e="[-\\+]?\\d*\\.\\d+%?";

var r="(?:"+e+")|(?:"+t+")";var n="[\\s|\\(]+("+r+")[,|\\s]+("+r+")[,|\\s]+("+r+")\\s*\\)?";var i="[\\s|\\(]+("+r+")[,|\\s]+("+r+")[,|\\s]+("+r+")[,|\\s]+("+r+")\\s*\\)?";return{rgb:new RegExp("rgb"+n),rgba:new RegExp("rgba"+i),hsl:new RegExp("hsl"+n),hsla:new RegExp("hsla"+i),hsv:new RegExp("hsv"+n),hsva:new RegExp("hsva"+i),hex3:/^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex8:/^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/}}();function I(e){e=e.replace(t,"").replace(r,"").toLowerCase();var n=false;if(C[e]){e=C[e];n=true}else if(e=="transparent"){return{r:0,g:0,b:0,a:0,format:"name"}}var i;if(i=X.rgb.exec(e)){return{r:i[1],g:i[2],b:i[3]}}if(i=X.rgba.exec(e)){return{r:i[1],g:i[2],b:i[3],a:i[4]}}if(i=X.hsl.exec(e)){return{h:i[1],s:i[2],l:i[3]}}if(i=X.hsla.exec(e)){return{h:i[1],s:i[2],l:i[3],a:i[4]}}if(i=X.hsv.exec(e)){return{h:i[1],s:i[2],v:i[3]}}if(i=X.hsva.exec(e)){return{h:i[1],s:i[2],v:i[3],a:i[4]}}if(i=X.hex8.exec(e)){return{a:z(i[1]),r:T(i[2]),g:T(i[3]),b:T(i[4]),format:n?"name":"hex8"}}if(i=X.hex6.exec(e)){return{r:T(i[1]),g:T(i[2]),b:T(i[3]),format:n?"name":"hex"}}if(i=X.hex3.exec(e)){return{r:T(i[1]+""+i[1]),g:T(i[2]+""+i[2]),b:T(i[3]+""+i[3]),format:n?"name":"hex"}}return false}function Z(t){var e,r;t=t||{level:"AA",size:"small"};e=(t.level||"AA").toUpperCase();r=(t.size||"small").toLowerCase();if(e!=="AA"&&e!=="AAA"){e="AA"}if(r!=="small"&&r!=="large"){r="small"}return{level:e,size:r}}if(typeof e!=="undefined"&&e.exports){e.exports=f}else if(typeof define==="function"&&define.amd){define(function(){return f})}else{window.tinycolor=f}})()},{}],27:[function(t,e,r){"use strict";e.exports=function n(t){var e={left:0,top:0};if(t.offsetParent){do{e.left+=t.offsetLeft;e.top+=t.offsetTop}while(t=t.offsetParent)}return e}},{}],28:[function(t,e,r){"use strict";e.exports=function n(t,e,r){return Math.min(Math.max(t,e),r)}},{}]},{},[1]);
/*! For license information please see 904.7c95a56a.chunk.js.LICENSE.txt */
(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[904],{2904:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>N});var o=n(9060);const r="Paginator_paginator__nDK9Q",s="Paginator_pageNumber__7O7BU",i="Paginator_selectedPage__CRNLp";var l=n(264),a=n.n(l),c=n(2496);const u=e=>{let t=Math.ceil(e.totalUsersCount/e.pageSize),n=[];for(let o=1;o<=t;o++)n.push(o);let l=Math.ceil(t/e.pageSize),[u,p]=(0,o.useState)(1),f=(u-1)*e.pageSize+1,g=u*e.pageSize;return(0,c.jsxs)("div",{className:r,children:[u>1&&(0,c.jsx)("button",{onClick:()=>{p(u-1)},children:"PREV"}),n.filter((e=>e>=f&&e<=g)).map((t=>(0,c.jsx)("span",{className:a()({[i]:e.currentPage===t},s),onClick:n=>{e.onPageChanged(t)},children:t},t))),l>u&&(0,c.jsx)("button",{onClick:()=>{p(u+1)},children:"NEXT"})]})},p="Users_photoUser__SuB-h";var f=n(8616),g=n(12);const d=e=>{let{user:t,followingInProgress:n,unfollow:o,follow:r}=e;return(0,c.jsxs)("div",{children:[(0,c.jsxs)("span",{children:[(0,c.jsx)("div",{children:(0,c.jsx)(g.Af,{to:"/profile/"+t.id,children:(0,c.jsx)("img",{src:null!==t.photos.small?t.photos.small:f,className:p})})}),(0,c.jsx)("div",{children:t.followed?(0,c.jsx)("button",{disabled:n.some((e=>e===t.id)),onClick:()=>{o(t.id)},children:"Unfollow"}):(0,c.jsx)("button",{disabled:n.some((e=>e===t.id)),onClick:()=>{r(t.id)},children:"Follow"})})]}),(0,c.jsx)("span",{children:(0,c.jsxs)("span",{children:[(0,c.jsx)("div",{children:t.name}),(0,c.jsx)("div",{children:t.status})]})})]})};const h=e=>(0,c.jsxs)("div",{children:[(0,c.jsx)(u,{totalUsersCount:e.totalUsersCount,pageSize:e.pageSize,currentPage:e.currentPage,onPageChanged:e.onPageChanged}),(0,c.jsx)("div",{children:e.users.map((t=>(0,c.jsx)(d,{user:t,followingInProgress:e.followingInProgress,unfollow:e.unfollow,follow:e.follow},t.id)))})]});var v=n(624),y=n(9824),m=n(8198),w=n(5773);n(7260);function j(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"expected a function, instead received ".concat(typeof e);if("function"!==typeof e)throw new TypeError(t)}var P=e=>Array.isArray(e)?e:[e];function x(e){const t=Array.isArray(e[0])?e[0]:e;return function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"expected all items to be functions, instead received the following types: ";if(!e.every((e=>"function"===typeof e))){const n=e.map((e=>"function"===typeof e?"function ".concat(e.name||"unnamed","()"):typeof e)).join(", ");throw new TypeError("".concat(t,"[").concat(n,"]"))}}(t,"createSelector expects all input-selectors to be functions, but received the following types: "),t}Symbol(),Object.getPrototypeOf({});var C="undefined"!==typeof WeakRef?WeakRef:class{constructor(e){this.value=e}deref(){return this.value}},b=0,S=1;function z(){return{s:b,v:void 0,o:null,p:null}}function U(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=z();const{resultEqualityCheck:o}=t;let r,s=0;function i(){let t=n;const{length:i}=arguments;for(let e=0,n=i;e<n;e++){const n=arguments[e];if("function"===typeof n||"object"===typeof n&&null!==n){let e=t.o;null===e&&(t.o=e=new WeakMap);const o=e.get(n);void 0===o?(t=z(),e.set(n,t)):t=o}else{let e=t.p;null===e&&(t.p=e=new Map);const o=e.get(n);void 0===o?(t=z(),e.set(n,t)):t=o}}const l=t;let a;if(t.s===S?a=t.v:(a=e.apply(null,arguments),s++),l.s=S,o){var c,u,p;const e=null!==(c=null===(u=r)||void 0===u||null===(p=u.deref)||void 0===p?void 0:p.call(u))&&void 0!==c?c:r;null!=e&&o(e,a)&&(a=e,0!==s&&s--);r="object"===typeof a&&null!==a||"function"===typeof a?new C(a):a}return l.v=a,a}return i.clearCache=()=>{n=z(),i.resetResultsCount()},i.resultsCount=()=>s,i.resetResultsCount=()=>{s=0},i}function k(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];const r="function"===typeof e?{memoize:e,memoizeOptions:n}:e,s=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];let o,s=0,i=0,l={},a=t.pop();"object"===typeof a&&(l=a,a=t.pop()),j(a,"createSelector expects an output function after the inputs, but received: [".concat(typeof a,"]"));const c={...r,...l},{memoize:u,memoizeOptions:p=[],argsMemoize:f=U,argsMemoizeOptions:g=[],devModeChecks:d={}}=c,h=P(p),v=P(g),y=x(t),m=u((function(){return s++,a.apply(null,arguments)}),...h);const w=f((function(){i++;const e=function(e,t){const n=[],{length:o}=e;for(let r=0;r<o;r++)n.push(e[r].apply(null,t));return n}(y,arguments);return o=m.apply(null,e),o}),...v);return Object.assign(w,{resultFunc:a,memoizedResultFunc:m,dependencies:y,dependencyRecomputations:()=>i,resetDependencyRecomputations:()=>{i=0},lastResult:()=>o,recomputations:()=>s,resetRecomputations:()=>{s=0},memoize:u,argsMemoize:f})};return Object.assign(s,{withTypes:()=>s}),s}var _=k(U),O=Object.assign((function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:_;!function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"expected an object, instead received ".concat(typeof e);if("object"!==typeof e)throw new TypeError(t)}(e,"createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ".concat(typeof e));const n=Object.keys(e),o=t(n.map((t=>e[t])),(function(){for(var e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];return t.reduce(((e,t,o)=>(e[n[o]]=t,e)),{})}));return o}),{withTypes:()=>O});const R=_((e=>e.usersPage.users),(e=>e.filter((e=>!0)))),A=e=>e.usersPage.pageSize,M=e=>e.usersPage.totalUsersCount,F=e=>e.usersPage.currentPage,I=e=>e.usersPage.isFetching,T=e=>e.usersPage.followingInProgress;class E extends o.Component{constructor(){super(...arguments),this.onPageChanged=e=>{this.props.getUsers(e,this.props.pageSize),this.props.setCurrentPage(e)}}componentDidMount(){this.props.getUsers(this.props.currentPage,this.props.pageSize)}render(){let e=Math.ceil(this.props.totalUsersCount/this.props.pageSize),t=[];for(let n=1;n<=e;n++)t.push(n);return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("h2",{children:this.props.pageTitle}),(0,c.jsx)("div",{children:this.props.isFetching?(0,c.jsx)(m.c,{}):null}),(0,c.jsx)(h,{totalUsersCount:this.props.totalUsersCount,pageSize:this.props.pageSize,users:this.props.users,currentPage:this.props.currentPage,onPageChanged:this.onPageChanged,follow:this.props.follow,unfollow:this.props.unfollow,followingInProgress:this.props.followingInProgress})]})}}const N=(0,w.Jn)((0,v.Ul)((e=>({users:R(e),pageSize:A(e),totalUsersCount:M(e),currentPage:F(e),isFetching:I(e),followingInProgress:T(e)})),{setCurrentPage:y.ay.setCurrentPage,getUsers:y.O8,follow:y.Se,unfollow:y.UV}))(E)},8616:(e,t,n)=>{"use strict";e.exports=n.p+"static/media/avatar_default.99b08e94f781d8d8eef4.png"},264:(e,t)=>{var n;!function(){"use strict";var o={}.hasOwnProperty;function r(){for(var e="",t=0;t<arguments.length;t++){var n=arguments[t];n&&(e=i(e,s(n)))}return e}function s(e){if("string"===typeof e||"number"===typeof e)return e;if("object"!==typeof e)return"";if(Array.isArray(e))return r.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var t="";for(var n in e)o.call(e,n)&&e[n]&&(t=i(t,n));return t}function i(e,t){return t?e?e+" "+t:e+t:e}e.exports?(r.default=r,e.exports=r):void 0===(n=function(){return r}.apply(t,[]))||(e.exports=n)}()}}]);
//# sourceMappingURL=904.7c95a56a.chunk.js.map
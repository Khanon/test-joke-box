(()=>{"use strict";var r={3269:(r,s)=>{Object.defineProperty(s,"__esModule",{value:!0}),s.Logger=void 0;s.Logger=class{static info(r,...s){console.log(this.msgParams(r,s))}static warn(r,...s){console.log("Warning!! - "+this.msgParams(r,s))}static error(r,...s){console.log("Error!! - "+this.msgParams(r,s))}static msgParams(r,s){return s.forEach((s=>{r+=" "+s})),r}}}},s={};function t(o){var a=s[o];if(void 0!==a)return a.exports;var e=s[o]={exports:{}};return r[o](e,e.exports,t),e.exports}(()=>{const r=t(3269);class s{start(){r.Logger.info("App started!")}}(new s).start()})()})();
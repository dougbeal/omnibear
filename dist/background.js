(function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var r={};return e.m=t,e.c=r,e.i=function(t){return t},e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=18)})({17:function(t,e,r){"use strict";t.exports=function(t,e){e=e||{};for(var r={key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}},n=r.parser[e.strictMode?"strict":"loose"].exec(t),o={},a=14;a--;)o[r.key[a]]=n[a]||"";return o[r.q.name]={},o[r.key[12]].replace(r.q.parser,function(t,e,n){e&&(o[r.q.name][e]=n)}),o}},18:function(t,e,r){"use strict";function n(t,e,r){switch(t.action){case"begin-auth":o(t.payload);break;case"focus-window":a(e.url,t.payload.selectedEntry);break;case"select-entry":i(t.payload.url);break;case"clear-entry":c()}}function o(t){localStorage.setItem("domain",t.domain),localStorage.setItem("authEndpoint",t.metadata.authEndpoint),localStorage.setItem("tokenEndpoint",t.metadata.tokenEndpoint),localStorage.setItem("micropubEndpoint",t.metadata.micropub),chrome.tabs.create({url:t.authUrl},function(t){f=t.id})}function a(t,e){localStorage.setItem("pageUrl",(0,d.cleanUrl)(t)),e?i(e):c()}function i(t){localStorage.setItem("selectedEntry",t)}function c(){localStorage.removeItem("selectedEntry")}function u(t,e,r){if(t===f&&s(e)){var n=(0,d.getParamFromUrl)("code",e.url);l(n).then(function(t){var e=(0,d.getParamFromUrlString)("access_token",t);localStorage.setItem("token",e),chrome.tabs.remove(r.id),f=null})}}function s(t){var e="http://omnibear.com/auth/success";return"loading"===t.status&&t.url&&t.url.startsWith(e)}function l(t){var e={code:t,redirect_uri:"http://omnibear.com/auth/success/",client_id:"http://omnibear.com",me:localStorage.getItem("domain")},r=localStorage.getItem("tokenEndpoint");return(0,p.post)(r,e)}var p=r(2),d=r(7),f=null,m=void 0;chrome.runtime.onMessage.addListener(n),chrome.tabs.onUpdated.addListener(u),m=chrome.contextMenus.create({title:"Reply to entry",contexts:["page","selection"],onclick:function(){window.open("index.html?reply=true","extension_popup","width=450,height=510,status=no,scrollbars=yes,resizable=no,top=80,left=2000")}})},2:function(t,e,r){"use strict";function n(t,e,r){console.warn("Using deprecated function: requests.post");var n;return n="string"==typeof e?e:o(e),fetch(t+"?"+n,{method:"POST",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"},body:r?JSON.stringify(r):null}).then(function(t){return t.text()})}function o(t){var e=[];for(var r in t)e.push(r+"="+t[r]);return e.join("&")}function a(t,e,r){return console.warn("Using deprecated function: requests.postMicropub"),fetch(t,{method:"POST",headers:{Authorization:"Bearer "+r},body:new FormData(e)}).then(function(t){return t.text()})}function i(t,e,r){return new Promise(function(n,o){fetch(t,{method:"POST",headers:{Authorization:"Bearer "+r},body:c(e)}).then(function(t){return t.status<200||t.status>=400?o(t.status):void n(t.text())})})}function c(t){var e=new FormData;for(var r in t)Array.isArray(t[r])?t[r].forEach(function(t,n){e.append(r,t)}):e.append(r,t[r]);return e}Object.defineProperty(e,"__esModule",{value:!0}),e.post=n,e.getParamString=o,e.postMicropub=a,e.postFormData=i,e.formDataFromObject=c},7:function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t,e){var r=e.split("?")[1];return a(t,r)}function a(t,e){var r=e.split("&").filter(function(e){return e.startsWith(t+"=")});if(r&&r.length){var n=r[0].substr(t.length+1);return decodeURIComponent(n)}return null}function i(t){var e={};for(var r in t)r.startsWith("utm_")||(e[r]=t[r]);return e}function c(t){var e=[];for(var r in t)e.push(r+"="+t[r]);return e.length?"?"+e.join("&"):""}function u(t){var e=(0,l.default)(t),r=[e.protocol,"://",e.host,e.port?":"+e.port:"",e.path,c(i(e.queryKey))].join("");return r}Object.defineProperty(e,"__esModule",{value:!0}),e.getParamFromUrl=o,e.getParamFromUrlString=a,e.cleanParams=i,e.paramsToQueryString=c,e.cleanUrl=u;var s=r(17),l=n(s)}});
//# sourceMappingURL=background.js.map
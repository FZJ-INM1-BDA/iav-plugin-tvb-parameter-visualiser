var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function l(e){e.forEach(t)}function a(e){return"function"==typeof e}function s(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function c(e,t){e.appendChild(t)}function r(e,t,n){e.insertBefore(t,n||null)}function i(e){e.parentNode.removeChild(e)}function o(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function d(e){return document.createElement(e)}function u(e){return document.createTextNode(e)}function f(){return u(" ")}function m(){return u("")}function p(e,t,n,l){return e.addEventListener(t,n,l),()=>e.removeEventListener(t,n,l)}function g(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function h(e,t){t=""+t,e.data!==t&&(e.data=t)}let _;function v(e){_=e}function $(){if(!_)throw new Error("Function called outside component initialization");return _}function b(e){$().$$.before_update.push(e)}function x(e){$().$$.on_mount.push(e)}function y(){const e=$();return(t,n)=>{const l=e.$$.callbacks[t];if(l){const a=function(e,t){const n=document.createEvent("CustomEvent");return n.initCustomEvent(e,!1,!1,t),n}(t,n);l.slice().forEach(t=>{t.call(e,a)})}}}const k=[],w=[],L=[],N=[],E=Promise.resolve();let I=!1;function F(e){L.push(e)}let A=!1;const D=new Set;function T(){if(!A){A=!0;do{for(let e=0;e<k.length;e+=1){const t=k[e];v(t),C(t.$$)}for(k.length=0;w.length;)w.pop()();for(let e=0;e<L.length;e+=1){const t=L[e];D.has(t)||(D.add(t),t())}L.length=0}while(k.length);for(;N.length;)N.pop()();I=!1,A=!1,D.clear()}}function C(e){if(null!==e.fragment){e.update(),l(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(F)}}const V=new Set;function P(e,t){e&&e.i&&(V.delete(e),e.i(t))}function H(e,t,n,l){if(e&&e.o){if(V.has(e))return;V.add(e),(void 0).c.push(()=>{V.delete(e),l&&(n&&e.d(1),l())}),e.o(t)}}function S(e){e&&e.c()}function M(e,n,s){const{fragment:c,on_mount:r,on_destroy:i,after_update:o}=e.$$;c&&c.m(n,s),F(()=>{const n=r.map(t).filter(a);i?i.push(...n):l(n),e.$$.on_mount=[]}),o.forEach(F)}function j(e,t){const n=e.$$;null!==n.fragment&&(l(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function O(e,t){-1===e.$$.dirty[0]&&(k.push(e),I||(I=!0,E.then(T)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function U(t,a,s,c,r,o,d=[-1]){const u=_;v(t);const f=a.props||{},m=t.$$={fragment:null,ctx:null,props:o,update:e,not_equal:r,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:n(),dirty:d};let p=!1;if(m.ctx=s?s(t,f,(e,n,...l)=>{const a=l.length?l[0]:n;return m.ctx&&r(m.ctx[e],m.ctx[e]=a)&&(m.bound[e]&&m.bound[e](a),p&&O(t,e)),n}):[],m.update(),p=!0,l(m.before_update),m.fragment=!!c&&c(m.ctx),a.target){if(a.hydrate){const e=function(e){return Array.from(e.childNodes)}(a.target);m.fragment&&m.fragment.l(e),e.forEach(i)}else m.fragment&&m.fragment.c();a.intro&&P(t.$$.fragment),M(t,a.target,a.anchor),T()}v(u)}class z{$destroy(){j(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(){}}function G(e,t,n){const l=e.slice();return l[5]=t[n],l}function B(e){let t,n=e[2]&&R(e);return{c(){n&&n.c(),t=m()},m(e,l){n&&n.m(e,l),r(e,t,l)},p(e,l){e[2]?n?n.p(e,l):(n=R(e),n.c(),n.m(t.parentNode,t)):n&&(n.d(1),n=null)},d(e){n&&n.d(e),e&&i(t)}}}function K(e){let t,n=e[0],l=[];for(let t=0;t<n.length;t+=1)l[t]=W(G(e,n,t));return{c(){for(let e=0;e<l.length;e+=1)l[e].c();t=m()},m(e,n){for(let t=0;t<l.length;t+=1)l[t].m(e,n);r(e,t,n)},p(e,a){if(1&a){let s;for(n=e[0],s=0;s<n.length;s+=1){const c=G(e,n,s);l[s]?l[s].p(c,a):(l[s]=W(c),l[s].c(),l[s].m(t.parentNode,t))}for(;s<l.length;s+=1)l[s].d(1);l.length=n.length}},d(e){o(l,e),e&&i(t)}}}function R(e){let t,n;return{c(){t=d("option"),n=u(e[2]),t.__value=e[2],t.value=t.__value},m(e,l){r(e,t,l),c(t,n)},p(e,l){4&l&&h(n,e[2]),4&l&&(t.__value=e[2]),t.value=t.__value},d(e){e&&i(t)}}}function W(e){let t,n,l,a,s=e[5]+"";return{c(){t=d("option"),n=u(s),l=f(),t.__value=a=e[5],t.value=t.__value},m(e,a){r(e,t,a),c(t,n),c(t,l)},p(e,l){1&l&&s!==(s=e[5]+"")&&h(n,s),1&l&&a!==(a=e[5])&&(t.__value=a),t.value=t.__value},d(e){e&&i(t)}}}function q(t){let n,l,a,s,o;function u(e,t){return(null==a||1&t)&&(a=!!(e[0]&&Array.isArray(e[0])&&e[0].length>0)),a?K:B}let f=u(t,-1),m=f(t);return{c(){n=d("select"),l=d("option"),l.textContent="-- select --\n  ",m.c(),l.__value="null",l.value=l.__value,l.disabled=!0,n.disabled=t[1]},m(e,a,i){r(e,n,a),c(n,l),m.m(n,null),s=t[2]||"null";for(var d=0;d<n.options.length;d+=1){var u=n.options[d];if(u.__value===s){u.selected=!0;break}}i&&o(),o=p(n,"change",t[3])},p(e,[t]){if(f===(f=u(e,t))&&m?m.p(e,t):(m.d(1),m=f(e),m&&(m.c(),m.m(n,null))),4&t&&s!==(s=e[2]||"null"))for(var l=0;l<n.options.length;l+=1){var a=n.options[l];if(a.__value===s){a.selected=!0;break}}2&t&&(n.disabled=e[1])},i:e,o:e,d(e){e&&i(n),m.d(),o()}}}function J(e,t,n){let{inputList:l}=t,{disabled:a}=t,{selectedVal:s}=t;const c=y();return e.$set=e=>{"inputList"in e&&n(0,l=e.inputList),"disabled"in e&&n(1,a=e.disabled),"selectedVal"in e&&n(2,s=e.selectedVal)},[l,a,s,function(e){const t=e.srcElement.value;c("selectChanged",{value:t})}]}class Q extends z{constructor(e){super(),U(this,e,J,q,s,{inputList:0,disabled:1,selectedVal:2})}}function X(e){return d3.extent(e.map(e=>d3.extent(e)).reduce((e,t)=>e.concat(t),[]))}function Y(t){let n;return{c(){n=d("div"),n.textContent="No datas to display"},m(e,t){r(e,n,t)},p:e,d(e){e&&i(n)}}}function Z(t){let n;return{c(){n=d("div"),g(n,"class","graph-container svelte-rklmzr")},m(e,l){r(e,n,l),t[5](n)},p:e,d(e){e&&i(n),t[5](null)}}}function ee(t){let n;function l(e,t){return e[0]&&e[0].length>0?Z:Y}let a=l(t),s=a(t);return{c(){s.c(),n=m()},m(e,t){s.m(e,t),r(e,n,t)},p(e,[t]){a===(a=l(e))&&s?s.p(e,t):(s.d(1),s=a(e),s&&(s.c(),s.m(n.parentNode,n)))},i:e,o:e,d(e){s.d(e),e&&i(n)}}}function te(e,t,n){let l,a,{datas:s}=t;const c={left:40,top:0,right:10,bottom:20};let{yDomain:r}=t;return b(()=>{if(s&&l){for(;l.children[0];)l.removeChild(l.children[0]);const{left:t,right:n,top:a,bottom:i}=c,o=l.clientWidth-t-n,d=l.clientHeight-a-i,u=d3.scaleLinear().range([0,o]),f=d3.scaleLinear().range([d,0]),m=d3.select(l).append("svg").attr("width","100%").attr("height","100%").append("g").attr("transform",`translate(${t}, ${a})`),p=d3.max(s.map(e=>e.length));u.domain([0,p]),f.domain(r||X(s));for(const t in s){const n=d3.line().x(e=>u(e.x)).y(e=>f(e.y));m.append("path").attr("fill","none").attr("stroke-width","1px").attr("stroke",(e=t,`hsl(${97*e}, 100%, 50%)`)).data([s[t].map((e,t)=>({x:t,y:e}))]).attr("d",n)}m.append("g").attr("transform",`translate(0, ${d})`).call(d3.axisBottom(u)),m.append("g").call(d3.axisLeft(f))}var e}),x(()=>(console.log("mounting graph.svelte"),a=interactiveViewer.pluginControl.loadExternalLibraries(["d3@5.7.0"]),()=>{console.log("unmounting graph.svelte"),interactiveViewer.pluginControl.unloadExternalLibraries(["d3@5.7.0"])})),e.$set=e=>{"datas"in e&&n(0,s=e.datas),"yDomain"in e&&n(2,r=e.yDomain)},[s,l,r,a,c,function(e){w[e?"unshift":"push"](()=>{n(1,l=e)})}]}class ne extends z{constructor(e){var t;super(),document.getElementById("svelte-rklmzr-style")||((t=d("style")).id="svelte-rklmzr-style",t.textContent=".graph-container.svelte-rklmzr{height:20rem}",c(document.head,t)),U(this,e,te,ee,s,{datas:0,yDomain:2})}}function le(t){let n;return{c(){n=d("span"),n.textContent="Please select a dataset/file/trackIndex"},m(e,t){r(e,n,t)},p:e,d(e){e&&i(n)}}}function ae(e){let t,n;return{c(){t=d("img"),g(t,"class","w-100"),t.src!==(n=e[0])&&g(t,"src",n),g(t,"alt","Frequency graph generated from the parameters.")},m(e,n){r(e,t,n)},p(e,l){1&l&&t.src!==(n=e[0])&&g(t,"src",n)},d(e){e&&i(t)}}}function se(t){let n;function l(e,t){return e[0]?ae:le}let a=l(t),s=a(t);return{c(){s.c(),n=m()},m(e,t){s.m(e,t),r(e,n,t)},p(e,[t]){a===(a=l(e))&&s?s.p(e,t):(s.d(1),s=a(e),s&&(s.c(),s.m(n.parentNode,n)))},i:e,o:e,d(e){s.d(e),e&&i(n)}}}function ce(e,t,n){let l,{selectedDataset:a}=t,{selectedFile:s}=t,{selectedTrackIndex:c}=t;return b(()=>{if(n(0,l=null),a&&s&&(0===c||c)){const e=new URL(`${__HOSTNAME__}/data/get_tf_plot`);e.searchParams.set("kgDatasetId",a),e.searchParams.set("filename",s),e.searchParams.set("dkLabelIndex",c),n(0,l=e.toString())}}),e.$set=e=>{"selectedDataset"in e&&n(1,a=e.selectedDataset),"selectedFile"in e&&n(2,s=e.selectedFile),"selectedTrackIndex"in e&&n(3,c=e.selectedTrackIndex)},[l,a,s,c]}class re extends z{constructor(e){super(),U(this,e,ce,se,s,{selectedDataset:1,selectedFile:2,selectedTrackIndex:3})}}function ie(e,t,n){const l=e.slice();return l[22]=t[n],l}function oe(e){let t,n,l,a,s,o,m,_=e[22]+"";function v(...t){return e[20](e[22],...t)}return{c(){t=d("div"),n=d("span"),l=u(_),a=f(),s=d("button"),s.textContent="×",o=f(),g(s,"class","close"),g(t,"class","d-inline-block d-flex align-items-center")},m(e,i,d){r(e,t,i),c(t,n),c(n,l),c(t,a),c(t,s),c(t,o),d&&m(),m=p(s,"click",v)},p(t,n){e=t,128&n&&_!==(_=e[22]+"")&&h(l,_)},d(e){e&&i(t),m()}}}function de(e){let t,n,l,a,s,o,m,_=e[4][e[5]]?"Pin (alt/option + w)":"Hover or select area";return{c(){t=d("div"),n=d("i"),l=f(),a=d("span"),s=u(_),g(n,"class","fas fa-thumbtack"),g(t,"class",o="mt-2 btn btn-dark "+(e[4][e[5]]?"":"tvb-plugin-muted")+" svelte-1mng8sy")},m(i,o,d){r(i,t,o),c(t,n),c(t,l),c(t,a),c(a,s),d&&m(),m=p(t,"click",e[11])},p(e,n){48&n&&_!==(_=e[4][e[5]]?"Pin (alt/option + w)":"Hover or select area")&&h(s,_),48&n&&o!==(o="mt-2 btn btn-dark "+(e[4][e[5]]?"":"tvb-plugin-muted")+" svelte-1mng8sy")&&g(t,"class",o)},d(e){e&&i(t),m()}}}function ue(e){let t,n,l,a,s,u,m,h,_,v,$,b,x,y,k,w,L,N,E,I,F,A,D;const T=new Q({props:{inputList:e[0],disabled:e[6],selectedVal:e[1]}});T.$on("selectChanged",e[8]);const C=new Q({props:{inputList:e[2],disabled:e[6]||!e[1],selectedVal:e[3]}});C.$on("selectChanged",e[9]);const V=new Q({props:{inputList:e[4].map(fe),disabled:e[6]||!e[3],selectedVal:e[5]}});V.$on("selectChanged",e[10]);let O=e[7],U=[];for(let t=0;t<O.length;t+=1)U[t]=oe(ie(e,O,t));let z=!e[6]&&de(e);const G=new ne({props:{datas:[...e[7],e[5]].map(e[21]).filter(me),yDomain:X(e[4])}}),B=new re({props:{selectedDataset:e[1],selectedFile:e[3],selectedTrackIndex:e[5]}});return{c(){t=d("div"),n=d("div"),l=d("label"),l.textContent="Select dataset",a=f(),S(T.$$.fragment),s=f(),u=d("div"),m=d("label"),m.textContent="Select file",h=f(),S(C.$$.fragment),v=f(),$=d("div"),b=d("label"),b.textContent="Select index",x=f(),S(V.$$.fragment),k=f(),w=d("div");for(let e=0;e<U.length;e+=1)U[e].c();L=f(),z&&z.c(),N=f(),E=d("div"),S(G.$$.fragment),I=f(),F=d("div"),S(B.$$.fragment),g(l,"class","d-inline-block"),g(n,"class","d-flex flex-column"),g(m,"class","d-inline-block"),g(u,"class",_="d-flex flex-column pt-2 "+(e[1]?"":"tvb-plugin-muted")+" svelte-1mng8sy"),g(b,"class","d-inline-block"),g($,"class",y="d-flex flex-column pt-2 "+(e[1]&&e[3]?"":"tvb-plugin-muted")+" svelte-1mng8sy"),g(w,"class","d-flex pt-2 flex-row flex-wrap"),g(E,"class","d-flex flex-column pt-2"),g(F,"class","d-flex pt-2"),g(t,"class","d-flex flex-column m-2")},m(i,o,d){r(i,t,o),c(t,n),c(n,l),c(n,a),M(T,n,null),c(t,s),c(t,u),c(u,m),c(u,h),M(C,u,null),c(t,v),c(t,$),c($,b),c($,x),M(V,$,null),c(t,k),c(t,w);for(let e=0;e<U.length;e+=1)U[e].m(w,null);c(t,L),z&&z.m(t,null),c(t,N),c(t,E),M(G,E,null),c(t,I),c(t,F),M(B,F,null),A=!0,d&&D(),D=p(window,"keydown",e[19])},p(e,[n]){const l={};1&n&&(l.inputList=e[0]),64&n&&(l.disabled=e[6]),2&n&&(l.selectedVal=e[1]),T.$set(l);const a={};4&n&&(a.inputList=e[2]),66&n&&(a.disabled=e[6]||!e[1]),8&n&&(a.selectedVal=e[3]),C.$set(a),(!A||2&n&&_!==(_="d-flex flex-column pt-2 "+(e[1]?"":"tvb-plugin-muted")+" svelte-1mng8sy"))&&g(u,"class",_);const s={};if(16&n&&(s.inputList=e[4].map(fe)),72&n&&(s.disabled=e[6]||!e[3]),32&n&&(s.selectedVal=e[5]),V.$set(s),(!A||10&n&&y!==(y="d-flex flex-column pt-2 "+(e[1]&&e[3]?"":"tvb-plugin-muted")+" svelte-1mng8sy"))&&g($,"class",y),4224&n){let t;for(O=e[7],t=0;t<O.length;t+=1){const l=ie(e,O,t);U[t]?U[t].p(l,n):(U[t]=oe(l),U[t].c(),U[t].m(w,null))}for(;t<U.length;t+=1)U[t].d(1);U.length=O.length}e[6]?z&&(z.d(1),z=null):z?z.p(e,n):(z=de(e),z.c(),z.m(t,N));const c={};176&n&&(c.datas=[...e[7],e[5]].map(e[21]).filter(me)),16&n&&(c.yDomain=X(e[4])),G.$set(c);const r={};2&n&&(r.selectedDataset=e[1]),8&n&&(r.selectedFile=e[3]),32&n&&(r.selectedTrackIndex=e[5]),B.$set(r)},i(e){A||(P(T.$$.fragment,e),P(C.$$.fragment,e),P(V.$$.fragment,e),P(G.$$.fragment,e),P(B.$$.fragment,e),A=!0)},o(e){H(T.$$.fragment,e),H(C.$$.fragment,e),H(V.$$.fragment,e),H(G.$$.fragment,e),H(B.$$.fragment,e),A=!1},d(e){e&&i(t),j(T),j(C),j(V),o(U,e),z&&z.d(),j(G),j(B),D()}}}const fe=(e,t)=>t,me=e=>!!e;function pe(e,t,n){let{datasetArray:l=[]}=t,{selectedDataset:a=null}=t,{fetchedFiles:s=[]}=t,{selectedFile:c=null}=t,{fetchedDataFromFile:r=[]}=t,{staticFlag:i}=t,{selectedTrackIndex:o}=t,{selectedTrackIndices:d=[]}=t;const u=new Set;let f=[];const m=()=>{n(0,l=[]),n(1,a=null),fetch(`${__HOSTNAME__}/data/`).then(e=>e.json()).then(e=>{n(0,l=e)})};function p(){n(2,s=[]),n(3,c=null);const e=new URL(`${__HOSTNAME__}/data/get_filtered_filenames`);e.searchParams.set("kgDatasetId",a),fetch(e).then(e=>e.json()).then(e=>{n(2,s=e.map(({name:e})=>e))})}function g(e){n(5,o=e),n(13,d=[e])}function h(){u.add(o),n(7,f=Array.from(u))}function _(e){u.delete(e),n(7,f=Array.from(u))}x(()=>{const e=[];if(i){if(c&&a){const e=new URL(`${__HOSTNAME__}/data/get_matrix`);e.searchParams.set("filename",c),e.searchParams.set("kgDatasetId",a),fetch(e).then(e=>e.json()).then(e=>{n(4,r=e)})}}else{m(),interactiveViewer.viewerHandle.setLayerVisibility({name:/jubrain/},!1);const t={};t[`${__PLUGIN_NAME__}-DK68`]={type:"segmentation",source:`nifti://${__HOSTNAME__}/data/public/aparcaseg.nii.gz`,selectedOpacity:.5},interactiveViewer.viewerHandle.loadLayer(t),e.push(interactiveViewer.viewerHandle.mouseOverNehubaLayers.subscribe(e=>{if(n(5,o=null),e){const t=e.find(({layer:e})=>e.name===`${__PLUGIN_NAME__}-DK68`);if(t){const e=/#([0-9]{1,})$/.exec(t.segment);e&&g(Number(e[1]))}}}))}return()=>{for(i||(interactiveViewer.viewerHandle.setLayerVisibility({name:/jubrain/},!0),interactiveViewer.viewerHandle.removeLayer({name:`${__PLUGIN_NAME__}-DK68`}));e.length>0;)e.pop().unsubscribe()}});return e.$set=e=>{"datasetArray"in e&&n(0,l=e.datasetArray),"selectedDataset"in e&&n(1,a=e.selectedDataset),"fetchedFiles"in e&&n(2,s=e.fetchedFiles),"selectedFile"in e&&n(3,c=e.selectedFile),"fetchedDataFromFile"in e&&n(4,r=e.fetchedDataFromFile),"staticFlag"in e&&n(6,i=e.staticFlag),"selectedTrackIndex"in e&&n(5,o=e.selectedTrackIndex),"selectedTrackIndices"in e&&n(13,d=e.selectedTrackIndices)},[l,a,s,c,r,o,i,f,function(e){n(1,a=e.detail.value),p()},function(e){n(4,r=[]),n(3,c=e.detail.value);const t=new URL(`${__HOSTNAME__}/data/get_matrix`);t.searchParams.set("filename",c),t.searchParams.set("kgDatasetId",a),fetch(t).then(e=>e.json()).then(e=>{n(4,r=e)})},function(e){const t=e.detail.value;g(Number(t))},h,_,d,u,m,p,g,function(){const e=new URL(`${__HOSTNAME__}/frontend/manifest.json`);e.searchParams.set("selectedDataset",a),e.searchParams.set("selectedFile",c),e.searchParams.set("selectedTrackIndices",d.join(",")),fetch(e).then(e=>e.json()).then(e=>{interactiveViewer.uiHandle.launchNewWidget(e)})},e=>!i&&"KeyW"===e.code&&e.altKey&&h(),e=>_(e),e=>r[e]]}class ge extends z{constructor(e){var t;super(),document.getElementById("svelte-1mng8sy-style")||((t=d("style")).id="svelte-1mng8sy-style",t.textContent=".tvb-plugin-muted.svelte-1mng8sy{opacity:0.5}",c(document.head,t)),U(this,e,pe,ue,s,{datasetArray:0,selectedDataset:1,fetchedFiles:2,selectedFile:3,fetchedDataFromFile:4,staticFlag:6,selectedTrackIndex:5,selectedTrackIndices:13})}}const he=document.getElementById(`${__PLUGIN_NAME__}.container`),_e=he.getAttribute("static-flag"),ve=he.getAttribute("selected-file"),$e=he.getAttribute("selected-dataset"),be=he.getAttribute("selected-track-index"),xe=he.getAttribute("selected-track-indices");let ye;return interactiveViewer.pluginControl.loadExternalLibraries(["d3@5.7.0"]).then(()=>{ye=new ge({target:he,props:{staticFlag:_e,selectedFile:ve,selectedDataset:$e,selectedTrackIndex:be,selectedTrackIndices:xe&&xe.split(",").map(e=>Number(e)).filter(e=>NaN!==e)}}),interactiveViewer.pluginControl[__PLUGIN_NAME__].onShutdown(()=>{console.log(`onShutdown ${__PLUGIN_NAME__}`),ye.$destroy()})}),ye}();
//# sourceMappingURL=script.js.map

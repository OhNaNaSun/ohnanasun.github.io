(this["webpackJsonpohnanasun.github.io"]=this["webpackJsonpohnanasun.github.io"]||[]).push([[7],{115:function(e,t,n){"use strict";n(125);var a=n(126),c=n(127),r=n.n(c);a.extension("codehighlight",(function(){return[{type:"output",filter:function(e,t,n){return a.helper.replaceRecursiveRegExp(e,(function(e,t,n,a){return t=function(e){return e.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">")}(t),n+r.a.highlightAuto(t).value+a}),"<pre><code\\b[^>]*>","</code></pre>","g")}}]}));var o=new a.Converter({tables:!0,simplifiedAutoLink:!0,strikethrough:!0,tasklists:!0,extensions:["codehighlight"]});t.a=o},422:function(e,t,n){"use strict";n.r(t);var a=n(368),c=n(113),r=n.n(c),o=n(369),l=n(114),i=n(103),s=n(0),u=n.n(s),m=n(421),d=n(4),p=n(415),f=n(419),h=n(94),E=n(420),b=n(425),v=function(e){var t=e.messageIn,n=Object(s.useState)(null),a=Object(i.a)(n,2),c=a[0],r=a[1];return Object(s.useEffect)((function(){r(t)}),[t]),u.a.createElement(b.a,{open:!!c,anchorOrigin:{vertical:"top",horizontal:"center"},autoHideDuration:6e3,onClose:function(){r(null)}},u.a.createElement(E.a,{severity:null===c||void 0===c?void 0:c.status},null===c||void 0===c?void 0:c.text))},x=n(416),g=n(360),y=n.n(g),O=n(367),j=n(364),k=n.n(j),S=n(366),I=n.n(S),C=n(413),w=n(365),T=n.n(w),z=n(405),D=n(131),q=n.n(D),R=n(115),L=n(88),H=n(427),N=Object(L.a)((function(e){return Object(H.a)({root:{margin:"20px auto"},accordingTitle:{alignItems:"center"},heading:{fontSize:e.typography.pxToRem(15),flexGrow:1,display:"flex"},secondaryHeading:{marginRight:e.spacing(2),fontSize:e.typography.pxToRem(20)},questionBox:{backgroundColor:"#2D333B",display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},button:{fontSize:e.typography.pxToRem(15),float:"right",display:"flex"}})})),A=function(e){var t=e.content,n=e.isExpanded,a=e.sortIndex,c=e.collapseItem,r=N();return u.a.createElement("div",{style:{padding:"20px"}},u.a.createElement("div",{className:"markdown-body"},u.a.createElement("span",{dangerouslySetInnerHTML:{__html:R.a.makeHtml(t||"")}})),u.a.createElement("div",null,u.a.createElement(z.a,{component:"button",className:r.button,color:"secondary",onClick:function(){c(!n,a)}},"collapse",u.a.createElement(q.a,{fontSize:"small"}))))},F=n(410),J=n(411),M=n(414),B=n(412),G=n(404),_=[{key:"javascript",name:"JavaScript"},{key:"react",name:"React"},{key:"html",name:"HTML"},{key:"css",name:"CSS"},{key:"internet",name:"Internet"}],P=n(426),K=n(409),Q=n(407),U=n(408),V=n(406),W=function(e){var t=e.isOpen,n=e.title,a=e.setIsOpen,c=e.confirmCallback,r=function(){a(!1)};return u.a.createElement("div",null,u.a.createElement(P.a,{open:t,onClose:r,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},u.a.createElement(V.a,{id:"alert-dialog-title"},"Deleting"),u.a.createElement(Q.a,null,u.a.createElement(U.a,{id:"alert-dialog-description"},"Do you want to delete ",u.a.createElement("b",null,n),"?")),u.a.createElement(K.a,null,u.a.createElement(h.a,{onClick:r},"Cancel"),u.a.createElement(h.a,{onClick:function(){r(),c()},autoFocus:!0},"Delete"))))},X=function(e){var t,n=e.collapseItem,a=e.questionList,c=e.onSortEnd,r=e.deleteDoc,o=e.tabIndex,l=e.moveToTop,m=Object(d.f)(),p=Object(s.useState)(!1),f=Object(i.a)(p,2),h=f[0],E=f[1],b=Object(s.useState)(""),v=Object(i.a)(b,2),x=v[0],g=v[1],y=Object(O.b)((function(e){var t=e.value,a=e.sortIndex,c=t.title,r=t.id,i=t.isExpanded,s=t.content;return u.a.createElement(u.a.Fragment,null,u.a.createElement(F.a,{style:{background:"rgb(58, 64, 76)",marginTop:"2px"}},u.a.createElement(J.a,{disableTypography:!0,action:u.a.createElement(u.a.Fragment,null,u.a.createElement(G.a,{onClick:function(){return n(!i,a)},size:"small",color:"inherit","aria-label":"Expand",component:"span"},u.a.createElement(k.a,null)),u.a.createElement(G.a,{onClick:function(){return l(a)},size:"small",color:"inherit","aria-label":"Move to top",component:"span"},u.a.createElement(q.a,null)),u.a.createElement(G.a,{onClick:function(){m.push("/".concat(_[o].key,"/").concat(r))},size:"small",color:"inherit","aria-label":"Move to top",component:"span"},u.a.createElement(T.a,null)),u.a.createElement(G.a,{onClick:function(){g(r),E(!0)},size:"small",color:"inherit","aria-label":"Delete",component:"span"},u.a.createElement(I.a,null))),title:c}),u.a.createElement(B.a,{in:i,timeout:"auto",unmountOnExit:!0},u.a.createElement(C.a,null),u.a.createElement(M.a,null,u.a.createElement(A,{content:s,isExpanded:i,sortIndex:a,collapseItem:n})))),u.a.createElement(C.a,null))})),j=Object(O.a)((function(e){var t=e.items;return u.a.createElement("div",null,(t||[]).map((function(e,t){return u.a.createElement(y,{key:"item-".concat(t),index:t,sortIndex:t,value:e})})))}));return u.a.createElement(u.a.Fragment,null,u.a.createElement(j,{distance:2,items:a||[],onSortEnd:c}),u.a.createElement(W,{isOpen:h,setIsOpen:E,title:null===a||void 0===a||null===(t=a.find((function(e){return e.id===x})))||void 0===t?void 0:t.title,confirmCallback:function(){r(x)}}))};t.default=function(){var e=N(),t=Object(d.g)().hash,n=Object(s.useState)(!1),c=Object(i.a)(n,2),E=c[0],b=c[1],g=Object(s.useState)(null),O=Object(i.a)(g,2),j=O[0],k=O[1],S=Object(s.useState)(null),I=Object(i.a)(S,2),C=I[0],w=I[1],T=_.findIndex((function(e){return e.key===t.replace("#","")})),z=u.a.useState(-1!==T?T:0),D=Object(i.a)(z,2),q=D[0],R=D[1],L=Object(s.useState)([]),H=Object(i.a)(L,2),A=H[0],F=H[1],J=Object(s.useCallback)((function(){Object(l.a)(r.a.mark((function e(){var t,n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return b(!0),e.next=3,fetch("".concat("http://localhost:8000","/documents/").concat(_[q].key));case 3:return t=e.sent,e.next=6,t.json();case 6:n=e.sent,b(!1),F(n.map((function(e){return Object(o.a)(Object(o.a)({},e),{},{isExpanded:!1})})).sort((function(e,t){return e.seq-t.seq})));case 9:case"end":return e.stop()}}),e)})))()}),[q]);Object(s.useEffect)((function(){Object(l.a)(r.a.mark((function e(){var t,n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("http://localhost:8000","/documents/count"));case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,k(n);case 7:case"end":return e.stop()}}),e)})))()}),[q]),Object(s.useEffect)((function(){J()}),[J]);var M=function(){var e=Object(l.a)(r.a.mark((function e(t){var n,a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("http://localhost:8000","/documents/").concat(_[q].key,"/").concat(t),{method:"DELETE"});case 2:return n=e.sent,e.next=5,n.json();case 5:"success"===(a=e.sent).status&&(w({status:a.status,text:a.message}),J());case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),B=function(){var e=Object(l.a)(r.a.mark((function e(t,n){var c,l,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(c=A[n].content,!t||c){e.next=9;break}return e.next=4,fetch("".concat("http://localhost:8000","/documents/").concat(_[q].key,"/").concat(A[n].id),{method:"GET"});case 4:return l=e.sent,e.next=7,l.json();case 7:i=e.sent,c=i.content;case 9:F((function(e){var r=Object(a.a)(e);return r[n]=Object(o.a)(Object(o.a)({},r[n]),{},{isExpanded:t,content:c}),r}));case 10:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),G=function(){var e=Object(l.a)(r.a.mark((function e(){var t,n,a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=A.map((function(e){return e.id})),e.next=3,fetch("".concat("http://localhost:8000","/documents/").concat(_[q].key,"/seq"),{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(t)});case 3:return n=e.sent,e.next=6,n.json();case 6:a=e.sent,w({status:a.status,text:a.message});case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return u.a.createElement("div",{className:e.root},C&&u.a.createElement(v,{messageIn:C}),u.a.createElement(h.a,{onClick:G,color:"secondary"},"Save Order"),u.a.createElement(h.a,{href:"".concat(_[q].key,"/add"),color:"secondary"},"+ Add"),u.a.createElement(m.a,{value:q,onChange:function(e,t){R(t)}},_.map((function(e){var t=e.key,n=e.name;return u.a.createElement(p.a,{key:t,label:"".concat(n," ").concat(j?"(".concat(j[t],")"):"")})}))),u.a.createElement("div",{role:"tabpanel"},u.a.createElement(f.a,{p:3,className:e.questionBox},E?u.a.createElement(x.a,{size:30,color:"secondary"}):u.a.createElement(f.a,{width:"100%"},u.a.createElement(X,{moveToTop:function(e){F((function(t){return y()(t||[],e,0)}))},tabIndex:q,collapseItem:B,onSortEnd:function(e){var t=e.oldIndex,n=e.newIndex;F((function(e){return y()(e||[],t,n)}))},deleteDoc:M,questionList:A}),u.a.createElement(h.a,{href:"".concat(_[q].key,"/add"),color:"secondary"},"+ Add")))))}}}]);
//# sourceMappingURL=7.a7dd70c2.chunk.js.map
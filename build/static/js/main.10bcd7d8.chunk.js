(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),c=t.n(a),r=t(13),u=t.n(r),l=t(2),i=t(3),o=t.n(i),s="/api/persons",m=function(){return o.a.get(s).then(function(e){return e.data})},d=function(e){return o.a.post(s,e)},f=function(e){var n="".concat(s,"/").concat(e);return o.a.delete(n)},b=function(e){var n=e.person,t=e.deleteHandler;return c.a.createElement("li",{className:"person",id:n.id},n.name," ",n.number,c.a.createElement("button",{id:n.id,onClick:t},"delete"))},v=function(e){var n=e.persons,t=e.deleteHandler,a=n.map(function(e){return c.a.createElement(b,{key:e.id,person:e,deleteHandler:t})});return c.a.createElement("div",null,c.a.createElement("h2",null,"Numbers"),c.a.createElement("ul",null,a))},E=function(e){var n=e.name,t=e.number,a=e.onHandleNewEntry,r=e.onNumberInputChange,u=e.onNameInputChange;return c.a.createElement("form",null,c.a.createElement("h2",null,"Add a new number"),c.a.createElement("div",null,"name: ",c.a.createElement("input",{value:n,onChange:u})),c.a.createElement("div",null,"number: ",c.a.createElement("input",{value:t,onChange:r})),c.a.createElement("div",null,c.a.createElement("button",{type:"submit",onClick:a},"add")))},p=function(e){var n=e.filterState,t=e.onChangeListener;return c.a.createElement("div",null,c.a.createElement("h2",null,"Filter"),c.a.createElement("input",{value:n,onChange:t}))},g=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],r=n[1],u=Object(a.useState)(""),i=Object(l.a)(u,2),o=i[0],s=i[1],b=Object(a.useState)(""),g=Object(l.a)(b,2),h=g[0],C=g[1],O=Object(a.useState)(""),j=Object(l.a)(O,2),w=j[0],N=j[1],S=Object(a.useState)({visible:!1,name:"",success:""}),k=Object(l.a)(S,2),H=k[0],y=k[1];Object(a.useEffect)(function(){m().then(function(e){r(e)})},[]);return c.a.createElement("div",null,c.a.createElement("h2",null,"Phonebook"),function(){if(!H.visible)return c.a.createElement(c.a.Fragment,null);var e=H.success?"success":"fail";return setTimeout(function(){y({visible:!1})},3e3),c.a.createElement("p",{className:"notification "+e},H.message)}(),c.a.createElement(p,{filterState:w,onChangeListener:function(e){N(e.target.value)}}),c.a.createElement(E,{onNameInputChange:function(e){s(e.target.value)},onNumberInputChange:function(e){C(e.target.value)},onHandleNewEntry:function(e){e.preventDefault();var n={name:o,number:Number(h)};d(n).then(function(e){console.log(e);var a=e.data;console.log(a),y({visible:!0,success:201===e.status,message:201===e.status?"Added ".concat(a.name):"Can't add ".concat(n.name)}),r(t.concat(a))}).catch(function(e){console.log(e),y({success:!1,visible:!0,message:e.response.data})}),s(""),C("")},number:h,name:o}),c.a.createElement(v,{persons:t.filter(function(e){return-1!==e.name.indexOf(w)}),deleteHandler:function(e){e.preventDefault();var n=e.target.getAttribute("id"),a=t.find(function(e){return e.id===n});window.confirm("Delete ".concat(a.name))&&f(n).then(function(e){204===e.status&&(y({success:!0,visible:!0,message:"".concat(a.name," is deleted")}),r(t.filter(function(e){return e.id!==n})))}).catch(function(e){y({success:!1,visible:!0,message:"".concat(a.name," can not be deleted")}),r(t.filter(function(e){return e.id!==n}))})}}))};t(36);u.a.render(c.a.createElement(g,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.10bcd7d8.chunk.js.map
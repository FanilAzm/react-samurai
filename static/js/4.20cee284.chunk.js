(this["webpackJsonpsamurai-1"]=this["webpackJsonpsamurai-1"]||[]).push([[4],{296:function(e,s,a){e.exports={dialogs:"Dialogs_dialogs__2xRSA",dialogsItems:"Dialogs_dialogsItems__2sNe2",dialog:"Dialogs_dialog__lk_cw",active:"Dialogs_active__2sQhs",messages:"Dialogs_messages__1w_Up"}},302:function(e,s,a){e.exports={newMessage:"CreateNewMessage_newMessage__2l17K"}},305:function(e,s,a){"use strict";a.r(s);a(0);var t=a(14),n=a(296),i=a.n(n),c=a(1),o=function(e){var s="/dialogs/"+e.id;return Object(c.jsx)("div",{className:i.a.dialog+" "+i.a.active,children:Object(c.jsxs)(t.b,{to:s,children:[Object(c.jsx)("img",{}),e.name]})})},r=function(e){return Object(c.jsx)("div",{className:i.a.message,children:e.message})},d=a(126),l=a(127),u=a(128),g=a(72),j=a(73),m=a(302),b=a.n(m),x=Object(g.a)(10),O=Object(u.a)({form:"CreateNewMessage"})((function(e){return Object(c.jsxs)("form",{className:b.a.newMessage,onSubmit:e.handleSubmit,children:[Object(c.jsx)(l.a,{type:"text",component:j.a,name:"newMessageText",validate:[g.b,x]}),Object(c.jsx)("button",{children:"Send"})]})})),_=function(e){return Object(c.jsx)(O,{onSubmit:function(s){e.addMessage(s.newMessageText)}})},f=a(12),h=Object(f.b)(null,(function(e){return{addMessage:function(s){e(Object(d.a)(s))}}}))(_),p=function(e){var s=e.state.dialogs.map((function(e){return Object(c.jsx)(o,{name:e.name,id:e.id},e.id)})),a=e.state.messages.map((function(e){return Object(c.jsx)(r,{message:e.message},e.id)}));return Object(c.jsxs)("div",{className:i.a.dialogs,children:[Object(c.jsx)("div",{className:i.a.dialogsItems,children:s}),Object(c.jsxs)("div",{className:i.a.messages,children:[a,Object(c.jsx)(h,{store:e.store})]})]})},v=a(94),w=a(9),M=function(e){return e.dialogsPage};s.default=Object(w.d)(Object(f.b)((function(e){return{state:M(e)}}),(function(){return{}})),v.a)(p)}}]);
//# sourceMappingURL=4.20cee284.chunk.js.map
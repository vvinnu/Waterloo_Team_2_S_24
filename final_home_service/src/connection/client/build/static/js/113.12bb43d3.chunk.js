"use strict";(self.webpackChunkhomeservices=self.webpackChunkhomeservices||[]).push([[113],{513:function(e,s,r){r.r(s);var t=r(942),n=r(413),o=r(152),a=r(791),i=r(226),c=r(871),l=r(885),p=r.n(l),d=r(184);s.default=function(){var e=(0,c.s0)(),s=(new(p()),(0,a.useState)()),r=(0,o.Z)(s,2),l=r[0],u=r[1],m=function(e){u((0,n.Z)((0,n.Z)({},l),{},(0,t.Z)({},e.target.name,e.target.value)))};return(0,d.jsx)(d.Fragment,{children:(0,d.jsx)("div",{className:"space",children:(0,d.jsx)("div",{className:"form_wrapper",children:(0,d.jsxs)("div",{className:"form_container",children:[(0,d.jsx)("div",{className:"title_container",style:{marginBottom:"-72px",fontSize:"20px"},children:(0,d.jsx)("h1",{children:"Reset Password"})}),(0,d.jsx)("div",{className:"row clearfix",children:(0,d.jsx)("div",{className:"",children:(0,d.jsxs)("form",{children:[(0,d.jsxs)("div",{className:"row clearfix",children:[(0,d.jsx)("div",{children:(0,d.jsxs)("div",{className:"input_field",children:[" ",(0,d.jsx)("span",{children:(0,d.jsx)("i",{"aria-hidden":"true",className:"fa fa-lock"})}),(0,d.jsx)("input",{type:"password",name:"password",placeholder:"New Password",onChange:m})]})}),(0,d.jsx)("div",{children:(0,d.jsxs)("div",{className:"input_field",children:[" ",(0,d.jsx)("span",{children:(0,d.jsx)("i",{"aria-hidden":"true",className:"fa fa-lock"})}),(0,d.jsx)("input",{type:"password",name:"cpassword",placeholder:"Confirm Password",onChange:m})]})})]}),(0,d.jsxs)("div",{className:"row clearfix",children:[(0,d.jsx)("div",{className:"col_half",children:(0,d.jsx)("input",{className:"button",type:"button",onClick:function(){if(null!=l)if(console.log(l),l.password==l.cpassword){var s=new FormData;s.append("otp",localStorage.getItem("otp")),s.append("password",l.password),fetch("http://localhost:5050/updatepassword",{method:"POST",body:s}).then((function(e){return e.json()})).then((function(s){console.log(s),"success"==s.status?(localStorage.removeItem("otp"),(0,i.Z)({message:s.message,position:"right",type:"success"}),e("/Login")):(0,i.Z)({message:s.message,position:"right",type:"error"})}))}else(0,i.Z)({message:"Password_and_Re-password_doesn't_match...",position:"right",type:"error"});else(0,i.Z)({message:"Please_fill_data",position:"right",type:"error"})},value:"Save",width:"10px",style:{color:"black"}})}),(0,d.jsxs)("div",{className:"col_half",children:[" ",(0,d.jsx)("input",{onClick:function(){e("/")},className:"button",type:"button",value:"Cancel",style:{color:"black"}})]})]})]})})})]})})})})}},226:function(e,s,r){r(791);var t=r(577);r(462);t.Am.configure();s.Z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{message:"yes",position:"center",type:"success"};void 0==e.message&&(e.message="ok yes");var s={position:t.Am.POSITION.BOTTOM_LEFT};return"center"==e.position&&(s.position=t.Am.POSITION.BOTTOM_CENTER),"right"==e.position&&(s.position=t.Am.POSITION.BOTTOM_RIGHT),"success"==e.type?t.Am.success(e.message,s):"error"==e.type?t.Am.error(e.message,s):"info"==e.type?t.Am.info(e.message,s):void 0}},942:function(e,s,r){function t(e,s,r){return s in e?Object.defineProperty(e,s,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[s]=r,e}r.d(s,{Z:function(){return t}})},413:function(e,s,r){r.d(s,{Z:function(){return o}});var t=r(942);function n(e,s){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);s&&(t=t.filter((function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable}))),r.push.apply(r,t)}return r}function o(e){for(var s=1;s<arguments.length;s++){var r=null!=arguments[s]?arguments[s]:{};s%2?n(Object(r),!0).forEach((function(s){(0,t.Z)(e,s,r[s])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(s){Object.defineProperty(e,s,Object.getOwnPropertyDescriptor(r,s))}))}return e}}}]);
//# sourceMappingURL=113.12bb43d3.chunk.js.map
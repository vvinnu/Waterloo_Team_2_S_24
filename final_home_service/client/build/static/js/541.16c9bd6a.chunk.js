"use strict";(self.webpackChunkhomeservices=self.webpackChunkhomeservices||[]).push([[541],{928:function(e,s,t){t.r(s);var n=t(942),r=t(413),a=t(152),i=t(577),o=t(871),c=t(226),l=t(791),m=t(885),d=t.n(m),u=(t(462),t(993)),p=t(184);s.default=function(){var e=(0,o.s0)(),s=(0,l.useState)(0),t=(0,a.Z)(s,2),m=t[0],h=t[1],f=(0,l.useState)({}),g=(0,a.Z)(f,2),j=g[0],x=g[1],v=function(e){x((0,r.Z)((0,r.Z)({},j),{},(0,n.Z)({},e.target.name,e.target.value)))},b=(0,l.useState)([]),O=(0,a.Z)(b,2);return O[0],O[1],new(d()),(0,l.useEffect)((function(){x({})}),[m]),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("section",{id:"contact",className:"contact",children:(0,p.jsxs)("div",{className:"container","data-aos":"fade-up",children:[(0,p.jsxs)("div",{className:"section-title",children:[(0,p.jsx)("h2",{style:{marginTop:"68px",padding:"11px",marginLeft:"14px"},children:"Contact"}),(0,p.jsx)("p",{style:{padding:"22px"},children:"Contact Us"})]}),(0,p.jsx)(i.Ix,{}),(0,p.jsx)("div",{children:(0,p.jsx)("iframe",{src:"https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2895.1139029471224!2d-80.51938219476094!3d43.47909326724113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sca!4v1718912619478!5m2!1sen!2sca",style:{border:"0",width:"100%",height:"270px"},allowfullscreen:"",loading:"lazy"})}),(0,p.jsxs)("div",{className:"row mt-5",children:[(0,p.jsx)("div",{className:"col-lg-4",children:(0,p.jsxs)("div",{className:"info",children:[(0,p.jsxs)("div",{className:"address",children:[(0,p.jsx)("i",{className:"bi bi-geo-alt"}),(0,p.jsx)("h4",{children:"Location:"}),(0,p.jsx)("p",{children:"221 King street, Waterloo, Ontario, N2B 1G1"})]}),(0,p.jsxs)("div",{className:"email",children:[(0,p.jsx)("i",{className:"bi bi-envelope"}),(0,p.jsx)("h4",{children:"Email:"}),(0,p.jsx)("p",{children:"support@homeservice.org"})]}),(0,p.jsxs)("div",{className:"phone",children:[(0,p.jsx)("i",{className:"bi bi-phone"}),(0,p.jsx)("h4",{children:"Call:"}),(0,p.jsx)("p",{children:"+1 4354626492"})]})]})}),(0,p.jsx)("div",{className:"col-lg-8 mt-5 mt-lg-0",children:(0,p.jsxs)("form",{method:"post",role:"form",className:"php-email-form",children:[(0,p.jsxs)("div",{className:"row",children:[(0,p.jsx)("div",{className:"col-md-6 form-group",children:(0,p.jsx)("input",{type:"text",name:"name",value:j.name?j.name:"",className:"form-control",id:"name",placeholder:"Your Name",required:!0,onChange:v})}),(0,p.jsx)("div",{className:"col-md-6 form-group mt-3 mt-md-0",children:(0,p.jsx)("input",{type:"email",className:"form-control",value:j.email?j.email:"",name:"email",id:"email",placeholder:"Your Email",required:!0,onChange:v})})]}),(0,p.jsx)("div",{className:"form-group mt-3",children:(0,p.jsx)("input",{type:"text",className:"form-control",value:j.subject?j.subject:"",name:"subject",id:"subject",placeholder:"Subject",required:!0,onChange:v})}),(0,p.jsx)("div",{className:"form-group mt-3",children:(0,p.jsx)("textarea",{className:"form-control",name:"message",value:j.message?j.message:"",rows:"5",placeholder:"Message",required:!0,onChange:v})}),(0,p.jsx)("div",{className:"text-center",children:(0,p.jsx)("button",{type:"submit",onClick:function(s){s.preventDefault(),console.log("Contact"),console.log(j);var t={method:"POST",body:JSON.stringify(j),headers:{"Content-Type":"application/json"}};fetch("http://localhost:3001/Contact",t).then((function(e){return e.json()})).then((function(s){console.log(s.id),"Success"==s.status?((0,c.Z)({message:s.message,position:"right",type:"success"}),x({}),e("/Contact")):(0,c.Z)({message:s.message,position:"right",type:"error"}),h(1)}))},children:"Send Message"})})]})})]})]})}),(0,p.jsx)(u.Z,{})]})}},226:function(e,s,t){t(791);var n=t(577);t(462);n.Am.configure();s.Z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{message:"yes",position:"center",type:"success"};void 0==e.message&&(e.message="ok yes");var s={position:n.Am.POSITION.BOTTOM_LEFT};return"center"==e.position&&(s.position=n.Am.POSITION.BOTTOM_CENTER),"right"==e.position&&(s.position=n.Am.POSITION.BOTTOM_RIGHT),"success"==e.type?n.Am.success(e.message,s):"error"==e.type?n.Am.error(e.message,s):"info"==e.type?n.Am.info(e.message,s):void 0}},942:function(e,s,t){function n(e,s,t){return s in e?Object.defineProperty(e,s,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[s]=t,e}t.d(s,{Z:function(){return n}})},413:function(e,s,t){t.d(s,{Z:function(){return a}});var n=t(942);function r(e,s){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);s&&(n=n.filter((function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable}))),t.push.apply(t,n)}return t}function a(e){for(var s=1;s<arguments.length;s++){var t=null!=arguments[s]?arguments[s]:{};s%2?r(Object(t),!0).forEach((function(s){(0,n.Z)(e,s,t[s])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(s){Object.defineProperty(e,s,Object.getOwnPropertyDescriptor(t,s))}))}return e}}}]);
//# sourceMappingURL=541.16c9bd6a.chunk.js.map
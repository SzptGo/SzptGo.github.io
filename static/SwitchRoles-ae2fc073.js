import{b as a,H as e,a as s,n as l,f as o,o as t,h as n,y as d,t as i,l as r,i as u,w as c,J as m,L as p,_ as v}from"./index-dedb117b.js";const h={class:"switch-roles"},_=(a=>(m("data-v-21f43ea2"),a=a(),p(),a))((()=>d("span",null,"切换权限：",-1))),f=v(a({__name:"SwitchRoles",emits:["change"],setup(a,{emit:m}){const p=e(),v=s(p.roles[0]);return l(v,(async a=>{await p.changeRoles(a),m("change")})),(a,e)=>{const s=o("el-radio-button"),l=o("el-radio-group");return t(),n("div",null,[d("div",null,"你的权限："+i(r(p).roles),1),d("div",h,[_,u(l,{modelValue:v.value,"onUpdate:modelValue":e[0]||(e[0]=a=>v.value=a)},{default:c((()=>[u(s,{label:"editor"}),u(s,{label:"admin"})])),_:1},8,["modelValue"])])])}}}),[["__scopeId","data-v-21f43ea2"]]);export{f as S};

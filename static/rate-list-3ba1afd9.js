import{aa as e,b as a,a as l,r as t,W as r,n as o,h as i,Y as n,j as u,w as d,i as s,f as c,aj as p,o as m,y as g,C as v,l as f,ah as h,am as b,t as w,ad as _,ae as C,E as V,_ as x}from"./index-dedb117b.js";import{u as y}from"./usePagination-5d39ef15.js";import{O as S}from"./order-status-tag-037bef19.js";import{p as z,f as I}from"./image-4350c0eb.js";const L={class:"app-container"},j={class:"toolbar-wrapper"},k={class:"table-wrapper"},U={class:"pager-wrapper"},P=a({name:"ElementPlus"}),T=x(a({...P,setup(x){a({OrderStatusTag:S});const P=l(!1),T=t("http://110.41.150.2:32976/image/"),D=t("/api/v1/upload"),{paginationData:R,handleCurrentChange:$,handleSizeChange:E}=y(),B=l(!1),q=()=>{},F=l([]),O=a=>{C.confirm("确定删除该评论吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{var l;(l=a.id,e({url:`/TbRate/${l}`,method:"delete"})).then((e=>{e.data?(V.success("删除成功"),X()):V.error("删除失败")}))}))},A=e=>{F.value=e},M=()=>{const a=[];F.value.forEach((e=>{a.push(e.id)})),function(a){return e({url:"/TbRate/batch",method:"delete",params:{ids:a}})}(a.join(",")).then((e=>{e.data?(V.success("删除成功"),X()):V.error("删除失败")}))},W=l(),Y=t({reviewContent:[{required:!0,trigger:"blur",message:"请输入评论内容"}]}),G=r(),H=()=>{G.proxy.$refs.editFormRef.validate((a=>{if(!a)return;const l=W.value;var t;l.srcList=void 0,l.images=I(K.value),(t=l,e({url:`/TbRate/${t.id}`,method:"put",data:t})).then((e=>{e.data?(B.value=!1,X(),V.success("修改成功")):V.error("修改失败")}))}))},J=["image/jpeg","image/png","image/jpg","image/gif"],K=l([]),N=e=>{const{type:a,size:l}=e;return J.includes(a)?!(l>2097152)||(V.error("图片必须小于2MB"),!1):(V.error("图片格式不支持！"),!1)},Q=l([]),X=()=>{P.value=!0,function(a=1,l=10){return e({url:`/TbRate/getListAdmin/${a}/${l}`,method:"get"})}(R.currentPage,R.pageSize).then((e=>{Q.value=e.data.records,R.total=e.data.total,Q.value.forEach((e=>{e.srcList=e.images.split(",");for(let a=0;a<e.srcList.length;a++)e.srcList[a]=T+e.srcList[a]}))})),P.value=!1},Z=()=>{X()};return o([()=>R.currentPage,()=>R.pageSize],X,{immediate:!0}),(e,a)=>{const l=c("el-button"),t=c("el-tooltip"),r=c("el-table-column"),o=c("el-rate"),C=c("el-image"),V=c("el-table"),x=c("el-pagination"),y=c("el-card"),S=c("el-form-item"),I=c("el-input"),T=c("el-icon"),F=c("el-upload"),G=c("el-form"),J=c("el-dialog"),X=p("loading");return m(),i("div",L,[n((m(),u(y,{shadow:"never"},{default:d((()=>[g("div",j,[g("div",null,[s(l,{type:"danger",icon:f(h),onClick:M},{default:d((()=>[v("批量删除")])),_:1},8,["icon"])]),g("div",null,[s(t,{content:"刷新表格"},{default:d((()=>[s(l,{type:"primary",icon:f(b),circle:"",onClick:Z},null,8,["icon"])])),_:1})])]),g("div",k,[s(V,{data:Q.value,onSelectionChange:A},{default:d((()=>[s(r,{type:"selection",width:"50",align:"center"}),s(r,{label:"评论 ID",prop:"id",align:"center"}),s(r,{prop:"orderId",label:"订单 ID",align:"center"}),s(r,{prop:"productId",label:"productId",align:"center"}),s(r,{label:"商品评分",align:"center","min-width":"120px"},{default:d((e=>[s(o,{modelValue:e.row.productStar,"onUpdate:modelValue":a=>e.row.productStar=a,disabled:"","show-score":"","text-color":"#ff9900","score-template":"{value}分"},null,8,["modelValue","onUpdate:modelValue"])])),_:1}),s(r,{label:"服务评分",align:"center","min-width":"120px"},{default:d((e=>[s(o,{modelValue:e.row.serviceStar,"onUpdate:modelValue":a=>e.row.serviceStar=a,disabled:"","show-score":"","text-color":"#ff9900","score-template":"{value}分"},null,8,["modelValue","onUpdate:modelValue"])])),_:1}),s(r,{prop:"reviewContent",label:"评论内容",align:"center"}),s(r,{label:"评论图片",align:"center","min-width":"160px"},{default:d((e=>[s(C,{style:{width:"100px",height:"100px"},src:e.row.srcList[0],"zoom-rate":1.2,"preview-src-list":e.row.srcList,"initial-index":4,fit:"cover","preview-teleported":!0},null,8,["src","zoom-rate","preview-src-list"]),g("div",null,"共"+w(e.row.srcList.length)+"张(点击图片查看)",1)])),_:1}),s(r,{fixed:"right",label:"操作",width:"250",align:"center"},{default:d((e=>[s(l,{type:"primary",text:"",bg:"",size:"small",onClick:a=>{return l=e.row,W.value=l,K.value=z(l.images),void(B.value=!0);var l}},{default:d((()=>[v("修改")])),_:2},1032,["onClick"]),s(l,{type:"danger",text:"",bg:"",size:"small",onClick:a=>O(e.row)},{default:d((()=>[v("删除")])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"])]),g("div",U,[s(x,{background:"",layout:f(R).layout,"page-sizes":f(R).pageSizes,total:f(R).total,"page-size":f(R).pageSize,currentPage:f(R).currentPage,onSizeChange:f(E),onCurrentChange:f($)},null,8,["layout","page-sizes","total","page-size","currentPage","onSizeChange","onCurrentChange"])])])),_:1})),[[X,P.value]]),s(J,{modelValue:B.value,"onUpdate:modelValue":a[5]||(a[5]=e=>B.value=e),title:"修改评论",onClose:q,width:"500px"},{footer:d((()=>[s(l,{onClick:a[4]||(a[4]=e=>B.value=!1)},{default:d((()=>[v("取消")])),_:1}),s(l,{type:"primary",onClick:H},{default:d((()=>[v("确认修改")])),_:1})])),default:d((()=>[s(G,{ref:"editFormRef",model:W.value,rules:Y,"label-width":"100px","label-position":"left"},{default:d((()=>[s(S,{label:"评论 ID"},{default:d((()=>[v(w(W.value.id),1)])),_:1}),s(S,{label:"商品 ID"},{default:d((()=>[v(w(W.value.productId),1)])),_:1}),s(S,{label:"订单 ID"},{default:d((()=>[v(w(W.value.orderId),1)])),_:1}),s(S,{label:"商品评分"},{default:d((()=>[s(o,{modelValue:W.value.productStar,"onUpdate:modelValue":a[0]||(a[0]=e=>W.value.productStar=e)},null,8,["modelValue"])])),_:1}),s(S,{label:"服务评分"},{default:d((()=>[s(o,{modelValue:W.value.serviceStar,"onUpdate:modelValue":a[1]||(a[1]=e=>W.value.serviceStar=e)},null,8,["modelValue"])])),_:1}),s(S,{label:"评论内容",prop:"reviewContent"},{default:d((()=>[s(I,{type:"textarea",modelValue:W.value.reviewContent,"onUpdate:modelValue":a[2]||(a[2]=e=>W.value.reviewContent=e)},null,8,["modelValue"])])),_:1}),s(S,{label:"评论图片"},{default:d((()=>[s(F,{action:D,"file-list":K.value,"onUpdate:fileList":a[3]||(a[3]=e=>K.value=e),"before-upload":N,"list-type":"picture-card","show-file-list":"",limit:5},{default:d((()=>[s(T,null,{default:d((()=>[s(f(_))])),_:1})])),_:1},8,["action","file-list"])])),_:1})])),_:1},8,["model","rules"])])),_:1},8,["modelValue"])])}}}),[["__scopeId","data-v-e5ccad01"]]);export{T as default};

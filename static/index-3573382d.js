import{b as e,a,r as l,h as t,Y as r,j as i,w as d,i as o,f as n,aj as u,o as s,y as c,C as p,l as m,ag as v,am as f,D as g,t as y,q as h,F as b,p as _,E as C,ae as w,J as x,L as I,_ as k}from"./index-370541b8.js";import{g as N,a as U,b as T,e as V,c as j,d as B,f as E}from"./index-eb5fd311.js";const q=e=>(x("data-v-435dcba2"),e=e(),I(),e),z={class:"app-container"},P={class:"toolbar-wrapper"},G={class:"card-container"},J=q((()=>c("div",{class:"el-upload__text"},[p("拖拽文件上传或"),c("em",null,"点击上传")],-1))),D=q((()=>c("div",{class:"el-upload__tip"},"仅支持JPG/PNG/JPEG格式的图片(且小于2MB)",-1))),M=e({name:"ElementPlus"}),$=k(e({...M,setup(e){const x=a(!1),I=l("http://110.41.150.2:32976/image"),k=l("http://110.41.150.2/api/upload");function q(){return K.value===F.parentCatId||!F.parentCatId}const M=a(!1),$=a(null),F=l({catName:"",parentCatId:"",imageUrl:""}),L=l({catName:[{required:!0,trigger:"blur",message:"请输入分类名"}],parentCat:[{required:!1,trigger:"blur",message:"请选择"}]}),R=()=>{var e;null==(e=$.value)||e.validate((e=>{if(!e)return!1;void 0===K.value?q()?T(F.catName).then((()=>{C.success("新增成功"),M.value=!1,W()})):U({categoryTypeId:F.parentCatId,name:F.catName,picture:F.imageUrl}).then((()=>{C.success("新增成功"),M.value=!1,W()})):q()?V(K.value,F.catName).then((()=>{C.success("修改成功"),M.value=!1,W()})):j({id:K.value,categoryTypeId:F.parentCatId,name:F.catName,picture:F.imageUrl}).then((()=>{C.success("修改成功"),M.value=!1,W()}))}))},S=()=>{K.value=void 0,F.catName="",F.parentCatId="",F.imageUrl=""},Y=["image/jpeg","image/png","image/jpg"],A=e=>{F.imageUrl=e.data},H=e=>{const{type:a,size:l}=e;return Y.includes(a)?!(l>2097152)||(C.error("图片必须小于2MB"),!1):(C.error("图片格式不支持！"),!1)},K=a(void 0),O=a([]),Q=a([]),W=async()=>{x.value=!0;try{const e=(await N()).data;e.forEach((e=>{var a;null==(a=e.categories)||a.forEach(((a,l)=>{var t;a.id||null==(t=e.categories)||t.splice(l,1),a.categoryTypeId=e.id}))})),Q.value=e,O.value=e.map((e=>({id:e.id,name:e.name})))}catch(e){console.error(e),Q.value=[],O.value=[]}finally{x.value=!1}};return W(),(e,a)=>{const l=n("el-button"),N=n("el-tooltip"),U=n("el-table-column"),T=n("el-image"),V=n("el-text"),j=n("el-table"),Y=n("el-card"),X=n("el-input"),Z=n("el-form-item"),ee=n("el-option"),ae=n("el-select"),le=n("upload-filled"),te=n("el-icon"),re=n("el-upload"),ie=n("el-form"),de=n("el-dialog"),oe=u("loading");return s(),t("div",z,[r((s(),i(Y,{shadow:"never"},{default:d((()=>[c("div",P,[c("div",null,[o(l,{type:"primary",icon:m(v),onClick:a[0]||(a[0]=e=>M.value=!0)},{default:d((()=>[p("新增分类")])),_:1},8,["icon"])]),c("div",null,[o(N,{content:"刷新表格"},{default:d((()=>[o(l,{type:"primary",icon:m(f),circle:"",onClick:W},null,8,["icon"])])),_:1})])]),o(j,{data:Q.value,style:{width:"100%"},"row-key":"id",border:"","default-expand-all":"","tree-props":{children:"categories"}},{default:d((()=>[o(U,{prop:"id",label:"id",width:"200"}),o(U,{prop:"name",label:"分类"},{default:d((e=>[e.row.picture?(s(),i(T,{key:0,style:{width:"50px",height:"50px"},src:I+e.row.picture},null,8,["src"])):g("",!0),o(V,null,{default:d((()=>[p(y(e.row.name),1)])),_:2},1024)])),_:1}),o(U,{fixed:"right",label:"操作",width:"170",align:"center"},{default:d((e=>[o(l,{type:"primary",text:"",bg:"",size:"small",icon:"Edit",onClick:a=>{return l=e.row,K.value=l.id,F.catName=l.name,l.categoryTypeId?(F.parentCatId=l.categoryTypeId,F.imageUrl=l.picture):F.parentCatId=l.id,void(M.value=!0);var l}},{default:d((()=>[p("修改")])),_:2},1032,["onClick"]),o(l,{type:"danger",text:"",bg:"",size:"small",icon:"Delete",onClick:a=>{var l;(l=e.row).id?"categoryTypeId"in l?w.confirm(`您确定删除【${l.name}】分类吗？`,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{B(l.id).then((()=>{C.success("删除成功"),W()}))})):w.confirm(`您确定删除【${l.name}】父分类吗？删除后该分类下的所有子分类也会删除！`,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{E(l.id).then((()=>{C.success("删除成功"),W()}))})):C.error("无法删除该分类！")}},{default:d((()=>[p("删除")])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"])])),_:1})),[[oe,x.value]]),o(de,{modelValue:M.value,"onUpdate:modelValue":a[5]||(a[5]=e=>M.value=e),title:void 0===K.value?"新增分类":"修改分类",onClose:S},{footer:d((()=>[o(l,{onClick:a[4]||(a[4]=e=>M.value=!1)},{default:d((()=>[p("取消")])),_:1}),o(l,{type:"primary",onClick:R},{default:d((()=>[p("确认")])),_:1})])),default:d((()=>[o(ie,{model:F,ref_key:"formRef",ref:$,rules:L,"label-position":"left","label-width":"80px",size:"default",onSubmit:a[3]||(a[3]=h((()=>{}),["prevent"]))},{default:d((()=>[c("div",G,[o(Z,{label:"分类名",prop:"catName",class:"required"},{default:d((()=>[o(X,{modelValue:F.catName,"onUpdate:modelValue":a[1]||(a[1]=e=>F.catName=e),type:"text",clearable:"",placeholder:"请输入分类名"},null,8,["modelValue"])])),_:1}),void 0!==K.value&&q()?g("",!0):(s(),i(Z,{key:0,label:"父分类(不选则为新增父分类)","label-width":"200",prop:"parentCat"},{default:d((()=>[o(ae,{modelValue:F.parentCatId,"onUpdate:modelValue":a[2]||(a[2]=e=>F.parentCatId=e),class:"full-width-input",clearable:"",placeholder:"无"},{default:d((()=>[(s(!0),t(b,null,_(O.value,(e=>(s(),i(ee,{key:e.id,label:e.name,value:e.id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})),q()?g("",!0):(s(),i(Z,{key:1,label:"图片",prop:"imgUpload"},{default:d((()=>[o(re,{class:"upload-demo",drag:"",action:k,"on-success":A,"before-upload":H},{tip:d((()=>[D])),default:d((()=>[c("div",null,[F.imageUrl?(s(),i(T,{key:0,src:I+F.imageUrl,style:{width:"100px",height:"100px"}},null,8,["src"])):g("",!0)]),o(te,{class:"el-icon--upload"},{default:d((()=>[o(le)])),_:1}),J])),_:1},8,["action"])])),_:1}))])])),_:1},8,["model","rules"])])),_:1},8,["modelValue","title"])])}}}),[["__scopeId","data-v-435dcba2"]]);export{$ as default};
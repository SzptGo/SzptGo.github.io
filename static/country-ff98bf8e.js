import{aa as t}from"./index-dedb117b.js";function r(r=1,n=9999){return t({url:`TbCarCountry/getList/${r}/${n}`,method:"get"})}function n(r){return t({url:"TbCarCountry",method:"post",data:r})}function u(r){return t({url:`TbCarCountry/${r}`,method:"delete"})}function o(r){return t({url:`TbCarCountry/${r.countryId}`,method:"put",data:r})}export{n as a,u as d,o as e,r as g};

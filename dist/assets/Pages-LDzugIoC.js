import{j as s,r as o,d as c}from"./index-tAmM7JxE.js";function f({clickEvent:r,title:x}){return s.jsx("button",{className:"w-[48px] h-[32px] rounded-md bg-slate-500 text-slate-50 text-[0.6rem]/[0.5rem] font-extrabold p-1 transition-transform focus:border-[1px] focus:border-slate-900 focus:bg-slate-200 focus:text-blue-600 active:scale-50 hover:-translate-y-[3px] hover:shadow-md hover:shadow-black/75",title:"Переход",onClick:r,children:x})}const E=0,l=308;function y({paramPageCount:r,paramChangePage:x,paramCurrPage:d}){const[v,w]=o.useState([]),[u,i]=o.useState(E),[n,m]=o.useState(0),a=o.useRef(null);if(r<1)return;o.useEffect(()=>{let e=[];for(let t=0;t<r;t++)e[t]=t;w(e)},[r]),o.useEffect(()=>{if(a.current){let e=a.current.clientWidth;e!==0&&m(e)}},[a.current]);const j=e=>{if(e.preventDefault(),n<l)return;let t=n-l;u<t?i(h=>h+l):p(e)},k=e=>{e.preventDefault(),!(n<l)&&(u>l-1?i(t=>t-l):b(e))},p=e=>{e.preventDefault(),!(n<l)&&i(n-l+8)},b=e=>{e.preventDefault(),!(n<l)&&i(0)};return o.useEffect(()=>{let e=Math.round(l/c),t=e*(d+1)-e*3;r>c&&t>l-l/2&&i(t)},[d]),s.jsx(s.Fragment,{children:s.jsxs("div",{className:"w-[300px] md:w-[514px] mx-auto flex flex-wrap gap-x-1 items-center justify-center mb-5",children:[r>c&&s.jsx(f,{title:"<<",clickEvent:b}),r>c*2&&s.jsx(f,{title:"<",clickEvent:k}),s.jsx("div",{className:"w-[300px] h-[3.5rem] overflow-hidden relative",children:s.jsx("ul",{ref:a,className:"w-fit flex gap-x-3 items-center py-2 absolute top-0 transition-all",style:{left:`${-u}px`},children:v.map((e,t)=>s.jsx("li",{className:"cursor-pointer",children:s.jsx("button",{className:t!==d?"w-[30px] h-[30px] relative rounded-lg px-4 py-2 bg-slate-400 text-slate-50 text-[12px]/[10px] hover:bg-slate-300 hover:text-black hover:shadow-md hover:shadow-black hover:transition-all focus:bg-yellow-300 focus:border-[1px] focus:border-blue-700 focus:shadow-md focus:shadow-black focus:font-bold focus:text-red-700":"w-[30px] h-[30px] relative rounded-lg px-4 py-2 text-[12px]/[10px] bg-white border-[1px] border-blue-700 font-bold text-red-700",onClick:h=>x(h,t),children:s.jsx("span",{className:"absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]",children:e+1})})},e+Math.random()))})}),r>c*2&&s.jsx(f,{title:">",clickEvent:j}),r>c&&s.jsx(f,{title:">>",clickEvent:p})]})})}export{y as default};

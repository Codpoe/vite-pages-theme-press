var e=Object.defineProperty,n=Object.defineProperties,t=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,i=(n,t,r)=>t in n?e(n,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):n[t]=r,l=(e,n)=>{for(var t in n||(n={}))a.call(n,t)&&i(e,t,n[t]);if(r)for(var t of r(n))o.call(n,t)&&i(e,t,n[t]);return e};import{c}from"./index.95e7da78.js";const s={};function p(e){var i,p=e,{components:m}=p,u=((e,n)=>{var t={};for(var i in e)a.call(e,i)&&n.indexOf(i)<0&&(t[i]=e[i]);if(null!=e&&r)for(var i of r(e))n.indexOf(i)<0&&o.call(e,i)&&(t[i]=e[i]);return t})(p,["components"]);return c("wrapper",(i=l(l({},s),u),n(i,t({components:m,mdxType:"MDXLayout"}))),c("h1",null,"API"),c("h2",null,"createTheme"),c("pre",null,c("code",l({parentName:"pre"},{className:"language-ts"}),"function createTheme(options?: CreateThemeOptions): React.FunctionComponent;\n")),c("h2",null,"CreateThemeOptions"),c("pre",null,c("code",l({parentName:"pre"},{className:"language-ts"}),"interface CreateThemeOptions {\n  [key: string]: any;\n  logo?: string;\n  title?: string;\n  nav?: NavItem[];\n  sidebar?: SidebarItem[];\n}\n\ninterface NavItem {\n  [key: string]: any;\n  text: React.ReactNode;\n  link?: string;\n  items?: NavItem[];\n}\n\ninterface SidebarItem {\n  [key: string]: any;\n  text: React.ReactNode;\n  link?: string;\n  items?: SidebarItem[];\n}\n")))}p.isMDXComponent=!0;var m=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:p});const u={};u.main=m;export default u;

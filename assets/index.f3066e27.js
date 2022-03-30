var g=Object.defineProperty;var a=Object.getOwnPropertySymbols;var m=Object.prototype.hasOwnProperty,y=Object.prototype.propertyIsEnumerable;var c=(i,t,e)=>t in i?g(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e,d=(i,t)=>{for(var e in t||(t={}))m.call(t,e)&&c(i,e,t[e]);if(a)for(var e of a(t))y.call(t,e)&&c(i,e,t[e]);return i};var r=(i,t,e)=>(c(i,typeof t!="symbol"?t+"":t,e),e);const x=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}};x();const f=(i,t)=>(i=Math.ceil(i),t=Math.floor(t),Math.floor(Math.random()*(t-i))+i),u=i=>i[Math.floor(Math.random()*i.length)],w=i=>{const t=u(["x","y"]),e=u([-1,1]),l=d({},i);return l[t]+=e,l};class S{constructor(t){r(this,"x");r(this,"y");r(this,"game");this.game=t,this.x=f(0,this.game.width),this.y=f(0,this.game.height)}draw(){this.game.ctx.fillStyle="#CD5700",this.game.ctx.fillRect(this.x*this.game.tileSize,this.y*this.game.tileSize,this.game.tileSize,this.game.tileSize)}update(){for(;;){const t=w(this);if(!this.game.isColliding(t)){this.x=t.x,this.y=t.y;break}}}}const h=[[0,0,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,0,0,0],[0,1,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]];class p{constructor(){r(this,"cats",[]);r(this,"ctx");r(this,"walls",h);r(this,"width",10);r(this,"height",10);r(this,"tileSize",40);r(this,"isColliding",t=>t.x<0||t.y<0||t.x>=this.width||t.y>=this.height||h[t.y][t.x]||this.cats.find(e=>e.x===t.x&&e.y===t.y));const t=document.createElement("canvas");t.width=this.width*this.tileSize,t.height=this.height*this.tileSize,document.body.appendChild(t),this.ctx=t.getContext("2d")}start(){this.generate(),setInterval(()=>{this.update(),this.draw()},500)}update(){for(const t of this.cats)t.update()}draw(){this.ctx.fillStyle="#000",this.ctx.fillRect(0,0,this.width*this.tileSize,this.height*this.tileSize);for(const[t,e]of h.entries())for(const[l,s]of e.entries())s&&(this.ctx.fillStyle="#fff",this.ctx.fillRect(l*this.tileSize,t*this.tileSize,this.tileSize,this.tileSize));for(const t of this.cats)t.draw()}generate(){let t=4;for(let e=0;e<t;e++){const l=new S(this);if(this.isColliding(l)){t++;continue}this.cats.push(l)}}}const z=new p;z.start();

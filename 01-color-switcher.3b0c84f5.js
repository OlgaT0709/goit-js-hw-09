const t={btnStartChangeColor:document.querySelector("[data-start]"),btnStopChangeColor:document.querySelector("[data-stop]"),body:document.querySelector("body")};let o=null;t.btnStartChangeColor.disabled=!1,t.btnStopChangeColor.disabled=!0,t.btnStartChangeColor.addEventListener("click",(function(){o=setInterval((()=>{t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),t.btnStartChangeColor.disabled=!0,t.btnStopChangeColor.disabled=!1})),t.btnStopChangeColor.addEventListener("click",(function(){clearInterval(o),t.btnStartChangeColor.disabled=!1,t.btnStopChangeColor.disabled=!0}));
//# sourceMappingURL=01-color-switcher.3b0c84f5.js.map
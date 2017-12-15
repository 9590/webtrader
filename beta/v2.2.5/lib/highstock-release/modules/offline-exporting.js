!function(a){"object"==typeof module&&module.exports?module.exports=a:a(Highcharts)}(function(a){!function(a){function b(a,b){var c=f.getElementsByTagName("head")[0],d=f.createElement("script");d.type="text/javascript",d.src=a,d.onload=b,d.onerror=function(){},c.appendChild(d)}var c=a.merge,d=a.win,e=d.navigator,f=d.document,g=a.each,h=d.URL||d.webkitURL||d,i=/Edge\/|Trident\/|MSIE /.test(e.userAgent),j=/Edge\/\d+/.test(e.userAgent),k=i?150:0;a.CanVGRenderer={},a.dataURLtoBlob=function(a){if(d.atob&&d.ArrayBuffer&&d.Uint8Array&&d.Blob&&h.createObjectURL){a=a.match(/data:([^;]*)(;base64)?,([0-9A-Za-z+\/]+)/);for(var b=d.atob(a[3]),c=new d.ArrayBuffer(b.length),c=new d.Uint8Array(c),e=0;e<c.length;++e)c[e]=b.charCodeAt(e);return a=new d.Blob([c],{type:a[1]}),h.createObjectURL(a)}},a.downloadURL=function(b,c){var g,h=f.createElement("a");if(e.msSaveOrOpenBlob)e.msSaveOrOpenBlob(b,c);else{if(2e6<b.length&&(b=a.dataURLtoBlob(b),!b))throw"Data URL length limit reached";if(void 0!==h.download)h.href=b,h.download=c,h.target="_blank",f.body.appendChild(h),h.click(),f.body.removeChild(h);else try{if(g=d.open(b,"chart"),void 0===g||null===g)throw"Failed to open window"}catch(i){d.location.href=b}}},a.svgToDataUrl=function(a){var b=-1<e.userAgent.indexOf("WebKit")&&0>e.userAgent.indexOf("Chrome");try{if(!b&&0>e.userAgent.toLowerCase().indexOf("firefox"))return h.createObjectURL(new d.Blob([a],{type:"image/svg+xml;charset-utf-16"}))}catch(c){}return"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(a)},a.imageToDataUrl=function(a,b,c,e,g,h,i,j,l){var m,n=new d.Image,o=function(){setTimeout(function(){var d,h=f.createElement("canvas"),j=h.getContext&&h.getContext("2d");try{if(j){h.height=n.height*e,h.width=n.width*e,j.drawImage(n,0,0,h.width,h.height);try{d=h.toDataURL(b),g(d,b,c,e)}catch(k){m(a,b,c,e)}}else i(a,b,c,e)}finally{l&&l(a,b,c,e)}},k)},p=function(){j(a,b,c,e),l&&l(a,b,c,e)};m=function(){n=new d.Image,m=h,n.crossOrigin="Anonymous",n.onload=o,n.onerror=p,n.src=a},n.onload=o,n.onerror=p,n.src=a},a.downloadSVGLocal=function(c,i,j,k){function l(a,b){return b=new d.jsPDF("l","pt",[a.width.baseVal.value+2*b,a.height.baseVal.value+2*b]),d.svg2pdf(a,b,{removeInvalid:!0}),b.output("datauristring")}function m(){s.innerHTML=c;var b,d=s.getElementsByTagName("text"),e=s.getElementsByTagName("svg")[0].style;g(d,function(a){g(["font-family","font-size"],function(b){!a.style[b]&&e[b]&&(a.style[b]=e[b])}),a.style["font-family"]=a.style["font-family"]&&a.style["font-family"].split(" ").splice(-1),b=a.getElementsByTagName("title"),g(b,function(b){a.removeChild(b)})}),d=l(s.firstChild,0);try{a.downloadURL(d,u),k&&k()}catch(f){j()}}var n,o,p,q=!0,r=i.libURL||a.getOptions().exporting.libURL,s=f.createElement("div"),t=i.type||"image/png",u=(i.filename||"chart")+"."+("image/svg+xml"===t?"svg":t.split("/")[1]),v=i.scale||1,r="/"!==r.slice(-1)?r+"/":r;if("image/svg+xml"===t)try{e.msSaveOrOpenBlob?(o=new MSBlobBuilder,o.append(c),n=o.getBlob("image/svg+xml")):n=a.svgToDataUrl(c),a.downloadURL(n,u),k&&k()}catch(w){j()}else"application/pdf"===t?d.jsPDF&&d.svg2pdf?m():(q=!0,b(r+"jspdf.js",function(){b(r+"svg2pdf.js",function(){m()})})):(n=a.svgToDataUrl(c),p=function(){try{h.revokeObjectURL(n)}catch(a){}},a.imageToDataUrl(n,t,{},v,function(b){try{a.downloadURL(b,u),k&&k()}catch(c){j()}},function(){var g=f.createElement("canvas"),h=g.getContext("2d"),i=c.match(/^<svg[^>]*width\s*=\s*\"?(\d+)\"?[^>]*>/)[1]*v,l=c.match(/^<svg[^>]*height\s*=\s*\"?(\d+)\"?[^>]*>/)[1]*v,m=function(){h.drawSvg(c,0,0,i,l);try{a.downloadURL(e.msSaveOrOpenBlob?g.msToBlob():g.toDataURL(t),u),k&&k()}catch(b){j()}finally{p()}};g.width=i,g.height=l,d.canvg?m():(q=!0,b(r+"rgbcolor.js",function(){b(r+"canvg.js",function(){m()})}))},j,j,function(){q&&p()}))},a.Chart.prototype.getSVGForLocalExport=function(b,c,d,e){var f,g,h,i,j,k,l=this,m=0,n=function(a,b,c){++m,c.imageElement.setAttributeNS("http://www.w3.org/1999/xlink","href",a),m===f.length&&e(l.sanitizeSVG(g.innerHTML,h))};a.wrap(a.Chart.prototype,"getChartHTML",function(a){var b=a.apply(this,Array.prototype.slice.call(arguments,1));return h=this.options,g=this.container.cloneNode(!0),b}),l.getSVGForExport(b,c),f=g.getElementsByTagName("image");try{if(f.length)for(j=0,k=f.length;k>j;++j)i=f[j],a.imageToDataUrl(i.getAttributeNS("http://www.w3.org/1999/xlink","href"),"image/png",{imageElement:i},b.scale,n,d,d,d);else e(l.sanitizeSVG(g.innerHTML,h))}catch(o){d()}},a.Chart.prototype.exportChartLocal=function(b,c){var d=this,e=a.merge(d.options.exporting,b),f=function(){if(!1===e.fallbackToExportServer){if(!e.error)throw"Fallback to export server disabled";e.error(e)}else d.exportChart(e)};i&&("application/pdf"===e.type||d.container.getElementsByTagName("image").length&&"image/svg+xml"!==e.type)||j&&"image/svg+xml"!==e.type||"application/pdf"===e.type&&d.container.getElementsByTagName("image").length?f():d.getSVGForLocalExport(e,c,f,function(b){-1<b.indexOf("<foreignObject")&&"image/svg+xml"!==e.type?f():a.downloadSVGLocal(b,e,f)})},c(!0,a.getOptions().exporting,{libURL:"https://code.highcharts.com/5.0.10/lib/",buttons:{contextButton:{menuItems:[{textKey:"printChart",onclick:function(){this.print()}},{separator:!0},{textKey:"downloadPNG",onclick:function(){this.exportChartLocal()}},{textKey:"downloadJPEG",onclick:function(){this.exportChartLocal({type:"image/jpeg"})}},{textKey:"downloadSVG",onclick:function(){this.exportChartLocal({type:"image/svg+xml"})}},{textKey:"downloadPDF",onclick:function(){this.exportChartLocal({type:"application/pdf"})}}]}}})}(a)});
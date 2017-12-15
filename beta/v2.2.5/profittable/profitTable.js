define(["exports","jquery","lodash","../windows/windows","../websockets/binary_websockets","../viewtransaction/viewTransaction","text!./profitTable.html","datatables","jquery-growl","../common/util","css!./profitTable.css"],function(a,b,c,d,e,f,g){"use strict";function h(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(a,"__esModule",{value:!0}),a.init=void 0;var i=h(b),j=h(c),k=h(d),l=h(e),m=h(f),n=h(g),o=null,p=null,q=null,r=a.init=function(a){a.click(function(){o?o.moveToTop():l["default"].cached.authorize().then(w)["catch"](function(a){i["default"].growl.error({message:a.message})})})},s=!1,t=!1,u=function(a){var b=i["default"]("#"+p.attr("id")+"_processing").css("top","200px").show();s=!0;var c={profit_table:1,description:1,sort:"DESC"};if("string"==typeof a){c.date_from=yyyy_mm_dd_to_epoch(a,{utc:!0});var d=Date.UTC(1970,0,1,23,59,59)/1e3;c.date_to=c.date_from+d,p.api().rows().remove(),t=!0}else c.limit=250,(t||a.clear)&&(p.api().rows().remove(),t=!1),c.offset=p.api().column(0).data().length;var e=function(a){var c=a.profit_table&&a.profit_table.transactions||[],d=c.map(function(a){var b=(parseFloat(a.sell_price)-parseFloat(a.buy_price)).toFixed(currencyFractionalDigits()),c="<button>View</button>".i18n();try{a.longcode}catch(d){}return[epoch_to_string(a.purchase_time,{utc:!0}),a.transaction_id,a.longcode,formatPrice(a.buy_price,local_storage.get("currency")),epoch_to_string(a.sell_time,{utc:!0}),formatPrice(a.sell_price,local_storage.get("currency")),b,c,a]});p.api().rows.add(d),p.api().draw(),s=!1,b.hide()};l["default"].send(c).then(e)["catch"](function(a){e({}),i["default"].growl.error({message:a.message})})},v=function(a){var b=a.target,c=i["default"](b);if("BUTTON"===b.tagName&&!c.hasClass("button-disabled")){var d=b.parentElement.parentElement,e=p.api().row(d).data();e=j["default"].last(e),c.addClass("button-disabled"),m["default"].init(e.contract_id,e.transaction_id).then(function(){return c.removeClass("button-disabled")})["catch"](function(a){return void 0})}},w=function(){o=k["default"].createBlankWindow(i["default"]("<div/>"),{title:"Profit Table".i18n(),dialogClass:"profitTable",width:700,height:400,destroy:function(){p&&p.DataTable().destroy(!0),o=null},refresh:function(){q.clear(),u({clear:!0})},"data-authorized":"true"}),o.track({module_id:"profitTable",is_unique:!0,data:null}),p=i["default"](n["default"]).i18n(),p.appendTo(o);var a=i["default"]("<div/>").addClass("profit-table-info");p=p.dataTable({data:[],columnDefs:[{targets:6,createdCell:function(a,b){var c=0>b?"red":b>0?"green":"bold";c&&i["default"](a).addClass(c),i["default"](a).attr("data-src",b),a.innerHTML=formatPrice(b,local_storage.get("currency"))}}],info:!1,footerCallback:function(){var b=this.api(),c=b.column(6).data().reduce(function(a,b){return 1*a+1*b},0),d="total "+(c>=0?"green":"red");a.html('<span class="title">Total Profit/Loss<span><span class="'+d+'">'+formatPrice(c,local_storage.get("currency"))+"</span>")},paging:!1,ordering:!1,searching:!0,processing:!0}),a.i18n().appendTo(p.parent()),p.parent().addClass("hide-search-input"),p.api().columns().every(function(){var a=this;i["default"]("input",this.header()).on("keyup change",function(){a.search()!==this.value&&a.search(this.value).draw()})}),u({clear:!0}),q=o.addDateToHeader({title:"Jump to: ".i18n(),date:null,changed:u,cleared:u}),o.dialog("open"),o.on("click",v),o.scroll(function(){var a=o.scrollTop(),b=o.innerHeight(),c=o[0].scrollHeight,d=(a+b)/c;d>.75&&!s&&!t&&u({clear:!1})})};a["default"]={init:r}});
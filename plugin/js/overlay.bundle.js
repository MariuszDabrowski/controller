!function(t){var o={};function e(n){if(o[n])return o[n].exports;var a=o[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,e),a.l=!0,a.exports}e.m=t,e.c=o,e.d=function(t,o,n){e.o(t,o)||Object.defineProperty(t,o,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,o){if(1&o&&(t=e(t)),8&o)return t;if(4&o&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&o&&"string"!=typeof t)for(var a in t)e.d(n,a,function(o){return t[o]}.bind(null,a));return n},e.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,"a",o),o},e.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)},e.p="",e(e.s=2)}([,function(t,o,e){"use strict";e.d(o,"a",function(){return n}),e.d(o,"c",function(){return a}),e.d(o,"b",function(){return c});const n=function(t,o,e){chrome.storage.sync.get(t,function(n){n[t]&&o(n[t],e)})},a=function(t,o,e){const n={};n[t]=o,chrome.storage.sync.set(n,e)},c=function(t){chrome.tabs.query({active:!0,currentWindow:!0},function(o){chrome.tabs.sendMessage(o[0].id,t,function(t){})})}},function(t,o,e){"use strict";e.r(o);var n=e(1);const a=function(t){const o=window.controller.users;let e=0;Object.keys(o).map(n=>{e++,o[n].active&&o[n].connected&&(t===o[n].lastMessage&&(t+=" ."),setTimeout(function(){o[n].socket.send("PRIVMSG #"+window.controller.channel+" : "+t)},100*e),o[n].lastMessage=t)}),console.log(t)},c=function(t){const o=window.controller.users;let e=0;Object.keys(o).map(n=>{e++,o[n].active&&o[n].connected&&setTimeout(function(){o[n].socket.send(t)},100*e)})};var s=function(t,o){this.userName=t,this.pass=o,this.container=null,this.active=!0,this.socket=null,this.connected=!1,this.template=function(){let t=document.createElement("button");t.classList.add("account-list__item"),t.classList.add("account-list__item--active"),t.innerHTML=`\n  \n    <div class="account-list__item__connection">\n      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">\n        <path d="M565.8,639c-52.4,0-104.9-20-144.8-59.9c-10.8-10.8-10.8-28.5,0-39.3c10.8-10.8,28.5-10.8,39.3,0c58.2,58.2,152.8,58.2,211,0l202.2-202.2c58.2-58.2,58.2-152.8,0-211c-58.2-58.2-152.8-58.2-211,0L491.9,297.2c-10.8,10.8-28.5,10.8-39.3,0c-10.8-10.8-10.8-28.5,0-39.3L623.2,87.2C703,7.4,833,7.4,912.8,87.2c79.8,79.9,79.9,209.8,0,289.6L710.6,579.1C670.6,619,618.2,639,565.8,639L565.8,639L565.8,639z M232.1,972.7c-52.5,0-104.9-20-144.8-59.9C7.4,832.9,7.4,703,87.2,623.2l202.2-202.2c79.9-79.9,209.8-79.9,289.6,0c10.8,10.8,10.8,28.5,0,39.3c-10.8,10.8-28.5,10.8-39.3,0c-58.2-58.2-152.8-58.2-211,0L126.6,662.5c-58.2,58.2-58.2,152.8,0,211c58.2,58.2,152.8,58.2,211,0l170.6-170.6c10.8-10.8,28.5-10.8,39.3,0c10.8,10.8,10.8,28.5,0,39.3L376.8,912.8C336.9,952.7,284.5,972.7,232.1,972.7L232.1,972.7L232.1,972.7z"/><path d="M232.1,990L232.1,990c-59.4,0-115.2-23.1-157.1-65c-41.9-41.9-65-97.7-65-157.1c0-59.4,23.1-115.2,65-157.1l202.2-202.2c41.9-41.9,97.7-65,157.1-65c59.4,0,115.2,23.1,157,65c17.6,17.6,17.6,46.2,0,63.8c-8.5,8.5-19.9,13.2-31.9,13.2s-23.4-4.7-31.9-13.2c-24.9-24.9-58-38.6-93.2-38.6c-35.3,0-68.4,13.7-93.2,38.6L138.8,674.8c-24.9,24.9-38.6,58-38.6,93.2s13.7,68.4,38.6,93.2c24.9,24.9,58,38.6,93.2,38.6c35.3,0,68.4-13.7,93.2-38.6l170.6-170.6c8.5-8.5,19.9-13.2,31.9-13.2c12.1,0,23.4,4.7,31.9,13.2c8.5,8.5,13.2,19.9,13.2,31.9c0,12.1-4.7,23.4-13.2,31.9L389.1,925C347.2,966.9,291.5,990,232.1,990L232.1,990z M434.3,378.4c-50.1,0-97.2,19.5-132.6,54.8L99.5,635.4c-35.4,35.3-54.8,82.4-54.8,132.5c0,50.1,19.5,97.2,54.8,132.6c35.3,35.3,82.4,54.8,132.5,54.8c50.1,0,97.2-19.5,132.5-54.8l170.6-170.6c2-2,3.1-4.6,3.1-7.4s-1.1-5.4-3.1-7.4c-2-2-4.6-3.1-7.4-3.1c-2.8,0-5.4,1.1-7.4,3.1L349.8,885.7c-31.4,31.4-73.2,48.7-117.7,48.7s-86.3-17.3-117.7-48.7C82.9,854.3,65.6,812.5,65.6,768c0-44.5,17.3-86.3,48.7-117.7L316.5,448c31.4-31.4,73.2-48.7,117.7-48.7c44.5,0,86.3,17.3,117.7,48.7c2,2,4.6,3.1,7.4,3.1c2.8,0,5.4-1.1,7.4-3.1c4.1-4.1,4.1-10.7,0-14.8C531.5,397.8,484.4,378.4,434.3,378.4z M565.8,656.3L565.8,656.3c-59.4,0-115.2-23.1-157.1-65c-8.5-8.5-13.2-19.9-13.2-31.9c0-12.1,4.7-23.4,13.2-31.9c8.5-8.5,19.9-13.2,31.9-13.2c12.1,0,23.4,4.7,31.9,13.2c24.9,24.9,58,38.6,93.2,38.6c35.3,0,68.4-13.7,93.2-38.6l202.2-202.2c24.9-24.9,38.6-58,38.6-93.2s-13.7-68.4-38.6-93.2c-24.9-24.9-58-38.6-93.2-38.6s-68.4,13.7-93.2,38.6L504.1,309.4c-8.5,8.5-19.9,13.2-31.9,13.2c-12.1,0-23.4-4.7-31.9-13.2c-17.6-17.6-17.6-46.2,0-63.8L610.9,75c41.9-41.9,97.7-65,157.1-65c59.4,0,115.2,23.1,157,65c41.9,41.9,64.9,97.7,65,157.1c0,59.4-23.1,115.2-65,157.1L722.8,591.3C680.9,633.2,625.2,656.3,565.8,656.3L565.8,656.3z M440.6,548.9c-2.8,0-5.4,1.1-7.4,3.1c-2,2-3.1,4.6-3.1,7.4s1.1,5.4,3.1,7.4c35.3,35.3,82.4,54.8,132.5,54.8c50.1,0,97.2-19.5,132.5-54.8l202.2-202.2c35.3-35.3,54.8-82.4,54.8-132.5c0-50.1-19.5-97.2-54.8-132.6C865.2,64.1,818.1,44.7,768,44.7c-50.1,0-97.2,19.5-132.6,54.8L464.8,270.1c-4.1,4.1-4.1,10.7,0,14.8c2,2,4.6,3.1,7.4,3.1c2.8,0,5.4-1.1,7.4-3.1l170.6-170.6c31.4-31.4,73.2-48.7,117.7-48.7c44.5,0,86.3,17.3,117.7,48.7c31.4,31.4,48.7,73.2,48.7,117.7c0,44.5-17.3,86.3-48.7,117.7L683.5,552c-31.4,31.4-73.2,48.7-117.7,48.7c-44.5,0-86.3-17.3-117.7-48.7C446,550,443.4,548.9,440.6,548.9z"/>\n      </svg>\n    </div>\n    <div class="account-list__item__name">${this.userName}</div>\n    `,this.container=t,document.querySelector(".account-list__container").appendChild(t)},this.render=function(){this.template(),this.container.addEventListener("click",this.toggleUser)},this.toggleUser=function(){this.container.classList.toggle("account-list__item--active"),this.active=!this.active}.bind(this),this.remove=function(){this.container.remove()},this.socketOpen=function(){const t=setInterval(function(){this.socket.readyState&&(clearInterval(t),this.connectToChannel(),this.connected=!0,this.container.classList.add("connected"))}.bind(this),1e3)},this.socketError=function(t){console.log(t)},this.socketClose=function(t){this.connected=!1,this.container.classList.remove("connected"),console.log("disconnected from server",t)},this.socketMessage=function(t){const o=t.data.split(";"),e={};"@"===t.data[0]?(o.map(function(t){const o=t.split("=");e[o[0]]=o[1]}),e["user-type"]&&(e.info=e["user-type"].match(/^\s.*?\s/g)[0].trim(),e.type=e["user-type"].match(/[A-Z].*?\s/g)[0].trim(),e.message=e["user-type"].match(/(?<!^) :(?!\s).*/g),e.message&&(e.message=e.message[0].replace(" :",""))),"TTDBot"===e["display-name"]&&a(e.message)):"PING"===t.data.split(" ")[0]&&(this.socket.send(t.data.replace("PING","PONG")),console.log("replied with: "+t.data.replace("PING","PONG")))},this.connectToChannel=function(){this.socket.send("CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership"),this.socket.send("PASS "+this.pass),this.socket.send("NICK "+this.userName),this.socket.send("JOIN #"+window.controller.channel),console.log("Connected to channel: "+window.controller.channel)},this.openSocket=function(){this.socket=new WebSocket("wss://irc-ws.chat.twitch.tv:443/","irc"),this.socket.addEventListener("open",this.socketOpen.bind(this)),this.socket.addEventListener("message",this.socketMessage.bind(this)),this.socket.addEventListener("close",this.socketClose.bind(this)),this.socket.addEventListener("error",this.socketError.bind(this))}};const d=function(t){const o=window.controller.users;Object.keys(t).map(e=>{e in o||(o[e]=new s(t[e].user,t[e].pass),o[e].render()),o[e].connected||o[e].openSocket()}),Object.keys(o).map(e=>{e in t||(o[e].remove(),delete o[e])})};var i=function(){const t=document.createElement("div");t.classList.add("video-wrapper"),t.innerHTML='\n    <img src="https://via.placeholder.com/2880x1620/ff0000" alt="" class="video-wrapper__img" />\n  ',window.controller.video.appendChild(t);const o=document.createElement("div");o.classList.add("video-container"),t.appendChild(o),window.controller.videoWrapper=t,window.controller.videoContainer=o};var m=function(){const t=document.createElement("div");t.classList.add("power-buttons"),t.innerHTML='\n    <button class="power-buttons__item" data-button="command" data-command="!p">Power Up</button>\n    <button class="power-buttons__item" data-button="command" data-command="!pd">Power Down</button>\n  ',window.controller.videoContainer.appendChild(t)};var l=function(){const t=document.createElement("div");t.classList.add("merc-buttons"),t.innerHTML='\n    <div class="merc-buttons__container">\n      <button class="merc-buttons__item" data-button="command" data-command="!hireicelo">Icelo</button>\n      <button class="merc-buttons__item" data-button="command" data-command="!hireshade">Shade</button>\n      <button class="merc-buttons__item" data-button="command" data-command="!hirejubal">Jubal</button>\n      <button class="merc-buttons__item" data-button="command" data-command="!hiregunnar">Gunnar</button>\n      <button class="merc-buttons__item" data-button="command" data-command="!hireadara">Adara</button>\n      <button class="merc-buttons__item" data-button="command" data-command="!hiremoor">Moor</button>\n      <button class="merc-buttons__item" data-button="command" data-command="!hirecortez">Cortez</button>\n      <button class="merc-buttons__item" data-button="command" data-command="!hiremolan">Molan</button>\n    </div>\n  ',window.controller.videoContainer.appendChild(t)};var r=function(){const t=document.createElement("div");t.classList.add("class-buttons"),t.innerHTML='\n    <div class="class-buttons__container">\n      <div class="class-buttons__item">\n        <button className="class-buttons__item__button" data-button="command" data-command="!archer">Archer</button>\n        <div class="spec">\n          <button class="spec__item" data-button="command" data-command="!specbowman">Bowman</button>\n          <button class="spec__item" data-button="command" data-command="!specsniper">Sniper</button>\n          <button class="spec__item" data-button="command" data-command="!specgunner">Gunner</button>\n        </div>\n      </div>\n      <div class="class-buttons__item">\n        <button className="class-buttons__item__button" data-button="command" data-command="!firemage">Firemage</button>\n        <div class="spec">\n          <button class="spec__item" data-button="command" data-command="!specpyromancer">Pyromancer</button>\n          <button class="spec__item" data-button="command" data-command="!specbombermage">Bomber Mage</button>\n          <button class="spec__item" data-button="command" data-command="!specsaboteur">Saboteur</button>\n        </div>\n      </div>\n      <div class="class-buttons__item">\n        <button className="class-buttons__item__button" data-button="command" data-command="!frostmage">Frostmage</button>\n        <div class="spec">\n          <button class="spec__item" data-button="command" data-command="!specicemage">Icemage</button>\n          <button class="spec__item" data-button="command" data-command="!spectrickster">Trickster</button>\n          <button class="spec__item" data-button="command" data-command="!speclightningmage">Lightning Mage</button>\n          <button class="spec__item" data-button="command" data-command="!specshockmage">Shock Mage</button>\n        </div>\n      </div>\n      <div class="class-buttons__item">\n        <button className="class-buttons__item__button" data-button="command" data-command="!alchemist">Alchemist</button>\n        <div class="spec">\n          <button class="spec__item" data-button="command" data-command="!specplaguedoctor">Plague Doctor</button>\n          <button class="spec__item" data-button="command" data-command="!specundeadarcher">Undead Archer</button>\n          <button class="spec__item" data-button="command" data-command="!specdeathdealer">Deathdealer</button>\n          <button class="spec__item" data-button="command" data-command="!specpotionmaster">Potion Master</button>\n        </div>\n      </div>\n      <div class="class-buttons__item">\n        <button className="class-buttons__item__button" data-button="command" data-command="!rogue">Rogue</button>\n        <div class="spec">\n          <button class="spec__item" data-button="command" data-command="!specknifethrower">Knife Thrower</button>\n          <button class="spec__item" data-button="command" data-command="!specassassin">Assassin</button>\n          <button class="spec__item" data-button="command" data-command="!specninja">Ninja</button>\n        </div>\n      </div>\n      <div class="class-buttons__item">\n        <button className="class-buttons__item__button" data-button="command" data-command="!bard">Bard</button>\n        <div class="spec">\n          <button class="spec__item" data-button="command" data-command="!specminstrel">Minstrel</button>\n          <button class="spec__item" data-button="command" data-command="!speccommander">Commander</button>\n          <button class="spec__item" data-button="command" data-command="!specscout">Scout</button>\n        </div>\n      </div>\n      <div class="class-buttons__item">\n        <button className="class-buttons__item__button" data-button="command" data-command="!trapper">Trapper</button>\n      </div>\n      <div class="class-buttons__item">\n        <button className="class-buttons__item__button" data-button="command" data-command="!highpriest">Highpriest</button>\n      </div>\n    </div>\n  ',window.controller.videoContainer.appendChild(t)};let u;const p=function(){clearTimeout(u),u=setTimeout(function(){const t=window.controller.videoWrapper.querySelector(".video-wrapper__img");window.controller.videoContainer.style.width=`${t.clientWidth}px`,window.controller.videoContainer.style.height=`${t.clientHeight+1}px`},200)};let b=[],_=[];const h=function(){const t=document.querySelectorAll(".tower");b=[],_=[];for(let o=0;o<t.length;o++)t[o].remove()},f=function(t){Object.keys(t).map(o=>{b.push(new function(){this.element=null,this.init=function(t,o,e="7.9%",n="23.8434164%",a){this.element=document.createElement("div"),this.element.classList.add("tower"),this.element.style.width=e,this.element.style.height=n,this.element.style.top=t,this.element.style.left=o,this.element.setAttribute("data-command",a),_.push(this.element)}}),b[0].init(t[o].top,t[o].left,t[o].width,t[o].height,t[o].command)});for(let t=0;t<_.length;t++)window.controller.videoContainer.appendChild(_[t]);!function(){const t=document.querySelectorAll(".tower"),o=function(){const t=this.getAttribute("data-command");a(t)};for(let e=0;e<t.length;e++)t[e].addEventListener("click",o)}()};var w={map1:{tower1:{top:"32.9181495%",left:"23%",command:"!1"},tower2:{top:"57.6512456%",left:"23%",command:"!2"},tower3:{top:"25.088968%",left:"34.4%",command:"!3"},tower4:{top:"48.7544484%",left:"34.4%",command:"!4"},tower5:{top:"17.9715302%",left:"45.6%",command:"!5"},tower6:{top:"48.7544484%",left:"45.6%",command:"!6"},tower7:{top:"17.9715302%",left:"56.9%",command:"!7"},tower8:{top:"43.0604982%",left:"56.9%",command:"!8"},tower9:{top:"32.9181495%",left:"68.4%",command:"!9"},tower10:{top:"63.1672598%",left:"68.4%",command:"!10"},tower11:{top:"39.5017794%",left:"79.4%",command:"!11"},tower12:{top:"63.1672598%",left:"79.4%",command:"!12"},train:{top:"13.3451957%",left:"83.3%",width:"16.8%",height:"26.3345196%",command:"!train"}},map2:{tower1:{top:"35.5239787%",left:"80.4%",command:"!1"},tower2:{top:"25.9325044%",left:"69.4%",command:"!2"},tower3:{top:"22.0248668%",left:"58%",command:"!3"},tower4:{top:"27.1758437%",left:"47.1%",command:"!4"},tower5:{top:"23.8010657%",left:"35.4%",command:"!5"},tower6:{top:"27.1758437%",left:"23.8%",command:"!6"},tower7:{top:"53.4635879%",left:"27.5%",command:"!7"},tower8:{top:"64.2984014%",left:"35.4%",command:"!8"},tower9:{top:"64.2984014%",left:"46.5%",command:"!9"},tower10:{top:"60.3907638%",left:"58%",command:"!10"},tower11:{top:"64.2984014%",left:"69.4%",command:"!11"},tower12:{top:"64.2984014%",left:"80.4%",command:"!12"},train:{top:"13.1438721%",left:"83.3%",width:"16.8%",height:"26.3345196%",command:"!train"},altar:{width:"10.6%",height:"20.6039076%",top:"13.1438721%",left:"7.5%",command:"!altar"}},map3:{tower1:{top:"43.1616341%",left:"14.8%",command:"!1"},tower2:{top:"14.7424512%",left:"26.8%",command:"!2"},tower3:{top:"43.1616341%",left:"26.8%",command:"!3"},tower4:{top:"67.1403197%",left:"26.8%",command:"!4"},tower5:{top:"71.7584369%",left:"39.2%",command:"!5"},tower6:{top:"43.1616341%",left:"39.2%",command:"!6"},tower7:{top:"19.5381883%",left:"39.2%",command:"!7"},tower8:{top:"67.1403197%",left:"51.6%",command:"!8"},tower9:{top:"43.1616341%",left:"51.6%",command:"!9"},tower10:{top:"14.7424512%",left:"51.6%",command:"!10"},tower11:{top:"19.5381883%",left:"63.9%",command:"!11"},tower12:{top:"52.7531083%",left:"63.9%",command:"!12"},train:{top:"13.4991119%",left:"84.4%",width:"15.6%",height:"24.5115453%",command:"!train"}},map4:{tower1:{top:"27.7087034%",left:"16.7%",command:"!1"},tower2:{top:"27.7087034%",left:"25.2%",command:"!2"},tower3:{top:"27.7087034%",left:"36.3%",command:"!3"},tower4:{top:"27.7087034%",left:"44.8%",command:"!4"},tower5:{top:"27.7087034%",left:"56%",command:"!5"},tower6:{top:"27.7087034%",left:"64.5%",command:"!6"},tower7:{top:"62.5222025%",left:"25.2%",command:"!7"},tower8:{top:"62.5222025%",left:"36.3%",command:"!8"},tower9:{top:"62.5222025%",left:"44.8%",command:"!9"},tower10:{top:"62.5222025%",left:"56%",command:"!10"},tower11:{top:"62.5222025%",left:"64.5%",command:"!11"},tower12:{top:"62.5222025%",left:"78.3%",command:"!12"},train:{top:"13.1438721%",left:"83.3%",width:"16.8%",height:"26.2877442%",command:"!train"},altar:{width:"11.1%",height:"27.3534636%",top:"58.7921847%",left:"14%",command:"!altar"}},map5:{tower1:{top:"41.3854352%",left:"13.9%",command:"!1"},tower2:{top:"41.3854352%",left:"22.5%",command:"!2"},tower3:{top:"25.7548845%",left:"44.9%",command:"!3"},tower4:{top:"61.1012433%",left:"44.9%",command:"!4"},tower5:{top:"14.2095915%",left:"55.9%",command:"!5"},tower6:{top:"42.4511545%",left:"55.9%",command:"!6"},tower7:{top:"64.1207815%",left:"55.9%",command:"!7"},tower8:{top:"20.9591474%",left:"66.9%",command:"!8"},tower9:{top:"43.5168739%",left:"66.9%",command:"!9"},tower10:{top:"70.6927176%",left:"66.9%",command:"!10"},tower11:{top:"35.5239787%",left:"78.3%",command:"!11"},tower12:{top:"64.1207815%",left:"78.3%",command:"!12"},train:{top:"13.1438721%",left:"83.3%",width:"16.8%",height:"26.2877442%",command:"!train"}},map6:{tower1:{top:"63.0550622%",left:"18.5%",command:"!1"},tower2:{top:"33.2149201%",left:"35.4%",command:"!2"},tower3:{top:"33.2149201%",left:"46.8%",command:"!3"},tower4:{top:"33.2149201%",left:"57.9%",command:"!4"},tower5:{top:"33.2149201%",left:"69.1%",command:"!5"},tower6:{top:"38.0106572%",left:"80.5%",command:"!6"},tower7:{top:"63.0550622%",left:"29.7%",command:"!7"},tower8:{top:"63.0550622%",left:"38.7%",command:"!8"},tower9:{top:"68.2060391%",left:"49.4%",command:"!9"},tower10:{top:"68.2060391%",left:"57.9%",command:"!10"},tower11:{top:"63.0550622%",left:"69.1%",command:"!11"},tower12:{top:"63.0550622%",left:"80.5%",command:"!12"},train:{top:"13.4991119%",left:"84.4%",width:"15.6%",height:"24.5115453%",command:"!train"},altar:{width:"7.9%",height:"23.8010657%",top:"25.7548845%",left:"11.6%",command:"!altar"}},map7:{tower1:{top:"21.8472469%",left:"25.6%",command:"!1"},tower2:{top:"72.2912966%",left:"81%",command:"!2"},tower3:{top:"49.5559503%",left:"26.2%",command:"!3"},tower4:{top:"64.2984014%",left:"71.1%",command:"!4"},tower5:{top:"64.2984014%",left:"15%",command:"!5"},tower6:{top:"40.6749556%",left:"71.1%",command:"!6"},tower7:{top:"64.2984014%",left:"37.9%",command:"!7"},tower8:{top:"57.3712256%",left:"54.4%",command:"!8"},tower9:{top:"40.6749556%",left:"37.9%",command:"!9"},tower10:{top:"28.4191829%",left:"54.4%",command:"!10"},tower11:{top:"16.3410302%",left:"37.9%",command:"!11"},tower12:{top:"13.321492%",left:"67.2%",command:"!12"},train:{top:"13.321492%",left:"83.3%",width:"16.8%",height:"26.2877442%",command:"!train"},altar:{width:"14.8%",height:"26.2877442%",top:"16.3410302%",left:"9.3%",command:"!altar"}},map8:{tower1:{top:"30.017762%",left:"15.2%",command:"!1"},tower2:{top:"24.3339254%",left:"26.4%",command:"!2"},tower3:{top:"20.2486679%",left:"36.7%",command:"!3"},tower4:{top:"66.60746%",left:"16.6%",command:"!4"},tower5:{top:"66.60746%",left:"28.9%",command:"!5"},tower6:{top:"57.3712256%",left:"36.7%",command:"!6"},tower7:{top:"71.5808171%",left:"62.4%",command:"!7"},tower8:{top:"65.7193606%",left:"74.3%",command:"!8"},tower9:{top:"57.3712256%",left:"82.4%",command:"!9"},tower10:{top:"20.2486679%",left:"55.3%",command:"!10"},tower11:{top:"20.2486679%",left:"65.9%",command:"!11"},tower12:{top:"36.7673179%",left:"72.8%",command:"!12"},train:{top:"13.1438721%",left:"83.3%",width:"16.8%",height:"26.4653641%",command:"!train"}},map9:{tower1:{top:"31.0834813%",left:"17.6%",command:"!1"},tower2:{top:"25.9325044%",left:"26.7%",command:"!2"},tower3:{top:"20.7815275%",left:"35.6%",command:"!3"},tower4:{top:"20.7815275%",left:"46.6%",command:"!4"},tower5:{top:"23.9786856%",left:"57.9%",command:"!5"},tower6:{top:"40.8525755%",left:"68.8%",command:"!6"},tower7:{top:"33.7477798%",left:"81.2%",command:"!7"},tower8:{top:"64.4760213%",left:"80.3%",command:"!8"},tower9:{top:"64.4760213%",left:"66%",command:"!9"},tower10:{top:"68.5612789%",left:"54.7%",command:"!10"},tower11:{top:"58.7921847%",left:"41.1%",command:"!11"},tower12:{top:"58.7921847%",left:"28%",command:"!12"},train:{top:"13.1438721%",left:"85.2%",width:"14.8%",height:"23.268206%",command:"!train"},altar:{width:"10.8%",height:"19.1829485%",top:"63.2326821%",left:"13.4%",command:"!altar"}}};const v=function(){const t=document.createElement("div");t.classList.add("selector"),t.innerHTML='\n    <div class="selector__popout">\n      <button class="selector__popout__item" data-button="overlay-clear">Clear overlays</button>\n      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map1">Map 1 - Green Pasture</button>\n      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map2">Map 2 - Lost Desert</button>\n      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map3">Map 3 - Snow Trap</button>\n      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map4">Map 4 - Lava or Leave It</button>\n      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map5">Map 5 - Wandering Fields</button>\n      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map6">Map 6 - Dune Gauntlet</button>\n      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map7">Map 7 - Double Trouble</button>\n      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map8">Map 8 - Arid Junction</button>\n      <button class="selector__popout__item" data-button="overlay-change" data-overlay="map9">Map 9 - Frozen Steppes</button>\n    </div>\n  ',window.controller.videoContainer.appendChild(t),function(){const t=document.querySelector('[data-button="overlay-clear"]'),o=document.querySelectorAll('[data-button="overlay-change"]'),e=function(){h(),f(w[this.getAttribute("data-overlay")])};t.addEventListener("click",h);for(let t=0;t<o.length;t++)o[t].addEventListener("click",e)}()},g=function(t){this.element=null,this.action=null,this.init=function(){const o=document.createElement("div");o.classList.add("custom-actions__list__item"),o.innerHTML=`\n      <button class="custom-actions__list__item__trigger" data-command="${t}">${t}</button>\n      <button class="custom-actions__list__item__remove">\n        <svg style="width:12px;height:12px" viewBox="0 0 24 24">\n          <path fill="#e9ede2" d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" />\n        </svg>\n      </button>\n    `,this.element=o,this.action=t,this.initEventListeners()},this.removeItem=function(t){t.preventDefault();const o=encodeURIComponent(this.action);y.splice(y.indexOf(o),1),Object(n.c)("customActions",y,function(){this.element.remove(),delete L[o]}.bind(this))}.bind(this),this.initEventListeners=function(){const t=this.element.querySelector(".custom-actions__list__item__remove"),o=this.element.querySelector(".custom-actions__list__item__trigger");t.addEventListener("click",this.removeItem),o.addEventListener("click",function(){a(this.action)}.bind(this))}};let y=[],L={},k=null;const C=function(t){const o=document.querySelector(".custom-actions__popout");t?(y.push(t),Object(n.c)("customActions",y,function(){const o=encodeURIComponent(t);L[o]=new g(t),L[o].init(),k.appendChild(L[o].element)})):Object(n.a)("customActions",function(t){y=t;for(let t=0;t<y.length;t++){const o=encodeURIComponent(y[t]);L[o]=new g(y[t]),L[o].init(),k.appendChild(L[o].element)}}),o.prepend(k)},M=function(){y=[],L={},(k=document.createElement("div")).classList.add("custom-actions__list");const t=document.createElement("div");t.classList.add("custom-actions"),t.innerHTML='\n    <svg style="width:24px;height:24px" viewBox="0 0 24 24">\n      <path fill="#e9ede1" d="M19,20H5V4H7V7H17V4H19M12,2A1,1 0 0,1 13,3A1,1 0 0,1 12,4A1,1 0 0,1 11,3A1,1 0 0,1 12,2M19,2H14.82C14.4,0.84 13.3,0 12,0C10.7,0 9.6,0.84 9.18,2H5A2,2 0 0,0 3,4V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V4A2,2 0 0,0 19,2Z" />\n    </svg>\n\n    <div class="custom-actions__popout">\n      <form class="custom-actions__form">\n        <input type="text" class="custom-actions__form__input" placeholder="!t !a !p" />\n        <button class="custom-actions__form__button">Add</button>\n      </form>\n    </div>\n  ',window.controller.videoContainer.appendChild(t),C(),function(){const t=document.querySelector(".custom-actions__form__button"),o=document.querySelector(".custom-actions__form__input");t.addEventListener("click",function(t){t.preventDefault(),o.value&&(C(o.value),o.value="")})}()},S=function(){const t=document.createElement("div");t.classList.add("leave"),t.innerHTML='\n  <button class="leave__button" data-button="leave" data-command="!leave">Leave</button>\n  ',window.controller.videoContainer.appendChild(t),document.querySelector('[data-button="leave"]').addEventListener("click",function(){a(this.getAttribute("data-command"))})},A=function(){const t=document.createElement("div");t.classList.add("ttdbot"),t.innerHTML='\n    <div class="ttdbot__dropdown">\n      <button class="ttdbot__dropdown__button" data-button="whisper" data-command="!diff">Difficulty</button>\n      <button class="ttdbot__dropdown__button" data-button="whisper" data-command="!essence">Essence</button>\n      <button class="ttdbot__dropdown__button" data-button="whisper" data-command="!gems">Gems</button>\n      <button class="ttdbot__dropdown__button" data-button="chat" data-command="!gold">Gold</button>\n      <button class="ttdbot__dropdown__button" data-button="whisper" data-command="!highscores">Highscores</button>\n      <button class="ttdbot__dropdown__button" data-button="whisper" data-command="!specs">Specs</button>\n      <button class="ttdbot__dropdown__button" data-button="whisper" data-command="!spells">Spells</button>\n      <button class="ttdbot__dropdown__button" data-button="whisper" data-command="!stats">Stats</button>\n    </div>\n  ',window.controller.videoContainer.appendChild(t),function(t){const o=t.querySelectorAll('[data-button="whisper"]'),e=t.querySelectorAll('[data-button="chat"]');for(let t=0;t<o.length;t++)o[t].addEventListener("click",function(){console.log("click");const t=this.getAttribute("data-command");console.log(t),c("PRIVMSG "+window.controller.channel+" :/w ttdbot "+t)});for(let t=0;t<e.length;t++)e[t].addEventListener("click",function(){console.log("clicked");const t=this.getAttribute("data-command");console.log(t),a(t)})}(t)};window.controller={video:null,videoWrapper:null,videoContainer:null,channel:"dongerlistdotcom",users:{},overlayActive:!1};const E=function(){if(window.controller.overlayActive)Object(n.a)("users",d);else{const t=setInterval(function(){if(window.controller.video=document.querySelector(".video-player__container"),document.body.classList.add("overlay-active"),window.controller.video){i(),function(){const t=document.querySelector(".side-nav__toggle-visibility"),o=document.querySelector(".right-column__toggle-visibility"),e=document.querySelector(".player-buttons-right");t&&t.addEventListener("click",p),o&&o.addEventListener("click",p),e&&e.addEventListener("click",p),window.addEventListener("resize",p)}(),p(),v(),m(),l(),r(),function(){const t=document.createElement("div");t.classList.add("account-list"),t.innerHTML='\n    <div class="account-list__container">\n      <div class="account-list__title">Send commands to:</div>\n    </div>\n  ',window.controller.videoContainer.appendChild(t)}(),M(),S(),A();const o=document.querySelectorAll('[data-button="command"]');for(let t=0;t<o.length;t++)o[t].addEventListener("click",function(){const t=this.getAttribute("data-command");a(t)});Object(n.a)("users",d),clearInterval(t)}},1e3);window.controller.overlayActive=!0}};chrome.runtime.onMessage.addListener(function(t,o,e){"connect"===t.action&&(E(),console.log("connect")),"disconnect"===t.action&&(console.log("disconnect"),document.body.classList.remove("overlay-active"),window.controller.videoWrapper.remove(),window.controller={video:null,videoWrapper:null,videoContainer:null,channel:"archonthewizard",users:{},overlayActive:!1}),"checkStatus"===t.action&&e({status:window.controller.overlayActive})})}]);
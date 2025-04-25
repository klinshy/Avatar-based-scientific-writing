import{c as W,p as m,m as h}from"./footstep-c8191ba7.js";import{b as g,g as b,q as d,l}from"./quests-2c2a66d7.js";WA.onInit().then(async()=>{try{await g(),WA.controls.disableInviteButton(),WA.controls.disableMapEditor(),WA.controls.disableRoomList(),console.log("Scripting API Extra ready")}catch(e){console.error(e)}const s=await b();for(const e of s){let r;WA.room.area.onEnter(e.name).subscribe(()=>{r=WA.ui.displayActionMessage({message:`[LEERTASTE] drücken um mit ${e.npcName} zu sprechen.`,callback:()=>{var o;if(WA.chat.sendChatMessage(e.chatText,e.npcName),e.triggerQuest){const i=WA.player.state.currentQuest,c=(o=d.find(u=>u.questId===e.triggerQuest))==null?void 0:o.requireQuest;i===c&&(WA.player.state.currentQuest=e.triggerQuest)}}}),WA.room.area.onLeave(e.name).subscribe(()=>{WA.chat.close()})}),WA.room.area.onLeave(e.name).subscribe(()=>{r&&(r.remove(),WA.chat.close())})}WA.player.onPlayerMove(async({x:e,y:r,moving:o})=>{var c,u,A;const i=await W({x:e,y:r});if(!i){(c=h)==null||c.stop();return}if(!o&&!i){(u=h)==null||u.stop();return}else(A=h)==null||A.stop(),m(i)});const t=WA.player.state.currentQuest,n=d.find(e=>e.questId===t);n&&a(n.questId),WA.player.state.onVariableChange("currentQuest").subscribe(e=>{const r=d.find(o=>o.questId===e);r&&a(r.questId)});function a(e){const r=d.find(o=>o.questId===e);r&&WA.ui.banner.openBanner({id:r.questId,text:r.questDescription,bgColor:"#1B1B29",timeToClose:0,textColor:"#FFFFFF",closable:!1})}});WA.onInit().then(async()=>{WA.room.area.onEnter("triggerM3Quests").subscribe(()=>{WA.player.state.currentQuest==="quest16"&&(WA.player.state.currentQuest="quest17")})});WA.onInit().then(async()=>{WA.player.state.Abschlussquiz3==="solved"&&WA.room.hideLayer("blockPortals")});WA.onInit().then(async()=>{if(WA.player.state.module3==="1"){const s=[],t=[];for(let n=4;n<=15;n++)for(let a=71;a<=89;a++)s.push({x:n,y:a,tile:"green",layer:"green"}),t.push({x:n,y:a,tile:null,layer:"red"});WA.room.setTiles(s),WA.room.setTiles(t)}});WA.onInit().then(async()=>{if(WA.player.state.module3==="2"){const s=[],t=[];for(let n=4;n<=15;n++)for(let a=47;a<=89;a++)s.push({x:n,y:a,tile:"green",layer:"green"}),t.push({x:n,y:a,tile:null,layer:"red"});WA.room.setTiles(s),WA.room.setTiles(t)}});WA.player.state.onVariableChange("m3terminal1").subscribe(async s=>{if(WA.player.state.module3="1",s==="correct"){WA.chat.sendChatMessage(`## 🔍 Weitere Wortschnipsel gefunden!   

 

**Prima!** 🎉 Du hast noch mehr **verlorene Wortschnipsel** ✂️ entdeckt!   

 

Diese sind entscheidend, um **Lord Modrevolt** 💀 aus unserem System zu **verbannen**.   

🔐 **Merk sie dir gut:**   

 

📝 **eine / ist / sie**   

 

📢 Bleib dran und sammle alle Schnipsel – das Schicksal unseres Kondensatoriums liegt in deinen Händen!  

`,"Zirze"),WA.player.state.currentQuest="quest21";const t=[],n=[];for(let e=4;e<=15;e++)for(let r=71;r<=89;r++)t.push({x:e,y:r,tile:"green",layer:"green"}),n.push({x:e,y:r,tile:null,layer:"red"});WA.room.setTiles(t),WA.room.setTiles(n);const a=await WA.nav.getCoWebSites();for(const e of a)e.close()}});WA.player.state.onVariableChange("m3terminal2").subscribe(async s=>{if(WA.player.state.module3="2",s==="correct"){WA.player.state.currentQuest="";const t=[],n=[];for(let e=4;e<=15;e++)for(let r=47;r<=89;r++)t.push({x:e,y:r,tile:"green",layer:"green"}),n.push({x:e,y:r,tile:null,layer:"red"});WA.room.setTiles(t),WA.room.setTiles(n);const a=await WA.nav.getCoWebSites();for(const e of a)e.close()}});WA.player.state.onVariableChange("module3").subscribe(s=>{if(s==="2"){const t=[],n=[];for(let a=4;a<=15;a++)for(let e=47;e<=89;e++)t.push({x:a,y:e,tile:"green",layer:"green"}),n.push({x:a,y:e,tile:null,layer:"red"});WA.room.setTiles(t),WA.room.setTiles(n),WA.chat.sendChatMessage(`## 🔍 Weitere Wortschnipsel gefunden!   

 

**Prima!** 🎉 Du hast noch mehr **verlorene Wortschnipsel** ✂️ entdeckt!   

 

Diese sind entscheidend, um **Lord Modrevolt** 💀 aus unserem System zu **verbannen**.   

🔐 **Merk sie dir gut:**   

 

📝 **zu / denken / Art**   

`,"Zirze")}});WA.player.state.onVariableChange("currentQuest").subscribe(s=>{s==="quest26"&&WA.chat.sendChatMessage("Wow, das ging schnell! Du hast beide Räume gemeistert. Ich hoffe du kannst dich noch an alle Wortschnipsel erinnern. Diese musst du nun in richtiger Reihenfolge im Sicherheitsterminal eingeben. Falls du Hilfe brauchst, frag doch deine Kolleg*innen, ob ihr diese Aufgabe zusammen lösen könnt. Ich darf nicht zu viel verraten, aber eine gezielte Recherche könnte durchaus hilfreich sein. Wenn du oder ihr es schafft, können wir Lord Modrevolt endlich aus unserem System entfernen und unsere Sicherheitseinstellungen des Kondensatoriums wieder herstellen. ","Zirze")});WA.player.state.onVariableChange("Textarten").subscribe(s=>{s==="solved"&&(l("modul_3",10),console.log('Variable "Textarten" solved. Level up, +10XP'),WA.player.state.currentQuest="quest18",setTimeout(()=>{try{WA.chat.close()}catch(t){console.error("Failed to close chat:",t)}},5e3))});WA.player.state.onVariableChange("AllgemeineRegeln").subscribe(s=>{s==="solved"&&(l("modul_3",10),console.log('Variable "AllgemeineRegeln" solved. Level up, +10XP'),WA.player.state.currentQuest="quest19",setTimeout(()=>{try{WA.chat.close()}catch(t){console.error("Failed to close chat:",t)}},5e3))});WA.player.state.onVariableChange("Sprache").subscribe(s=>{s==="solved"&&(l("modul_3",10),console.log('Variable "Sprache" solved. Level up, +10XP'),WA.player.state.currentQuest="quest20",setTimeout(()=>{try{WA.chat.close()}catch(t){console.error("Failed to close chat:",t)}},5e3))});WA.player.state.onVariableChange("Zitieren").subscribe(s=>{s==="solved"&&(l("modul_3",10),console.log('Variable "Zitieren" solved. Level up, +10XP'),WA.player.state.currentQuest="quest22",setTimeout(()=>{try{WA.chat.close()}catch(t){console.error("Failed to close chat:",t)}},5e3))});WA.player.state.onVariableChange("Literaturverzeichnis").subscribe(s=>{s==="solved"&&(l("modul_3",10),console.log('Variable "Literaturverzeichnis" solved. Level up, +10XP'),WA.player.state.currentQuest="quest23",setTimeout(()=>{try{WA.chat.close()}catch(t){console.error("Failed to close chat:",t)}},5e3))});WA.player.state.onVariableChange("Literaturverwaltung").subscribe(s=>{s==="solved"&&(l("modul_3",10),console.log('Variable "Literaturverwaltung" solved. Level up, +10XP'),WA.player.state.currentQuest="quest24",setTimeout(()=>{try{WA.chat.close()}catch(t){console.error("Failed to close chat:",t)}},5e3))});WA.player.state.onVariableChange("Abschlussquiz3").subscribe(s=>{s==="solved"&&(l("modul_3",10),WA.room.hideLayer("blockPortals"),console.log('Variable "finalQuizThree" solved. Level up, +10XP'),WA.player.state.currentQuest="quest26",setTimeout(()=>{try{WA.chat.close()}catch(t){console.error("Failed to close chat:",t)}},5e3))});
//# sourceMappingURL=module3-main-9a454a04.js.map

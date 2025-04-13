import{c as b,p,m as h}from"./footstep-6523c959.js";import{b as m,g as W,q as d,l as i}from"./quests-80b6f96a.js";WA.onInit().then(async()=>{try{await m(),WA.controls.disableInviteButton(),WA.controls.disableMapEditor(),console.log("Scripting API Extra ready")}catch(e){console.error(e)}const s=await W();for(const e of s){let t;WA.room.area.onEnter(e.name).subscribe(()=>{t=WA.ui.displayActionMessage({message:`[LEERTASTE] drücken um mit ${e.npcName} zu sprechen.`,callback:()=>{var l;if(WA.chat.sendChatMessage(e.chatText,e.npcName),e.triggerQuest){const o=WA.player.state.currentQuest,u=(l=d.find(c=>c.questId===e.triggerQuest))==null?void 0:l.requireQuest;o===u&&(WA.player.state.currentQuest=e.triggerQuest)}}})}),WA.room.area.onLeave(e.name).subscribe(()=>{t&&(t.remove(),WA.chat.close())})}WA.player.onPlayerMove(async({x:e,y:t,moving:l})=>{var u,c,g;const o=await b({x:e,y:t});if(!o){(u=h)==null||u.stop();return}if(!l&&!o){(c=h)==null||c.stop();return}else(g=h)==null||g.stop(),p(o)});const a=WA.player.state.currentQuest,r=d.find(e=>e.questId===a);r&&n(r.questId),WA.player.state.onVariableChange("currentQuest").subscribe(e=>{const t=d.find(l=>l.questId===e);t&&n(t.questId)});function n(e){const t=d.find(l=>l.questId===e);t&&WA.ui.banner.openBanner({id:t.questId,text:t.questDescription,bgColor:"#1B1B29",timeToClose:0,textColor:"#FFFFFF",closable:!1})}});WA.onInit().then(async()=>{WA.room.area.onEnter("triggerM3Quests").subscribe(()=>{WA.player.state.currentQuest==="quest16"&&(WA.player.state.currentQuest="quest17")})});WA.onInit().then(async()=>{if(WA.player.state.module3==="1"){const s=[],a=[];for(let r=4;r<=15;r++)for(let n=71;n<=89;n++)s.push({x:r,y:n,tile:"green",layer:"green"}),a.push({x:r,y:n,tile:null,layer:"red"});WA.room.setTiles(s),WA.room.setTiles(a)}});WA.onInit().then(async()=>{if(WA.player.state.module3==="2"){const s=[],a=[];for(let r=4;r<=15;r++)for(let n=47;n<=89;n++)s.push({x:r,y:n,tile:"green",layer:"green"}),a.push({x:r,y:n,tile:null,layer:"red"});WA.room.setTiles(s),WA.room.setTiles(a)}});WA.player.state.onVariableChange("m3terminal1").subscribe(async s=>{if(WA.player.state.module3="1",s==="correct"){WA.chat.sendChatMessage(`## 🔍 Weitere Wortschnipsel gefunden!   

 

**Prima!** 🎉 Du hast noch mehr **verlorene Wortschnipsel** ✂️ entdeckt!   

 

Diese sind entscheidend, um **Lord Modrevolt** 💀 aus unserem System zu **verbannen**.   

🔐 **Merk sie dir gut:**   

 

📝 **eine / ist / sie**   

 

📢 Bleib dran und sammle alle Schnipsel – das Schicksal unseres Kondensatoriums liegt in deinen Händen!  

`,"Zirze"),WA.player.state.currentQuest="quest21";const a=[],r=[];for(let e=4;e<=15;e++)for(let t=71;t<=89;t++)a.push({x:e,y:t,tile:"green",layer:"green"}),r.push({x:e,y:t,tile:null,layer:"red"});WA.room.setTiles(a),WA.room.setTiles(r);const n=await WA.nav.getCoWebSites();for(const e of n)e.close()}});WA.player.state.onVariableChange("m3terminal2").subscribe(async s=>{if(WA.player.state.module3="2",s==="correct"){WA.player.state.currentQuest="";const a=[],r=[];for(let e=4;e<=15;e++)for(let t=47;t<=89;t++)a.push({x:e,y:t,tile:"green",layer:"green"}),r.push({x:e,y:t,tile:null,layer:"red"});WA.room.setTiles(a),WA.room.setTiles(r);const n=await WA.nav.getCoWebSites();for(const e of n)e.close()}});WA.player.state.onVariableChange("module3").subscribe(s=>{if(s==="2"){const a=[],r=[];for(let n=4;n<=15;n++)for(let e=47;e<=89;e++)a.push({x:n,y:e,tile:"green",layer:"green"}),r.push({x:n,y:e,tile:null,layer:"red"});WA.room.setTiles(a),WA.room.setTiles(r),WA.chat.sendChatMessage(`## 🔍 Weitere Wortschnipsel gefunden!   

 

**Prima!** 🎉 Du hast noch mehr **verlorene Wortschnipsel** ✂️ entdeckt!   

 

Diese sind entscheidend, um **Lord Modrevolt** 💀 aus unserem System zu **verbannen**.   

🔐 **Merk sie dir gut:**   

 

📝 **zu / denken / Art**   

`,"Zirze")}});WA.player.state.onVariableChange("currentQuest").subscribe(s=>{s==="quest26"&&WA.chat.sendChatMessage("Wow, das ging schnell! Du hast beide Räume gemeistert. Ich hoffe du kannst dich noch an alle Wortschnipsel erinnern. Diese musst du nun in richtiger Reihenfolge im Sicherheitsterminal eingeben. Falls du Hilfe brauchst, frag doch deine Kolleg*innen, ob ihr diese Aufgabe zusammen lösen könnt. Ich darf nicht zu viel verraten, aber eine gezielte Recherche könnte durchaus hilfreich sein. Wenn du oder ihr es schafft, können wir Lord Modrevolt endlich aus unserem System entfernen und unsere Sicherheitseinstellungen des Kondensatoriums wieder herstellen. ","Zirze")});WA.player.state.onVariableChange("Textarten").subscribe(s=>{s==="solved"&&(i("modul_3",10),console.log('Variable "Textarten" solved. Level up, +10XP'),WA.player.state.currentQuest="quest18")});WA.player.state.onVariableChange("AllgemeineRegeln").subscribe(s=>{s==="solved"&&(i("modul_3",10),console.log('Variable "AllgemeineRegeln" solved. Level up, +10XP'),WA.player.state.currentQuest="quest19")});WA.player.state.onVariableChange("Sprache").subscribe(s=>{s==="solved"&&(i("modul_3",10),console.log('Variable "Sprache" solved. Level up, +10XP'),WA.player.state.currentQuest="quest20")});WA.player.state.onVariableChange("Zitieren").subscribe(s=>{s==="solved"&&(i("modul_3",10),console.log('Variable "Zitieren" solved. Level up, +10XP'),WA.player.state.currentQuest="quest22")});WA.player.state.onVariableChange("Literaturverzeichnis").subscribe(s=>{s==="solved"&&(i("modul_3",10),console.log('Variable "Literaturverzeichnis" solved. Level up, +10XP'),WA.player.state.currentQuest="quest23")});WA.player.state.onVariableChange("Literaturverwaltung").subscribe(s=>{s==="solved"&&(i("modul_3",10),console.log('Variable "Literaturverwaltung" solved. Level up, +10XP'),WA.player.state.currentQuest="quest24")});WA.player.state.onVariableChange("Abschlussquiz3").subscribe(s=>{s==="solved"&&(i("modul_3",10),console.log('Variable "finalQuizThree" solved. Level up, +10XP'),WA.player.state.currentQuest="quest26")});
//# sourceMappingURL=module3-main-61c74c9a.js.map

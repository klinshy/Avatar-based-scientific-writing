import{b as A,g,q as i,l as p}from"./quests-2c2a66d7.js";import{c as W,p as b,m as c}from"./footstep-c8191ba7.js";WA.onInit().then(async()=>{console.log("loading main.ts"),WA.controls.disableInviteButton(),WA.controls.disableMapEditor(),WA.controls.disableRoomList();try{await A(),console.log("Scripting API Extra ready")}catch(t){console.error(t)}WA.onInit().then(async()=>{const t=await g();for(const e of t){let r,s=WA.player.name;console.log("Player name:",s),WA.room.area.onEnter(e.name).subscribe(()=>{r=WA.ui.displayActionMessage({message:`[LEERTASTE] drücken um mit ${e.npcName} zu sprechen.`,callback:()=>{var n;if(WA.chat.sendChatMessage(e.chatText,e.npcName),e.triggerQuest){const a=WA.player.state.currentQuest,o=(n=i.find(m=>m.questId===e.triggerQuest))==null?void 0:n.requireQuest;a===o&&(WA.player.state.currentQuest=e.triggerQuest)}}}),WA.room.area.onLeave(e.name).subscribe(()=>{WA.chat.close()})}),WA.room.area.onLeave(e.name).subscribe(()=>{r&&(r.remove(),WA.chat.close())})}}),WA.player.onPlayerMove(async({x:t,y:e,moving:r})=>{var n,a,o;const s=await W({x:t,y:e});if(!s){(n=c)==null||n.stop();return}if(!r&&!s){(a=c)==null||a.stop();return}else(o=c)==null||o.stop(),b(s)});const u=WA.player.state.currentQuest,l=i.find(t=>t.questId===u);l&&d(l.questId),WA.player.state.onVariableChange("currentQuest").subscribe(t=>{p("notlog",10);const e=i.find(r=>r.questId===t);e&&d(e.questId)});function d(t){const e=i.find(r=>r.questId===t);e&&WA.ui.banner.openBanner({id:e.questId,text:e.questDescription,bgColor:"#1B1B29",textColor:"#FFFFFF",timeToClose:0,closable:!1})}});WA.onInit().then(()=>{WA.room.area.onEnter("mumblecore_1").subscribe(()=>{const u=WA.player.name;WA.chat.sendChatMessage(`🎉 **Willkommen zurück ${u} !** 🎉 

 

Du hast **Großes getan** für unsere Universität. Du hast den **Virus neutralisiert** und **Lord Modrevolt** ein für alle Mal aus unserem System verbannt. ⚔️ 

 

Unsere Universität **Notlog** ist endlich wieder funktionstüchtig und wir können weiter **digitale Lehr- und Lernmaterialien** im **Kondensatorium** produzieren. 💻📚 

 

Wir sind dir zutiefst zu Dank verpflichtet. 🙏 `,"Mumblecore")})});
//# sourceMappingURL=final-notlog-main-50786bf8.js.map

import{b as m,c as g,p as A,g as b,q as o,l as W,m as l}from"./quests-07e5fd28.js";WA.onInit().then(async()=>{console.log("loading main.ts"),WA.controls.disableInviteButton(),WA.controls.disableMapEditor(),WA.controls.disableRoomList();try{await m(),console.log("Scripting API Extra ready")}catch(n){console.error(n)}});WA.onInit().then(()=>{WA.room.area.onLeave("toMatrix").subscribe(()=>{WA.player.state.currentQuest==="quest6"&&(WA.player.state.currentQuest="quest7")})});WA.player.onPlayerMove(async({x:n,y:a,moving:i})=>{var e,s,r;const t=await g({x:n,y:a});if(!t){(e=l)==null||e.stop();return}if(!i&&!t){(s=l)==null||s.stop();return}else(r=l)==null||r.stop(),A(t)});WA.onInit().then(()=>{WA.player.state.currentQuest==="quest26"?WA.chat.sendChatMessage("Wow, das ging schnell! Du hast beide Räume gemeistert. Ich hoffe du kannst dich noch an alle Wortschnipsel erinnern. Diese musst du nun in richtiger Reihenfolge im Sicherheitsterminal eingeben. Falls du Hilfe brauchst, frag doch deine Kolleg*innen, ob ihr diese Aufgabe zusammen lösen könnt. Ich darf nicht zu viel verraten, aber eine gezielte Recherche könnte durchaus hilfreich sein. Wenn du oder ihr es schafft, können wir Lord Modrevolt endlich aus unserem System entfernen und unsere Sicherheitseinstellungen des Kondensatoriums wieder herstellen.","Zirze"):console.log("not quest26")});WA.onInit().then(async()=>{const n=await b();for(const e of n){let s,r=WA.player.name;console.log("Player name:",r),WA.room.area.onEnter(e.name).subscribe(()=>{s=WA.ui.displayActionMessage({message:`[LEERTASTE] drücken um mit ${e.npcName} zu sprechen.`,callback:()=>{var c;if(WA.chat.sendChatMessage(e.chatText.replace("{NameOfPlayer}",r),e.npcName),e.triggerQuest){const u=WA.player.state.currentQuest,h=(c=o.find(d=>d.questId===e.triggerQuest))==null?void 0:c.requireQuest;u===h&&(WA.player.state.currentQuest=e.triggerQuest)}}}),WA.room.area.onLeave(e.name).subscribe(()=>{WA.chat.close()})}),WA.room.area.onLeave(e.name).subscribe(()=>{s&&(s.remove(),WA.chat.close())})}const a=WA.player.state.currentQuest,i=o.find(e=>e.questId===a);i&&t(i.questId),WA.player.state.onVariableChange("currentQuest").subscribe(e=>{const s=o.find(r=>r.questId===e);s&&t(s.questId)});function t(e){const s=o.find(r=>r.questId===e);s&&WA.ui.banner.openBanner({id:s.questId,text:s.questDescription,timeToClose:0,bgColor:"#1B1B29",textColor:"#FFFFFF",closable:!1})}});WA.onInit().then(()=>{let n;WA.room.area.onEnter("exit_m2").subscribe(()=>{n=WA.ui.openPopup("popup_m2","⚠️ Achtung! Wenn du durch dieses Portal gehst, kannst du nicht zurückkehren, bis du die Aufgaben dahinter gelöst hast.",[{label:"Weiter",className:"primary",callback:i=>{WA.nav.goToRoom("./modul_2.tmj"),i.close()}}])}),WA.room.area.onLeave("exit_m2").subscribe(()=>{n&&(n.close(),n=void 0)});let a;WA.room.area.onEnter("exit_m3").subscribe(()=>{a=WA.ui.openPopup("popup_m3","⚠️ Achtung! Wenn du durch dieses Portal gehst, kannst du nicht zurückkehren, bis du die Aufgaben dahinter gelöst hast.",[{label:"Weiter",className:"primary",callback:i=>{WA.nav.goToRoom("./modul_3.tmj"),i.close()}}])}),WA.room.area.onLeave("exit_m3").subscribe(()=>{a&&(a.close(),a=void 0)})});WA.onInit().then(async()=>{WA.player.state.module2==="2"&&WA.player.state.module3==="2"?WA.room.area.onEnter("finalCodeTerminal").subscribe(()=>{let n;n=WA.ui.displayActionMessage({message:"[LEERTASTE] drücken um mit dem Terminal zu interagieren.",callback:()=>{WA.chat.sendChatMessage("Du kannst jetzt den Sicherheitscode eingeben. Schreibe die richtigen Begriffe in den Chat.","Zirze"),WA.chat.onChatMessage(async(a,i)=>{if(i.authorId===void 0){const t=a.toLowerCase();t.includes("wissenschaft")&&t.includes("wissenssammlung")&&t.includes("art")&&t.includes("denken")?(WA.chat.sendChatMessage(` 🌟 **Alles korrekt** 🌟

Ich teleportiere dich nun zurück zu **Prof. Mumblecore**. Er wird sich sehr freuen, dich wiederzusehen! 🎉`,"Zirze"),await new Promise(e=>setTimeout(e,4e3)),WA.player.state.currentQuest="quest27",W("notlog",177),WA.nav.goToRoom("./notlog-solved.tmj")):WA.chat.sendChatMessage("Schade, versuche es doch noch einmal mit meinem Recherchetipp! 🔍","Zirze")}},{scope:"local"})}}),WA.room.area.onLeave("finalCodeTerminal").subscribe(()=>{n&&n.remove(),WA.chat.close()})}):WA.room.area.onEnter("finalCodeTerminal").subscribe(()=>{WA.chat.sendChatMessage("Die Module sind noch nicht vollständig gelöst. Kehre später zurück.","Zirze")})});WA.onInit().then(()=>{function n(){const a=WA.player.state.module2==="2",i=WA.player.state.module3==="2";if(a&&i){const t=[],e=[];for(let s=0;s<=47;s++)for(let r=0;r<=36;r++)t.push({x:s,y:r,tile:"green",layer:"green"}),e.push({x:s,y:r,tile:"red",layer:"red"});WA.room.setTiles([...t,...e]),WA.chat.sendChatMessage(`🌟 **Wow, das ging schnell!** 🌟 

 

Du hast **beide Module gemeistert**. 💪 

 

Ich hoffe, du kannst dich noch an alle **Wortschnipsel**✂️  erinnern. Diese musst du nun in **richtiger Reihenfolge** im **Sicherheitsterminal** eingeben. 🔐 

 

Falls du Hilfe brauchst, frag doch deine **Kolleg*innen**, ob ihr diese Aufgabe zusammen lösen könnt. 🤝👩‍💻👨‍💻 

 

Ich darf nicht zu viel verraten, aber eine **gezielte Recherche** könnte durchaus hilfreich sein. 🔍 

 

Wenn du oder ihr es schafft, können wir **Lord Modrevolt**💀 endlich aus unserem System entfernen und unsere **Sicherheitseinstellungen** des **Kondensatoriums** wieder herstellen. 🛡️🚀`,"Zirze")}else a&&WA.chat.sendChatMessage(`🎉 **Hervorragend, dich kann man gebrauchen!** 🎉 

 

Du hast **Modul 2** gemeistert und schon einiges über  wissenschaftliches Arbeiten gelernt. 🧠📚 

 

Vergiss deine **Wortschnipsel** nicht, diese sind sehr wichtig! ✂️💡 

 

Du bist nun bereit, mit **Modul 3** weiterzumachen, um mehr über das **wissenschaftliche Schreiben** zu erfahren. ✍️📖 `,"Zirze")}WA.player.state.onVariableChange("module2").subscribe(n),WA.player.state.onVariableChange("module3").subscribe(n),n()});
//# sourceMappingURL=hub-main-f31e4175.js.map

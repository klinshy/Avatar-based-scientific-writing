import{b as h,g as d,q as o,l as m}from"./quests-2c2a66d7.js";WA.onInit().then(async()=>{console.log("loading main.ts"),WA.controls.disableInviteButton(),WA.controls.disableMapEditor(),WA.controls.disableRoomList();try{await h(),console.log("Scripting API Extra ready")}catch(n){console.error(n)}});WA.onInit().then(()=>{WA.room.area.onLeave("toMatrix").subscribe(()=>{WA.player.state.currentQuest==="quest6"&&(WA.player.state.currentQuest="quest7")})});WA.onInit().then(()=>{WA.player.state.currentQuest==="quest26"?WA.chat.sendChatMessage("Wow, das ging schnell! Du hast beide Räume gemeistert. Ich hoffe du kannst dich noch an alle Wortschnipsel erinnern. Diese musst du nun in richtiger Reihenfolge im Sicherheitsterminal eingeben. Falls du Hilfe brauchst, frag doch deine Kolleg*innen, ob ihr diese Aufgabe zusammen lösen könnt. Ich darf nicht zu viel verraten, aber eine gezielte Recherche könnte durchaus hilfreich sein. Wenn du oder ihr es schafft, können wir Lord Modrevolt endlich aus unserem System entfernen und unsere Sicherheitseinstellungen des Kondensatoriums wieder herstellen.","Zirze"):console.log("not quest26")});WA.onInit().then(async()=>{const n=await d();for(const e of n){let s;WA.room.area.onEnter(e.name).subscribe(()=>{s=WA.ui.displayActionMessage({message:`[LEERTASTE] drücken um mit ${e.npcName} zu sprechen.`,callback:()=>{var t;if(WA.chat.sendChatMessage(e.chatText,e.npcName),e.triggerQuest){const c=WA.player.state.currentQuest,l=(t=o.find(u=>u.questId===e.triggerQuest))==null?void 0:t.requireQuest;c===l&&(WA.player.state.currentQuest=e.triggerQuest)}}}),WA.room.area.onLeave(e.name).subscribe(()=>{WA.chat.close()})}),WA.room.area.onLeave(e.name).subscribe(()=>{s&&(s.remove(),WA.chat.close())})}const i=WA.player.state.currentQuest,a=o.find(e=>e.questId===i);a&&r(a.questId),WA.player.state.onVariableChange("currentQuest").subscribe(e=>{const s=o.find(t=>t.questId===e);s&&r(s.questId)});function r(e){const s=o.find(t=>t.questId===e);s&&WA.ui.banner.openBanner({id:s.questId,text:s.questDescription,timeToClose:0,bgColor:"#1B1B29",textColor:"#FFFFFF",closable:!1})}});WA.onInit().then(async()=>{WA.player.state.module2==="2"&&WA.player.state.module3==="2"?WA.room.area.onEnter("finalCodeTerminal").subscribe(()=>{let n;n=WA.ui.displayActionMessage({message:"[LEERTASTE] drücken um mit dem Terminal zu interagieren.",callback:()=>{WA.chat.sendChatMessage("Du kannst jetzt den Sicherheitscode eingeben. Schreibe die richtigen Begriffe in den Chat.","Zirze"),WA.chat.onChatMessage(async(i,a)=>{if(a.authorId===void 0){const r=i.toLowerCase();r.includes("wissenschaft")&&r.includes("wissenssammlung")&&r.includes("art")&&r.includes("denken")?(WA.chat.sendChatMessage(` 🌟 **Alles korrekt** 🌟

Ich teleportiere dich nun zurück zu **Prof. Mumblecore**. Er wird sich sehr freuen, dich wiederzusehen! 🎉`,"Zirze"),await new Promise(e=>setTimeout(e,2e3)),WA.player.state.currentQuest="quest27",m("notlog",177),WA.nav.goToRoom("./notlog-solved.tmj")):WA.chat.sendChatMessage("Schade, versuche es doch noch einmal mit meinem Recherchetipp! 🔍","Zirze")}},{scope:"local"})}}),WA.room.area.onLeave("finalCodeTerminal").subscribe(()=>{n&&n.remove(),WA.chat.close()})}):WA.room.area.onEnter("finalCodeTerminal").subscribe(()=>{let n;n=WA.ui.displayActionMessage({message:"[LEERTASTE] drücken um mit dem Terminal zu interagieren.",callback:()=>{WA.chat.sendChatMessage("Die Module sind noch nicht vollständig gelöst. Kehre später zurück.","Zirze")}}),WA.room.area.onLeave("finalCodeTerminal").subscribe(()=>{n&&n.remove(),WA.chat.close()})})});WA.onInit().then(()=>{function n(){const i=WA.player.state.module2==="2",a=WA.player.state.module3==="2";if(i&&a){const r=[],e=[];for(let s=0;s<=47;s++)for(let t=0;t<=36;t++)r.push({x:s,y:t,tile:"green",layer:"green"}),e.push({x:s,y:t,tile:"red",layer:"red"});WA.room.setTiles([...r,...e]),WA.chat.sendChatMessage(`🌟 **Wow, das ging schnell!** 🌟 

 

Du hast **beide Module gemeistert**. 💪 

 

Ich hoffe, du kannst dich noch an alle **Wortschnipsel**✂️  erinnern. Diese musst du nun in **richtiger Reihenfolge** im **Sicherheitsterminal** eingeben. 🔐 

 

Falls du Hilfe brauchst, frag doch deine **Kolleg*innen**, ob ihr diese Aufgabe zusammen lösen könnt. 🤝👩‍💻👨‍💻 

 

Ich darf nicht zu viel verraten, aber eine **gezielte Recherche** könnte durchaus hilfreich sein. 🔍 

 

Wenn du oder ihr es schafft, können wir **Lord Modrevolt**💀 endlich aus unserem System entfernen und unsere **Sicherheitseinstellungen** des **Kondensatoriums** wieder herstellen. 🛡️🚀`,"Zirze")}else i&&WA.chat.sendChatMessage(`🎉 **Hervorragend, dich kann man gebrauchen!** 🎉 

 

Du hast **Modul 2** gemeistert und schon einiges über  wissenschaftliches Arbeiten gelernt. 🧠📚 

 

Vergiss deine **Wortschnipsel** nicht, diese sind sehr wichtig! ✂️💡 

 

Du bist nun bereit, mit **Modul 3** weiterzumachen, um mehr über das **wissenschaftliche Schreiben** zu erfahren. ✍️📖 `,"Zirze")}WA.player.state.onVariableChange("module2").subscribe(n),WA.player.state.onVariableChange("module3").subscribe(n),n()});
//# sourceMappingURL=hub-main-2734b208.js.map

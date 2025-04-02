import{b as d,g as h,q as o,l as m}from"./quests-5e6c253f.js";WA.onInit().then(async()=>{console.log("loading main.ts"),WA.controls.disableInviteButton(),WA.controls.disableMapEditor();try{await d(),console.log("Scripting API Extra ready")}catch(t){console.error(t)}});WA.onInit().then(()=>{WA.room.area.onLeave("toMatrix").subscribe(()=>{WA.player.state.currentQuest==="quest6"&&(WA.player.state.currentQuest="quest7")})});WA.onInit().then(async()=>{const t=await h();for(const e of t){let n;WA.room.area.onEnter(e.name).subscribe(()=>{n=WA.ui.displayActionMessage({message:`[LEERTASTE] drücken um mit ${e.npcName} zu sprechen.`,callback:()=>{var s;if(WA.chat.sendChatMessage(e.chatText,e.npcName),e.triggerQuest){const u=WA.player.state.currentQuest,c=(s=o.find(l=>l.questId===e.triggerQuest))==null?void 0:s.requireQuest;u===c&&(WA.player.state.currentQuest=e.triggerQuest)}}})}),WA.room.area.onLeave(e.name).subscribe(()=>{n&&(n.remove(),WA.chat.close())})}const i=WA.player.state.currentQuest,r=o.find(e=>e.questId===i);r&&a(r.questId),WA.player.state.onVariableChange("currentQuest").subscribe(e=>{const n=o.find(s=>s.questId===e);n&&a(n.questId)});function a(e){const n=o.find(s=>s.questId===e);n&&WA.ui.banner.openBanner({id:n.questId,text:n.questDescription,bgColor:"#1B1B29",textColor:"#FFFFFF",closable:!1})}});WA.onInit().then(async()=>{WA.player.state.module2==="2"&&WA.player.state.module3==="2"?WA.room.area.onEnter("finalCodeTerminal").subscribe(()=>{WA.chat.sendChatMessage("Bitte gib das Lösungswort ein","Zirze"),WA.chat.onChatMessage(async(t,i)=>{if(i.authorId===void 0){const r=t.toLowerCase();r.includes("wissenschaft")&&r.includes("wissenssammlung")&&r.includes("art")&&r.includes("denken")?(WA.chat.sendChatMessage("Success: Das ist korrekt, ich teleportiere dich zurück zu Prof. Mumblecore!","Zirze"),await new Promise(a=>setTimeout(a,2e3)),WA.player.state.currentQuest="quest27",m("notlog",177),WA.nav.goToRoom("./notlog-solved.tmj")):WA.chat.sendChatMessage("Error: Das war nicht die korrekte Antwort. Erinnere dich daran was Wissenschaft ist und was nicht.","Zirze")}},{scope:"local"})}):WA.room.area.onEnter("finalCodeTerminal").subscribe(()=>{WA.chat.sendChatMessage(`## 🖥️ Reparatur des Computerterminals  

 Komme hierhin zurück, wenn du **Modul 2** und **3** gelöst hast. ✅   

 Um dieses **Computerterminal** zu reparieren, benötigst du die richtigen **Wortschnipsel**, die beim **Einbruch durch Lord Modrevolt** 💀 durcheinandergeraten sind.  

 Finde die Fragmente und setze sie korrekt zusammen, um das System wiederherzustellen! 🚀 `,"Zirze")}),WA.room.area.onLeave("finalCodeTerminal").subscribe(()=>{WA.chat.close()})});WA.onInit().then(()=>{function t(){const i=WA.player.state.module2==="2",r=WA.player.state.module3==="2";if(i&&r){const a=[],e=[];for(let n=0;n<=47;n++)for(let s=0;s<=36;s++)a.push({x:n,y:s,tile:"green",layer:"green"}),e.push({x:n,y:s,tile:"red",layer:"red"});WA.room.setTiles([...a,...e]),WA.chat.sendChatMessage(`🌟 **Wow, das ging schnell!** 🌟   

Du hast **beide Module gemeistert**. 💪   

Ich hoffe, du kannst dich noch an alle **Wortschnipsel**✂️ erinnern. Diese musst du nun in **richtiger Reihenfolge** im **Sicherheitsterminal** eingeben. 🔐   

Falls du Hilfe brauchst, frag doch deine **Kolleg*innen**, ob ihr diese Aufgabe zusammen lösen könnt. 🤝👩‍💻👨‍💻   

Ich darf nicht zu viel verraten, aber eine **gezielte Recherche** könnte durchaus hilfreich sein. 🔍   

Wenn du oder ihr es schafft, können wir **Lord Modrevolt**💀 endlich aus unserem System entfernen und unsere **Sicherheitseinstellungen** des **Kondensatoriums** wieder herstellen. 🛡️🚀`,"Zirze")}else i&&WA.chat.sendChatMessage(`🎉 **Hervorragend, dich kann man gebrauchen!** 🎉   

Du hast **Modul 2** gemeistert und schon einiges über die Techniken des wissenschaftlichen Arbeitens gelernt. 🧠📚   

Vergiss deine **Wortschnipsel** nicht, diese sind sehr wichtig! ✂️💡   

Du bist nun bereit, mit **Modul 3** weiterzumachen, um mehr über das **wissenschaftliche Schreiben** zu erfahren. ✍️📖`,"Zirze")}WA.player.state.onVariableChange("module2").subscribe(t),WA.player.state.onVariableChange("module3").subscribe(t),t()});
//# sourceMappingURL=hub-main-2712b1cf.js.map

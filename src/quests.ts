import { levelUp } from "@workadventure/quests";

const quests = [
    // Notlog
    {
        questName: 'Einführung in Notlog',
        questId: 'quest1',
        questDescription: 'Triff Prof. McDongle am Eingang von Notlog.',
        questXp: 100,
        requireQuest: null,
        questKey: 'notlog'
    },
    {
        questName: 'Erkundung des Saals',
        questId: 'quest2',
        questDescription: 'Sprich mit Prof. Mumblecore am nördlichen Ende der großen Halle.',
        questXp: 150,
        requireQuest: 'quest1',
        questKey: 'notlog'
    },
    {
        questName: 'Laborbesuch',
        questId: 'quest3',
        questDescription: 'Geh runter ins Labor und sprich mit Prof. Sake.',
        questXp: 200,
        requireQuest: 'quest2',
        questKey: 'notlog'
    },
    {
        questName: 'Das Video im Labor ansehen',
        questId: 'quest4',
        questDescription: 'Sehen dir das Video im Labor an.',
        questXp: 50,
        requireQuest: 'quest3',
        questKey: 'notlog'
    },
    {
        questName: 'Betreten Sie den Matrix Hub',
        questId: 'quest5',
        questDescription: 'Verlasse Notlog und betrete den Matrix Hub.',
        questXp: 250,
        requireQuest: 'quest4',
        questKey: 'notlog'
    },
    // Matrix Hub

{
    questName: "Durch das Chaos im Labor navigieren",
    questId: "modul2_quest1",
    questDescription: "Komm mit der Unordnung im Farblabor zurecht und finde heraus, wer das Chaos angerichtet hat.",
    questXp: 10,
    requireQuest: "quest5",
    questKey: "modul2"
},
{
    questName: "materialien ordnen",
    questId: "modul2_quest2",
    questDescription: "Bringe die Materialien von Alex in Ordnung und erhalte mehr Einblicke in den Kurs 'Wissenschaftliches Arbeiten'.",
    questXp: 10,
    requireQuest: "modul2_quest1",
    questKey: "modul2"
},
{
    questName: "Meistere 3.2",
    questId: "modul2_quest3",
    questDescription: "Schaffe es, 3.2 zu bewältigen, und erhalte Respekt für deinen Einsatz.",
    questXp: 10,
    requireQuest: "modul2_quest2",
    questKey: "modul2"
},
{
    questName: "Überwinde 3.3",
    questId: "modul2_quest4",
    questDescription: "Meistere das nächste Kapitel, 3.3, und lerne noch mehr von Alex' Materialien.",
    questXp: 10,
    requireQuest: "modul2_quest3",
    questKey: "modul2"
},

// Modul 3
];



export { quests, levelUp };
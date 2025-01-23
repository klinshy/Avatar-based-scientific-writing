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
        questName: 'Einführung in den Matrix-Hub',
        questId: 'quest6',
        questDescription: 'Interagiere mit dem Hologramm.',
        questXp: 250,
        requireQuest: 'quest5',
        questKey: 'notlog'
    },
    {
        questName: 'Die erste Herausforderung',
        questId: 'quest6',
        questDescription: 'Betrete den ersten Raum und löse die Aufgabe.',
        questXp: 250,
        requireQuest: 'quest5',
        questKey: 'notlog'
    },
// Modul 2

// Modul 3
];



export { quests, levelUp };
import { levelUp } from "@workadventure/quests";

const quests = [
    // Notlog
    {
        questName: 'Einführung in Notlog',
        questId: 'quest1',
        questDescription: 'Triff Prof. McDongle am Eingang von Notlog.',

        requireQuest: null,
        questKey: 'notlog'
    },
    {
        questName: 'Erkundung des Saals',
        questId: 'quest2',
        questDescription: 'Sprich mit Prof. Mumblecore am nördlichen Ende der großen Halle.',

        requireQuest: 'quest1',
        questKey: 'notlog'
    },
    {
        questName: 'Laborbesuch',
        questId: 'quest3',
        questDescription: 'Geh runter ins Labor und sprich mit Prof. Sake.',

        requireQuest: 'quest2',
        questKey: 'notlog'
    },
    {
        questName: 'Das Video im Labor ansehen',
        questId: 'quest4',
        questDescription: 'Sieh dir das Video im Labor an.',

        requireQuest: 'quest3',
        questKey: 'notlog'
    },
    {
        questName: 'Finde den geheimen Eingang',
        questId: 'quest5',
        questDescription: 'Finde den geheimen Eingang zum Matrix Hub.',

        requireQuest: 'quest4',
        questKey: 'notlog'
    },

    {
        questName: 'Zirze',
        questId: 'quest6',
        questDescription: 'Sprich mit Zirze im Matrix Hub.',
        
        requireQuest: 'quest5',
        questKey: 'notlog'
    },
 // Matrix Hub
    {
        questName: 'Betritt Modul 2',
        questId: 'quest7',
        questDescription: 'Betrete Modul 2',
        
        requireQuest: 'quest6',
        questKey: 'matrix'
    },

// Modul 2
    {
        questName: 'löse Modul 2',
        questId: 'quest8',
        questDescription: 'Löse die Aufgaben in Modul 2, sprich mit Zirze solltest du Hilfe brauchen.',
        
        requireQuest: 'quest7',
        questKey: 'matrix'
    },

    {
        questName: 'modul2 solved',
        questId: 'quest9',
        questDescription: 'Kehre in den Matrix Hub zurück und fahre mit Modul 3 fort.',
        
        requireQuest: 'quest8',
        questKey: 'matrix'
    },
   
// Modul 3
    {
        questName: 'löse Modul 3',
        questId: 'quest10',
        questDescription: 'Löse die Aufgaben in Modul 3, sprich mit Zirze solltest du Hilfe brauchen.',
        
        requireQuest: 'quest9',
        questKey: 'matrix'
    },





];


export { quests, levelUp };
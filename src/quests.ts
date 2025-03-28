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
        questDescription: 'Finde den geheimen Eingang zum Kondesatorium .',

        requireQuest: 'quest4',
        questKey: 'notlog'
    },

    {
        questName: 'Zirze',
        questId: 'quest6',
        questDescription: 'Schreite durch das Portal ins Kondesatorium ',
        
        requireQuest: 'quest5',
        questKey: 'notlog'
    },
 // Kondesatorium  Hub
    {
        questName: 'Betritt Modul 2',
        questId: 'quest7',
        questDescription: 'Sprich mit der zitierenden Zirze',
        
        requireQuest: 'quest6',
        questKey: 'matrix'
    },

// Modul 2
    {
        questName: 'löse Modul 2',
        questId: 'quest8',
        questDescription: 'Geh durch das Portal mit der Zwei und gelange zu deiner ersten Aufgabe ',
        
        requireQuest: 'quest7',
        questKey: 'matrix'
    },

    {
        questName: 'modul2 solved',
        questId: 'quest9',
        questDescription: 'Löse die Aufgaben in Modul 2, sprich mit Zirze solltest du Hilfe brauchen./Löse Aufgabe 1 in Raum 1 in Modul 2 und dann so weiter ',
        
        requireQuest: 'quest8',
        questKey: 'matrix'
    },
   
// Modul 3
    {
        questName: 'löse Modul 3',
        questId: 'quest10',
        questDescription: 'Geh durch das Portal zurück zum Knotenpunkt des Kondensatoriums und sprich mit Zirze ',
        
        requireQuest: 'quest9',
        questKey: 'matrix'
    },
    {
        questName: 'löse Modul 3',
        questId: 'quest11',
        questDescription: 'Geh durch das Portal mit der Drei und gelange zu deiner finalen Aufgaben',
        
        requireQuest: 'quest10',
        questKey: 'matrix'
    },
    {
        questName: 'löse Modul 3',
        questId: 'quest12',
        questDescription: 'Löse die Aufgaben in Modul 3, sprich mit Zirze solltest du Hilfe brauchen. Oder auch kleinteiliger',
        
        requireQuest: 'quest11',
        questKey: 'matrix'
    },
    {
        questName: 'löse Modul 3',
        questId: 'quest13',
        questDescription: 'Geh durch das Portal zurück zum Knotenpunkt des Kondensatoriums und sprich mit Zirze',
        
        requireQuest: 'quest12',
        questKey: 'matrix'
    },
    {
        questName: 'löse Modul 3',
        questId: 'quest14',
        questDescription: 'Begib dich zum Terminal und befrei das Kondensatorium vom Virus',
        
        requireQuest: 'quest13',
        questKey: 'matrix'
    },





];


export { quests, levelUp };
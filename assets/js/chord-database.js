// Chord database with finger positions for common chords
const chordDatabase = {
  'C': {
    fingers: [
      [2, 1],
      [4, 2],
      [5, 3]
    ],
    barres: [],
    title: 'C',
    position: 1
  },
  'C7': {
    fingers: [
      [2, 1],
      [4, 2]
    ],
    barres: [],
    title: 'C7',
    position: 1
  },
  'Cm': {
    fingers: [
      [2, 1],
      [3, 3],
      [4, 3],
      [5, 3]
    ],
    barres: [],
    title: 'Cm',
    position: 1
  },
  'G': {
    fingers: [
      [1, 3],
      [5, 2],
      [6, 3]
    ],
    barres: [],
    title: 'G',
    position: 1
  },
  'G7': {
    fingers: [
      [1, 1],
      [5, 2],
      [6, 3]
    ],
    barres: [],
    title: 'G7',
    position: 1
  },
  'Gm': {
    fingers: [
      [1, 1],
      [2, 3],
      [3, 3],
      [4, 3]
    ],
    barres: [
      {
        fromString: 5,
        toString: 1,
        fret: 3
      }
    ],
    title: 'Gm',
    position: 3
  },
  'D': {
    fingers: [
      [1, 2],
      [3, 2],
      [2, 3]
    ],
    barres: [],
    title: 'D',
    position: 1
  },
  'D7': {
    fingers: [
      [1, 2],
      [2, 3],
      [3, 2]
    ],
    barres: [],
    title: 'D7',
    position: 1
  },
  'Dm': {
    fingers: [
      [1, 1],
      [3, 2],
      [2, 3]
    ],
    barres: [],
    title: 'Dm',
    position: 1
  },
  'E': {
    fingers: [
      [3, 1],
      [4, 2],
      [5, 2]
    ],
    barres: [],
    title: 'E',
    position: 1
  },
  'E7': {
    fingers: [
      [3, 1],
      [5, 2]
    ],
    barres: [],
    title: 'E7',
    position: 1
  },
  'Em': {
    fingers: [
      [4, 2],
      [5, 2]
    ],
    barres: [],
    title: 'Em',
    position: 1
  },
  'A': {
    fingers: [
      [2, 2],
      [3, 2],
      [4, 2]
    ],
    barres: [],
    title: 'A',
    position: 1
  },
  'A7': {
    fingers: [
      [2, 2],
      [4, 2]
    ],
    barres: [],
    title: 'A7',
    position: 1
  },
  'Am': {
    fingers: [
      [2, 1],
      [3, 2],
      [4, 2]
    ],
    barres: [],
    title: 'Am',
    position: 1
  },
  'F': {
    fingers: [
      [2, 1],
      [3, 2],
      [4, 3],
      [5, 3]
    ],
    barres: [
      {
        fromString: 6,
        toString: 1,
        fret: 1
      }
    ],
    title: 'F',
    position: 1
  },
  'F7': {
    fingers: [
      [2, 1],
      [3, 2],
      [4, 3]
    ],
    barres: [
      {
        fromString: 5,
        toString: 1,
        fret: 1
      }
    ],
    title: 'F7',
    position: 1
  },
  'Fm': {
    fingers: [
      [2, 1],
      [3, 1],
      [4, 3]
    ],
    barres: [
      {
        fromString: 5,
        toString: 1,
        fret: 1
      }
    ],
    title: 'Fm',
    position: 1
  },
  'B': {
    fingers: [
      [1, 2],
      [2, 4],
      [3, 4],
      [4, 4],
      [5, 2]
    ],
    barres: [
      {
        fromString: 5,
        toString: 1,
        fret: 2
      }
    ],
    title: 'B',
    position: 2
  },
  'B7': {
    fingers: [
      [1, 2],
      [2, 4],
      [3, 2],
      [4, 4],
      [5, 2]
    ],
    barres: [
      {
        fromString: 5,
        toString: 1,
        fret: 2
      }
    ],
    title: 'B7',
    position: 2
  },
  'Bm': {
    fingers: [
      [2, 2],
      [3, 3],
      [4, 4]
    ],
    barres: [
      {
        fromString: 5,
        toString: 1,
        fret: 1
      }
    ],
    title: 'Bm',
    position: 1
  },
  'D/F#': {
    fingers: [
      [1, 2],
      [2, 3],
      [3, 2],
      [4, 'x'],
      [5, 'x'],
      [6, 2]
    ],
    barres: [],
    title: 'D/F#',
    position: 1
  },
  'Bm7b13': {
    fingers: [
      [2, 2],
      [3, 3],
      [4, 3]
    ],
    barres: [
      {
        fromString: 5,
        toString: 1,
        fret: 1
      }
    ],
    title: 'Bm7b13',
    position: 1
  },
  'Em7': {
    fingers: [
      [2, 3],
      [5, 2]
    ],
    barres: [],
    title: 'Em7',
    position: 1
  },
  'Am7': {
    fingers: [
      [2, 1],
      [3, 2],
      [4, 2]
    ],
    barres: [],
    title: 'Am7',
    position: 1
  },
  'D9sus4': {
    fingers: [
      [1, 3],
      [2, 3],
      [3, 2]
    ],
    barres: [],
    title: 'D9sus4',
    position: 1
  },
  'Gsus4': {
    fingers: [
      [1, 'x'],
      [2, 1],
      [5, 2],
      [6, 3]
    ],
    barres: [],
    title: 'Gsus4',
    position: 1
  },
  'Csus2': {
    fingers: [
      [2, 3],
      [4, 2],
      [5, 3]
    ],
    barres: [],
    title: 'Csus2',
    position: 1
  },
  'Dsus2': {
    fingers: [
      [1, 2],
      [2, 3],
      [3, 2]
    ],
    barres: [],
    title: 'Dsus2',
    position: 1
  },
  'Esus4': {
    fingers: [
      [2, 2],
      [3, 2],
      [4, 2]
    ],
    barres: [],
    title: 'Esus4',
    position: 1
  }
};

// Function to get chord data
function getChordData(chordName) {
  return chordDatabase[chordName] || null;
}

// Function to add new chords to database
function addChordToDatabase(chordName, chordData) {
  chordDatabase[chordName] = chordData;
}

// Function to check if chord exists
function chordExists(chordName) {
  return chordName in chordDatabase;
}
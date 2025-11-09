// Global chord database
let chordDatabase = {};

// Function to convert string format to array format
function parseFingersString(fingersString) {
  const fingers = [];
  for (let i = 0; i < fingersString.length; i++) {
    const stringNumber = i + 1; // Strings are 1-indexed
    const fretChar = fingersString[i];
    
    if (fretChar === 'x' || fretChar === 'X') {
      fingers.push([stringNumber, 'x']);
    } else {
      const fret = parseInt(fretChar, 10);
      if (!isNaN(fret)) {
        fingers.push([stringNumber, fret]);
      }
    }
  }
  return fingers;
}

// Function to load chord data from Jekyll data files
function loadChordDatabase() {
  // This will be populated by Jekyll data
  if (typeof window.chordData !== 'undefined') {
    // Convert string format to array format for all chords
    Object.keys(window.chordData).forEach(chordName => {
      const chord = window.chordData[chordName];
      if (typeof chord.fingers === 'string') {
        chord.fingers = parseFingersString(chord.fingers);
      }
    });
    chordDatabase = window.chordData;
  }
}

// Function to get chord data
function getChordData(chordName) {
  // Check if database is loaded, if not load it
  if (Object.keys(chordDatabase).length === 0) {
    loadChordDatabase();
  }
  
  return chordDatabase[chordName] || null;
}

// Function to add new chords to database (supports both formats)
function addChordToDatabase(chordName, chordData) {
  // Convert string format to array format if needed
  if (chordData.fingers && typeof chordData.fingers === 'string') {
    chordData.fingers = parseFingersString(chordData.fingers);
  }
  chordDatabase[chordName] = chordData;
}

// Function to check if chord exists
function chordExists(chordName) {
  // Check if database is loaded, if not load it
  if (Object.keys(chordDatabase).length === 0) {
    loadChordDatabase();
  }
  
  return chordName in chordDatabase;
}

// Utility function to convert array format back to string format (for debugging)
function convertFingersArrayToString(fingersArray) {
  const result = ['x', 'x', 'x', 'x', 'x', 'x']; // Start with all muted
  
  fingersArray.forEach(([stringNum, fret]) => {
    if (stringNum >= 1 && stringNum <= 6) {
      result[stringNum - 1] = fret.toString();
    }
  });
  
  return result.join('');
}

// Initialize when script loads
document.addEventListener('DOMContentLoaded', function() {
  loadChordDatabase();
});
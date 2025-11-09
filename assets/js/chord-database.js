// Global chord database
let chordDatabase = {};

// Function to load chord data from Jekyll data files
function loadChordDatabase() {
  // This will be populated by Jekyll data
  if (typeof window.chordData !== 'undefined') {
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

// Function to add new chords to database
function addChordToDatabase(chordName, chordData) {
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

// Initialize when script loads
document.addEventListener('DOMContentLoaded', function() {
  loadChordDatabase();
});
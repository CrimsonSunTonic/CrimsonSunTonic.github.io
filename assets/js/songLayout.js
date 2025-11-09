function createChordDiagram(chordName) {
  // Create container for chord diagram
  const chordContainer = document.createElement('div');
  chordContainer.className = 'chord-diagram';
  
  // Create unique ID for this chord diagram
  const chordId = 'chord-' + Math.random().toString(36).substr(2, 9);
  chordContainer.id = chordId;
  
  // Get chord data from database
  const chordData = getChordData(chordName);
  
  if (chordData) {
    // Use setTimeout to ensure DOM is ready
    setTimeout(() => {
      try {
        const chart = new svguitar.SVGuitarChord(`#${chordId}`);
        chart
          .chord(chordData)
          .configure({
            orientation: 'vertical',
            style: 'normal',
            strings: 6,
            frets: 5,
            position: 1,
            tuning: ['E', 'A', 'D', 'G', 'B', 'E'],
            fretLabelFontSize: 38,
            tuningsFontSize: 28,
            fingerSize: 0.65,
            fingerColor: '#000',
            fingerTextColor: '#FFF',
            fingerTextSize: 22,
            fingerStrokeColor: '#000000',
            fingerStrokeWidth: 0,
            barreChordStrokeColor: '#000000',
            barreChordStrokeWidth: 0,
            fretSize: 1.5,
            sidePadding: 0.2,
            fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
            title: chordName,
            titleFontSize: 48,
            titleBottomMargin: 0,
            color: '#000000',
            backgroundColor: 'none',
            barreChordRadius: 0.25,
            emptyStringIndicatorSize: 0.6,
            strokeWidth: 2,
            nutWidth: 10,
            noPosition: false,
            titleColor: '#000000',
            stringColor: '#000000',
            fretLabelColor: '#000000',
            tuningsColor: '#000000',
            fretColor: '#000000',
            fixedDiagramPosition: false,
            watermarkColor: '#000000',
            watermarkFontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
            svgTitle: `Guitar chord diagram of ${chordName}`,
            showFretMarkers: true,
            fretMarkerShape: 'circle',
            fretMarkerSize: 0.4,
            fretMarkerColor: 'rgba(0, 0, 0, 0.2)',
            fretMarkerStrokeColor: '#000000',
            fretMarkerStrokeWidth: 0,
            doubleFretMarkerDistance: 0.4
          })
          .draw();
      } catch (error) {
        console.error(`Error creating chord diagram for ${chordName}:`, error);
        // Fallback: show chord name as text
        chordContainer.innerHTML = `<div class="chord">${chordName}</div>`;
      }
    }, 100);
  } else {
    // If chord not found in database, show text fallback
    chordContainer.innerHTML = `<div class="chord">${chordName}</div>`;
  }
  
  return chordContainer;
}

function createEmptyChordPlaceholder() {
  // Create a very small empty placeholder
  const placeholder = document.createElement('div');
  placeholder.className = 'empty-chord';
  return placeholder;
}

function createEmptyLyricPlaceholder() {
  // Create an empty lyric placeholder
  const placeholder = document.createElement('div');
  placeholder.className = 'lyric';
  placeholder.style.visibility = 'hidden';
  placeholder.innerHTML = '&nbsp;'; // Non-breaking space
  return placeholder;
}

function renderLyrics(line) {
  let parts = line.split(/(\[[^\]]+\])/).filter(Boolean);

  let lyricsLineDiv = document.createElement('div');
  lyricsLineDiv.className = 'lyrics-line';

  for (let i = 0; i < parts.length; i++) {
    if (parts[i].startsWith('[')) {
      // Chord
      let chord = parts[i].substring(1, parts[i].length - 1);

      // Lyrics part should follow the chord (if exists)
      let lyrics = '';
      let hasLyrics = false;
      
      if (i + 1 < parts.length && !parts[i + 1].startsWith('[')) {
        lyrics = parts[i + 1].trim();
        hasLyrics = (lyrics !== '');
        i++;
      }

      // Create part div with appropriate class
      let partDiv = document.createElement('div');
      if (hasLyrics) {
        partDiv.className = 'part with-chord';
      } else {
        partDiv.className = 'part no-lyrics';
      }

      // Create chord diagram instead of text chord
      const chordDiagram = createChordDiagram(chord);
      partDiv.appendChild(chordDiagram);

      // Create lyric div and append
      let lyricDiv = document.createElement('div');
      lyricDiv.className = 'lyric';
      if (hasLyrics) {
        lyricDiv.textContent = lyrics;
      } else {
        lyricDiv.style.visibility = 'hidden';
        lyricDiv.innerHTML = '&nbsp;'; // Non-breaking space to maintain height
      }
      partDiv.appendChild(lyricDiv);

      // Append part div to lyricsLineDiv
      lyricsLineDiv.appendChild(partDiv);
    } else {
      // No chord specified, treat entire part as lyrics
      let lyrics = parts[i].trim();

      // Skip if this is empty text between chords
      if (lyrics === '') continue;

      // Create part div with special class for no-chord
      let partDiv = document.createElement('div');
      partDiv.className = 'part no-chord';

      // Create very small empty chord placeholder
      const emptyChord = createEmptyChordPlaceholder();
      partDiv.appendChild(emptyChord);

      // Create lyric div and append
      let lyricDiv = document.createElement('div');
      lyricDiv.className = 'lyric';
      lyricDiv.textContent = lyrics;
      partDiv.appendChild(lyricDiv);

      // Append part div to lyricsLineDiv
      lyricsLineDiv.appendChild(partDiv);
    }
  }

  return lyricsLineDiv;
}

function renderSong(input) {
  let lines = input.split('\n').map(line => line.trim()).filter(line => line !== '');

  let songsDiv = document.getElementById('songs');
  songsDiv.innerHTML = '';

  lines.forEach(line => {
    let lyricsLineDiv = renderLyrics(line);
    songsDiv.appendChild(lyricsLineDiv);
  });
}

function htmlEntityDecode(html) {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

function stripPTagsAndBrTags(html) {
  return html.replace(/<\/?p>/g, '').replace(/<br\s*\/?>/g, '');
}
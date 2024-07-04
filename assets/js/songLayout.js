function renderLyrics(line) {
    let parts = line.split(/(\[[^\]]+\])/).filter(Boolean); // Split parts and filter out empty strings

    let lyricsLineDiv = document.createElement('div');
    lyricsLineDiv.className = 'lyrics-line';

    for (let i = 0; i < parts.length; i++) {
        if (parts[i].startsWith('[')) {
            // Chord
            let chord = parts[i].substring(1, parts[i].length - 1); // Remove []

            // Lyrics part should follow the chord (if exists)
            let lyrics = '';
            if (i + 1 < parts.length) {
                lyrics = parts[i + 1].trim(); // Trim whitespace
                i++; // Move to the next part (lyrics)
            }

            // Create part div
            let partDiv = document.createElement('div');
            partDiv.className = 'part';

            // Create chord div
            let chordDiv = document.createElement('div');
            chordDiv.className = 'chord';
            chordDiv.textContent = chord;
            partDiv.appendChild(chordDiv);

            // Create lyric div and append
            let lyricDiv = document.createElement('div');
            lyricDiv.className = 'lyric';
            lyricDiv.textContent = lyrics;
            partDiv.appendChild(lyricDiv);

            // Append part div to lyricsLineDiv
            lyricsLineDiv.appendChild(partDiv);
        } else {
            // No chord specified, treat entire part as lyrics
            let lyrics = parts[i].trim();

            // Create part div
            let partDiv = document.createElement('div');
            partDiv.className = 'part';

            // Create empty chord div
            // let chordDiv = document.createElement('div');
            // chordDiv.className = 'chord';
            // chordDiv.textContent = '\u00A0'; // Use &nbsp; for empty chord
            // partDiv.appendChild(chordDiv);

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
    let lines = input.split('\n').map(line => line.trim()).filter(line => line !== ''); // Split by lines, trim whitespace, and filter out empty lines

    let songsDiv = document.getElementById('songs');
    songsDiv.innerHTML = ''; // Clear any existing content

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
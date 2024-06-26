// songLayout.js
function createLyricLinesFromInput(input) {
    const lyricsContainer = document.getElementById('lyricsContainer');
    lyricsContainer.innerHTML = ''; // Clear existing content

    const lines = input.split('\n'); // Split by newline character
    lines.forEach(line => {
        const lineDiv = document.createElement('div');
        lineDiv.classList.add('lyricLine');

        const pElement = document.createElement('p');

        let match;
        const regex = /\{(\[[^}]+\])([^}]+)\}/g; // Regex to match {chord}word pattern

        let lastIndex = 0;
        while ((match = regex.exec(line)) !== null) {
            const chord = match[1].replace(/[\[\]]/g, ''); // Remove parentheses
            const lyric = match[2];

            // Add any text before the current match as plain text
            if (match.index > lastIndex) {
                pElement.appendChild(document.createTextNode(line.substring(lastIndex, match.index)));
            }

            // Create and append the intonation span
            const intonationSpan = document.createElement('span');
            intonationSpan.classList.add('intonation');

            const chordSpan = document.createElement('span');
            chordSpan.classList.add('chord');
            chordSpan.textContent = chord;

            intonationSpan.appendChild(document.createTextNode(lyric)); // Add intonation text first
            intonationSpan.appendChild(chordSpan); // Then add chord

            pElement.appendChild(intonationSpan);

            lastIndex = regex.lastIndex;
        }

        // Add any remaining text after the last match
        if (lastIndex < line.length) {
            pElement.appendChild(document.createTextNode(line.substring(lastIndex)));
        }

        lineDiv.appendChild(pElement);
        lyricsContainer.appendChild(lineDiv);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const inputString = `{{ song.lyrics | escape }}`;
    createLyricLinesFromInput(inputString);
});
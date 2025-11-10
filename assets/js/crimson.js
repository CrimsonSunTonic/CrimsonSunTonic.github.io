// Crimson Sun Sea JS: preloader, starfield, song enhancements (chord summary, video pop-out)
(function(){
  // small throttle helper
  function throttle(fn, wait){
    let last=0;
    return function(...args){
      const now = Date.now();
      if(now - last >= wait){ last = now; fn.apply(this,args); }
    }
  }

  function showPreloader(){
    if(document.getElementById('preloader')) return;
    const pre = document.createElement('div');
    pre.id = 'preloader';
    pre.style.display = 'none';
    document.body.appendChild(pre);
  }

  // Starfield canvas removed - no animation

  // Render chord summary at top of song container
  function renderChordSummary(chords){
    if(!chords || Object.keys(chords).length===0) return;
    const sc = document.querySelector('.song-container');
    if(!sc) return;
    let existing = sc.querySelector('.chord-summary');
    if(existing) existing.remove();
    const wrap = document.createElement('div');
    wrap.className = 'chord-summary';
    Object.keys(chords).forEach(name => {
      const pill = document.createElement('div');
      pill.className = 'chord-pill';

      // thumb container (small svg chord diagram)
      const thumb = document.createElement('div');
      thumb.className = 'chord-thumb';
      // give an id for svguitar to target
      const tid = 'chord-thumb-' + Math.random().toString(36).substr(2,8);
      thumb.id = tid;
      pill.appendChild(thumb);

      // label
      const label = document.createElement('div');
      label.className = 'chord-label';
      label.textContent = name;
      pill.appendChild(label);

      wrap.appendChild(pill);

      // Try to render a small diagram using existing chord database + svguitar
      (function(chordName, targetId){
        // run async little later so other scripts (svguitar, chord-database) have loaded
        setTimeout(()=>{
          try{
            if(typeof getChordData === 'function'){
              const data = getChordData(chordName);
              if(data && typeof svguitar !== 'undefined' && svguitar.SVGuitarChord){
                // instantiate a tiny diagram in the thumb element
                try{
                  const chart = new svguitar.SVGuitarChord('#' + targetId);
                  chart
                    .chord(data)
                    .configure({
                      orientation: 'vertical',
                      style: 'normal',
                      strings: 6,
                      frets: 4,
                      position: 1,
                      tuning: ['E','A','D','G','B','E'],
                      title: '',
                      titleFontSize: 0,
                      titleBottomMargin: 0,
                      fretLabelFontSize: 10,
                      tuningsFontSize: 0,
                      fingerSize: 0.6,
                      fingerColor: '#000',
                      fingerTextColor: '#fff',
                      fingerTextSize: 10,
                      strokeWidth: 1,
                      nutWidth: 6,
                      sidePadding: 0.08,
                      fixedDiagramPosition: true,
                      color: '#000',
                      backgroundColor: 'none',
                      showFretMarkers: false,
                      watermarkColor: 'transparent',
                      svgTitle: ''
                    })
                    .draw();
                }catch(e){
                  // ignore rendering errors, fallback will keep text label
                  console.debug('thumb render error', e);
                }
              }
            }
          }catch(e){ console.debug('renderChordSummary thumb install error', e); }
        }, 80);
      })(name, tid);
    });
    sc.insertBefore(wrap, sc.firstElementChild.nextElementSibling || sc.firstChild);
  }

  // initSongPage called from songs layout
  window.initSongPage = function(frontMatterChords, rawContent){
    try{
      // frontMatterChords already added to chord database by other script; still render summary
      renderChordSummary(frontMatterChords || {});

      // call existing helpers (songLayout.js provides renderSong, htmlEntityDecode, stripPTagsAndBrTags)
      let content = rawContent || '';
      if(window.htmlEntityDecode) content = window.htmlEntityDecode(content);
      if(window.stripPTagsAndBrTags) content = window.stripPTagsAndBrTags(content);
      if(window.renderSong) window.renderSong(content);

      // video pop-out effect
      const vc = document.querySelector('.video-container');
      if(vc){
        const onScroll = throttle(()=>{
          const rect = vc.getBoundingClientRect();
          // if the video scrolled well past top of viewport, make sticky
          if(rect.top < -200){
            vc.classList.add('video-sticky');
          } else {
            vc.classList.remove('video-sticky');
          }
        }, 120);
        window.addEventListener('scroll', onScroll);
      }

    }catch(e){ console.warn('initSongPage error', e); }
  };

  // on DOM ready - no animations
  document.addEventListener('DOMContentLoaded', function(){
    showPreloader();
  });

})();

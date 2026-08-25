let currentTranslation = localStorage.getItem("iliad_translation") || "murray";

/**
 * Opens the Translation/Options modal and sets the active translation radio button.
 */
function openTranslationModal() {
  document.getElementById('dropdown').classList.remove('show');
  
  // Set the current radio button
  if (currentTranslation === 'johnston') {
    document.getElementById('radioJohnston').checked = true;
  } else if (currentTranslation === 'butler') {
    document.getElementById('radioButler').checked = true;
  } else {
    document.getElementById('radioMurray').checked = true;
  }
  
  document.getElementById('translationModal').style.display = 'flex';
}

/**
 * Closes the Translation/Options modal.
 */
function closeTranslationModal() {
  document.getElementById('translationModal').style.display = 'none';
}

/**
 * Closes the Translation/Options modal if the user clicks outside the modal content.
 * @param {Event} e - The click event.
 */
function closeTranslationModalOnBackdrop(e) {
  if (e.target.id === 'translationModal') {
    closeTranslationModal();
  }
}

/**
 * Sets the active translation, saves the preference to localStorage, and re-renders the current line.
 * @param {string} trans - The translation identifier (e.g. "murray", "johnston").
 */
function setTranslation(trans) {
  currentTranslation = trans;
  localStorage.setItem("iliad_translation", trans);
  document.getElementById(trans === 'johnston' ? 'radioJohnston' : trans === 'butler' ? 'radioButler' : 'radioMurray').checked = true;
  renderLine();
  closeTranslationModal();
}

  
    let currentIdx = 0;
    let currentWordIdx = -1;

    window.onclick = function (event) {
      if (!event.target.matches('.hamburger-btn')) {
        const dropdowns = document.getElementsByClassName("dropdown-menu");
        for (let i = 0; i < dropdowns.length; i++) {
          if (dropdowns[i].classList.contains('show')) {
            dropdowns[i].classList.remove('show');
          }
        }
      }
    };

    /**
 * Initializes the application, sets up event listeners, loads preferences from localStorage, and renders the first line.
 */
    function init() {
      const params = new URLSearchParams(window.location.search);
      const lineParam = params.get('line');
      if (lineParam) {
        const foundIdx = data.findIndex(d => d.num === parseInt(lineParam));
        if (foundIdx !== -1) {
          currentIdx = foundIdx;
        }
      }

      
      const savedTempo = localStorage.getItem('iliad_tempo');
      if (savedTempo) {
        const slider = document.getElementById('tempoSlider');
        if (slider) {
          slider.value = savedTempo;
          document.getElementById('tempoLabel').textContent = parseFloat(savedTempo).toFixed(2) + 's per short syllable';
        }
      }

      renderPills();
      renderLine();

      document.addEventListener('keydown', (e) => {
        const wordModalOpen = document.getElementById('wordModal').classList.contains('open');

        if (wordModalOpen) {
          if (e.key === 'ArrowRight' || e.key === ' ') nextWord();
          else if (e.key === 'ArrowLeft') prevWord();
          else if (e.key === 'Escape') closeWordModal();
          return;
        }

        if (e.key === 'ArrowRight' || e.key === ' ') nextLine();
        else if (e.key === 'ArrowLeft') prevLine();
        else if (e.key >= '1' && e.key <= '7') goToLine(parseInt(e.key) - 1);
        else if (e.key === 'Escape') {
          closeCredits();
          closeFullLines();
        }
      });

      let touchStartX = 0;
      let touchStartY = 0;
      let touchEndX = 0;
      let touchEndY = 0;

      document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }, {passive: true});

      document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
      }, {passive: true});

      /**
 * Determines swipe direction based on touch coordinates and navigates to next/prev line accordingly.
 */
      function handleSwipe() {
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        
        // Ensure it's mostly a horizontal swipe and meets a minimum threshold
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
          const wordModalOpen = document.getElementById('wordModal').classList.contains('open');
          
          if (diffX < 0) { // Swipe Left (Next)
            if (wordModalOpen) nextWord();
            else nextLine();
          } else { // Swipe Right (Prev)
            if (wordModalOpen) prevWord();
            else prevLine();
          }
        }
      }
    }

    /**
 * Navigates to the next word in the dictionary modal. Closes modal if at the end of the line.
 */
    function nextWord() {
      const l = data[currentIdx];
      if (currentWordIdx < l.words.length - 1) {
        openWordModal(currentWordIdx + 1);
      }
    }

    /**
 * Navigates to the previous word in the dictionary modal.
 */
    function prevWord() {
      if (currentWordIdx > 0) {
        openWordModal(currentWordIdx - 1);
      }
    }

    /**
 * Renders the scansion grid (capsules/pills) representing the metrical feet of the current line.
 */
    function renderPills() {
      const container = document.getElementById('linePills');
      container.innerHTML = '';

      const windowSize = 3;
      let startIdx = Math.max(0, currentIdx - windowSize);
      let endIdx = Math.min(data.length - 1, currentIdx + windowSize);

      const totalPills = windowSize * 2 + 1;
      if (endIdx - startIdx + 1 < totalPills) {
        if (startIdx === 0) {
          endIdx = Math.min(data.length - 1, startIdx + totalPills - 1);
        } else if (endIdx === data.length - 1) {
          startIdx = Math.max(0, endIdx - totalPills + 1);
        }
      }

      for (let idx = startIdx; idx <= endIdx; idx++) {
        const item = data[idx];
        const btn = document.createElement('button');
        btn.className = `line-btn ${idx === currentIdx ? 'active' : ''}`;
        btn.textContent = `Line ${item.num}`;
        btn.onclick = () => goToLine(idx);
        container.appendChild(btn);
      }

      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      if (prevBtn) prevBtn.disabled = (currentIdx === 0);
      if (nextBtn) nextBtn.disabled = (currentIdx === data.length - 1);
    }

    /**
 * Renders the full interactive UI for the currently selected line (Greek text, translation, scansion, interlinear words).
 */
    function renderLine() {
      const l = data[currentIdx];

      renderPills();

      // Greek Line
      document.getElementById('greekLine').textContent = l.greek;

      // Update embedded iframe and credit link
      // Update video thumbnail
      const thumb = document.getElementById('videoThumb');
      if (thumb) {
        thumb.src = `https://img.youtube.com/vi/${l.video_id}/hqdefault.jpg`;
        thumb.style.display = 'block';
        document.getElementById('playOverlay').style.display = 'flex';
      }

      const iframe = document.getElementById('mainVideoIframe');
      if (iframe) {
        iframe.style.display = 'none';
        iframe.src = '';
      }

      const creditLink = document.getElementById('videoCreditLink');
      if (creditLink) {
        creditLink.href = `https://youtube.com/watch?v=${l.video_id}`;
      }

      // Translation
      document.getElementById('idiomaticText').textContent = l.translations[currentTranslation];

      // Word Tiles (Clean on main page, clickable for full morphology in popup)
      const flow = document.getElementById('interlinearRow');
      flow.innerHTML = '';
      l.words.forEach((w, wIdx) => {
        const tile = document.createElement('div');
        tile.className = 'word-tile';
        tile.onclick = () => openWordModal(wIdx);
        tile.innerHTML = `
          <div class="wt-header">
            <span class="wt-greek">${w.greek}</span>
          </div>
          <div class="wt-trans">${w.translit}</div>
          <div class="wt-gloss">${w.gloss.split('/')[0].trim()}</div>
        `;
        flow.appendChild(tile);
      });

      // Scansion Capsules
      const strip = document.getElementById('scansionCapsules');
      strip.innerHTML = '';
      
      const half1 = document.createElement('div');
      half1.className = 'scansion-half';
      const half2 = document.createElement('div');
      half2.className = 'scansion-half';

      l.feet.forEach((foot, fIdx) => {
        const footContainer = document.createElement('div');
        footContainer.className = 'scansion-foot';

        foot.sylls.forEach((syll, sIdx) => {
          if (syll.grk === '—') return;
          const pill = document.createElement('div');
          pill.className = `scansion-pill ${syll.q}`;
          pill.innerHTML = `
            <span class="sp-sym">${syll.sym}</span>
            <span class="sp-grk">${syll.grk}</span>
            <span class="sp-ipa">${syll.ipa}</span>
            <span class="sp-trans">${syll.trans}</span>
          `;
          footContainer.appendChild(pill);
        });

        if (footContainer.childElementCount > 0) {
          if (fIdx < 3) {
            half1.appendChild(footContainer);
          } else {
            half2.appendChild(footContainer);
          }
        }
      });
      
      if (half1.childElementCount > 0) strip.appendChild(half1);
      if (half2.childElementCount > 0) strip.appendChild(half2);


    }

    /**
 * Opens the dictionary popup modal for a specific word, populating it with morphology and definitions.
 * @param {number} wIdx - The index of the word within the current line.
 */
    function openWordModal(wIdx) {
      currentWordIdx = wIdx;
      const l = data[currentIdx];
      const w = l.words[wIdx];
      const modal = document.getElementById('wordModal');
      const body = document.getElementById('wordPopupBody');

      body.innerHTML = `
        <div class="wp-header-area">
          <button onclick="prevWord()" class="nav-arrow" ${wIdx === 0 ? 'disabled' : ''}>❮</button>
          <div style="text-align: center; display: flex; flex-direction: column; align-items: center;">
            <div class="wp-greek">${w.greek}</div>
            <div class="wp-ipa">${w.ipa} (${w.translit})</div>
          </div>
          <button onclick="nextWord()" class="nav-arrow" ${wIdx === l.words.length - 1 ? 'disabled' : ''}>❯</button>
        </div>

        <div class="wp-field">
          <div class="wp-field-label">Meaning</div>
          <div class="wp-field-value">${w.gloss}</div>
        </div>

        <div class="wp-field">
          <div class="wp-field-label">Linguistic Context</div>
          <div class="wp-field-value" style="font-size:0.84rem; color:#000000;">${w.note}</div>
        </div>

        <div class="wp-field">
          <div class="wp-field-label">Grammar</div>
          <div class="wp-field-value">${w.pos}</div>
        </div>

        <div class="wp-field" style="margin-bottom:0;">
          <div class="wp-field-label">Dictionary Lemma & Root</div>
          <div class="wp-field-value root-text">${w.root}</div>
        </div>
      `;

      modal.classList.add('open');
    }

    /**
 * Closes the word dictionary popup modal.
 */
    function closeWordModal() {
      document.getElementById('wordModal').classList.remove('open');
    }

    /**
 * Navigates the app to a specific line index, updating the URL and metronome state as needed.
 * @param {number} idx - The index of the line in the data array.
 */
    function goToLine(idx) {
      if (idx >= 0 && idx < data.length) {
        currentIdx = idx;
        const newUrl = new URL(window.location);
        newUrl.searchParams.set('line', data[idx].num);
        window.history.replaceState(null, '', newUrl);
        renderLine();
        
        if (metronomeIsPlaying) {
          // Restart sequence from the beginning of the new line
          currentMoraeSequence = parseMoraeSequence();
          noteIndex = 0;
          // Add a 2-second pause before resuming the beats for the new line
          const pauseDuration = 2.0;
          nextNoteTime = Math.max(nextNoteTime, audioCtx.currentTime) + pauseDuration;
          
          // Clear any visual pills from the old line
          document.querySelectorAll('#scansionCapsules .scansion-pill').forEach(el => el.classList.remove('active-beat'));
        }
      }
    }

    /**
 * Replaces the video thumbnail with a live YouTube iframe cued to the exact timestamp of the current line.
 */
    function loadYoutubeVideo() {
      if (metronomeIsPlaying) playMetronome(); // Stop metronome if playing
      const l = data[currentIdx];
      const iframe = document.getElementById('mainVideoIframe');
      const thumb = document.getElementById('videoThumb');
      const overlay = document.getElementById('playOverlay');

      if (iframe && iframe.style.display === 'none') {
        thumb.style.display = 'none';
        overlay.style.display = 'none';
        iframe.src = `https://www.youtube.com/embed/${l.video_id}?start=${Math.floor(l.start_sec)}&end=${Math.ceil(l.end_sec)}&playsinline=1&enablejsapi=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&autoplay=1`;
        iframe.style.display = 'block';
      }
    }

    /**
 * Restarts the video playback for the current line by sending a seekTo command to the YouTube iframe.
 */
    function replayVideo() {
      if (metronomeIsPlaying) playMetronome(); // Stop metronome if playing
      const iframe = document.getElementById('mainVideoIframe');
      if (iframe.style.display === 'none') {
        loadYoutubeVideo();
        return;
      }
      const l = data[currentIdx];
      // Send postMessage to YouTube player to seek to start and play
      iframe.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: 'seekTo',
        args: [l.start_sec, true]
      }), '*');
      iframe.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: 'playVideo',
        args: []
      }), '*');
    }

    /**
 * Advances to the next line in the text.
 */
    function nextLine() {
      goToLine((currentIdx + 1) % data.length);
    }

    /**
 * Goes back to the previous line in the text.
 */
    function prevLine() {
      goToLine((currentIdx - 1 + data.length) % data.length);
    }

    /**
 * Opens the Help/Credits modal.
 */
    function openCredits() {
      document.getElementById('creditsModal').classList.add('open');
    }

    /**
 * Closes the Help/Credits modal.
 */
    function closeCredits() {
      document.getElementById('creditsModal').classList.remove('open');
    }

    /**
 * Closes the word dictionary modal if the user clicks the backdrop.
 * @param {Event} e - The click event.
 */
    function closeWordOnBackdrop(e) {
      if (e.target.id === 'wordModal') closeWordModal();
    }

    /**
 * Closes the Help/Credits modal if the user clicks the backdrop.
 * @param {Event} e - The click event.
 */
    function closeCreditsOnBackdrop(e) {
      if (e.target.id === 'creditsModal') closeCredits();
    }

    /**
 * Opens a modal displaying all lines of the text with their full scansion at once.
 */
    function openFullLines() {
      const modal = document.getElementById('fullLinesModal');
      const body = document.getElementById('fullLinesBody');
      
      if (body.innerHTML.trim() === '') {
        let html = '';
        data.forEach(l => {
          html += `<div style="padding: 0.5rem 0;">
            <div class="full-lines-num">${l.num}</div>
            <div class="scansion-capsules full-lines-scansion-capsules" style="justify-content: flex-start; margin-top: 0; padding-bottom: 0;">`;
            
          let half1 = `<div class="scansion-half">`;
          let half2 = `<div class="scansion-half">`;
          
          l.feet.forEach((foot, fIdx) => {
            let footHtml = `<div class="scansion-foot">`;
            foot.sylls.forEach(syll => {
              if (syll.grk === '—') return;
              footHtml += `
                <div class="scansion-pill ${syll.q}">
                  <span class="sp-sym">${syll.sym}</span>
                  <span class="sp-grk">${syll.grk}</span>
                  <span class="sp-ipa">${syll.ipa}</span>
                  <span class="sp-trans">${syll.trans}</span>
                </div>
              `;
            });
            footHtml += `</div>`;
            if (fIdx < 3) half1 += footHtml;
            else half2 += footHtml;
          });
          
          half1 += `</div>`;
          half2 += `</div>`;
          
          html += half1 + half2 + `</div></div>`;
        });
        body.innerHTML = html;
      }
      
      modal.classList.add('open');
    }

    /**
 * Closes the full text/scansion modal.
 */
    function closeFullLines() {
      document.getElementById('fullLinesModal').classList.remove('open');
    }

    /**
 * Closes the full text/scansion modal if the user clicks the backdrop.
 * @param {Event} e - The click event.
 */
    function closeFullLinesOnBackdrop(e) {
      if (e.target.id === 'fullLinesModal') closeFullLines();
    }

    window.onload = init;

// --- METRONOME FEATURE ---
let audioCtx;
let metronomeIsPlaying = false;
let nextNoteTime = 0;
let noteIndex = 0;
let metronomeTimerID;
let currentMoraeSequence = [];
let moraLength = parseFloat(localStorage.getItem('iliad_tempo')) || 0.22;

/**
 * Updates the metronome tempo based on slider input and saves the preference to localStorage.
 * @param {string|number} val - The new tempo in seconds per short syllable.
 */
function updateTempo(val) {
  moraLength = parseFloat(val);
  localStorage.setItem('iliad_tempo', moraLength);
  document.getElementById('tempoLabel').textContent = moraLength.toFixed(2) + 's per short syllable';
}

/**
 * Flattens the current line's scansion feet into a 1D array of syllables for the metronome to sequence.
 * @returns {Array} Array of syllable objects containing quantity, ictus flag, and DOM element reference.
 */
function parseMoraeSequence() {
  const lineData = data[currentIdx];
  const seq = [];
  const domPills = document.querySelectorAll('#scansionCapsules .scansion-pill');
  let pillIdx = 0;
  lineData.feet.forEach((foot, fIdx) => {
    foot.sylls.forEach((syll, sIdx) => {
      if (syll.grk === '—') return; // ignore visual padding
      seq.push({
        q: syll.q, // 'long' or 'short'
        isIctus: sIdx === 0, // true for the first syllable of the foot
        el: domPills[pillIdx++]
      });
    });
  });
  return seq;
}

/**
 * Synthesizes and schedules a percussive "click" sound using the Web Audio API for a specific syllable.
 * Also queues the visual highlight in the DOM to sync with the audio.
 * @param {Object} syllable - The syllable object containing quantity and DOM element.
 * @param {number} time - The exact AudioContext time to play the note.
 */
function scheduleNote(syllable, time) {
  const osc = audioCtx.createOscillator();
  const envelope = audioCtx.createGain();
  
  osc.connect(envelope);
  envelope.connect(audioCtx.destination);
  
  // Create a sharp, percussive "click" sound using a rapid pitch drop (frequency envelope)
  osc.type = 'triangle';
  if (syllable.isIctus) {
    osc.frequency.setValueAtTime(1200, time);
    osc.frequency.exponentialRampToValueAtTime(50, time + 0.04);
  } else {
    osc.frequency.setValueAtTime(600, time);
    osc.frequency.exponentialRampToValueAtTime(50, time + 0.04);
  }
  
  // Extremely fast amplitude decay
  envelope.gain.setValueAtTime(1, time);
  envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
  
  osc.start(time);
  osc.stop(time + 0.04);
  
  // Visual highlight
  const delay = Math.max((time - audioCtx.currentTime) * 1000, 0);
  setTimeout(() => {
    if (!metronomeIsPlaying) return;
    document.querySelectorAll('#scansionCapsules .scansion-pill').forEach(el => el.classList.remove('active-beat'));
    if (syllable.el) {
      syllable.el.classList.add('active-beat');
    }
  }, delay);
}

/**
 * Advances the internal metronome clock by the duration (morae) of the current syllable.
 */
function nextNote() {
  
  const syllable = currentMoraeSequence[noteIndex];
  
  // Advance time by the duration of the current syllable
  nextNoteTime += (syllable.q === 'long' ? 2 : 1) * moraLength;
  noteIndex++;
}

/**
 * Continuously schedules metronome notes slightly ahead of the AudioContext time to ensure seamless playback.
 * Uses a recursive setTimeout loop to poll the clock.
 */
function scheduler() {
  // schedule notes up to 0.1s in the future
  while (nextNoteTime < audioCtx.currentTime + 0.1) {
    if (noteIndex >= currentMoraeSequence.length) {
      noteIndex = 0;
      
      // Clear visual highlight at the exact end of the line's last note
      const delay = Math.max((nextNoteTime - audioCtx.currentTime) * 1000, 0);
      setTimeout(() => {
        if (metronomeIsPlaying) {
          document.querySelectorAll('#scansionCapsules .scansion-pill').forEach(el => el.classList.remove('active-beat'));
        }
      }, delay);
      
      // Add a 2-mora (1 long beat) rest at the end of the line to simulate taking a breath
       
    }
    
    scheduleNote(currentMoraeSequence[noteIndex], nextNoteTime);
    nextNote();
  }
  
  if (metronomeIsPlaying) {
    metronomeTimerID = setTimeout(scheduler, 25);
  }
}

/**
 * Toggles the metronome on or off, handling AudioContext initialization, visual resets, and video exclusion.
 */
function playMetronome() {
  if (metronomeIsPlaying) {
    clearTimeout(metronomeTimerID);
    if (audioCtx) {
      audioCtx.close();
      audioCtx = null;
    }
    metronomeIsPlaying = false;
    document.querySelectorAll('#scansionCapsules .scansion-pill').forEach(el => el.classList.remove('active-beat'));
    
    // Restore video opacity and clickability
    const pContainer = document.getElementById('playerContainer');
    if (pContainer) {
      pContainer.style.opacity = '1';
      pContainer.style.pointerEvents = 'auto';
    }
    document.getElementById('metronomeBtn').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="13" r="8"></circle>
  <path d="M12 9v4l2 2"></path>
  <path d="M10 3h4"></path>
  <path d="M12 3v2"></path>
</svg>`;
    return;
  }
  
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  
  currentMoraeSequence = parseMoraeSequence();
  noteIndex = 0;
  nextNoteTime = audioCtx.currentTime + 0.05; 
  
  metronomeIsPlaying = true;
  document.getElementById('metronomeBtn').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="6" y="6" width="12" height="12" rx="2"></rect>
</svg>`;

  // Stop video if it's playing and grey out the container
  const iframe = document.getElementById('mainVideoIframe');
  if (iframe && iframe.style.display === 'block') {
    iframe.src = '';
    iframe.style.display = 'none';
    const thumb = document.getElementById('videoThumb');
    const overlay = document.getElementById('playOverlay');
    if (thumb) thumb.style.display = 'block';
    if (overlay) overlay.style.display = 'flex';
  }
  
  const pContainer = document.getElementById('playerContainer');
  if (pContainer) {
    pContainer.style.opacity = '0.3';
    pContainer.style.pointerEvents = 'none';
  }
  
  scheduler();
}

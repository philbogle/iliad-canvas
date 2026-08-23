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

    function init() {
      const params = new URLSearchParams(window.location.search);
      const lineParam = params.get('line');
      if (lineParam) {
        const foundIdx = data.findIndex(d => d.num === parseInt(lineParam));
        if (foundIdx !== -1) {
          currentIdx = foundIdx;
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

    function nextWord() {
      const l = data[currentIdx];
      if (currentWordIdx < l.words.length - 1) {
        openWordModal(currentWordIdx + 1);
      }
    }

    function prevWord() {
      if (currentWordIdx > 0) {
        openWordModal(currentWordIdx - 1);
      }
    }

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
      document.getElementById('idiomaticText').textContent = l.idiomatic;

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

    function closeWordModal() {
      document.getElementById('wordModal').classList.remove('open');
    }

    function goToLine(idx) {
      if (idx >= 0 && idx < data.length) {
        currentIdx = idx;
        const newUrl = new URL(window.location);
        newUrl.searchParams.set('line', data[idx].num);
        window.history.replaceState(null, '', newUrl);
        renderLine();
      }
    }

    function loadYoutubeVideo() {
      const l = data[currentIdx];
      const iframe = document.getElementById('mainVideoIframe');
      const thumb = document.getElementById('videoThumb');
      const overlay = document.getElementById('playOverlay');

      if (iframe && iframe.style.display === 'none') {
        thumb.style.display = 'none';
        overlay.style.display = 'none';
        iframe.src = `https://www.youtube.com/embed/${l.video_id}?start=${l.start_sec}&end=${l.end_sec}&playsinline=1&enablejsapi=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&autoplay=1`;
        iframe.style.display = 'block';
      }
    }

    function replayVideo() {
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

    function nextLine() {
      goToLine((currentIdx + 1) % data.length);
    }

    function prevLine() {
      goToLine((currentIdx - 1 + data.length) % data.length);
    }

    function openCredits() {
      document.getElementById('creditsModal').classList.add('open');
    }

    function closeCredits() {
      document.getElementById('creditsModal').classList.remove('open');
    }

    function closeWordOnBackdrop(e) {
      if (e.target.id === 'wordModal') closeWordModal();
    }

    function closeCreditsOnBackdrop(e) {
      if (e.target.id === 'creditsModal') closeCredits();
    }

    function openFullLines() {
      const modal = document.getElementById('fullLinesModal');
      const body = document.getElementById('fullLinesBody');
      
      if (body.innerHTML.trim() === '') {
        let html = '';
        data.forEach(l => {
          html += `<div style="padding: 0.5rem 0;">
            <div class="scansion-capsules" style="justify-content: flex-start; margin-top: 0; padding-bottom: 0;">`;
            
          let half1 = `<div class="scansion-half"><div style="display: flex; align-items: center; justify-content: center; min-width: 28px; font-weight: 600; color: var(--text-muted); font-size: 1.1rem; margin-right: 0.25rem; user-select: none;">${l.num}.</div>`;
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

    function closeFullLines() {
      document.getElementById('fullLinesModal').classList.remove('open');
    }

    function closeFullLinesOnBackdrop(e) {
      if (e.target.id === 'fullLinesModal') closeFullLines();
    }

    window.onload = init;

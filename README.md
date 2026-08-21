# Homer's Iliad - Interactive Study Canvas

A vanilla HTML, CSS, and JavaScript single-page application designed for learning and reciting the opening lines of Homer's *Iliad* (Book 1, Lines 1-21).

The application features:
- An embedded YouTube player that auto-seeks to the exact line being recited.
- Metrical scansion breakdowns showing long/short syllables and dactylic hexameter feet.
- Interlinear word-for-word morphology glosses with popup deep-dives (grammatical parsing, lemmas, and Indo-European roots).
- A clean, distraction-free reading mode.

## How this was created

This project was built iteratively to combine rich classical philology data with a modern web interface.

### 1. The Greek Text & Translations
- The primary Greek text is based on the standard Oxford Classical Text (D. B. Monro and T. W. Allen, 1920).
- The literary translations and literal word-for-word glosses were compiled from standard public domain translations and cross-referenced with Geoffrey Steadman's *Homer's Iliad 1* commentary.

### 2. Video Links & Audio Alignment
- The audio/video recitations are sourced from Luke Ranieri's (polýMATHY) **#KephalosChallenge**, utilizing his reconstructed 3-pitch restored chanting methodology.
- The timestamps for lines 1-21 were manually aligned and embedded. Each line correlates directly to either a standalone YouTube Short or an exact timestamp slice of the master recitation video. 

### 3. Morphology & Etymology
- The deep grammatical parsing (Part of Speech, Voice, Mood, Case, etc.) and dictionary Lemmas for each word were automatically fetched using the **Perseids Project's Morpheus API** (Tufts University).
- Indo-European roots were cross-referenced with standard etymological lexicons to provide historical linguistic context for individual words.

### 4. Metrical Scansion
- Scansion data (dactylic hexameter feet and syllable lengths) is sourced directly from the metrical CSV datasets provided by **Hypotactic (hypotactic.com)**, ensuring academically rigorous positional lengthening, hiatus, and correption.
- Phonetic IPA transcriptions and Latin transliterations were programmatically generated on top of the base scansion data.
- The syllable lengths dictate the visual layout of the metrical pills under each word, mapping perfectly to the recitation's rhythm.

## Running Locally

To run the project locally, simply start a lightweight HTTP server in this directory:

```bash
python3 -m http.server 8200
```

Then open `http://localhost:8200` in your web browser.

# Homer's Iliad - Interactive Study Canvas

A web app for learning and reciting the opening lines of Homer's *Iliad* (Book 1, Lines 1-21).

The application features:
- An embedded YouTube player that auto-seeks to the exact line being recited, using Luke Ranieri's Kephalos challenge recitation.
- Metrical scansion breakdowns showing long/short syllables and dactylic hexameter feet.
- Interlinear word-for-word definitions with popup deep-dives.
- A clean, distraction-free reading mode.
- Fully responsive design that works on mobile devices.

## 📜 Credits, Thanks, & Disclaimer

> **Disclaimer:** I am just beginning my journey learning Ancient Greek and built this canvas primarily as a personal study tool. The depth and functionality of this project are dependent on the work of classical educators and open-source linguistic projects. Because of my limited knowledge, there are inaccuracies. Bug reports, corrections, and pull requests are appreciated!

I want to extend my thanks to the following authoritative sources that made this canvas possible:

- **[Luke Ranieri (polýMATHY)](https://www.youtube.com/@polymathy)**: The audio and video rely on Luke's `#KephalosChallenge` recitations and his 3-pitch restored chanting method. His full recording of [Iliad Book 1, lines 1-100](https://luke-ranieri.myshopify.com/products/iliad-100-homers-iliad-book-1-lines-1-100) is available on his store.
- **[The Perseids Project](https://perseids.org/) (Tufts University)**: All of the automated grammatical parsing (Part of Speech, Voice, Mood, Case) and dictionary Lemmas were fetched using their Morpheus API.
- **[Hypotactic](https://hypotactic.com/)**: The dactylic hexameter scansion logic (accurate syllable lengths, positional lengthening, and hiatus) was sourced directly from their metrical CSV datasets.
- **[Perseus Digital Library](http://www.perseus.tufts.edu/hopper/)**: For hosting the canonical Oxford Classical Text (Monro & Allen, 1920) that forms the base Greek of this project.
- **[Geoffrey Steadman](https://geoffreysteadman.com/homers-iliad-1-6/)**: Whose *Homer's Iliad 1* commentary served as a cross-reference for the literal word-for-word glosses.

## How this was created

This project was built iteratively to combine the classical philology data credited above with a modern web interface.

### 1. The Greek Text & Translations
The primary Greek text is based on the OCT. The literary translations and literal glosses were compiled from standard public domain translations and cross-referenced with Steadman's commentary.

### 2. Video Links & Audio Alignment
The timestamps for lines 1-21 were manually aligned and embedded. Each line correlates directly to a timestamp slice of Luke Ranieri's videos.

### 3. Morphology & Etymology
The morphological metadata was retrieved automatically via the Morpheus API. Indo-European roots were manually cross-referenced with standard etymological lexicons to provide historical linguistic context for individual words.

### 4. Metrical Scansion
Scansion data (dactylic hexameter feet and syllable lengths) is sourced from the Hypotactic CSV datasets. Phonetic IPA transcriptions and Latin transliterations were programmatically generated on top of that base scansion data. The syllable lengths dictate the visual layout of the metrical pills under each word, mapping to the recitation's rhythm.

## Running Locally

To run the project locally, simply start a lightweight HTTP server in this directory:

```bash
python3 -m http.server 8200
```

Then open `http://localhost:8200` in your web browser.

## License

This project is licensed under the [Creative Commons Attribution 4.0 International License (CC BY 4.0)](http://creativecommons.org/licenses/by/4.0/). See the [LICENSE](LICENSE) file for more details.

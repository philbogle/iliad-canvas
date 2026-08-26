# Homer's Iliad - Interactive Study Canvas

**[View the live site here!](https://philbogle.github.io/iliad-canvas/)**

A web app for learning and reciting the opening lines of Homer's *Iliad* (Book 1, Lines 1-21).

The application features:
- **Performance Audio Options**: An interactive player that allows you to seamlessly switch between David Chamberlain's clear metrical reading and Luke Ranieri's (polýMATHY) restored 3-pitch chanting.
- Metrical scansion breakdowns showing long/short syllables and dactylic hexameter feet.
- **Built-in Web Audio Metronome**: A customizable metronome that generates authentic metrical beats synced with visual scansion highlighting to help you practice reciting in rhythm.
- Interlinear word-for-word definitions with popup deep-dives.
- An Options menu for toggling between three different English translations and adjusting the metronome playback speed.
- Fully responsive design that works seamlessly on mobile devices.

## 📜 Credits, Thanks, & Disclaimer

> **Disclaimer:** I am just beginning my journey learning Ancient Greek and built this canvas primarily as a personal study tool. The depth and functionality of this project are dependent on the work of classical educators and open-source linguistic projects. Because of my limited knowledge, there are inaccuracies. Bug reports, corrections, and pull requests are appreciated!

I want to extend my thanks to the following authoritative sources that made this canvas possible:

- **[Ben Crowell](https://bitbucket.org/ben-crowell/greek_pronunciation/src/master/index.md)**: Whose comprehensive guide to Greek pronunciation provides deep information on reconstructed Attic vs. Erasmian pronunciation, tonal accents, and sound recordings of informed readings of the Iliad.
- **[Luke Ranieri (polýMATHY)](https://www.youtube.com/@polymathy)**: The audio and video rely on Luke's `#KephalosChallenge` recitations and his 3-pitch restored chanting method. His full recording of [Iliad Book 1, lines 1-100](https://luke-ranieri.myshopify.com/products/iliad-100-homers-iliad-book-1-lines-1-100) is available on his store.
- **[Wikimedia Commons](https://commons.wikimedia.org/)**: The audio files in the pronunciation guide were sourced from their extensive public domain repository of IPA pronunciation audio.
- **[The Perseids Project](https://perseids.org/) (Tufts University)**: All of the automated grammatical parsing (Part of Speech, Voice, Mood, Case) and dictionary Lemmas were fetched using their Morpheus API.
- **David Chamberlain ([Hypotactic](https://hypotactic.com/homer/iliad1.html))**: The dactylic hexameter scansion logic (accurate syllable lengths, positional lengthening, and hiatus) was sourced directly from their metrical CSV datasets. His clear, line-by-line audio recitations of the Greek text are also featured natively in the app.
- **[Perseus Digital Library](http://www.perseus.tufts.edu/hopper/)**: For hosting the canonical Oxford Classical Text (Monro & Allen, 1920) that forms the base Greek of this project.
- **[Geoffrey Steadman](https://geoffreysteadman.com/homers-iliad-1-6/)**: Whose *Homer's Iliad 1* commentary served as a cross-reference for the literal word-for-word glosses.

## How this was created

This project was built iteratively to combine the classical philology data credited above with a modern web interface.

### 1. The Greek Text & Translations
The primary Greek text is based on the OCT. The web app allows users to toggle between three public domain translations: the literal prose translation by **Augustus Taber Murray** (1924, Loeb Classical Library), the modern blank verse translation by **Ian Johnston** (2006, Vancouver Island University), and the classic readable prose translation by **Samuel Butler** (1898, Longmans, Green & Co., with names adapted to Greek). All have been adapted to map to the Greek hexameter lines. Literal glosses were compiled to assist with word-for-word morphology.

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

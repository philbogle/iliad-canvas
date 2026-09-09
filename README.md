# Homer's Iliad - Interactive Study Canvas

**[View the live site here!](https://philbogle.github.io/iliad-canvas/)**

A web app for learning and reciting the opening lines of Homer's *Iliad* (Book 1, Lines 1-21).

The application features:
- **Multiple performance audio options**: An interactive player that allows you to switch between three vocal performances: the Perkʷunós' archaic sung recitation (default), Luke Ranieri's (polýMATHY) restored 3-pitch chanting (Reconstructed Attic), and David Chamberlain's clear metrical reading (Erasmian).
- **Multiple translations**: Toggleable view of three different English translations: Augustus Taber Murray's literal prose (1924), Ian Johnston's modern blank verse (2006), and Samuel Butler's classic readable prose (1898).
- **Metrical scansion breakdowns**: Showing long/short syllables and dactylic hexameter feet.
- **Built-in Web Audio Metronome**: A metronome that generates metrical beats synced with visual scansion highlighting to help you practice reciting in rhythm.
- **Interlinear word-for-word definitions**: Complete with popup deep-dives into morphology and etymology.
- **Options menu**: Toggle controls for adjusting the metronome playback speed and changing the video layout.
- **Responsive design**: Fully functional layout that adapts to and works beautifully on mobile devices.

## 📜 Credits, Thanks, & Disclaimer

> **Disclaimer:** I am just beginning to learn Ancient Greek and built this canvas primarily as a personal study tool. This project depends on the work of many scholars and open-source linguistic projects. Because of my limited knowledge, there are inaccuracies. Bug reports, corrections, and pull requests are appreciated!

I want to extend my thanks to the following authoritative sources that made this canvas possible:

- **Perkʷunós**: His sung recitation of the first 21 lines in restored Archaic Greek ([video link](https://youtu.be/KX4yuMN6pPI)).
- **[Luke Ranieri (polýMATHY)](https://www.youtube.com/@polymathy)**: His `#KephalosChallenge` recitations and his 3-pitch restored chanting method (Reconstructed Attic). His recording of [Iliad Book 1, lines 1-100](https://luke-ranieri.myshopify.com/products/iliad-100-homers-iliad-book-1-lines-1-100) is available on his store.
- **David Chamberlain ([Hypotactic](https://hypotactic.com/homer/iliad1.html))**: His dactylic hexameter scansion logic sourced from his metrical CSV datasets, along with his audio recitations of the Greek text.
- **[Ben Crowell](https://bitbucket.org/ben-crowell/greek_pronunciation/src/master/index.md)**: His guide to Greek pronunciation, which provides information on reconstructed Attic vs. Erasmian pronunciation, tonal accents, and audio recordings of the Iliad.
- **[Wikimedia Commons](https://commons.wikimedia.org/)**: The public domain repository of IPA pronunciation audio used in the pronunciation guide.
- **[The Perseids Project](https://perseids.org/) (Tufts University)**: The Morpheus API, used to fetch the grammatical parsing (Part of Speech, Voice, Mood, Case) and dictionary Lemmas.
- **[Perseus Digital Library](http://www.perseus.tufts.edu/hopper/)**: Hosting of the Oxford Classical Text (Monro & Allen, 1920) that forms the base Greek of this project.
- **[Geoffrey Steadman](https://geoffreysteadman.com/homers-iliad-1-6/)**: His *Homer's Iliad 1* commentary, which served as a cross-reference for the glosses.

## How this was created

This project was built iteratively to combine the classical philology data credited above with a modern web interface.

### 1. The Greek Text & Translations
The primary Greek text is based on the OCT. The web app allows users to toggle between three public domain translations: the literal prose translation by **Augustus Taber Murray** (1924, Loeb Classical Library), the modern blank verse translation by **Ian Johnston** (2006, Vancouver Island University), and the classic readable prose translation by **Samuel Butler** (1898, Longmans, Green & Co., with names adapted to Greek). All have been adapted to map to the Greek hexameter lines. Literal glosses were compiled to assist with word-for-word morphology.

### 2. Morphology & Etymology
The morphological metadata was retrieved automatically via the Morpheus API. Indo-European roots were manually cross-referenced with standard etymological lexicons to provide historical linguistic context for individual words.

### 3. Metrical Scansion
Scansion data (dactylic hexameter feet and syllable lengths) is sourced from the Hypotactic CSV datasets. Phonetic IPA transcriptions and Latin transliterations were programmatically generated on top of that base scansion data. The syllable lengths dictate the visual layout of the metrical pills under each word, mapping to the recitation's rhythm.

## Running Locally

To run the project locally, simply start a lightweight HTTP server in this directory:

```bash
python3 -m http.server 8200
```

Then open `http://localhost:8200` in your web browser.

## License

This project is licensed under the [Creative Commons Attribution 4.0 International License (CC BY 4.0)](http://creativecommons.org/licenses/by/4.0/). See the [LICENSE](LICENSE) file for more details.

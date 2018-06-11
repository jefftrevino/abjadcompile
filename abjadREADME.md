# abjadcompile
abjadcompile is an Atom package, created and maintained by the [nCoda](www.ncodamusic.org) team, that enables in-editor Abjad illustration of Python-generated Lilypond files in the [Atom](https://atom.io/) text editor.

## Installation

(1) Download and install [Atom](https://atom.io/) and [LilyPond](http://lilypond.org/download.html).

(2) `pip install abjad` to install [Abjad](http://abjad.mbrsi.org/) into your Python environnment.

(3) Follow the [Atom Flight Manual](https://flight-manual.atom.io/using-atom/sections/atom-packages/)'s instructions to download and install this package from inside Atom.

## Features

### 1. Illustrate an Abjad object as Lilypond output in a new Atom pane.
(1) Highlight a line or block of Python code that generates an illustratable Abjad object.

(2) Invoke the `abjadcompile: Illustrate` command from [Atom's Command Palette](https://flight-manual.atom.io/getting-started/sections/atom-basics/).

(3) A new pane should appear, containing the object's illustration.

## Dependencies
[Atom](https://atom.io/)
### Atom Package Dependencies
[hydrogen](https://atom.io/packages/hydrogen)
~
[lilycompile](https://atom.io/packages/lilycompile)
### Python Dependencies
[Abjad](http://abjad.mbrsi.org/)
### External Dependencies
[LilyPond](http://lilypond.org/download.html)

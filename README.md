# abjadcompile
abjadcompile is an Atom package, created and maintained by the [nCoda](www.ncodamusic.org) team, that enables in-editor Abjad illustration of Python-generated LilyPond files in the [Atom](https://atom.io/) text editor.

## Installation

(1) Download and install [Atom](https://atom.io/) and [LilyPond](http://lilypond.org/download.html).

(2) `pip install abjad` to install [Abjad](http://abjad.mbrsi.org/) into your Python environnment.

(3) Follow the [Atom Flight Manual](https://flight-manual.atom.io/using-atom/sections/atom-packages/)'s instructions to download and install this package from inside Atom.

## Features

### 1. Illustrate an Abjad object as Lilypond output in a new Atom pane.
(1) [Start Hydrogen](https://nteract.gitbooks.io/hydrogen/docs/Usage/GettingStarted.html) in a saved .py file.

(2) Invoke the `abjadcompile: attachMiddleware` command from [Atom's Command Palette](https://flight-manual.atom.io/getting-started/sections/atom-basics/) to insert the Abjad middleware into Hydrogen's kernel communication loop.

(3) Run any code containing `abjad.show(component)` where `component` is an illustratable Abjad component, and the object will open as a .pdf in a new Atom pane.

## Dependencies
[Atom](https://atom.io/)
### Atom Package Dependencies (Automatically Installed)
[hydrogen](https://atom.io/packages/hydrogen)
~
[atlilypond](https://atom.io/packages/atlilypond)
~
[lilycompile](https://atom.io/packages/lilycompile)
### Python Dependencies
[Abjad](http://abjad.mbrsi.org/)
### External Dependencies
[LilyPond](http://lilypond.org/download.html)

## Development
To afford extension and further development, the nCoda team tracks the development of this package via its [feature-architecture matrix](https://docs.google.com/spreadsheets/d/1TLB1WLYEYoO5CJQ_23N-_A9qWLOJJ2n_hy9wHgG-cko/edit?usp=sharing), which links each of the features above to an architectural diagram.

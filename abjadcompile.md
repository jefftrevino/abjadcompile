sequenceDiagram
  participant user
  participant hydrogen
  participant abjadcompile
  participant middleware
  participant jupyter kernel
  participant lilycompile
  participant lilypond
  participant pdfview
  participant tmp

  user->>hydrogen: starts kernel
  user->>abjadcompile: injects middleware
  user->>hydrogen: executes line or block containing show
  hydrogen->>middleware: overwrites show with persist
  middleware->>jupyter kernel: execute code
  jupyter kernel ->>middleware: return stdout
  middleware->>abjadcompile: returns stdout if it ends in .ly
  abjadcompile->>lilycompile: passes .ly path
  lilycompile->>lilypond: passes .ly path for render a .pdf
  lilypond->>tmp: write .pdf to tmp
  lilycompile->>pdfview: passes .pdf path for display
  pdfview->>user: displays .pdf in atom

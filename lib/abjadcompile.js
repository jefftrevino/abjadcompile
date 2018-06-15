'use babel';

import AbjadcompileView from './abjadcompile-view';
import { CompositeDisposable, Disposable, Emitter } from 'atom';

// Should be unique among all plugins. At some point, hydrogen should provide
// an API that doesn't require adding fields to the kernel wrappers.
const PLUGIN_KEY = '_abjadcompile_python';

export default {

  abjadcompileView: null,
  modalPanel: null,
  subscriptions: null,
  hydrogen: null,
  emitter: null,

  activate(state) {
    require('atom-package-deps').install('abjadcompile')
    .then(function() {
        console.log('lilycompile installed')
      })
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.emitter = new Emitter();
    this.subscriptions.add(this.emitter);

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'abjadcompile:toggle': () => this.toggle(),
      'abjadcompile:convert': () => this.convert(),
      'abjadcompile:lyToPdf': () => this.lyToPdf()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.abjadcompileView.destroy();
  },

//  serialize() {
//    return {
//      abjadcompileViewState: this.abjadcompileView.serialize()
//    };
//  },

  toggle() {
    if (this.modalPanel.isVisible()) {
        this.modalPanel.hide();
    } else {
        const editor = atom.workspace.getActiveTextEditor();
        const words = editor.getText().split(/\s+/).length;
        console.log(words);
        this.abjadcompileView.setCount(words);
        this.modalPanel.show();
      }
    },

    convert () {
    const editor = atom.workspace.getActiveTextEditor()
    if (editor) {
      const selection = editor.getSelectedText()

      const figlet = require('figlet')
      const font = 'fender'
      figlet(selection, {font}, function (error, art) {
        if (error) {
          console.error(error)
        } else {
          editor.insertText(`\n${art}\n`)
        }
      })
    }
  },

  lyToPdf () {
    console.log(this.hydrogen.getActiveKernel())
    // this.lilycompile.compile()


  },

  consumeCompile(lilycompile) {
    this.lilycompile = lilycompile
    return new Disposable(() => {
        this.lilycompile = null; // Return a disposable to properly dispose of the subscription
      });
  },

  consumeHydrogen(hydrogenProvider) {
    this.hydrogen = hydrogenProvider

    // this.hydrogen.onDidChangeKernel(kernel => {
    //  if (kernel && kernel.language === "python" && !kernel[PLUGIN_KEY]) {
    //    let kernelMod = new PythonKernelMod(kernel, this.emitter);
    //    kernel[PLUGIN_KEY] = {mod: kernelMod};
    //  }
    // });

    return new Disposable(() => {
      this.hydrogen = null;
    });
  },

};

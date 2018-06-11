'use babel';

import AbjadcompileView from './abjadcompile-view';
import { CompositeDisposable } from 'atom';

export default {

  abjadcompileView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.abjadcompileView = new AbjadcompileView(state.abjadcompileViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.abjadcompileView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'abjadcompile:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.abjadcompileView.destroy();
  },

  serialize() {
    return {
      abjadcompileViewState: this.abjadcompileView.serialize()
    };
  },

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
    }

};

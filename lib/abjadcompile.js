'use babel';

import AbjadcompileView from './abjadcompile-view';
import { CompositeDisposable, Disposable, Emitter } from 'atom'
import { abjadKernelMiddleware } from './abjad-middleware'

// Should be unique among all plugins. At some point, hydrogen should provide
// an API that doesn't require adding fields to the kernel wrappers.

const abjadCompilePlugin = {

    subscriptions: null,
    hydrogen: null,
    middlewareAttached: false,

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
      'abjadcompile:attachMiddleware': () => this.attachMiddleware()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

//  serialize() {
//    return {
//      abjadcompileViewState: this.abjadcompileView.serialize()
//    };
//  },

  attachMiddleware () {
    // attach abjad middleware
    if (!this.hydrogen) {
      return atom.notifications.addError(
        "Hydrogen `v1.0.0+` has to be running."
      );
    }

    const kernel = this.hydrogen.getActiveKernel();

    if (!kernel) {
      return atom.notifications.addError(
        "You must have an active kernel in order to attach middleware."
      );
    }

    if (this.middlewareAttached) {
      return atom.notifications.addError(
        "The example plugin is too simple to handle more than one kernel middleware!"
      );
    }

    kernel.addMiddleware(abjadKernelMiddleware);
    this.middlewareAttached = true;
    atom.notifications.addSuccess("Successfully added kernel middlware!");
    // this.lilycompile.compile()


  },

  consumeCompile(lilycompile) {
    this.lilycompile = lilycompile
    return new Disposable(() => {
        this.lilycompile = null; // Return a disposable to properly dispose of the subscription
      });
  },

  consumeHydrogen(hydrogen) {
    this.hydrogen = hydrogen
    return new Disposable(() => {
      this.hydrogen = null;
    });
  },

};

export default abjadCompilePlugin

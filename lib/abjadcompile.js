'use babel';

import { CompositeDisposable, Disposable, Emitter } from 'atom'
import { abjadKernelMiddleware } from './abjad-middleware'

const abjadCompilePlugin = {

    subscriptions: null,
    hydrogen: null,
    middlewareAttached: false,

  activate(state) {
    require('atom-package-deps').install('abjadcompile')
    .then(function() {
        console.log('lilycompile installed')
      })
    this.subscriptions = new CompositeDisposable();

    this.emitter = new Emitter();
    this.subscriptions.add(this.emitter);

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'abjadcompile:attachMiddleware': () => this.attachMiddleware()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    this.middlewareAttached = false
  },

  attachMiddleware () {
    // from Ben Russert's Hydrogen plugin example.
    if (!this.hydrogen) {
      return atom.notifications.addError(
        "Hydrogen `v1.0.0+` needs to be running, but it isn't right now."
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
        "The example plugin is too simple to handle more than one kernel middleware."
      );
    }

    kernel.addMiddleware(abjadKernelMiddleware);
    this.middlewareAttached = true;
    atom.notifications.addSuccess("Successfully added Abjad kernel middleware!");
  },

  consumeCompile(lilycompile) {
    this.lilycompile = lilycompile
    return new Disposable(() => {
        this.lilycompile = null;
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

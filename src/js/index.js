import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import Synth from './components/synth';
import Keyboard from './components/keyboard';
import Selector from './components/selector';
import Oscillator from './components/oscillator';
import Envelopes from './components/envelopes';

let Components = {};
Components.App = App;
Components.Synth = Synth;
Components.Keyboard = Keyboard;
Components.Selector = Selector;
Components.Oscillator = Oscillator;
Components.Envelopes = Envelopes;

window.React = React;
window.ReactDOM = ReactDOM;
window.Components = Components;

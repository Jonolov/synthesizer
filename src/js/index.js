import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import Synth from './components/synth';

let Components = {};
Components.App = App;
Components.Synth = Synth;

window.React = React;
window.ReactDOM = ReactDOM;
window.Components = Components;

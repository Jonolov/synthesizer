import React from 'react';
import Tone from 'tone';

class Oscillator extends React.Component {

    constructor(props) {
        super(props);
        let env = this.props.envelope;

        this.waves = ['sine', 'square', 'triangle', 'sawtooth'];

        this.tone = new Tone.Oscillator({
            frequency: this.props.frequency,
            type: this.waves[this.props.waveform],
            volume: this.props.volume
        }).connect(env).start();
    }

    componentWillReceiveProps(newProps) {
        this.tone.detune.value = newProps.detune;
        this.tone.volume.value = newProps.volume;
        this.tone.type = this.waves[newProps.waveform];

        if (newProps.playing) {
            this.tone.frequency.value = newProps.playing;
        }
    }

    render() {
        return (
            <div className="synth__oscillator">
                <br/>
                { this.props.children }
            </div>
        );
    }
}

export default Oscillator;

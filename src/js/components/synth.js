import React from 'react';
import Tone from 'tone';
import Slider from 'react-rangeslider';
import Keyboard from './keyboard';
import Selector from './selector';
import Oscillator from './oscillator';
import Envelopes from './envelopes';

class Synth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            frequencies: {
                0: 440
            },
            detunes: {
                0: 0,
                1: 0
            },
            volumes: {
                0: -25
            },
            waveforms: {
                0: 0,
                1: 0
            },
            attack: 0.41,
            decay: 5,
            sustain: 5,
            release: 3
        };

        this.envelope = new Tone.AmplitudeEnvelope({
            attack: this.state.attack,
            decay: this.state.decay,
            sustain: this.state.sustain,
            release: this.state.release
        }).toMaster()
    }

    startNote = (note) => {

        this.setState({
            playing: note
        });

        this.envelope.triggerAttack();
    }

    stopNote = () => {
        this.setState({
            playing: false
        });
        this.envelope.triggerRelease();
    }

    setDetune = (osc, v) => {
        console.log('osc ' + osc )
        let detunes = this.state.detunes;
        detunes[osc] = v;
        this.setState({
            detunes: detunes
        });
    }

    setVol = (osc, v) => {
        let volumes = this.state.volumes;
        volumes[osc] = v;

        this.setState({
            volumes: volumes
        });
    }

    setWav = (osc, v) => {
        let state = Object.assign({}, this.state);
        let waveforms = state.waveforms;
        waveforms[osc] = v;

        this.setState({
            waveforms: waveforms
        });
    }

    setAttack = (e) => {

        this.envelope.attack = (e);

        this.setState({
            attack: (e)
        });
    }

    setDecay = (e) => {

        this.envelope.decay = (e);

        this.setState({
            decay: (e)
        });
    }

    setSustain = (e) => {

        this.envelope.sustain = (e);

        this.setState({
            sustain: (e)
        });
    }

    setRelease = (e) => {

        this.envelope.release = (e);

        this.setState({
            release: (e)
        });
    }

    render() {

        console.log(this.state.waveforms);

        return (
            <div className='synth'>
                <div className='synth__controls'>
                    <div className='synth__mastercontrols'>
                        <Volume onVolChange={this.setVol}/>
                        <Detune onDetuneChange={this.setDetune}/>
                    </div>

                    <div className='synth__oscillatorgroup'>
                        <Oscillator frequency={440}
                            detune={ this.state.detunes[0] }
                            waveform={ this.state.waveforms[0] }
                            volume={ this.state.volumes[0] }
                            type={ 'square' }
                            envelope={this.envelope}
                            playing={this.state.playing}>
                        </Oscillator>
                        <Selector onSelect={this.setWav} oscillatorNr={0}/>
                    </div>
                    <div className='synth__oscillatorgroup'>
                        <Oscillator frequency={440}
                            detune={ this.state.detunes[1] }
                            waveform={ this.state.waveforms[1] }
                            volume={ this.state.volumes[0] }
                            type={ 'square' }
                            envelope={this.envelope}
                            playing={this.state.playing}>
                        </Oscillator>
                        <Selector onSelect={this.setWav} oscillatorNr={1}/>
                    </div>

                    <Envelopes
                        onAttackChange={this.setAttack}
                        onDecayChange={this.setDecay}
                        onSustainChange={this.setSustain}
                        onReleaseChange={this.setRelease}
                        attack={this.state.attack}
                        decay={this.state.decay}
                        sustain={this.state.sustain}
                        release={this.state.release}
                    />
                </div>

                <Keyboard onDown={this.startNote} onUp={this.stopNote}/>
            </div>
        );
    }
}

class Volume extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: -25 /** Start value **/
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value
        });

        this.props.onVolChange(0, value);
    }

    render() {
        let { value } = this.state;
        return (
            <div className='synth__slider'>
                <div className='rangeslider__label'>Volume</div>
                <Slider
                    value={value}
                    orientation="vertical"
                    onChange={this.handleChange}
                    min={-50}
                    max={0}
                />
            </div>
        );
    }
}

class Detune extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: 0 /** Start value **/
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value
        });

        this.props.onDetuneChange(0, value);
    }

    render() {
        let { value } = this.state;
        return (
            <div className='synth__slider'>
                <div className='rangeslider__label'>Detune</div>
                <Slider
                    value={value}
                    orientation="vertical"
                    onChange={this.handleChange}
                    min={-700}
                    max={700}
                />
            </div>
        );
    }
}

export default Synth;

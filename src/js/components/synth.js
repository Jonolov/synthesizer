import React from 'react';
import Tone from 'tone';
import Slider from 'react-rangeslider';

class Synth extends React.Component {
    constructor(props) {
        super(props);
        this.envelope = new Tone.AmplitudeEnvelope({
            attack: 0.41,
            decay: 0.21,
            sustain: 0.9,
            release: .9
        }).toMaster()
        this.state = {
            frequencies: {
                0: 440
            },
            detunes: {
                0: 0
            },
            volumes: {
                0: -25
            },
            waveforms: {
                0: 0
            }
        };
        this.setDetune = this.setDetune.bind(this);
        this.setVol = this.setVol.bind(this);
        this.setWav = this.setWav.bind(this);
        this.startNote = this.startNote.bind(this);
        this.stopNote = this.stopNote.bind(this);
    }

    setDetune(osc, v) {
        let detunes = this.state.detunes;
        detunes[osc] = v;
        this.setState({
            detunes: detunes
        });
    }

    setVol(osc, v) {
        console.log(this.state.volumes);
        let volumes = this.state.volumes;
        volumes[osc] = v;
        console.log('Vol = ' + v);
        this.setState({
            volumes: volumes
        });
    }

    setWav(osc, v) {
        let waveforms = this.state.waveforms;
        waveforms[osc] = v;
        console.log('OSC = ' + osc);
        console.log('V = ' + v);
        this.setState({
            waveforms: waveforms
        });
    }

    startNote(note) {
        this.setState({
            playing: note
        });

        this.envelope.triggerAttack();
    }

    stopNote() {
        this.setState({
            playing: false
        });
        this.envelope.triggerRelease();
    }

    render() {

        return (
            <div className='synth'>
                <div className='synth__controls'>
                    <Oscillator frequency={440}
                        detune={ this.state.detunes[0] }
                        waveform={ this.state.waveforms[0] }
                        volume={ this.state.volumes[0] }
                        type={ 'square' }
                        envelope={this.envelope}
                        playing={this.state.playing}>
                    </Oscillator>
                    <Selector onSelect={this.setWav}/>
                    <Volume onVolChange={this.setVol}/>
                    <Detune onDetuneChange={this.setDetune}/>
                </div>

                <Keyboard onDown={this.startNote} onUp={this.stopNote}/>
            </div>
        );
    }
}

class Keyboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            tone: ''
        });

        this.notes = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3'];

        this.handleChange = this.handleChange.bind(this);
        this.handleRelease = this.handleRelease.bind(this)
    }

    handleChange(e) {

        this.props.onDown(
            e.target.dataset.value
        );
    }

    handleRelease() {
        this.props.onUp('');
    }

    render() {

        let keys = this.notes.map((key, index) => {
            if (key.indexOf('#') === -1) {
                return (
                    <div className="synth__key synth__key--major"
                        data-value={key}
                        key={index}
                        onMouseDown={this.handleChange}
                        onMouseUp={this.handleRelease}>
                    </div>
                )
            }
            else {
                return (
                    <div className="synth__key synth__key--minor"
                        data-value={key}
                        key={index}
                        onMouseDown={this.handleChange}
                        onMouseUp={this.handleRelease}>
                    </div>
                )
            }
        });

        return (
            <div className="synth__keyboard">
                {keys}
            </div>
        );
    }
}

class Selector extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            selectedOption: '0'
        });

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(e) {
        console.log('e:' + e.target.id);
        this.props.onSelect(0, e.target.id);
        this.setState({
            selectedOption: e.target.id
        });
    }

    render() {
        return (
            <div className="synth__selector">
                <div>
                    <input
                        className='synth__radio'
                        type='radio'
                        id='0'
                        name='selector'
                        onClick={this.handleSelect}
                        checked={this.state.selectedOption === '0'} />
                    <label className='synth__radiolabel' htmlFor='0'>
                        <div className='synth__labeltext'>Sine</div>
                    </label>
                </div>
                <div>
                    <input
                        className='synth__radio'
                        type='radio'
                        id='1'
                        name='selector'
                        onClick={this.handleSelect}
                        checked={this.state.selectedOption === '1'}/>
                    <label className='synth__radiolabel' htmlFor="1">
                        <div className='synth__labeltext'>Square</div>
                    </label>
                </div>
                <div>
                    <input
                        className='synth__radio'
                        type='radio'
                        id='2'
                        name='selector'
                        onClick={this.handleSelect}
                        checked={this.state.selectedOption === '2'}/>
                    <label className='synth__radiolabel' htmlFor="2">
                        <div className='synth__labeltext'>Triangle</div>
                    </label>
                </div>
                <div>
                    <input
                        className='synth__radio'
                        type='radio'
                        id='3'
                        name='selector'
                        onClick={this.handleSelect}
                        checked={this.state.selectedOption === '3'}/>
                    <label className='synth__radiolabel' htmlFor="3">
                        <div className='synth__labeltext'>Sawtooth</div>
                    </label>
                </div>
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

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({
            value: value
        });

        this.props.onVolChange(0, value);
    }

    render() {
        let { value } = this.state;
        return (
            <div>
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

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({
            value: value
        });

        this.props.onDetuneChange(0, value);
    }

    render() {
        let { value } = this.state;
        return (
            <div>
                <div className='rangeslider__label'>Detune</div>
                <Slider
                    value={value}
                    orientation="vertical"
                    onChange={this.handleChange}
                    min={-100}
                    max={100}
                />
            </div>
        );
    }
}

class Oscillator extends React.Component {

    constructor(props) {
        super(props);
        this.env = this.props.envelope;
        this.waves = ['sine', 'square', 'triangle', 'sawtooth'];

        this.tone = new Tone.Oscillator({
            frequency: this.props.frequency,
            type: this.waves[this.props.waveform],
            volume: this.props.volume
        }).connect(this.env).start();

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

export default Synth;

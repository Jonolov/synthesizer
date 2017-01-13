import React from 'react';
import Slider from 'react-rangeslider';

class Envelopes extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            attack: this.props.attack,
            decay: this.props.decay,
            sustain: this.props.sustain,
            release: this.props.release /** Start value **/
        };

        console.log(this.props.attack);
    }

    handleAttack = (value) => {
        this.setState({
            attack: value
        });

        this.props.onAttackChange(value);
    }

    handleDecay = (value) => {
        this.setState({
            decay: value
        });

        this.props.onDecayChange(value);
    }

    handleSustain = (value) => {
        this.setState({
            sustain: value
        });

        this.props.onSustainChange(value);
    }

    handleRelease = (value) => {
        this.setState({
            release: value
        });

        this.props.onReleaseChange(value);
    }

    render() {

        return (
            <div className='synth__envelopes'>
                <div className='synth__envelope--attack'>
                    <div className='rangeslider__label'>Attack</div>
                    <Slider
                        value={this.state.attack}
                        orientation="vertical"
                        onChange={this.handleAttack}
                        min={0}
                        max={10}
                    />
                </div>
                <div className='synth__envelope--decay'>
                    <div className='rangeslider__label'>Decay</div>
                    <Slider
                        value={this.state.decay}
                        orientation="vertical"
                        onChange={this.handleDecay}
                        min={0}
                        max={10}
                    />
                </div>
                <div className='synth__envelope--sustain'>
                    <div className='rangeslider__label'>Sustain</div>
                    <Slider
                        value={this.state.sustain}
                        orientation="vertical"
                        onChange={this.handleSustain}
                        min={0}
                        max={10}
                    />
                </div>
                <div className='synth__envelope--release'>
                    <div className='rangeslider__label'>Release</div>
                    <Slider
                        value={this.state.release}
                        orientation="vertical"
                        onChange={this.handleRelease}
                        min={0}
                        max={10}
                    />
                </div>
            </div>
        );
    }
}

export default Envelopes;

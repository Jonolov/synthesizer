import React from 'react';
import Tone from 'tone';

class Keyboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            tone: ''
        });

        this.notes = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3',
            'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4'];

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.handleRelease = this.handleRelease.bind(this);
    }

    componentWillMount(){
        document.addEventListener('keydown', this.onKeyDown);
        document.addEventListener('keyup', this.handleRelease);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDown);
        document.removeEventListener('keyup', this.handleRelease);
    }

    onKeyDown(e) {
        document.addEventListener('keydown', this.onKeyDown);
        let note = Tone.Frequency(e.keyCode, 'midi').toNote();

        for (let i = this.notes.length - 1; i >= 0; i--) {
            if (this.notes[i] === note) {
                this.props.onKeyDown(
                    note
                );
            }
        }
    }

    handleMouseDown(e) {
        this.props.onDown(
            e.target.dataset.value
        );

        console.log(e.target.dataset.value);
    }

    handleRelease() {
        this.props.onUp('');
    }

    render() {

        let keys = this.notes.map((key, index) => {
            if (key.indexOf('#') === -1) {
                return (
                    <div className="keyboard__key keyboard__key--major"
                        data-value={key}
                        key={index}
                        onKeyDown={this.onKeyDown}
                        onKeyUp={this.handleRelease}
                        onMouseDown={this.handleMouseDown}
                        onMouseUp={this.handleRelease}>
                    </div>
                )
            }
            else {
                return (
                    <div className="keyboard__key keyboard__key--minor"
                        data-value={key}
                        key={index}
                        onKeyDown={this.onKeyDown}
                        onKeyUp={this.handleRelease}
                        onMouseDown={this.handleMouseDown}
                        onMouseUp={this.handleRelease}>
                    </div>
                )
            }
        });

        return (
            <div className="keyboard">
                {keys}
            </div>
        );
    }
}

export default Keyboard;

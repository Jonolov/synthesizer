import React from 'react';

class Keyboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            tone: ''
        });

        this.notes = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3'];
    }

    handleChange = (e) => {

        this.props.onDown(
            e.target.dataset.value
        );
    }

    handleRelease = () => {
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

export default Keyboard;

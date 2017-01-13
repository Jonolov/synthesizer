import React from 'react';

class Selector extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            selectedOption: '0'
        });
    }

    handleSelect = (e) => {
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

export default Selector;

import React from 'react';

class Selector extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            selectedOption: 'r1_' + this.props.oscillatorNr
        });

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(e) {

        this.props.onSelect(this.props.oscillatorNr, e.target.value);
        this.setState({
            selectedOption: e.target.id
        });
    }

    render() {
        return (
            <form className='selector'>
                <div className='selector__oscillatorlabel'>Osc {this.props.oscillatorNr + 1}</div>
                <div>
                    <input
                        className='selector__radio'
                        type='radio'
                        id={'r0_' + this.props.oscillatorNr}
                        name='selector'
                        onClick={this.handleSelect}
                        checked={this.state.selectedOption === 'r0_' + this.props.oscillatorNr}
                        value='0'/>
                    <label className='selector__radiolabel' htmlFor={'r0_' + this.props.oscillatorNr}>
                        <div className='selector__label selector__label--sine'></div>
                    </label>
                </div>
                <div>
                    <input
                        className='selector__radio'
                        type='radio'
                        id={'r1_' + this.props.oscillatorNr}
                        name='selector'
                        onClick={this.handleSelect}
                        checked={this.state.selectedOption === 'r1_' + this.props.oscillatorNr}
                        value='1'/>
                    <label className='selector__radiolabel' htmlFor={'r1_' + this.props.oscillatorNr}>
                        <div className='selector__label selector__label--square'></div>
                    </label>
                </div>
                <div>
                    <input
                        className='selector__radio'
                        type='radio'
                        id={'r2_' + this.props.oscillatorNr}
                        name='selector'
                        onClick={this.handleSelect}
                        checked={this.state.selectedOption === 'r2_' + this.props.oscillatorNr}
                        value='2'/>
                    <label className='selector__radiolabel' htmlFor={'r2_' + this.props.oscillatorNr}>
                        <div className='selector__label selector__label--triangle'></div>
                    </label>
                </div>
                <div>
                    <input
                        className='selector__radio'
                        type='radio'
                        id={'r3_' + this.props.oscillatorNr}
                        name='selector'
                        onClick={this.handleSelect}
                        checked={this.state.selectedOption === 'r3_' + this.props.oscillatorNr}
                        value='3'/>
                    <label className='selector__radiolabel' htmlFor={'r3_' + this.props.oscillatorNr}>
                        <div className='selector__label selector__label--sawtooth'></div>
                    </label>
                </div>
            </form>
        );
    }
}

export default Selector;

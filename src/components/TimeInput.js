import React from 'react';
import PropTypes from 'prop-types';



//define the input names
const inputNames = {
	'begin': 'begin',
	'end': 'end'
};



class TimeInput extends React.Component{
	constructor(props){
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}



	handleChange = (event) => {
		event.preventDefault();
		this.props.onTimeChange(event.target.value);
	};


	render(){
		const name = this.props.name;
		const time = this.props.time;

		return (
			<div>
				<legend>Enter {inputNames[name]} time:</legend>
				<input className="time"
					   type="time"
					   name={name}
					   value={time}
					   step={2}
					   onChange={this.handleChange}/>
			</div>
		);
	}
}


export default TimeInput;
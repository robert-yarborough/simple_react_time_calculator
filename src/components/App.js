import React from 'react';
import CalculateBtn from './CalculateBtn';
import TimeInput from './TimeInput';
import moment from 'moment';
import update from 'immutability-helper';





class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: '',
			time: 0,
			begin: [],
			end: [],
			total: 0,
			timerInProgress: false,
			timerFinished: false,
			animDuration: 0
		};

		this.handleBeginTime = this.handleBeginTime.bind(this);
		this.handleEndTime = this.handleEndTime.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillUnmount(){
		this.stopTimer();
	}




	startTimer() {
		if (this.state.timerInProgress === false) {
			console.log('startTimer invoked', this.total);

			/*this.timer = setInterval(
				() => this.tick(),
				1000
			);*/

		}
	}

	stopTimer() {
		clearInterval(this.timer);
		this.timer = null;
		this.setState({
			timerInProgress: false
		})
	}

	tick(total) {
		console.log(this.state.total > 0);
		if (this.state.total > 0) {
			console.log('ticker state.time greater then 0');
			/*this.setState({
				total: this.state.total -1,
				timerFinished: false
			});*/
			console.log('tick', total);
		} /*else {
			this.setState({
				timerFinished: true
			});
			this.stopTimer();
		}*/
		this.stopTimer();

	}

	//input change handler for time state
	handleBeginTime(time){

		//pass an updater function, instead of an object
		this.setState(prevState => ({
			name: 'begin',
			time: time,
			begin: [...prevState.begin, time]
		}));

		console.log('begin state', this.state.begin);
		return time;
	};

	//input change handler for time state
	handleEndTime(time){
		//pass an updater function, instead of an object
		this.setState(prevState =>({
			name: 'end',
			time: time,
			end: [...prevState.end, time]
		}));

		console.log('end state', this.state.end);
		return time;
	};



	//form change handler
	handleSubmit(event){
		event.preventDefault();

		const beginning = moment.utc(this.handleBeginTime(this.state.begin), 'hh:mm:ss am');
		const ending = moment.utc(this.handleEndTime(this.state.end), 'hh:mm:ss am');
		const mins = moment.utc(moment(ending, 'hh:mm:ss').diff(moment(beginning, 'hh:mm:ss'))).format('mm');
		const secs = moment.utc(moment(ending, 'hh:mm:ss').diff(moment(beginning, 'hh:mm:ss'))).format('ss');
		const total = ending.diff(beginning, 'hours') + ' : ' + mins + ' : ' + secs;

		//pass an updater function, instead of an object
		this.setState(prevState =>({
			time: update(prevState.time, {$splice: [[0]]}) + total -1,
			total: this.state.total
		}));

		console.log('total', total);
		if (this.state.timerInProgress === false){
			this.setState({
				timerInProgress: true,
				animDuration: this.state.time + "s"
			});
			console.log('timer', this.timer = setInterval(()=> this.tick(total), 100));
		}


	};



	render() {
		return (
			<div>
				<form className="form" onSubmit={this.handleSubmit} >
					<label>
						<TimeInput name="begin"
								   onTimeChange={this.handleBeginTime}/>
					</label>
					<label>
						<TimeInput name="end"
								   onTimeChange={this.handleEndTime}/>
					</label>
					<CalculateBtn/>
				</form>

				<div>
					{this.state.time}
				</div>
			</div>
		);
	}

}

export default App;
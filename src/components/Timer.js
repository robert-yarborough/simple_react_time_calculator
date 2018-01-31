class ReactTimer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time: 5,
			timerInProgress: false,
			timerFinished: false,
			animDuration: 0
		};
		this.handleClick = this.handleClick.bind(this);
		this.setTime = this.setTime.bind(this);
	}

	// In this components life-cycle/componentWillUnmount we want to initialize the stopTimer function
	componentWillUnmount() {
		this.stopTimer();
	}


	// start timer function
	startTimer() {
		if (this.state.timerInProgress === false) {
			this.setState({
				timerInProgress: true,
				animDuration: this.state.time + "s"
			});

			this.timerID = setInterval(() => this.tick(), 1000);
		}
	}

	// stop timer function
	stopTimer() {
		clearInterval(this.timerID);
		this.timerID = null;
		this.setState({
			timerInProgress: false
		});
	}

	// check if the time state is higher than 0, and begin 'decrementing' the count, invoke the stopTimer function otherwise.
	tick() {
		if (this.state.time > 0) {
			this.setState({
				time: this.state.time - 1,
				timerFinished: false
			});
		} else {
			this.setState({
				timerFinished: true
			});
			this.stopTimer();
		}
	}


	//
	setTime(e) {
		e.preventDefault();
		if (this.state.timerInProgress === false) {
			this.setState({
				time: e.target.value
			});
		}
	}

	handleClick(e) {
		e.preventDefault();
		this.startTimer();
	}

	render() {
		return (
			<div>
				<form>
					<input type="number" min="1" max="10" onChange={this.setTime} />
					<button onClick={this.handleClick}>Start timer</button>
				</form>
				<div
					className={
						this.state.timerInProgress ? "timer countingDown" : "timer"
					}
				>
					<p>{this.state.time}</p>
					<svg>
						<circle
							r="18"
							cx="20"
							cy="20"
							style={{ animationDuration: this.state.animDuration }}
						/>
					</svg>
				</div>
				<p className={this.state.timerFinished ? "winner" : "notWinner"}>
					Congratulations! You're a winner!
				</p>
			</div>
		);
	}
}

ReactDOM.render(<ReactTimer />, document.getElementById("react-timer"));
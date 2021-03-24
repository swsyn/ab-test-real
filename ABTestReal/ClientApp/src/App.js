import React, { Component } from "react";
import "./App.css";
import UserTableContainer from "./components/UserTableContainer";
import CalcResultsContainer from "./components/CalcResultsContainer";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: [],
			usersForChart: []
		}

		this.handleCalculate = this.handleCalculate.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}

	async populateUsers() {
		const response = await fetch('api/users');
		const users = await response.json();
		for (let i = users.length; i < 5; i++) {
			users.push({
				id: i + 1,
				dateRegistration: "",
				dateRegistrationValid: false,
				dateLastActivity: "",
				dateLastActivityValid: false
			});
		}
		this.setState({
			users
		});
	}

	componentDidMount() {
		this.populateUsers();
	}

	validate(str) {
		let regex = new RegExp("^([0-9]{2})\\.([0-9]{2})\\.([1-2][0-9]{3})$");

		if (regex.test(str) === false) {
			return false;
		}
		let reRes = regex.exec(str);
		let year = parseInt(reRes[3], 10);
		let month = parseInt(reRes[2], 10) - 1;
		let day = parseInt(reRes[1], 10);
		if (day > 31 || month > 12 || year > 3000 || year < 1000) {
			return false;
		}
		return true;
	}

	validateAll() {
		let users = this.state.users;
		for (let i = 0; i < users.length; i++) {
			let user = users[i];
			user.dateRegistrationValid = this.validate(user.dateRegistration);
			user.dateLastActivityValid = this.validate(user.dateLastActivity);
			users[i] = user;
		}
		return users;
	}

	handleCalculate() {
		this.setState({
			users: this.validateAll()
		});
		for (let i = 0; i < 5; i++) {
			if (this.state.users[i].dateRegistrationValid === false || this.state.users[i].dateLastActivityValid === false) {
				return;
			}
		}
		this.setState({
			usersForChart: this.state.users
		});
	}

	handleInput(e) {
		let parts = e.target.name.split("-");
		let users = this.state.users;
		let user = users[Number(parts[1])];
		if (parts[0] === "dateRegistration") {
			user.dateRegistration = e.target.value;
			user.dateRegistrationValid = this.validate(e.target.value);
		} else if (parts[0] === "dateLastActivity") {
			user.dateLastActivity = e.target.value;
			user.dateLastActivityValid = this.validate(e.target.value);
		}
		users[Number(parts[1])] = user;
		this.setState({
			users,
			usersForChart: []
		});
	}

	async saveUsers() {
		this.setState({
			users: this.validateAll()
		});
		for (let i = 0; i < 5; i++) {
			if (this.state.users[i].dateRegistrationValid === false || this.state.users[i].dateLastActivityValid === false) {
				return;
			}
		}
		let users = this.state.users;
		const response = await fetch('api/users', {
			method: 'POST',
			body: JSON.stringify(users),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	handleSave() {
		this.saveUsers();
	}

	render() {
		return (
			<div className="app">
				<UserTableContainer users={this.state.users} handleCalculate={this.handleCalculate} handleInput={this.handleInput} handleSave={this.handleSave} />
				<CalcResultsContainer users={this.state.usersForChart} />
			</div>
		);
	}
}

export default App;
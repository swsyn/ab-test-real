import React, {Component} from "react";
import "./CalcResultsContainer.css";
import Chart from "./Chart";

class CalcResultsContainer extends Component {
  render() {
    let rollingRetention = 0;
    let pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    let returned7day = 0;
    let registered7day = 0;
    let users = this.props.users;
    let today = new Date();
    
    for (let i = 0; i < users.length; i++) {
      let stringDate = this.props.users[i].dateRegistration;
      let dateRegistration = new Date(stringDate.replace(pattern, "$3-$2-$1"));
      stringDate = this.props.users[i].dateLastActivity;
      let dateLastActivity = new Date(stringDate.replace(pattern, "$3-$2-$1"));
      let returnedAfter = Math.ceil(Math.abs(dateLastActivity.getTime() - dateRegistration.getTime()) / (1000 * 3600 * 24));
      if (returnedAfter >= 7) {
        returned7day++;
      }
      let registeredBefore = Math.ceil(Math.abs(today.getTime() - dateRegistration.getTime()) / (1000 * 3600 * 24));
      if (registeredBefore >= 7) {
        registered7day++;
      }
    }
    
    if (registered7day > 0) {
      rollingRetention = returned7day / registered7day * 100;
    }
    return (
      <div className="calcresults-container">
        <h2 className="calcresults-container__title">Calculation Results</h2>
        <Chart users={this.props.users} />
        <div className="calcresults-container__retention">Rolling Retention 7 day = {rollingRetention}%</div>
      </div>
    );
  }
}

export default CalcResultsContainer;
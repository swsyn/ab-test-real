import React, {Component} from "react";
import "./Chart.css";

class Chart extends Component {
  render() {
    let usersLifeTime = [];
    let renderBars = [];
    let barColors = ["#ebe9e9", "#f3f8f2", "#3581b8", "#fcb07e", "#dee2d6"];
    let pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    let maxLifeTime = 1;
    
    for (let i = 0; i < 5; i++) {
      if (this.props.users[i] !== undefined) {
        let stringDate = this.props.users[i].dateRegistration;
        let dateRegistration = new Date(stringDate.replace(pattern, "$3-$2-$1"));
        stringDate = this.props.users[i].dateLastActivity;
        let dateLastActivity = new Date(stringDate.replace(pattern, "$3-$2-$1"));
        usersLifeTime.push({
          id: i + 1,
          lifeTime: Math.ceil(Math.abs(dateRegistration.getTime() - dateLastActivity.getTime()) / (1000 * 3600 * 24))
        });
        
      } else {
        usersLifeTime.push({
          id: i + 1,
          lifeTime: 0
        });
      }
      if (usersLifeTime[i].lifeTime > maxLifeTime) {
        maxLifeTime = usersLifeTime[i].lifeTime;
      }
    }
    
    
    for (let i = 0; i < 5; i++) {
      let barStyle = {
        height: (usersLifeTime[i].lifeTime / maxLifeTime * 100) + "%",
        backgroundColor: barColors[i]
      };
      renderBars.push(
        <div key={i} className="chart__bar-container">
          <div className="chart__lifetime">{usersLifeTime[i].lifeTime}</div>
          <div className="chart__bar-wrap">
            <div className="chart__bar" style={barStyle}></div>
          </div>
          <div className="chart__userid">{i + 1}</div>
        </div>
      );
    }
    
    
    return (
      <div className="chart">
        <div className="chart__legend-x">Users</div>
        <div className="chart__legend-y">Life Time, days</div>
        <div className="chart__body">
          {renderBars}
        </div>
      </div>
    );
  }
}

export default Chart;
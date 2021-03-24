import React, {Component} from "react";
import "./UserTable.css";

class UserTable extends Component {
  render() {
    
    let userList = [];
    let renderRows = [];
    
    for (let i = 0; i < 5; i++) {
      if (this.props.users[i] !== undefined) {
        userList.push(this.props.users[i]);
      } else {
        userList.push({
          id: i + 1,
          dateRegistration: "",
          dateLastActivity: ""
        });
      };
      let dateRegStr = "dateRegistration-" + i;
      let dateLastActStr = "dateLastActivity-" + i;
      let dateRegColor = userList[i].dateRegistrationValid?"#5D6D97":"red";
      let dateLastActColor = userList[i].dateLastActivityValid?"#5D6D97":"red";
      renderRows.push(
        <tr key={i} className="usertable__body-row">
          <th scope="row" className="usertable__body-col">{userList[i].id}</th>
          <td className="usertable__body-col"><input type="text" name={dateRegStr} className="usertable__input" placeholder="[dd.mm.yyyy]" value={userList[i].dateRegistration} onChange={this.props.handleInput} style={{color: dateRegColor}}></input></td>
          <td className="usertable__body-col"><input type="text" name={dateLastActStr} className="usertable__input" placeholder="[dd.mm.yyyy]" value={userList[i].dateLastActivity} onChange={this.props.handleInput} style={{color: dateLastActColor}}></input></td>
        </tr>
      );
    }
    
    return (
      <div className="usertable">
        <table className="usertable__table">
          <thead className="usertable__head">
            <tr>
              <th scope="col" className="usertable__head-col">UserID</th>
              <th scope="col" className="usertable__head-col">Date Registration</th>
              <th scope="col" className="usertable__head-col">Date Last Activity</th>
            </tr>
          </thead>
          <tbody className="usertable__body">
            {renderRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserTable;
import React, {Component} from "react";
import "./UserTableContainer.css";
import UserTable from "./UserTable";

class UserTableContainer extends Component {
  render() {
    return (
      <div className="usertable-container">
        <h2 className="usertable-container__title">User Table</h2>
        <UserTable users={this.props.users} handleInput={this.props.handleInput}/>
        <div className="usertable-container__buttons">
		  <button onClick={this.props.handleSave} className="button usertable-container__btn-save">Save</button>
          <button onClick={this.props.handleCalculate} className="button usertable-container__btn-calc">Calculate</button>
        </div>
      </div>
    );
  }
}

export default UserTableContainer;
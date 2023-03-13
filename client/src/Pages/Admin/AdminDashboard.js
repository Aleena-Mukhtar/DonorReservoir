import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineLogout } from 'react-icons/ai';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Confirm } from 'react-st-modal';
const Users = [
  {
    id: 1,
    selected: false,
    d_id: '123456',
    name: 'Aleena',
    cnic: '35401-23829382-2',
    bType: 'O+',
    date: '20 December 2022',
  },
  {
    id: 2,
    selected: false,
    d_id: '123456',
    name: 'Aleena',
    cnic: '35401-23829382-2',
    bType: 'O+',
    date: '20 December 2022',
  },
  {
    id: 3,
    selected: false,
    d_id: '123456',
    name: 'Aleena',
    cnic: '35401-23829382-2',
    bType: 'O+',
    date: '20 December 2022',
  },
  {
    id: 4,
    selected: true,
    d_id: '123456',
    name: 'Aleena',
    cnic: '35401-23829382-2',
    bType: 'O+',
    date: '20 December 2022',
  },
  {
    id: 5,
    selected: false,
    d_id: '123456',
    name: 'Aleena',
    cnic: '35401-23829382-2',
    bType: 'O+',
    date: '20 December 2022',
  },
  {
    id: 6,
    selected: false,
    d_id: '123456',
    name: 'Aleena',
    cnic: '35401-23829382-2',
    bType: 'O+',
    date: '20 December 2022',
  },
  {
    id: 7,
    selected: false,
    d_id: '123456',
    name: 'Aleena',
    cnic: '35401-23829382-2',
    bType: 'O+',
    date: '20 December 2022',
  },
  {
    id: 8,
    selected: false,
    d_id: '123456',
    name: 'Aleena',
    cnic: '35401-23829382-2',
    bType: 'O+',
    date: '20 December 2022',
  },
  {
    id: 9,
    selected: false,
    d_id: '123456',
    name: 'Aleena',
    cnic: '35401-23829382-2',
    bType: 'O+',
    date: '20 December 2022',
  },
];

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      List: Users,
      MasterChecked: false,
      SelectedList: [],
    };
  }

  // Select/ UnSelect Table rows
  onMasterCheck(e) {
    let tempList = this.state.List;
    // Check/ UnCheck All Items
    tempList.map((user) => (user.selected = e.target.checked));

    //Update State
    this.setState({
      MasterChecked: e.target.checked,
      List: tempList,
      SelectedList: this.state.List.filter((e) => e.selected),
    });
  }

  // Update List Item's state and Master Checkbox State
  onItemCheck(e, item) {
    let tempList = this.state.List;
    tempList.map((user) => {
      if (user.id === item.id) {
        user.selected = e.target.checked;
      }
      return user;
    });

    //To Control Master Checkbox State
    const totalItems = this.state.List.length;
    const totalCheckedItems = tempList.filter((e) => e.selected).length;

    // Update State
    this.setState({
      MasterChecked: totalItems === totalCheckedItems,
      List: tempList,
      SelectedList: this.state.List.filter((e) => e.selected),
    });
  }

  render() {
    return (
      <div className="container">
        <div className = "heading"> Admin Dashboard History </div>
        <div className="row">
        <div className="left-panel">
          <button className="b1"> Details of Bottles </button>
          <button className="b2"> History </button>              
          <button className='logoutBtn'
            onClick={async () => {
              const result = await Confirm('Are you sure you want to logout?', 'Сonfirm Logout');
              if (result) {
                    // Сonfirmation confirmed
              } 
              else {
                    // Сonfirmation not confirmed
              }
            }}>
            <AiOutlineLogout className='icon'/>
            <div className='label'>Log Out</div>
          </button>
        </div>
        <div className="right-panel">
          <button className='AllBtn'>
            <RiArrowDropDownLine className='icon'/>
            <div className='label'>All</div>
          </button>
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={this.state.MasterChecked}
                      id="mastercheck"
                      onChange={(e) => this.onMasterCheck(e)}
                    />
                  </th>
                    
                  <th scope="col">Donor ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">CNIC</th>
                  <th scope="col">Blood Type</th>
                  <th scope="col">Date</th>
                    
                </tr>
              </thead>
              <tbody className="tBody">
                {this.state.List.map((user) => (
                  <tr key={user.id} className={user.selected ? "selected" : ""}>
                    <th scope="row">
                      <input
                        type="checkbox"
                        checked={user.selected}
                        className="form-check-input"
                        id="rowcheck{user.id}"
                        onChange={(e) => this.onItemCheck(e, user)}
                      />
                    </th>
                    <td>{user.d_id}</td>
                    <td>{user.name}</td>
                    <td>{user.cnic}</td>
                    <td>{user.bType}</td>
                    <td>{user.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
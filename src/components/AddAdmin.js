import React, { Component } from 'react'
import { fire } from './firebaseconfig';
import { getDatabase,set,ref } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

export default class AddAdmin extends Component {



    constructor(){
        super();
        this.state={
            admin:"",
            pass:""
        }

        this.adminref= React.createRef();
        this.passref= React.createRef();
    }

    handlechange=(e)=>{
        this.setState({[e.target.id]: e.target.value});
    }

    add=(e)=>{
        const admin= this.state.admin;
        const password =  this.state.pass;
        const db = getDatabase(fire);
        set(ref(db, "Admins/"+ admin),({
          password:password
        }))

        this.setState({admin:"",pass:""});
        this.adminref.current.value="";
        this.passref.current.value="";

        window.alert(`admin ${admin} was added successfully`);
        
    }

  render() {
    
    return (
      <>
      <h2 style={{textAlign:"center"}}>Add new admins</h2>
 <form>
      <div className="input-group my-2">
    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
    <input ref={this.adminref} id="admin" value={this.state.admin} onChange={this.handlechange} type="text" className="form-control" name="news" placeholder="enter admin id here"/>
  </div>

  <div className="input-group my-2">
    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
    <input ref={this.passref} id="pass" value={this.state.pass} onChange={this.handlechange} type="password" className="form-control" name="news" placeholder="enter password here"/>
  </div>
  </form>

  <p style={{textAlign:"center"}}> <button type="button"  onClick={this.add} className="btn btn-success my-3">Add</button></p>

      </>
    )
  }
}

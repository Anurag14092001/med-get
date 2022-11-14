import React, { Component } from 'react';
import {fire} from './firebaseconfig';
import {getDatabase,set,ref} from 'firebase/database'

export default class ChangePassword extends Component {

    constructor(){
        super();
        this.state={
         old : "",
         news: "",
         rip: ""


        }

        this.oldref=React.createRef();
        this.newref=React.createRef();
        this.repeatref=React.createRef();
    }

    handlechange=(e)=>{
        this.setState({[e.target.name]: e.target.value});
    }

    change=(e)=>{
        e.preventDefault();
        const db = getDatabase(fire);
        const o = this.state.old.toString();
        const curr = this.props.adminpass.toString();
        console.log(curr);
        const nim = this.state.news.toString();
        const r = this.state.rip.toString();

        if(o===curr){
          if(nim===r){
            set(ref(db,"Admins/"+this.props.adminid.toString()),({
              password: nim}
            ))

            window.alert(`Password for ${this.props.adminid} was updated.`);
            this.props.func3(true,this.props.adminid,nim);
          }else{
            window.alert("please make sure that the two passwords are the same");
          }


        }else{
         window.alert("Please enter the correct old password");
        }

        this.setState({news:"",old:"",rip:""});
        

        this.oldref.current.value="";
        this.newref.current.value="";
        this.repeatref.current.value="";
    }

  render() {
    return (
      <>
      <h2 styles={{textAlign:"center"}}>Change password</h2>
      <div className="input-group my-2">
    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
    <input ref={this.oldref} id="old" value={this.state.old} onChange={this.handlechange} type="password" className="form-control" name="old" placeholder="enter old password here"/>
  </div>

  <div className="input-group my-2">
    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
    <input ref={this.newref} id="news" value={this.state.news} onChange={this.handlechange} type="password" className="form-control" name="news" placeholder="enter new password here"/>
  </div>

  <div className="input-group my-2">
    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
    <input ref={this.repeatref} id="rip" value={this.state.rip} onChange={this.handlechange} type="password" className="form-control" name="rip" placeholder="repeat password here"/>
  </div>

  <p style={{textAlign:"center"}}> <button type="button"  onClick={this.change} className="btn btn-success my-3">change</button></p>
      </>
    )
  }
}

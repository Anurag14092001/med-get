import React, { Component } from 'react'
import { fire } from './firebaseconfig';
import { onValue,ref,getDatabase } from 'firebase/database';
import { Navigate } from 'react-router-dom';

export default class Adminlogin extends Component {
 

    constructor() {
    
        super();
     

        this.state = {
            adminyes: false,
            adid:"",
            pswrd:"",
            nouserexists :false,
            admins:[]

        }

        this.idref = React.createRef();
     this.passref = React.createRef();
    }

    componentDidMount=()=>{
      const db = getDatabase(fire);
      var a = [];
      onValue(ref(db, "Admins/"),(snapshot)=>{
        snapshot.forEach((childsnapshot)=>{
       const adminname = childsnapshot.key;
       const pass = childsnapshot.val().password;
       const obj ={"admin":adminname,"password":pass};
       a.push(obj);
        })


    })

    this.setState({...this.state,admins:a});
    }
    

    handlechange=(e)=>{
        this.setState({[e.target.id]: e.target.value},()=>{console.log(this.state)});
    }

    submit=(e)=>{
        e.preventDefault();
        
        var correctpass="";
        const a = this.state.admins;
        const id = this.state.adid;
        const password = this.state.pswrd.toString();
        console.log(id);
        console.log(password);
        
        var yes = false;
        var index = 0;
        for(let i=0;i<a.length;i++){
        if(a[i].admin===id){
          if(a[i].password===password){
            this.setState({...this.state,adid:"",pswrd:"",adminyes: true},()=>{console.log(this.state)});

            this.props.func(true,id,password);
            yes=  true; 
            index =i;
            break;
          }else{
            window.alert("please enter the correct password!");
            this.setState({...this.state,adid:"",pswrd:"",adminyes:false})
            yes=true;
            break;
          }
        }
        }

        if(!yes){
          this.setState({...this.state,adid:"",pswrd:"",nouserexists:true},()=>{console.log(this.state)});
          window.alert("No such user exists");
        }

        

        

        this.idref.current.value="";
          this.passref.current.value="";
    }
    render() {
      if(this.state.adminyes===true){
        return(<Navigate to ="/" />)
      }else{
        return (
      <>
                <h2 style={{ textAlign: "center" }}>Enter login details</h2>
                <form>
                <div className="input-group my-2">
    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
    <input ref={this.idref} id="adid" value={this.state.id} onChange={this.handlechange} type="text" className="form-control" name="id" placeholder="ID"/>
  </div>
  <div className="input-group my-2">
    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
    <input ref={this.passref} id="pswrd" value={this.state.password} onChange={this.handlechange} type="password" className="form-control" name="password" placeholder="Password"/>
  </div>

 <p style={{textAlign:"center"}}> <button type="button"  onClick={this.submit} className="btn btn-success my-3">Login</button></p>

                </form>
                </>

                )}
       }
}

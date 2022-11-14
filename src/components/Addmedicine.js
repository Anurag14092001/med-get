import React, { Component } from 'react'
import {getDatabase,set,ref} from 'firebase/database';
import { fire } from './firebaseconfig';

export class Addmedicine extends Component {

  constructor(){
    super();
    this.state={
      name:"",
      company: "",
      price: "",
      composition: ""
    }

    this.nameref=React.createRef();
    this.companyref=React.createRef();
    this.priceref=React.createRef();
    this.compositionref=React.createRef();
  }

   handleOnChange=(e)=>{
    this.setState({[e.target.id]: e.target.value});
    
  }

  submit=(e)=>{
    e.preventDefault();

    if(this.state.name===""|this.state.company===""|this.state.price===""|this.state.composition===""){
      window.alert("please Fill out all the fields");
    }else{

    const obj = {
      medicine:(this.state.name).toUpperCase(),
      company: (this.state.company).toUpperCase(),
      price_per_unit:parseInt(this.state.price),
      composition: ((this.state.composition).toUpperCase()).split("+")
      
    }

    const db = getDatabase(fire);
    set(ref(db, "Medicines/"+obj.medicine),(obj));
    this.companyref.current.value="";
    this.nameref.current.value="";
    this.priceref.current.value="";
    this.compositionref.current.value="";

    this.setState({
      name:"",
      company: "",
      price: "",
      composition: ""
    })

    window.alert(`details for ${obj.medicine} were added`);
  }
  }

  render() {

   

    return (
      <>
    <h2 style={{textAlign:"center"}}>Adding medicines to database</h2>
    <form>
    <div class="input-group my-1">
    <span class="input-group-addon">Medicine name</span>
    <input  type="text" ref={this.nameref} value={this.state.name} onChange={this.handleOnChange} class={"form-control"} id="name" placeholder="Enter medicine name here"/>
  </div>

  <div class="input-group my-1">
    <span class="input-group-addon">Company name</span>
    <input id="company" ref={this.companyref} type="text" value={this.state.company} onChange={this.handleOnChange} class="form-control" name="msg" placeholder="Enter company name here"/>
  </div>

  <div class="input-group my-1">
    <span class="input-group-addon">Medicine Price</span>
    <input id="price" ref={this.priceref} type="number" value={this.state.price} onChange={this.handleOnChange} class="form-control" name="msg" placeholder="Enter medicine price here"/>
  </div>

  <div class="input-group my-1">
    <span class="input-group-addon">Medicine Composition</span>
    <input id="composition" ref={this.compositionref} type="text" value={this.state.composition} onChange={this.handleOnChange} class="form-control" name="msg" placeholder="Enter medicine ingredients seperating each component with a + here"/>
  </div>

  <p style={{textAlign:"center"}}><button  type="button" class="btn btn-success" onClick={this.submit}>Add</button></p>
  
    </form>
    </>
    )
  }
}

export default Addmedicine
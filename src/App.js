import logo from './logo.svg';
import './App.css';
import Addmedicine from './components/Addmedicine';
import Search from './components/Search';
import BudgetSearch from './components/BudgetSearch';
import Composition from './components/Composition';
import {BrowserRouter ,Link,Routes,Route} from "react-router-dom";
import Navbar from './components/Navbar';
import { Component } from 'react';
import Adminlogin from './components/Adminlogin';
import AddAdmin from './components/AddAdmin';
import ChangePassword from './components/ChangePassword';

export default class App extends Component {

  constructor(){
    super();
    this.state={
      admin : false,
      curr_admin:"",
      curr_admin_pass:""
    }
  }

  parentcallback=(data1,data2,data3)=>{
    this.setState({admin: data1,curr_admin:data2,curr_admin_pass:data3},()=>{console.log(this.state)});
  }

  callback2=()=>{
    this.setState({admin:false,curr_admin:"",curr_admin_pass:""});
  }

  render() {

    
    return (
      <>
    
    
      <Navbar data={this.state.admin} func2={this.callback2}/>
      
      <Routes>
         
          <Route exact path="/" element={<BudgetSearch/>}/>
            <Route exact path="/cmp" element={<Composition/>}/>
            {!this.state.admin &&<Route exact path="/login" element={<Adminlogin func = {this.parentcallback}/>}/>}
            {this.state.admin && <Route exact path="/amed" element={<Addmedicine />}/>}
            {this.state.admin && <Route exact path="/aadm" element={<AddAdmin adminid={this.state.curr_admin} adminpass={this.state.curr_admin_pass}/>}/>}
            {this.state.admin && <Route exact path="/cpass" element={<ChangePassword func3={this.parentcallback} adminid={this.state.curr_admin} adminpass={this.state.curr_admin_pass}/>}/>}
            </Routes>
           
            
        
        
        </>
    )
  }
}


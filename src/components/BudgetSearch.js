import React, { Component } from 'react'
import {ref,getDatabase,onValue} from 'firebase/database';
import { fire } from './firebaseconfig';

export default class BudgetSearch extends Component {

  constructor(){
    super();
    this.state={
      names : "",
      replacements: [],
      original_average_bill : "",
      replaced_average_bill: "",
      total_discount: ""
    }
  }

  handleChange=(e)=>{
    this.setState({[e.target.id]: e.target.value});
  }

  search=(e)=>{
    e.preventDefault();
    const namearr = this.state.names.split("+");
    const db = getDatabase(fire);
    var finale= [];
    console.log(1);
    namearr.forEach((element)=>{
      var med = element.toUpperCase();
      var A=[];

      var ogprice = 0;
      
    onValue(ref(db, "Medicines/"+med),(snapshot)=>{
     A = snapshot.val().composition;
     ogprice= snapshot.val().price_per_unit;
     console.log(A);
    });
    
     
    var simcomp=[]
    onValue(ref(db, "Medicines/"),(snapshot)=>{

     snapshot.forEach((childsnapshot)=>{
      var name= childsnapshot.key;
      var price= childsnapshot.val().price_per_unit;
      var composition = childsnapshot.val().composition;
      

      if(JSON.stringify(A.sort())===JSON.stringify(composition.sort())){
        const obj = {"name":name,"price": price};
        simcomp.push(obj);

      }
     })
    }
    )
    console.log(4);
    var smallest = 0;
    for(var i=0;i<simcomp.length;i++){
    if(simcomp[i].price<simcomp[smallest].price){
      smallest=i;
    }
    }
    console.log(simcomp);

    const replacement ={"original":med,"originalprice":ogprice,"replacementprice":simcomp[smallest].price,"reduction":((ogprice)-(simcomp[smallest].price)).toString(),"replacement": simcomp[smallest].name };
    finale.push(replacement);
    console.log(finale);
    var original=0;
    var replaced=0;
    var cut=0;
    for(let i=0;i<finale.length;i++){
original+=finale[i].originalprice;
replaced+=finale[i].replacementprice;
cut+=parseInt(finale[i].reduction);
    }
    this.setState({...this.state,replacements:finale,original_average_bill: original,replaced_average_bill: replaced,total_discount: cut});
  })
}


  render() {

    

    return (
      <>
      <h2 style={{textAlign:"center"}}>Budget</h2>
      <h6 style={{textAlign: "center"}}>Suggest replacements for your medicines with the aim of making savings</h6>
      <form>
      <div className="input-group my-3">
    <span className="input-group-addon">Medicines</span>
    <input id="names" type="text" value={this.state.names} onChange={this.handleChange} className="form-control" name="msg" placeholder="Seperate the medicines by + sign"/>
  </div>
  <p style={{textAlign: "center"}}><button type="button" onClick={this.search} className="btn btn-success">Search</button></p>



      </form>

     {this.state.replacements[0] && (<div className="container">
     <table class="table table-bordered table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Medicines</th>
      <th scope="col">Medicine price</th>
      <th scope="col">Suggested Replacements</th>
      <th scope="col">Replacement Price</th>
      <th scope="col">Savings per unit</th>
    </tr>
    </thead>
    <tbody>
  {this.state.replacements.map((element,index)=>{
  
  return(
    <tr>
      <th scope="row">{index+1}</th>
      <td>{element.original}</td>
      <td>Rs.{element.originalprice}</td>
      <td>{element.replacement}</td>
      <td>Rs.{element.replacementprice}</td>
      <td>Rs.{element.reduction}</td>
    </tr>
    

  )}
  )
  }
  </tbody>
</table>
</div>
)}

{this.state.replacements[0] && (
  <div className="container" style={{backgroundColor: "black"}}>
   <p style={{textAlign:"center",color:"azure"}}>Original Bill: <span style={{color: "red"}}>{this.state.original_average_bill}</span></p>
   <p style={{textAlign:"center",color:"azure"}}>Modified Bill: <span style={{color:"green"}}>{this.state.replaced_average_bill}</span></p>
   <p style={{textAlign:"center",color:"azure"}}>total savings: <span style={{color:"green"}}>{this.state.total_discount==0?"Sorry, you are already purchasing the most profitable option":this.state.total_discount}</span></p>
   
  </div>
)}
      </>
    )
  }
}

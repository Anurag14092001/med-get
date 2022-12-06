import React, { Component } from 'react';
import { fire } from './firebaseconfig';
import { onValue,getDatabase,ref, child } from 'firebase/database';

export default class 
 extends Component {
  constructor(){
    super();
    this.state={
      medicine: "",
      ingredients:[],
      found: false,
      similar:[],
      medicinesfound: false,
      search_completed: false
    }
   }

   handle=(e)=>{
    this.setState({[e.target.id]: e.target.value});
   }

   search=(e)=>{
    e.preventDefault();
    const db = getDatabase(fire);
    const medicine = this.state.medicine.toUpperCase();
    let buck=[];
    onValue(ref(db, "Medicines/"+medicine),(snapshot)=>{
       buck = snapshot.val().composition;
    })

    let f = false;
    if (buck[0]){
      f = true;
    }
   
    let record=[];
    onValue(ref(db,"Medicines/"),(snapshot)=>{
      snapshot.forEach((childsnapshot)=>{
        var arr = childsnapshot.val().composition;
        var name = childsnapshot.key;

       
        if(JSON.stringify(arr.sort())===JSON.stringify(buck.sort())){
          record.push(name);
          
        }
       
        
      })
    })
    let searched =true;
    let mf = false;
    if(record.length>1){
      mf=true;
    }

    if(record.length===1){
      record.pop();
    }

    this.setState({...this.state,similar: record,medicinesfound: mf,ingredients:buck,found: f,search_completed: searched},()=>{console.log(this.state.ingredients);});
   }


  render() {
   

    return (
      <>
      <form>

        <h2 style={{textAlign:"center"}}>Search By Composition</h2>
        <h6 style={{textAlign:"center"}}>gives a list of all the medicines which share the composition of the medicine</h6>
      <div class="input-group my-2">
      <span class="input-group-addon">Name</span>
      <input id="medicine" type="text" onChange={this.handle} value={this.state.medicine} class="form-control" name="msg" placeholder="Enter the medicine's name"/>
    </div>
      </form>

      <p style={{textAlign:"center"}}><button type="button" onClick={this.search} class="btn btn-success my-2">Search</button></p>
      {this.state.found && (<>
        <div class="card ">
  <div class="card-header">
    Ingredients
  </div>
  <div class="card-body">
    
    <ul>
      {this.state.ingredients.map((element)=>{
         return(
          <li>{element}</li>
         )
      })}
    </ul>
    
  </div>
</div>


      
      </>)}

    {(this.state.medicinesfound && this.state.search_completed) && (
      <>
      
        <div class="card ">
  <div class="card-header">
    Medicines with the same ingredients
  </div>
  <div class="card-body">
    
    <ul>
      {this.state.similar.map((element)=>{
        const med = this.state.medicine;
        if(element!==(med).toUpperCase()){ return(
          <li>{element}</li>
         )}
      })}
    </ul>
    
  </div>
</div>
      </>

    )}

{(!(this.state.medicinesfound) && this.state.search_completed) && (
      <>
      
        <div class="card ">
  <div class="card-header" style={{color:"red"}}>
    No medicines with the same composition found!
  </div>
  <div class="card-body">
    
    
    
  </div>
</div>
      </>

    )}

      
     </> 
    )
  }
}

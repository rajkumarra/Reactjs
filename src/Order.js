import React from 'react';

class NameForm extends React.Component {
  constructor(props) {
   super(props);
   this.handleChangeName = this.handleChangeName.bind(this);
   this.handleChangePrice = this.handleChangePrice.bind(this);
   this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
   this.handleDelete = this.handleDelete.bind(this);
   this.OnFileChange = this.OnFileChange.bind(this);
   this.state = {
        recipe_name: '',        
        recipe_price: '',
        recipe_quantity: '',
        orders: [],
        selectedFile:null          
      };
    
  }


  handleChangeName(event) {
    console.log(this)
      this.setState({recipe_name: event.target.value})
  }

   handleChangePrice(event) {
    console.log(2)
      this.setState({recipe_price: event.target.value})
  }

   handleChangeQuantity(event) {
    console.log(3)
      this.setState({recipe_quantity: event.target.value})
  }


OnFileChange(event) {

  console.log(this)
      this.setState({
      selectedFile: event.target.files[0]
      });
};
   
   



  handleDelete(sa){

        const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
       
    };
        fetch('http://localhost:3000/orders/'+sa.id , requestOptions)
        .then(response => response.json())
        
          let orders = this.state.orders;
          let  index = orders.indexOf(sa)
          if(index >= 0) {
          orders.splice(index,1);
          this.setState({ orders: orders})
          }
     
  }


  handleClick(){


    // Create an object of formData 
      const formData = new FormData(); 
     
      // Update the formData object 
      formData.append( 
        "photo", 
     
        this.state.selectedFile
      ); 

      formData.append(
        "recipe_name",
        this.state.recipe_name
        );

      formData.append(
          "recipe_price",
          this.state.recipe_price
        );

      formData.append(
        "recipe_quantity",
        this.state.recipe_quantity
         
        );
     
    
  	   const requestOptions = {
          method: 'POST',
          body: formData      
        };
        fetch('http://localhost:3000/orders' , requestOptions)
        .then(response => response.json())
        let state = {
          recipe_name:'',
          recipe_price:'',
          recipe_quantity:''
        };
      console.log(20)
             console.log(this.state)
       this.setState({recipe_name:''});
              console.log(this.state)
   }


handleListClick(){
  
     const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        
    };
    fetch('http://localhost:3000/orders' , requestOptions)
        .then(response => response.json())   
        .then(json => {
          const state = this.state;
          state.orders = json;
          this.setState(state);
        });
        
  }
  



  render() { 

  const listHtml = this.state.orders.map((sa) => {

                      return (
                        <div class = "im">
                        <ul>
                        <img src={sa.photo_url}/>
                         <li>recipe_name = {sa.recipe_name}</li>
                         <li> recipe_price = {sa.recipe_price}</li>
                         <li> recipe_quantity = {sa.recipe_quantity}</li>
                         <br/>
                         
                        
                          <button className="btn_warning_info" type="submit" onClick={() => {this.handleDelete(sa)}}>Delete</button>  
                          </ul>
                          </div>
                        )
        })  

    return (
       <div>

                <h1>Foods</h1>                 
                <br/>
                <h1>Recipe Name</h1>	       
                <input type="text" value={this.state.names} onChange={this.handleChangeName} />
                <br/>              
                <h1>Recipe price</h1>
		            <input type="text" value={this.state.price} onChange={this.handleChangePrice} />  
                <br/>               
                <h1>Recipe quantity</h1>   
			    	    <input type="text"  value={this.state.quantity} onChange={this.handleChangeQuantity} /> 
                <br/>
                <br/> 
                <img id="target" src={this.state.selectedFile}/>
                <br/>
                <input type="file"   onChange={this.OnFileChange} />
                <br/>
                <br/>
                <button  className="btn_warning" type="submit"  onClick={() => {this.handleClick()}} >Submit</button>   
                <br/> 
                <br/>          
                <button  className="btn_info" type="submit"  onClick={() => {this.handleListClick()}} >List</button>  
                {listHtml}
                                 
</div>
     
    );
  }
}

export default NameForm;





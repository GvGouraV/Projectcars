import React, { Component } from "react";
import queryString from "query-string";
import http from "./http.Script";
import { Link } from "react-router-dom";
class NewCars extends Component {
    state={
        data: {id:'',price:'',kms:'',year:'',model:'',color:''}
    }
    
    async componentDidMount() {
        this.fetchData();
      }
      async componentDidUpdate(prevProps,prevState){
          if(prevProps!==this.props) this.fetchData();
      }
    
      async fetchData() {
        const { id } = this.props.match.params;
      
        if (id) {
          let response = await http.get(`/cars/${id}`);
          let { data } = response;
          this.setState({ data: data, edit: true });
        } else {
          let data = {id:'',price:'',kms:'',year:'',model:'',color:''};
          this.setState({ data: data, edit: false });
        }
      }
    
      async postData(url, obj) {
        let {id} = obj
        let response = await http.post(url, obj);
        console.log(id)
        alert(id+"  Data is Submit")
        this.props.history.push("/cars");
      }
      async putData(url, obj) {
        let {id} = obj
        console.log(id)
        let response = await http.put(url, obj);
        alert(id+"  Data is updated")
        this.props.history.push("/cars");
      }
      submitData = (e) => {
         
        let { data, edit } = this.state;
        edit
          ? this.putData(`/cars/${data.id}`, data)
          : this.postData("/cars", data);
      };
      handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        s1.data[input.name] = input.value;
        this.setState(s1);
      };

    showTextFields = (label, name, val) => {
        let{edit} = this.state
      return (
        <div className="container">
          <div className="form-group">
            <label>{label}</label>
            <input
              className="form-control"
              type="text"
              disabled={name=='id'&&edit==true ? true : false}
              name={name}
              value={val}
              onChange={this.handleChange}
            />
          </div>
        </div>
      );
    };
    showDropDown = (arr, label, name, val, selVal) => {
        return (
          <div className="container">
            <label>{label}</label>
            <select
              className="form-control"
              name={name}
              value={val}
              onChange={this.handleChange}
            >
              <option selected disabled value="">
                {selVal}
              </option>
              {arr.map((st) => (
                <option>{st}</option>
              ))}
            </select>
            <br />
          </div>
        );
      };

  render() {
   let {id,price,kms,year,color,model} = this.state.data
   let colorArr=["White","Silver Grey","Metallic Blue","Red"]
   let modelArr=["Swift Dzire VXi","Etios SMi","City AXi","Swift DXi","Etios VXi","City ZXi"]
    return (
      <div className="container">
          {this.showTextFields("Car ID", "id", id)}<br/>
          {this.showTextFields("Price", "price", price)}<br/>
          {this.showTextFields("Mileage in kms", "kms", kms)}<br/>
          {this.showTextFields("Year of Manufacture", "year", year)}<br/>
          <div className="row">
            <div className="col-6">
            {this.showDropDown(modelArr,"Model","model",model,"Enter Model")}</div>
            <div className="col-6"> 
            {this.showDropDown(colorArr,"Color","color",color,"Enter Color")}
            </div>
          </div>
          <div className=" text-center">
          <button className="btn btn-primary " onClick={()=>this.submitData()}>Submit</button>
          </div>
          
      </div>
    );
  }
}
export default NewCars;

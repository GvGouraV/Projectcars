import React, { Component } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import http from "./http.Script";

class Cars extends Component {
  
    state ={
        carsData :[]
    }

  
    async fetchData(){
      let queryParams = queryString.parse(this.props.location.search);
      let searchStr =this.makeSearchString(queryParams)
      let response = null;
       if(searchStr)
       response = await http.get(`/cars?${searchStr}`);
       else
       response = await http.get("/cars");
  
      let { data } = response;
      this.setState({ carsData: data });
    }
  
    componentDidMount() {
      this.fetchData();
    }
  
    componentDidUpdate(prevProps, prevState) {
      if (prevProps !== this.props) this.fetchData();
    }
    callURl = (url, options) => {
      let searchString = this.makeSearchString(options);
      this.props.history.push({
        pathname: url,
        search: searchString,
      });
    };
    makeSearchString = (options) => {
      let { minprice,maxprice,fule,type ,sort} = options;
      let searchStr = "";
      searchStr = this.addToQueryString(searchStr, "minprice", minprice);
      searchStr = this.addToQueryString(searchStr, "maxprice", maxprice);
      searchStr = this.addToQueryString(searchStr, "fule", fule);
      searchStr = this.addToQueryString(searchStr, "type", type);
      searchStr = this.addToQueryString(searchStr, "sort", sort);
      return searchStr;
    };
    addToQueryString = (str, parmName, paramValue) =>
      paramValue
        ? str
          ? `${str}&${parmName}=${paramValue}`
          : `${parmName}=${paramValue}`
        : str;
  
    handleChange = (e) =>{
      let {currentTarget:input} = e;
      let queryParams = queryString.parse(this.props.location.search);
      queryParams[input.name]=input.value 
      this.callURl("/cars",queryParams)
    }

    showTextFields = (label, name, val) => {

      return (
        <div className="container">
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name={name}
              value={val}
              placeholder={label}
              onChange={this.handleChange}
            />
          </div>
        </div>
      );
    };

    showRadio = (arr,label,name,val) =>{
        return(<div className="container border">
            <h4>{label}</h4>
             {arr.map((sts)=>(
          <React.Fragment>
              <div className="form-check ">
              <input
              className="form-check-input"
              type="radio"
              name={name}
              value={sts}
              checked={val===sts}
              onChange={this.handleChange}
              />
              <label className="form-check-label">{sts}</label></div><br/>
          </React.Fragment>
            ))}
        </div>)
    }

  render() {
    let queryParams = queryString.parse(this.props.location.search);
      let { minprice,maxprice,fule,type,sort}  = {...queryParams}
      let fuleArr=["Diesel","Petrol"]
      let typeArr=["Hatchback","Sedan"]
      let sortArr=["kms","price","year"]


      let {carsData} = this.state
  
    return (
      <div className="container bg-light">
          <h3 className="text-center">All Cars</h3>
          <div className="row">
            <div className="col-2">
            {this.showRadio(fuleArr,"Fule","fule",fule)}<br/>
            {this.showRadio(typeArr,"Type","type",type)}<br/>
            {this.showRadio(sortArr,"Sort","sort",sort)}<br/>
            </div>
            <div className="col-10">
                <div className="row">
                  <div className="col-2">
                    <label>Price Range:</label>
                  </div>
                  <div className="col-4">
                    {this.showTextFields("Min Price","minprice",minprice)}
                  </div>
                  <div className="col-4">
                  {this.showTextFields("Max Price","maxprice",maxprice)}
                  </div>
                </div><br/>
                <div className="row">
                {carsData.map((cr)=>(
                    <div className="col-3 text-center bg-warning border">
                        <div className="fw-bold">{cr.model}</div>
                        <div>Price : {cr.price}</div>
                        <div>Color : {cr.color}</div>
                        <div>Mileage : {cr.kms} kms</div>
                        <div>Manufactured in {cr.year}</div>
                        <div className="row">
                            <div className="col"><Link className="text-dark" to={`/cars/${cr.id}/edit`}><i className="fas fa-edit">edit</i> </Link></div>
                             <div className="col"><Link className="text-danger" to={`/cars/${cr.id}/delete`}><i className="fas fa-trash-alt">delete</i></Link></div>
                        </div>
                        </div>
                ))}
                </div>
            </div>
          </div>
      </div>
    );
  }
}
export default Cars;

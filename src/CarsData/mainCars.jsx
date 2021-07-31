import React , {Component} from "react";
import {Route,Redirect,Switch} from "react-router-dom";
import Cars from "./Cars";
import NewCars from "./NewCar";
import Delete from "./delete";
import Nav from "./Nav";

class MainCars extends Component{

  render (){
        return(<div className="container ">
              <Nav/>
              <Switch>
              <Route path="/cars/add" component={NewCars}/>
              <Route path="/cars/:id/edit" component={NewCars}/>
              <Route path="/cars/:id/delete" component={Delete}/>
              <Route path="/cars" component={Cars} />
  
              <Redirect from="/" to="/cars"/>
              </Switch>  
             
        </div>)
       
  }
}
export default MainCars;
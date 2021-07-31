import React, { Component } from "react";
import http from "./http.Script";
class Delete extends Component {
  async componentDidMount(){
      const {id} = this.props.match.params;
      console.log(id)
      let response = await http.deleteApi(`/cars/${id}`)
       this.props.history.push("/cars")
    }
 
    render() {
    return <div></div>;
  }
}
export default Delete;

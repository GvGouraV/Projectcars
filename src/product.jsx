import React , {Component} from "react";
class Product extends Component {
    state = {

    };

    

    render () {
        let {data,view , onEnterAcc,onEnterDec} = this.props
        let {name,code,qty,price} = data;
        let c1=qty==0 ? "disabled" : '';
        if(view==0){
        return (
            <div className="col-3 bg-info border">
                <div className="col"><h4>{name}</h4></div>
                <div className="col"><h4>Code : {code}</h4></div>
                <div className="col"><h4>Price : {price}</h4></div>
                <div className="col"><h4>Quantity : {qty}</h4></div>
                <div className="col"><button className="btn btn-light"  onClick={()=>onEnterAcc(data)} >Increase</button> <button className="btn btn-light" onClick={()=>onEnterDec(data)}>Decrease</button></div><br/>
             
            </div>
        )}
        else{
            return(
                <React.Fragment>
                    <div className="row border">
            <div className="col ">{name}</div>
            <div className="col">{code}</div>
            <div className="col">{price}</div>
            <div className="col">{qty}</div>
            <div className="col"><button className="btn btn-danger m-2" onClick={()=>onEnterAcc(data)}>+</button><button className="btn btn-success m-2" onClick={()=>onEnterDec(data)}>-</button></div>
            </div>
            </React.Fragment>
            )}
     

    }
}
export default Product;
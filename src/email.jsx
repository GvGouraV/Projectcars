import React , {Component} from "react";
class Email extends Component {
    state = {

    };
    render(){
          let {data,index,onEnter} = this.props;
        
        let {id,send,from,to,text,subject,folder,read} = data;
        
      return( 
      <React.Fragment><div className="row" onClick={()=>onEnter(data,index)} >
          {read==true
          ? <div className="col-2 "><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-open" viewBox="0 0 16 16">
                                    <path d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.818l5.724 3.465L8 8.917l1.276.766L15 6.218V5.4a1 1 0 0 0-.53-.882l-6-3.2zM15 7.388l-4.754 2.877L15 13.117v-5.73zm-.035 6.874L8 10.083l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738zM1 13.117l4.754-2.852L1 7.387v5.73zM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765l6-3.2z"/>
            </svg>
            </div>
          : <div className="col-2 "><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
            </svg>
            </div>
            }
            {read==true
            ?<div className="col-4  ">{from}</div>
            : <div className="col-4 fw-bold">To: {to}</div>
            }
            {read==true
            ?<div className="col-6">{subject}</div>
            : <div className="col-6 fw-bold">{subject}</div>
            }
            
            </div>
            </React.Fragment>
        
         )
    }
}
    export default Email;
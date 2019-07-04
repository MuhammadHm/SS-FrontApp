import React,{Component} from 'react';
import './Survey.css';


class Pageerr extends Component {

constructor(){
    super();

}


render(){
  
    return(
    <div className="error">                         
        <h1>please signin first  </h1>
        <a href="http://localhost:8080/signin">signin</a>
        <br />
        <a href="http://localhost:8080/signin/signup">signup</a>
    </div>
    );
}
}

export default Pageerr;

import React, {Component} from 'react';

class Logout extends Component {

    constructor(props){
        super(props)
    }
    
    componentDidMount(){
        localStorage.removeItem('token')
        this.props.history.push('/') //push hacer redirecciones, redirecciona al home
    }

    render(){
        return(
            <div></div>
        )
    }
}

export default Logout;
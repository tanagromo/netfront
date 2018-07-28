import React, {Component} from 'react';
import './style.css';
import login from '../../services/login';



class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:""
        }
    }

    onInputCheck = (event) =>{
        let name = event.target.name
        let value = event.target.value

        this.setState({
            [name]:value
        })
    }

    submitForm = (e) =>{
        e.preventDefault();
        login(this.state).then((resp)=>{
            if(resp.status === 201){
                let token = resp.data.token
                localStorage.setItem('token',token);
                this.props.history.push('/')
            }else{
                alert(resp.data)
            }

        }).catch((err)=>{
            console.log(err)
        })
    }

    render(){
        return(
            <div className="row justify-content-center bg-light">
                <div className="col-md-10 col-lg-8">
                <form onSubmit={this.submitForm}>
                <div className="form-group">
                 <label for="exampleInputEmail1">Email address</label>
                 <input type="email" className="form-control" name="email" value={this.state.email} 
                 onChange={this.onInputCheck} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"/>
                 <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" className="form-control" name="password" 
                  value={this.state.password} onChange={this.onInputCheck} id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                
                </div>           
            </div>



        )
    }

}

export default Login;
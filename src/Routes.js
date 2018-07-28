import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';
import React, {Component} from 'react';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import Logout from './components/Logout/Logout';
import Movies from './components/Movies/Movies';
import Movie from './components/Movie/Movie';
import checkToken from './resolvers/checkToken';
import FormMovie from './components/FormMovie/FormMovie';


class Routes extends Component{

    


    render(){
        const PrivateRoute = ({component:Component, ...rest}) => (
            <Route {...rest} render = {(props)=>(
                checkToken() === true ? <Component {...props}/> : <Redirect to ="/login"/>
            )} />
        )

        return(
            <Router>
                <main>
                <Nav/>
                <Route exact path='/' component={Home}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/signup' component={Signup}/>
                <PrivateRoute exact path='/logout' component={Logout}/>
                <PrivateRoute exact path='/movies' component={Movies}/>
                <PrivateRoute exact path='/movie/:id' component={Movie}/>
                <PrivateRoute exact path='/movies/add' component={FormMovie}/>

                </main>
            </Router>
        )
    }
}

export default Routes;
import React, {Component} from 'react';
import allMovies from '../../services/allMovies';
import Rate from 'rc-rate';
import addRate from '../../services/addRate';
import CardMovie from '../CardMovie/CardMovie';
import './style.css';


class Movies extends Component{
    constructor(){
        super()
        this.state = {movies:""}
    }

    componentDidMount(){
        allMovies().then((resp)=>{
            console.log(resp.data)
            this.setState(
                {movies:resp.data.data.allMovies}
            )
        }).catch((err)=>{
            console.log(err)
        })
    }

    redirect = (id) =>{
        this.props.history.push(`/movie/${id}`)
    }

    getRateValue = (id,rate) => {
        addRate({id,rate}).then((resp)=>{
            console.log(resp)
        })
    }

    renderMovies = () =>{
        if(this.state.movies !== ""){
            let movies = this.state.movies.map((movie,index)=>{
                return(
                   <CardMovie movie={movie} redirect={this.redirect}
                    getRate={this.getRateValue}
                   />
                )
            })

            return movies
            
        }else{
            return(
                <div></div>
            )
        }
    }


    render(){
        return(
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8 text-center">
                    <h3 className="movies-title">Todas las peliculas</h3>
                    {this.renderMovies()}
                </div>
            </div>
        )
    }
}
export default Movies;
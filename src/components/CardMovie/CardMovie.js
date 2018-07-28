import React, { Component } from 'react';
import Rate from 'rc-rate';


class CardMovie extends Component{

    constructor(props){
        super(props);
        this.state = {
            movie:props.movie,
            rate:this.calculateRate(props.movie.rate)
        }
    }

    calculateRate = (rate) =>{
        //rate es un array
        // let suma = 0
        // for(let i =0;i<rate.length;i++){
        //     suma += rate[i]

        // }
        // suma = suma/rate.length

        // return suma
        let suma = rate.reduce((a,b)=>a+b,0)
        let average = suma/rate.length
        return (Math.round(average * 2) / 2).toFixed(1)
    }

    // componentDidUpdate(prevProps,prevState){
    //     if(this.props.movie !== prevProps.movie){
    //         console.log(this.props.movie)
    //         this.setState(
    //            { movie:this.props.movie,
    //             rate:this.calculateRate(this.props.movie.rate)
    //             }
    //         )


    //     }

    // }

    render(){
        return (
            <div className="card" style={{width: "14rem;"}}>

                        <h5 className="card-title"
                        onClick={() => this.props.redirect(this.state.movie._id)}
                        >{this.state.movie.name}</h5>
                        <div className="card-body">
                            <p className="card-text">{this.state.movie.plot}</p>
                            <Rate defaultValue={parseFloat(this.state.rate)} allowHalf onChange={(rate) => this.props.getRate(this.state.movie._id,rate)}/>
                        </div>
              </div>
        )

    }



}

export default CardMovie;
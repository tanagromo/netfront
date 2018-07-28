import React, { Component } from 'react';
import Firebase from '../../Firebase';
import FileUploader from 'react-firebase-file-uploader';
import allGenres from '../../services/allGenres';
import allRatings from '../../services/allRatings';
import addMovie from '../../services/addMovie';

class FormMovie extends Component{

    constructor(props){
        super(props)
        this.state = {
            name:"",
            plot:"",
            genre:"",
            director:"",
            year:"",
            url:"", 
            image_url:"",
            rating:"",
            allGenres:[],
            allRatings:[]
        }
    }

    componentDidMount(){

        allGenres().then((resp) => {
            this.setState({allGenres:resp.data.data.allGenres});
        });

        allRatings().then((resp) => {
            console.log(resp)

            this.setState({allRatings:resp.data.data.allRatings});
        })

    }

    createSelecter = (data,name) => {
        let options  = data.map((option) => {
            return (
                <option value={option._id}>{option.name}</option>
            )
        })
        return(
            <select name={name} id={name} value={this.state[name]}
             onChange={this.onChangeInput} className="form-control"
            >
                <option value="" selected>-----------------</option>
                {options}
            </select>
        )
    }

    onChangeInput = (e)=>{
        let name = e.target.name 
        let value = e.target.value 

        this.setState(
            {[name]:value}
        )

    }

    handleUploadSuccess = (filename) =>{
        console.log(filename)
        Firebase.storage().ref('images').child(filename)
            .getDownloadURL().then((url) => {
                console.log(url)
                this.setState({image_url:url})
            })

    }

    handleSubmit = (e) => {
        e.preventDefault();
        addMovie(this.state).then((resp) =>{
            console.log(resp.data.data)
            if(resp.data.data.addMovie._id){
                this.props.history.push('/movies');
            }
        })
    }

    chargeForm = () =>{
        if(this.state.allGenres !== "" && this.state.allRatings !== "" ){
            
            return(
                <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="">Nombre de la pelicula</label>
                            <input type="text" value={this.state.name} 
                            className="form-control" name="name" onChange={this.onChangeInput}  />
                        </div>
                       <div className="form-group">
                            <label htmlFor="plot">Descripción</label>
                            <textarea name="plot" id="plot" cols="30" rows="10"
                            value={this.state.plot} onChange={this.onChangeInput}
                            ></textarea>
                       </div>
                       <div className="form-group">
                            <label htmlFor="">Genero</label>
                            {this.createSelecter(this.state.allGenres,"genre")}
                       </div>
                       <div className="form-group">
                            <label htmlFor="">Url</label>
                            <input type="text" value={this.state.url} 
                            className="form-control" name="url" onChange={this.onChangeInput}  />
                        </div>
                       <div className="form-group">
                            <label htmlFor="">Director</label>
                            <input type="text" name="director" value={this.state.director}
                            onChange={this.onChangeInput} className="form-control"
                            />
                       </div>
                       <div className="form-group">
                            <label htmlFor="">Año</label>
                            <input type="text" name="year" value={this.state.year}
                            onChange={this.onChangeInput} className="form-control"
                            />
                       </div>
                       <div className="form-group">
                            <label className="btn btn-danger" >
                            Agrega una imagen
                                <FileUploader
                                    hidden
                                    accept="image/*"
                                    randomizeFilename
                                    storageRef={Firebase.storage().ref('images')}
                                    onUploadError={error => console.log(error)}
                                    onUploadSuccess={this.handleUploadSuccess}
                            
                                />

                            </label>          
                       
                       </div>
                       <div className="form-group">
                            <label htmlFor="">Clasificación</label>
                            {this.createSelecter(this.state.allRatings,"rating")}
                       
                       </div>

                        <button type="submit" className="btn btn-danger">Enviar</button>


                    </form>
                
            )
        }else{
            return <div></div>
        }

    }

    

    render() {
        return(
            <div className="row justify-content-center">
                <div className="col-md-10">
                    {this.chargeForm()}
                </div>
            </div>
        )
    }




}

export default FormMovie
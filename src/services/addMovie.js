import axios  from 'axios';
import constantes from '../const';
import getToken from '../resolvers/getToken';

export default (data) =>  {

    
    let newMovie =`{
        name:"${data.name}",
        plot:"${data.plot}",
        genre:"${data.genre}",
        url:"${data.url}",
        director:"${data.director}",
        year:"${data.year}",
        image_url:"${data.image_url}",
        rating:"${data.rating}"
    } 
    `;
    return axios({
        url:constantes.url+'graphql',
        method:'post',
        data:{
            query:`
                mutation{
                    addMovie(data:${newMovie}){
                        _id,
                        name,
                    }
                }
            `
        },headers:{'Authorization':'JWT '+getToken()}
    
    
    })






}
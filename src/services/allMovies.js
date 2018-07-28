import axios from 'axios';
import getToken from '../resolvers/getToken';
import constantes from '../const';

export default () => {

    return axios({
        url:constantes.url+'graphql',
        method:'post',
        data:{
            query:`
                query{
                    allMovies{
                        _id,
                        name,
                        plot,
                        director,
                        image_url,
                        genre{
                            name
                        },
                        rating{
                            name
                        },
                        year,
                        url,
                        rate
                    }
                }
            `
        },headers:{'Authorization':'JWT '+getToken()}
    
    
    })



}

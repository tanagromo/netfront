import axios from 'axios';
import constantes from '../const';
import getToken from '../resolvers/getToken';

export default (data) => {
    let {id,rate} = data;
    let newRate = `{rate:${rate}}`; 
    return axios ({
        url:constantes.url+'graphql',
        method:'post',
        data:{
            query:`
                mutation{
                    addRate(id:"${id}",data:${newRate}){
                        _id,
                        name,
                        rate
                    }                     
                }
            `
        },headers:{'Authorization':'JWT '+getToken()}
    })
}
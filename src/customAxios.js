import axios from 'axios'

const customAxios = axios.create({

     // configure the customAxios instance
     // headers:{
     //      'Access-Control-Allow-Origin':'*',
     // }


});
customAxios.defaults.baseURL = 'http://localhost:5000' //setting baseURL for later requests
customAxios.defaults.withCredentials = false
export default customAxios
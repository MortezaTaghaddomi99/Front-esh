import axios from 'axios'

const customAxios = axios.create({

     //configure the customAxios instance

});
customAxios.defaults.baseURL = 'https://system-analysis-design.herokuapp.com' //setting baseURL for later requests
export default customAxios
import axios from 'axios';

// define route url
const RouteAPI = 'https://swapi.co/api';

// function get api
const Get = (path) => {
  const promise = new Promise((resolve, reject)=>{
    axios.get(`${RouteAPI}/${path}`)
       .then((res)=>{
         // console.log(res.data);
         resolve(res);
     }, (err)=>{
        reject(err);
     })

  })
  return promise;
}

// get movies
const getMovies = () => Get('films/');


// export function
const API = {
  getMovies

}

export default API;

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
const getFilms = () => Get('films/?page=1');
const getFilmsPaginate = (start) => Get(`films/?page=${start}`);
const getCharacters = () => Get(`people/?page=1`);
const getCharactersPaginate = (start) => Get(`people/?page=${start}`);
const getVehicles = () => Get(`vehicles/?page=1`);
const getVehiclesPaginate = (start) => Get(`vehicles/?page=${start}`);

// export function
const API = {
  getFilms,
  getFilmsPaginate,
  getCharacters,
  getCharactersPaginate,
  getVehicles,
  getVehiclesPaginate

}

export default API;

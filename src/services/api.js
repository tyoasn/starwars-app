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
const getSingleFilms = (title) => Get(`films/?search=${title}`);
const getCharacters = () => Get(`people/?page=1`);
const getSingleCharacters = (title) => Get(`people/?search=${title}`);
const getCharactersPaginate = (start) => Get(`people/?page=${start}`);
const getVehicles = () => Get(`vehicles/?page=1`);
const getSingleVehicles = (title) => Get(`vehicles/?search=${title}`);
const getVehiclesPaginate = (start) => Get(`vehicles/?page=${start}`);

// export function
const API = {
  getFilms,
  getFilmsPaginate,
  getSingleFilms,
  getCharacters,
  getSingleCharacters,
  getCharactersPaginate,
  getVehicles,
  getSingleVehicles,
  getVehiclesPaginate

}

export default API;

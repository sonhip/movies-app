import axios from 'axios';
import * as moment from 'moment';

// export const getDataMovies  = async (page=1) =>{
//     const url =`https://api.themoviedb.org/3/discover/movie?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&fbclid=IwAR3cXtSlB_pM4gJ9g4cXZR3A23v3HEbccXeYN8ZC3J6GgiaO3ubjFOJW57Y`;
//     const response = await axios.get(url);
//     const result = await response.status === 200 ? response.data : [];
//     return result;
// }
export const getDataMovies = async (page=1) => {
    const url =`https://api.themoviedb.org/3/discover/movie?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;

    const response = await axios.get(url);
    const result = await response.status === 200 ? response.data:[];
    return result; 
}

//api for new movies
export const getDataNewMovies = async (page=1) => {

    let date = new Date();
    // let d = date.getDay;
    // d = d<10 ? `0${d}` : d;
    // let m = date.getMonth+1;
    // m = m<10 ? `0${m}` : m;
    // let y = date.getFullYear();
    // let today =`${y}-${m}-${d}`//YYYY-MM-DD

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }
      
      date= moment(date).utc().format('YYYY-MM-DD');
      let nextTime = addDays(date, 30);
      nextTime = moment(nextTime).utc().format('YYYY-MM-DD');

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&release_date.gte=${date}&release_date.lte=${nextTime}&with_release_type=3&fbclid=IwAR2jOR-PUUODUyu1RiS4InooYL2ScvrmjRf_eRYLdU2507uffe2VxcMvqkE`;

    const response = await axios.get(url);
    const result = await response.status === 200 ? response.data : [];
    return result;
}

export const getDataDetailslMovies  = async (id=0) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&&language=en-US&append_to_response=videos%2Cimages&include_image_language=en%2Cnull&fbclid=IwAR1v1TW8KO3FRMzQooyfhpFF1r1J3-Sr73lSPDoKBYD2QG-bAo1dqx_Ij2c`;
    const response = await axios.get(url);
    const result = await response.status === 200 ? response.data : [];
    return result;
}

export const SearchMoviesByKeywords = async (keywords='', page) => {
    const url =`https://api.themoviedb.org/3/search/movie?query=${keywords}&api_key=cfe422613b250f702980a3bbf9e90716&page=${page}&fbclid=IwAR3Y5Am6lOjs2B0acZzvejcegQlsv8nC80hyhQIK8xqwyQ-B5p-U-UIIrjw`;
    const response = await axios.get(url);
    const result = await response.status === 200 ? response.data : [];
    return result;
}
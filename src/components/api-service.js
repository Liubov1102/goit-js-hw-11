import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '27515523-9dca8758fab0b717270f23e63';
export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async getPicters() {
        const params = {
            key: API_KEY,
            q: this.searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            page: this.page,
            per_page: 40,
        }
     try {
         const response = await axios.get(URL, {params})            
            
               this.incrementPage();
               return response;             
     }            
     catch (error) {
    console.error(error);
  }
    }
    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }    
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }  
};
/*
export const apiService = {
            q: '',
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            page: 1,
            per_page: 40,
}
const customAxios = axios.create({
    baseURL: URL,
    params: {
        key: API_KEY,
        q: '',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: 1,
        per_page: 40,
        
    }
});
export const getPicters = async (params) => {
    try {
        const res = await customAxios.get('', { params })
       
        console.log(res);
        return res;
        
    } catch {
        console.log('message');
    }
}
*/




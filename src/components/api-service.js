import axios from 'axios';
export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

 async getPicters() {
        const params = {
            key: '27515523-9dca8758fab0b717270f23e63',
            q: this.searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            page: this.page,
            per_page: 40,
        }
     try {
         const response = await axios.get(`https://pixabay.com/api/?key=27515523-9dca8758fab0b717270f23e63&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)            
            
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


import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import pictureCard from './templates/card.hbs';
import axios from 'axios';
import ApiService from './components/api-service';

const refs = {
    formEl: document.querySelector('.search-form'),
    galleryEl: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
};
const apiService = new ApiService();

refs.formEl.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();
    //outputClear();
    apiService.query = e.currentTarget.elements.searchQuery.value;
    apiService.resetPage();
    apiService.getPicters().then(appendPicters);
}
    //if (apiService.query.trim() === "") {
    //    Notiflix.Notify.failure('Please fill in the field');
    //    return;
    //}
function onLoadMore() {
    apiService.getPicters().then(appendPicters);
}
function appendPicters(card) {
    refs.galleryEl.insertAdjacentHTML('beforeend', pictureCard(card));
}
function clearPicters() {
    refs.galleryEl.innerHTML = '';
}
    

//function outputClear() {
//    refs.galleryEl.innerHTML = '';
//};

//function onLoadMore() {
//  apiService.fetchData().then(({ hits }) => {

//    if (pages === apiService.nowPage()) {
//      loadMoreBtn.classList.add('is-hidden');
//      addBottomMsg();
//    }
//    renderHTML(hits);
//  });
//}
        

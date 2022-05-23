import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import pictureCard from './templates/card.hbs';
import ApiService from './components/api-service';

const refs = {
    formEl: document.querySelector('.search-form'),
    galleryEl: document.querySelector('.gallery'),
    sentinel: document.querySelector('#sentinel'),
 //   loadMoreBtn: document.querySelector('.load-more'),
};
const apiService = new ApiService();

function renderGallery(data) {
    let markup = '';
    data.hits.map(item => { markup += pictureCard(item) });
  
    refs.galleryEl.insertAdjacentHTML("beforeend", markup);
}
const lightbox = new SimpleLightbox('.gallery a', {
    captionPosition:'bottom',
    captionDelay:250,
    enableKeyboard:true
});
lightbox.refresh();

refs.formEl.addEventListener('submit', onSearch);
//refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();
    outputClear();
    apiService.resetPage();
    apiService.query = e.currentTarget.elements.searchQuery.value;
        if (apiService.query.trim() === "") {
            Notiflix.Notify.failure('Please fill in the field');
            return;
        }

    apiService.getPicters().then(({ data }) => {
        appendPicters(data.hits);
        lightbox.refresh();
        if (data.totalHits === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again');
            return;
        }        
            if (data.totalHits !== 0) {
                Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images!`);
        }       
    });    
}   
//function onLoadMore() {
//    apiService.getPicters().then(({ data }) => {
//        appendPicters(data.hits);       
//lightbox.refresh();
//    });
//}
function appendPicters(card) {
    refs.galleryEl.insertAdjacentHTML('beforeend', pictureCard(card));
}

function outputClear() {
    refs.galleryEl.innerHTML = '';
};

window.addEventListener('scroll', () => {
    const documentRect = document.documentElement.getBoundingClientRect();
    if (documentRect.bottom < document.documentElement.clientHeight + 150) {
        
        apiService.getPicters().then(({ data }) => {
            appendPicters(data.hits);
            lightbox.refresh();
        });
    }
});


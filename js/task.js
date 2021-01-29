import gallery from './gallery-items.js'

const refs = {
  list: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  largImage: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
};

refs.list.addEventListener('click', onGalleryClick);
refs.list.addEventListener('click', onOpenOverlay);
refs.lightbox.addEventListener('click', onClickOverlay);
refs.closeBtn.addEventListener('click', onCloseOverlay);

let activeIndex = 0;

function createElements ({ preview, original, description })  {
  
  const itemGallery = document.createElement('li');
  itemGallery.classList.add('gallery__item');
  
  const linkGallery = document.createElement('a') ; 
  linkGallery.classList.add('gallery__link');
  linkGallery.href = original;
  
  const imageGallery = document.createElement('img') ; 
  imageGallery.classList.add('gallery__image');            
  imageGallery.src = preview;
  imageGallery.alt = description;            
  imageGallery.setAttribute('data-source', original);
  imageGallery.setAttribute('data-index', 0);
   
  linkGallery.appendChild(imageGallery);
  itemGallery.appendChild(linkGallery);
  
  return itemGallery;
};

const galleryRef = gallery.map(element => createElements(element));
refs.list.append(...galleryRef);

//======================================================

function onGalleryClick (event){
  event.preventDefault();

  const target = event.target;
  if(target.nodeName != 'IMG'){
     return;
  };

  const largeImageURL = target.dataset.source; 
  const largeImageALT =  target.alt;
  activeIndex = Number(target.dataset.index);

  setLargeImg(largeImageURL, largeImageALT);
};

function setLargeImg(url, description){
  refs.largImage.src = url;
  refs.largImage.alt = description;
};

//======================================================

function onOpenOverlay(){
  window.addEventListener('keydown', onKeysPress);
  refs.lightbox.classList.add('is-open');
};

function onCloseOverlay(){
  window.removeEventListener('keydown', onKeysPress);
  refs.lightbox.classList.remove('is-open');
  refs.largImage.src = '';
  refs.largImage.alt = '';
};

function onClickOverlay(event){
  if(event.target.classList.contains('lightbox__overlay')){
    onCloseOverlay();
  };
};

function onKeysPress(event){
  
  if(event.code === 'Escape'){
    onCloseOverlay();
  };

  if(event.code === 'ArrowRight'){
    nextImage();
  };

  if(event.code === 'ArrowLeft'){
    prevImage();
  };
};

function nextImage(){
  if(activeIndex < gallery.length - 1){
    activeIndex += 1;
    refs.largImage.src = gallery[activeIndex].original;
    refs.largImage.alt = gallery[activeIndex].description;
  };
};

function prevImage(){
  if(activeIndex > 0){
    activeIndex -= 1;
    refs.largImage.src = gallery[activeIndex].original;
    refs.largImage.alt = gallery[activeIndex].description;
  };
};


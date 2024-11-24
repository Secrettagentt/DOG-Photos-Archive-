
  // DISPLAY PHOTOS OF SELECTED BREED IN THE DOM

function displayPhotosOfSelectedBreed() {
  const breedSelector = document.getElementById('breedSelect');
  const selectedBreed = breedSelector.value;
  const breedContainer = document.getElementById('breed-container');
  const breedSpan = document.getElementById('breedspan');
  const breedImageElement = document.createElement('img');
      
  const selectedBreedUrl =
  `https://dog.ceo/api/breed/${selectedBreed}/images`;
  
  breedContainer.innerHTML = '';

  fetch(selectedBreedUrl)
    .then(res => res.json())
    .then(data => {
      const breedImages = data.message;
      
      
         console.log('breedImages:',breedImages)
      breedImages.forEach((breedImage, index) => {
        const breedImageContainer = document.createElement('section');
        breedImageContainer.className = 'breedimagesandbuttonscontainer';
        
        breedImageElement.src = breedImage;
        breedImageElement.alt = `${selectedBreed} Images ${index}`;

        
        const buttonContainer = document.createElement('section');
        buttonContainer.className = 'downloadandshare';

        const buttons = [
          {
            className: 'view-btn',
            textContent: 'Full Screen',
            onclick: () => fullScreenDogImageView(BreedImage, `${selectedBreed} Image ${index}`),
          },
          {
            className: 'download-btn',
            textContent: 'Download Image',
            onclick: () => downloadDogImage(BreedImage, `${selectedBreed} Image ${index}`),
          },
          {
            className: 'share-btn',
            textContent: 'Share Image',
            onclick: () => shareDogImage(BreedImage, `${selectedBreed} Image ${index}`),
          },
          {
            className: 'like-btn',
            textContent: likedImages.includes(breedImage) ? 'Unlike' : 'Like',
            onclick: (event) => LikeDogImage(BreedImage, event.target, breedImage),
          },
        ];

        buttons.forEach((button) => {
          const btn = document.createElement('button');
          btn.className = button.className;
          btn.textContent = button.textContent;
          btn.onclick = button.onclick;
          buttonContainer.appendChild(btn);
        });

        breedImageContainer.appendChild(breedImageElement);
        breedImageContainer.appendChild(buttonContainer);
        breedContainer.appendChild(breedImageContainer);
      });

      const date = new Date();
      const dateString = date.toDateString();
      const timeString = date.toTimeString();
      breedSpan.innerText = `Date: ${dateString} Time: ${timeString}`;
    })
    .catch(err => console.log(`error ${err}`));
}




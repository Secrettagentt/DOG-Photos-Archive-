
  
//RANDOM DOG FACTS
DogFacts();

function DogFacts(){
  
  const dogFactUrl = 'https://dog-api.kinduff.com/api/facts';
const randomDogFacts = document.querySelector('#randomDogFacts');
fetch(dogFactUrl)
  .then(res => res.json())
  .then(data => {
      const dogFact = data.facts;
      
      randomDogFacts.innerText = dogFact;
  
  })
  .catch(err => {
    console.log(`error ${err}`)
  })
  
  
};

setInterval(DogFacts,30000);

// DOG PHOTO OF THE DAY
const DogPhotoUrl = 'https://dog.ceo/api/breeds/image/random',

      dogOfTheDayImage = document.querySelector('#randomDogImageoftheday'),

      randomDogImage = document.querySelector('#randomDogImage'),

  date = new Date(),
  dateString = date.toDateString(),
  timeString = date.toTimeString(),
  storedDate = localStorage.getItem('storedDate');

if(storedDate !== dateString){
  localStorage.setItem('storedDate', dateString);
  fetch(DogPhotoUrl)
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('dailyDogPhoto', data.message)
      dogOfTheDayImage.src = data.message;
      dogOfTheDayImage.alt ="Dog Images Of The Day";
      document.querySelector('#randomDogImageofthedayspan').innerText = `Date: ${dateString} Time: ${timeString}`
    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}else{
  const storedImage = localStorage.getItem('dailyDogPhoto');
  dogOfTheDayImage.src = storedImage;
  dogOfTheDayImage.alt =" Dog Images Of The Day";
  document.querySelector('#randomDogImageofthedayspan').innerText = `Date: ${dateString} Time: ${timeString}`
  resetdogimageofthedayLikeButton();
};

// RANDOM DOG PHOTO
getRandomDogImage();

function getRandomDogImage(){
  fetch(DogPhotoUrl)
    .then(res => res.json())
    .then(data => {
      randomDogImage.src = data.message;
      randomDogImage.alt ="Random Dog Images";
      document.querySelector('#randomDogImagespan').innerText = `Date: ${dateString} Time: ${timeString}`
    })
    .catch(err =>{
      console.log(`error ${err}`)
    });
  resetrandomdogLikeButton();
}

// VIEW IMAGE IN FULL SCREEN

let likedImages = JSON.parse(localStorage.getItem('liked')) || [];


function fullScreenDogImageView(imageSrc) {
  
  const imageOfTheDayViewLink = document.createElement('a');
  imageOfTheDayViewLink.href = imageSrc;
  imageOfTheDayViewLink.target = '_blank'; 
  imageOfTheDayViewLink.click();
}

// DOWNLOAD DOG PHOTO OF THE DAY
function downloadDogImage(imageSrc) {
  
  
    fetch(imageSrc)
    .then(res => res.blob())
    .then(blob => {
      const file = new File([blob], 'dogphoto.jpg', {
        type: 'image/jpeg'
      });
      saveAs(file);
    })
    .catch(err => console.log(`error ${err}`));
}

// SHARE DOG PHOTO OF THE DAY
function shareDogImage(imageSrc) {
  
  
  
    if (navigator.share) {
    navigator.share({
        title: `Dog of the Day Date: ${dateString} Time: ${timeString}`,
        text: 'Check out this adorable dog!',
        url: imageSrc,
      })
      .catch(error => console.error('Web Share API error:', error));
  } else {
    window.open(imageSrc, '_blank');
  }
}

// Like/Unlike dog image
function LikeDogImage(imageSrc, buttonElement, imageType) {
  // Check if image is already liked
  if (likedImages.includes(imageSrc)) {
    // Confirmation prompt using Alertify
    alertify.confirm("Unlike Image?", "Are you sure you want to unlike this image?", 
      function(ok) {
        if (ok) {
          // Remove image from liked images
          const index = likedImages.indexOf(imageSrc);
          likedImages.splice(index, 1);
          localStorage.setItem('liked', JSON.stringify(likedImages));
            
             // Reset breed image like button
      const breedLikeButtons = document.querySelectorAll('.breedImgcontainer .like-btn');
      breedLikeButtons.forEach(button => {
        if (button.dataset.imageSrc === imageSrc) {
          button.innerText = "Like";
          button.style.color = "#FFF2DE";
        }
      });
            
          buttonElement.innerText = "Like";
          buttonElement.style.color = "#FFF2DE";
          displayFavouriteImages();
          resetdogimageofthedayLikeButton();
          resetrandomdogLikeButton();
           
        }
      },
      function(cancel) {
        // Cancel button clicked
      }
    );
  } else {
    // Add image to liked images
    likedImages.push(imageSrc);
    localStorage.setItem('liked', JSON.stringify(likedImages));
      
            // Reset breed image like button
      const breedLikeButtons = document.querySelectorAll('.breedImgcontainer .like-btn');
      breedLikeButtons.forEach(button => {
        if (button.dataset.imageSrc === imageSrc) {
          resetdogBREEDimageLikeButton(button)
        }
      });
      
    buttonElement.innerText = "Liked";
    buttonElement.style.color = "blue";
    displayFavouriteImages();
  }
}

// DISPLAY FAVOURITE IMAGE IN THE DOM

  
// Cache DOM element
const favouritePhotosContainer = document.querySelector('#favouritePhotosContainer');

function displayFavouriteImages() {
  const favouriteImages = JSON.parse(localStorage.getItem('liked')) || [];

  // Clear container
  favouritePhotosContainer.innerHTML = '';

  if (favouriteImages.length === 0) {
    // Display no liked photos message
    const noLikedPhotoDiv = document.createElement('div');
    noLikedPhotoDiv.className = 'centered-content NOLIKEDPHOTO';
    noLikedPhotoDiv.classList.add("centered-content");
      
    noLikedPhotoDiv.innerHTML = '<p class="NOLIKEDPHOTOp merriweather-black-italic">NO LIKED PHOTO: Like an image to add to favourite</p>';
      
    document.querySelector('#numberOfLikedImages').innerText = "";
      
    favouritePhotosContainer.appendChild(noLikedPhotoDiv);
  } else {
    
favouriteImages.forEach((image, index) => {
    
  // Create image container
  const favouriteimgcontainer = document.createElement('section');
  favouriteimgcontainer.className = 'favouriteimgcontainer';

  // Create image element
  const favouriteimg = document.createElement('img');
  favouriteimg.src = image;
  favouriteimg.alt = 'Favourite Image';

  // Create button container
  const downloadandsharebuttoncontainer = document.createElement('section');
  downloadandsharebuttoncontainer.className = 'downloadandshare';

  // Create buttons
  const favouritePhotoviewButton = document.createElement('button');
  favouritePhotoviewButton.className = 'button view-btn';
  favouritePhotoviewButton.textContent = 'Full Screen';
  
  const favouritePhotodownloadButton = document.createElement('button');
  favouritePhotodownloadButton.className = 'button download-btn';
  favouritePhotodownloadButton.textContent = 'Download Image';
  
  const favouritePhotoshareButton = document.createElement('button');
  favouritePhotoshareButton.className = 'button share-btn';
  favouritePhotoshareButton.textContent = 'Share Image';
  
  const favouritePhotolikeButton = document.createElement('button');
  favouritePhotolikeButton.className = 'button like-btn';
  favouritePhotolikeButton.textContent = 'Unlike';
  
  // Append buttons to container
  downloadandsharebuttoncontainer.appendChild(favouritePhotoviewButton);
  downloadandsharebuttoncontainer.appendChild(favouritePhotodownloadButton);
  downloadandsharebuttoncontainer.appendChild(favouritePhotoshareButton);
  downloadandsharebuttoncontainer.appendChild(favouritePhotolikeButton);

  // Append elements
  favouriteimgcontainer.appendChild(favouriteimg);
  favouriteimgcontainer.appendChild(downloadandsharebuttoncontainer);
  favouritePhotosContainer.appendChild(favouriteimgcontainer);
  
  // Attach event listeners after buttons are added to DOM
  favouritePhotoviewButton.addEventListener('click', () => {
    try {
      fullScreenDogImageView(image);
    } catch (error) {
      console.error('Error viewing image:', error);
    }
  });

  favouritePhotodownloadButton.addEventListener('click', () => {
    try {
      downloadDogImage(image);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  });

  favouritePhotoshareButton.addEventListener('click', () => {
    try {
      shareDogImage(image);
    } catch (error) {
      console.error('Error sharing image:', error);
    }
  });

  favouritePhotolikeButton.addEventListener('click', (event) => {
    try {
        LikeDogImage(image, event.target, image);
       //resetdogBREEDimageLikeButton();
        
    } catch (error) {
      console.error('Error liking image:', error);
    }
      
  }); 
    document.querySelector('#numberOfLikedImages').innerText = `${favouriteImages.length} Image in Favourite Images `;
    
});
      
  }
}

displayFavouriteImages();



// FUNCTION TO RANDOM DOG IMAGE RESET LIKE BUTTON

function resetrandomdogLikeButton() {
       document.getElementById("randomDogImageLikeBtn").innerText = "Like";
  document.getElementById("randomDogImageLikeBtn").style.color = "#FFF2DE";
}



// FUNCTION TO DOG IMAGE OF THE DAY RESET LIKE BUTTON

function resetdogimageofthedayLikeButton() {
  document.getElementById("imageOfTheDayLikeBtn").innerText = "Like";
  document.getElementById("imageOfTheDayLikeBtn").style.color = "#FFF2DE";
  
}

// FUNCTION TO DOG BREED IMAGE RESET LIKE BUTTON
function resetdogBREEDimageLikeButton(buttonElement) {
  let likedImages = JSON.parse(localStorage.getItem('liked')) || [];
  const imageSrc = buttonElement.dataset.imageSrc;

  if (likedImages.includes(imageSrc)) {
    buttonElement.innerText = "Liked";
    buttonElement.style.color = "blue";
  } else {
    buttonElement.innerText = "Like";
    buttonElement.style.color = "#FFF2DE";
  }
}


//  POPULATE DOG PHOTOS BASED ON BREED SELECTION 

  
      const breedselectionurl = 'https://dog.ceo/api/breeds/list/all';


fetch(breedselectionurl)
     .then(res => res.json())
     .then(data => {
         
         const breedslist = data.message,
         breedSelector = document.querySelector('#breedSelect');
                                               Object.keys(breedslist).forEach(breeds =>{
             const option = document.createElement('option');
             option.value = breeds;
             option.text = breeds;
             option.className = 'merriweather-black-italic selectOptions';
                                                   breedSelector.appendChild(option);                                      
         
         
  //   ADDED SUB BREED SELECTION       
         if(breedslist[breeds].length > 0){
             breedslist[breeds].forEach(subBreed =>{
                 const subOption = document.createElement('option');
                 subOption.value =`${breeds} ${subBreed}`;
                 subOption.text = `${breeds}-${subBreed}`;
                 subOption.className = 'merriweather-black-italic selectSubOptions';
                 breedSelector.appendChild(subOption);
             });
         }
                                                   
      });                                             
         
     })
         
     .catch(err =>{
         console.log(`error ${err}`)
     });



// DISPLAY BREED IMAGES IN THE DOM
 
function displayBreedImages(image) {
  
  
    
  // Cache DOM element
const BreedPhotosContainer = document.querySelector('#breed-photo-container');
const breedSelector = document.getElementById('breedSelect');
const selectedBreed = breedSelector.value;
const breedSpan = document.getElementById('breedspan');
const breedInfoContainer = document.querySelector('#breed-info-container');
    
    
  // Clear container
  BreedPhotosContainer.innerHTML = '';
  
  const selectedBreedUrl =
  `https://dog.ceo/api/breed/${selectedBreed}/images`;
    
    const selectedBreedInfo = selectedBreed.charAt(0).toUpperCase()+selectedBreed.slice(1).toLowerCase();
  
    const breedinfoUrl = `https://api.thedogapi.com/v1/breeds/search?q=${selectedBreedInfo}`;
    
    
    fetch(breedinfoUrl)
      .then(res => res.json())
      .then(data => {
           // Check if breed is found
      if (data.length > 0) {
        const breedInfo = data[0];
        // Display breed information in the DOM
        breedInfoContainer.innerHTML = `
          <h2 class="breedinfoparagraphheading cinzel-decorative-bold">${breedInfo.name}</h2>
          <div class="breedinfoparagraph">
             <p class="merriweather-black-italic"><strong class="merriweather-black">Breed Group:</strong> ${breedInfo.breed_group}</p>
             <p class="merriweather-black-italic"><strong class="merriweather-black">Life Span:</strong> ${breedInfo.life_span}</p>
             <p class="merriweather-black-italic"><strong class="merriweather-black">Temperament:</strong> ${breedInfo.temperament}</p>
             <p class="merriweather-black-italic"><strong class="merriweather-black">Origin:</strong> ${breedInfo.origin}</p>
             <p class="merriweather-black-italic"><strong class="merriweather-black">Breed For:</strong> ${breedInfo.bred_for}</p>
             <p class="merriweather-black-italic"><strong class="merriweather-black">Weight:</strong> ${breedInfo.weight.imperial} lbs (${breedInfo.weight.metric} kg)</p>
             <p class="merriweather-black-italic"><strong class="merriweather-black">Height:</strong> ${breedInfo.height.imperial} inches (${breedInfo.height.metric} cm)</p>
          </div>
          
          `;
      } else {
        breedInfoContainer.innerHTML = `<p class="merriweather-black-italic"><strong class="merriweather-black">No Breed Info :</strong>Breed Information not found.</p>`;
      }
      })
      .catch(err =>{
          console.log(`error ${err}`)
      })
    
  
  fetch(selectedBreedUrl)
    .then(res => {
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json()
    })
    .then(data =>{
      
       const breedImages = data.message;
      
       // Verify breedImages is an array
      if (!Array.isArray(breedImages)) {
        console.error('breedImages is not an array:', breedImages);
        return;
      }
      
      
       if (breedImages.length === 0) {
    // Display no liked photos message
    const nobreedImagesDiv = document.createElement('div');
    nobreedImagesDiv.className = 'NOBREEDIMAGE ';
    nobreedImagesDiv.innerHTML = '<p class="NOBREEDIMAGEP class="merriweather-black"">NO BREED IMAGE: Select a breed </p>';
    BreedPhotosContainer.appendChild(nobreedImagesDiv);
         
  } else {
    
breedImages.forEach((breedImage, index) => {
    
    
  // Create image container
  const breedImagescontainer = document.createElement('section');
  breedImagescontainer.className = 'breedImgcontainer';

  // Create image element
  const breedImg = document.createElement('img');
  breedImg.src = breedImage;
  breedImg.alt = 'Favourite Image';

  // Create button container
  const breedImageDownloadandsharebuttoncontainer = document.createElement('section');
  breedImageDownloadandsharebuttoncontainer.className = 'downloadandshare';

  // Create buttons
  const breedImageviewButton = document.createElement('button');
  breedImageviewButton.className = 'button view-btn';
  breedImageviewButton.textContent = 'Full Screen';
  
  const breedImagedownloadButton = document.createElement('button');
  breedImagedownloadButton.className = 'button download-btn';
  breedImagedownloadButton.textContent = 'Download Image';
  
  const breedImageshareButton = document.createElement('button');
  breedImageshareButton.className = 'button share-btn';
  breedImageshareButton.textContent = 'Share Image';
  
  const breedImagelikeButton = document.createElement('button');
  breedImagelikeButton.className = 'button like-btn';
  breedImagelikeButton.textContent = 'Like';
  breedImagelikeButton.dataset.imageSrc = breedImage;  
  
  // Append buttons to container
  breedImageDownloadandsharebuttoncontainer.appendChild(breedImageviewButton);
  breedImageDownloadandsharebuttoncontainer.appendChild(breedImagedownloadButton);
  breedImageDownloadandsharebuttoncontainer.appendChild(breedImageshareButton);
  breedImageDownloadandsharebuttoncontainer.appendChild(breedImagelikeButton);

  // Append elements
  breedImagescontainer.appendChild(breedImg);
  breedImagescontainer.appendChild(breedImageDownloadandsharebuttoncontainer);
  BreedPhotosContainer.appendChild(breedImagescontainer);
    
 
  
  // Attach event listeners after buttons are added to DOM
  breedImageviewButton.addEventListener('click', () => {
    try {
      fullScreenDogImageView(breedImage);
    } catch (error) {
      console.error('Error viewing image:', error);
    }
  });

  breedImagedownloadButton.addEventListener('click', () => {
    try {
      downloadDogImage(breedImage);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  });

  breedImageshareButton.addEventListener('click', () => {
    try {
      shareDogImage(breedImage);
    } catch (error) {
      console.error('Error sharing image:', error);
    }
  });

  breedImagelikeButton.addEventListener('click', (event) => {
    try {
    const breedImage = event.target.parentNode.parentNode.querySelector('img').src;
    LikeDogImage(breedImage, event.target, breedImage);
    resetdogBREEDimageLikeButton(event.target);
    } catch (error) {
      console.error('Error liking image:', error);
    }
  }); 
});
      document.querySelector('#numberOfBreedImages').innerText = `${breedImages.length} Images fetched for ${selectedBreed}`;
      
    document.querySelector('#breedspan').innerText = `Date: ${dateString} Time: ${timeString}`

  }
    })
    .catch(err => console.log(`error ${err}`))
  
}





    

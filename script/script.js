//for loading the category buttons
const loadCategoryButtons=()=>{
  fetch('https://openapi.programming-hero.com/api/peddy/categories')
  .then(res=>res.json())
  .then(data=>displayCategoryButtons(data.categories))
  .catch(err=>console.log(err));
};

//for loading all the pets
const loadAllPets=()=>{
  fetch('https://openapi.programming-hero.com/api/peddy/pets')
  .then(res=>res.json())
  .then(data=>loadSpinner(data.pets))
  .catch(err=>console.log(err));
};

// active button functionality added
const removeActiveClass=()=>{
  const buttons=document.getElementsByClassName('btn-category');
  for(const btn of buttons){
    btn.classList.remove('active');
    btn.classList.add('bg-transparent');
  }
};

// for displaying the category button
const displayCategoryButtons=(categories)=>{
  const categoryBtnContainer=document.getElementById('category-btn-container');
  categories.forEach(category=>{
    const div=document.createElement('div');
    const btnId=`btn-${category.id}`;
    div.innerHTML=
    `
    <button id='${btnId}' onclick="loadPetByCategory('${category.id}','${category.category}')" class="btn bg-transparent lg:btn-lg rounded-3xl lg:px-20 btn-border btn-category"><img class="w-4 h-4 lg:w-auto lg:h-auto" src=${category.category_icon} alt="">${category.category}s</button>
    `;
    categoryBtnContainer.append(div);
  });
};


// for loading the pets by their category
const loadPetByCategory=(id,category)=>{
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
  .then(res=>res.json())
  .then(data=>{
    removeActiveClass();
    const activeBtn=document.getElementById(`btn-${id}`);
    activeBtn.classList.remove('bg-transparent');
    activeBtn.classList.add('active');
    loadSpinner(data.data);
  })
  .catch(err=>console.log(err));
};


// for spinner
const loadSpinner=(pets)=>{
  const petCardContainer=document.getElementById('pet-card-container');
  petCardContainer.innerHTML='';
  petCardContainer.classList.remove('grid');

  const div=document.createElement('div');
  div.classList='flex justify-center';
  div.innerHTML=`
  <span class="loading loading-dots loading-lg"></span>
  `;
  petCardContainer.append(div);
  setTimeout(()=>{
    displayAllPets(pets);
  },2000);
};


//for displaying the pets 
const displayAllPets=(pets)=>{
  const petCardContainer=document.getElementById('pet-card-container');
  petCardContainer.innerHTML='';

  // sorting the pets array
  sortPets(pets);

  if(pets.length==0){
    petCardContainer.classList.remove('grid');
    const div=document.createElement('div');
    div.classList='bg-base-200 rounded-lg';
    div.innerHTML=`
    <div class="flex flex-col space-y-3 text-center py-10">
      <div class="flex justify-center items-center">
        <img src="images/error.webp" alt="">
      </div>
      <div class="max-w-md mx-auto">
        <h1 class="text-3xl font-bold">No Information Available</h1>
        <p class="py-6">There is no pet available for this category at this moment. Please keep your eyes on our page.</p>
      </div>
    </div>
    `;
    petCardContainer.append(div);
    return;
  }
  else{
    petCardContainer.classList.add('grid');
  }

  pets.forEach(pet=>{
    const div=document.createElement('div');
    div.classList='p-4 border rounded-lg shadow-sm';
    div.innerHTML=`
    <img src=${pet.image} alt="Shoes" class="rounded-lg mb-4"/>
    <h2 class="card-title text-xl color-primary font-black">${pet.pet_name?`${pet.pet_name}`:'Not available'}</h2>
    <div class="space-y-2 text-sm border-b pt-2 pb-6 color-gray">
      <p><i class="fa-solid fa-border-all"></i> Breed: ${pet.breed?`${pet.breed}`:'Not available'}</p>
      <p><i class="fa-regular fa-calendar"></i> Birth: ${pet.date_of_birth?`${pet.date_of_birth}`:'Not available'}</p>
      <p><i class="fa-solid fa-venus"></i> Gender: ${pet.gender?`${pet.gender}`:'Not available'}</p>
      <p><i class="fa-solid fa-dollar-sign"></i> Price: ${pet.price?`${pet.price}$`:'Not available'}</p>
    </div>
    <div class="flex justify-between pt-4">
      <button onclick="addToLikeContainer('${pet.image}')" class="btn btn-sm bg-transparent hover:border-[#0E7A81]"><i class="fa-regular fa-thumbs-up"></i></button>
      <button id='adopt-btn-${pet.petId}' onclick="loadAdopt('${pet.petId}')" class="btn btn-sm bg-transparent text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white">Adopt</button>
      <button onclick="loadPetDetails('${pet.petId}')" class="btn btn-sm bg-transparent text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white">Details</button>
    </div>
    `;
    petCardContainer.append(div);
  });
};


// sorting the pet in descending order
const sortPets=(pets)=>{
  document.getElementById('btn-sort').addEventListener('click',()=>{
    loadSpinner(pets.sort((a,b)=>b.price-a.price));
  });
};

// like button
const addToLikeContainer=(image)=>{
  const likeCardContainer=document.getElementById('like-card-container');
  likeCardContainer.innerHTML+=`
    <img class="rounded-lg" src=${image} alt="">
  `;
};

// details button
const loadPetDetails=(id)=>{
  console.log(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
  .then(res=>res.json())
  .then(data=>displayPetDetails(data))
  .catch(err=>console.log(err));
};

// display pet details
const displayPetDetails=(pet)=>{
  const detailsModal=document.getElementById('details_modal');
  const div=document.createElement('div');
  div.classList.add('modal-box');
  div.innerHTML=`
    <div class="mb-4">
      <img class="rounded-lg w-full" src=${pet.petData.image} alt="">
    </div>
    <div>
      <h3 class="text-lg font-black">${pet.petData.pet_name}</h3>
      <div class="w-[70%] grid grid-cols-2 text-sm color-gray mt-2">
        <p><i class="fa-solid fa-border-all"></i> Breed: ${pet.petData.breed?`${pet.petData.breed}`:'Not available'}</p>
        <p><i class="fa-regular fa-calendar"></i> Birth: ${pet.petData.date_of_birth?`${pet.petData.date_of_birth}`:'Not available'}</p>
        <p class="py-2"><i class="fa-solid fa-venus"></i> Gender: ${pet.petData.gender?`${pet.petData.gender}`:'Not available'}</p>
        <p class="py-2"><i class="fa-solid fa-dollar-sign"></i> Price: ${pet.petData.price?`${pet.petData.price}`:'Not available'}</p>
        <p><i class="fa-solid fa-dollar-sign"></i> Vaccinated Status: ${pet.petData.vaccinated_status?`${pet.petData.vaccinated_status}`:'Not available'}</p>
      </div>
    </div>
    <div class="divider"></div>
    <div class="mt-2">
      <h3 class="text-lg font-black">Details Information</h3>
      <div class="text-sm pt-2 pb-4 color-gray">
        <p>${pet.petData.pet_details?`${pet.petData.pet_details}`:'Pet Details not found'}</p>
      </div>
    </div>
    <div class="modal-action w-full">
      <form method="dialog" class="w-full">
        <button class="btn w-full active btn-border">Cancel</button>
      </form>
    </div>
  `;
  detailsModal.append(div);
  detailsModal.showModal()
};

// adopt button
const loadAdopt=(id)=>{
  const countdown=document.getElementById('countdown');
  const adoptionModal=document.getElementById('adoption_modal');

  const adoptBtn=document.getElementById(`adopt-btn-${id}`);
  adoptBtn.innerText='Adopted';
  adoptBtn.classList="btn btn-sm disabled";

  adoptionModal.showModal();
  let count=3;
  countdown.innerText=count;
  const counter=setInterval(()=>{
    count--;
    if (count===0) {
      clearInterval(counter);
      adoptionModal.close();
    } else {
      countdown.innerText=count;
    }
  },1000);
};


// initially loadin all pets and buttons
loadCategoryButtons();
loadAllPets();
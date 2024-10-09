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
  .then(data=>displayAllPets(data.pets))
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
    <button id='${btnId}' onclick="loadPetByCategory('${category.id}','${category.category}')" class="btn bg-transparent lg:btn-lg rounded-3xl lg:px-20 btn-border btn-category"><img class="w-4 h-4 lg:w-auto lg:h-auto" src=${category.category_icon} alt="">${category.category}</button>
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
  <span class="loading loading-ring loading-lg"></span>
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
    <h2 class="card-title text-xl color-primary">${pet.pet_name?`${pet.pet_name}`:'Not Named Yet'}</h2>
    <div class="space-y-2 text-sm border-b pt-2 pb-6 color-gray">
      <p><i class="fa-solid fa-border-all"></i> Breed: ${pet.breed?`${pet.breed}`:'Breed info not found'}</p>
      <p><i class="fa-regular fa-calendar"></i> Birth: ${pet.date_of_birth?`${pet.date_of_birth}`:'Unknown Birth Date'}</p>
      <p><i class="fa-solid fa-venus"></i> Gender: ${pet.gender?`${pet.gender}`:'Gender not available'}</p>
      <p><i class="fa-solid fa-dollar-sign"></i> Price: ${pet.price?`${pet.price}`:'Out of stock'}</p>
    </div>
    <div class="flex justify-between pt-4">
      <button onclick="addToLikeContainer('${pet.image}')" class="btn btn-sm bg-transparent"><i class="fa-regular fa-thumbs-up"></i></button>
      <button class="btn btn-sm bg-transparent text-[#0E7A81]">Adopt</button>
      <button class="btn btn-sm bg-transparent text-[#0E7A81]">Details</button>
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
    <img class="border rounded-lg" src=${image} alt="">
  `;
};


// initially loadin all pets and buttons
loadCategoryButtons();
loadAllPets();
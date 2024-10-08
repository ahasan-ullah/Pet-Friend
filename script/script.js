const loadCategoryButtons=()=>{
  fetch('https://openapi.programming-hero.com/api/peddy/categories')
  .then(res=>res.json())
  .then(data=>displayCategoryButtons(data.categories))
  .catch(err=>console.log(err));
};

const loadAllPets=()=>{
  fetch('https://openapi.programming-hero.com/api/peddy/pets')
  .then(res=>res.json())
  .then(data=>displayAllPets(data.pets))
  .catch(err=>console.log(err));
};

const displayAllPets=(pets)=>{
  const petCardContainer=document.getElementById('pet-card-container');
  pets.forEach(pet=>{
    const div=document.createElement('div');
    div.classList='p-4 border rounded-lg shadow-sm';
    div.innerHTML=`
    <img src=${pet.image} alt="Shoes" class="rounded-lg mb-4"/>
    <h2 class="card-title text-xl color-primary">${pet.pet_name}</h2>
    <div class="space-y-2 text-sm border-b pt-2 pb-6 color-gray">
      <p><i class="fa-solid fa-border-all"></i> Breed: ${pet.breed}</p>
      <p><i class="fa-regular fa-calendar"></i> Birth: ${pet.date_of_birth}</p>
      <p><i class="fa-solid fa-venus"></i> Gender: ${pet.gender}</p>
      <p><i class="fa-solid fa-dollar-sign"></i> Price: ${pet.price}</p>
    </div>
    <div class="flex justify-between pt-4">
      <button class="btn btn-sm bg-transparent"><i class="fa-regular fa-thumbs-up"></i></button>
      <button class="btn btn-sm bg-transparent text-[#0E7A81]">Adopt</button>
      <button class="btn btn-sm bg-transparent text-[#0E7A81]">Details</button>
    </div>
    `;
    petCardContainer.append(div);
  });
};

const displayCategoryButtons=(categories)=>{
  const categoryBtnContainer=document.getElementById('category-btn-container');
  categories.forEach(category=>{
    const div=document.createElement('div');
    div.innerHTML=
    `
    <button class="btn bg-transparent lg:btn-lg rounded-3xl lg:px-20 btn-border"><img class="w-4 h-4 lg:w-auto lg:h-auto" src=${category.category_icon} alt="">${category.category}</button>
    `;
    categoryBtnContainer.append(div);
  });
};

loadCategoryButtons();
loadAllPets();
// category button api fetch
const btnCategory = async () => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/categories`
    );
    const data = await res.json();
    showCategoryBtnEl(data.categories);
  } catch (err) {
    console.log("error:", err);
  }
};

// spinner
const spinner = () => {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("animal-container").classList.add("hidden");
  setTimeout(function () {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("animal-container").classList.remove("hidden");
  }, 2000);
}; // end

// active buttons styles
const btnStyles = (clickedBtn) => {
  const buttons = document.getElementsByClassName("btn-group");
  for (const btn of buttons) {
    btn.classList.remove("active", "max-[425px]:position-none");
  }
  clickedBtn.classList.add("active");
};

const showCategoryBtnEl = (cat) => {
  const categoryEl = document.getElementById("category-btn");
  cat.forEach((item) => {
    const div = document.createElement("div");
    // div.classList = 'text-2xl font-semibold py-2 w-[70%] rounded-md border border-gray-300 bg-[#0E7A81] bg-opacity-5 hover:rounded-full hover:bg-[#0E7A81] hover:bg-opacity-10 hover:border-[#0E7A81] duration-100 flex justify-center items-center gap-4';
    div.classList.add("style", "w-[100%]");
    div.innerHTML = `
        <button onclick="petCategory('${item.category}'); btnStyles(this); spinner();" class="flex gap-2 justify-center items-center btn-group">
         <span><img src="${item.category_icon}"/></span>
         ${item.category}
        </button>`;
    categoryEl.appendChild(div);
  });
};

// pet card section api fetch
const allPetsUrl = "https://openapi.programming-hero.com/api/peddy/pets";
let pets = [];
const petCardFetch = async () => {
  try {
    const res = await fetch(allPetsUrl);
    const data = await res.json();
    pets = data.pets || [];
    showPetCard(pets);
  } catch (err) {
    console.log("err:", err);
  }
};

const showPetCard = (pet) => {
  const cardContainer = document.getElementById("animal-container");
  cardContainer.innerHTML = "";

  if (pet.length == 0) {
    const div = document.createElement("div");
    cardContainer.classList.remove("grid");
    div.classList =
      "bg-gray-200 flex flex-col justify-center items-center rounded-md gap-3 py-8 px-12";
    div.innerHTML = `
        <img class="-mr-10" src="images/error.webp"/>
        <h3 class="font-bold text-2xl">No Information Available</h3>
        <p class="">Sorry no data found on this category! <br>Please try something else!</p>
        `;
    cardContainer.append(div);
    return;
  }

  pet.forEach((item) => {
    const div = document.createElement("div");
    cardContainer.classList.add("grid");

    div.innerHTML = `
                <div class="w-72 lg:w-[300px] border border-gray-200 rounded-md">
                    <figure class="h-[150px] p-2">
                        <img class="rounded-lg w-full h-full object-cover" src="${
                          item.image
                        }" alt="pet image"/>
                    </figure>
                    <div class="card-body -ml-5">
                        <h2 class="card-title -mt-3 font-bold text-2xl text-black">${
                          item.pet_name
                        }</h2>
                        <div class="text-left font-semibold">
                            <p class="flex gap-2"><span><img src="images/breed.png"/></span>Breed: ${
                              item.breed ? item.breed : "N/A"
                            }</p>
                            <p class="flex gap-2"><span><img src="images/date.png"/></span>Birth: ${
                              item.date_of_birth ? item.date_of_birth : "N/A"
                            }</p>
                            <p class="flex gap-2"><span><img src="images/gender.png"/></span>Gender: ${
                              item.gender ? item.gender : "N/A"
                            }</p>
                            <p class="flex gap-2"><span><img src="images/price.png"/></span>price: ${
                              item.price ? `${item.price}$` : "N/A"
                            }</p>
                        </div>
                        <div class="border border-gray-200"></div>
                        <div class="flex justify-between mt-2">
                            <button 
                              onclick="likedImage('${item.image}')" 
                              class="px-3 py-2 border border-gray-300 hover:bg-[#0E7A81] rounded-md"><img src="images/thumbs-up.png" alt="">
                            </button>
                            <button
                              onclick="adoptionModal(this); drawerFuncById(${
                                item.petId
                              })"
                              class="adopt-btn text-sm font-semibold rounded-md px-3 py-2 border border-gray-300 text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white hover:border-[#0E7A81]"
                            >
                              Adopt
                            </button>
                            <button 
                              onclick="fetchModalDetails(${
                                item.petId
                              })" class="text-sm font-semibold rounded-md px-3 py-2 border border-gray-300 text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white">Details
                            </button>
                        </div>
                    </div>
                </div>
        `;
    cardContainer.append(div);
  });
};
// sort button functionality
const sortPrice = (items) => {
  return items.sort((a, b) => b.price - a.price);
};

const sorted = () => {
  const sortedItems = sortPrice([...pets]);
  sortedCards(sortedItems);
};
const sortedCards = (sortedItems) => {
  const cardContainer = document.getElementById("animal-container");
  cardContainer.innerHTML = "";
  sortedItems.forEach((item) => {
    const div = document.createElement("div");
    cardContainer.classList.add("grid");
    div.innerHTML = `
                <div class="w-72 lg:w-[300px] border border-gray-200 rounded-md">
                    <figure class="h-[150px] p-2">
                        <img class="rounded-lg w-full h-full object-cover" src="${
                          item.image
                        }" alt="pet image"/>
                    </figure>
                    <div class="card-body -ml-5">
                        <h2 class="card-title -mt-3 font-bold text-2xl text-black">${
                          item.pet_name
                        }</h2>
                        <div class="text-left font-semibold">
                            <p class="flex gap-2"><span><img src="images/breed.png"/></span>Breed: ${
                              item.breed ? item.breed : "N/A"
                            }</p>
                            <p class="flex gap-2"><span><img src="images/date.png"/></span>Birth: ${
                              item.date_of_birth ? item.date_of_birth : "N/A"
                            }</p>
                            <p class="flex gap-2"><span><img src="images/gender.png"/></span>Gender: ${
                              item.gender ? item.gender : "N/A"
                            }</p>
                            <p class="flex gap-2"><span><img src="images/price.png"/></span>price: ${
                              item.price ? `${item.price}$` : "N/A"
                            }</p>
                        </div>
                        <div class="border border-gray-200"></div>
                        <div class="flex justify-between mt-2">
                            <button onclick="likedImage('${
                              item.image
                            }')" class="px-3 py-2 border border-gray-300 hover:bg-[#0E7A81] rounded-md"><img src="images/thumbs-up.png" alt="">
                            </button>
                            <button onclick="adoptionModal(this)" class="text-sm font-semibold rounded-md px-3 py-2 border border-gray-300 text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white hover:border-[#0E7A81] btn-disable">Adopt
                            </button>
                            <button onclick="fetchModalDetails(${
                              item.petId
                            })" class="text-sm font-semibold rounded-md px-3 py-2 border border-gray-300 text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white">Details
                            </button>
                        </div>
                    </div>
                </div>
        `;
    cardContainer.append(div);
  });
}; // end

// details modal
const fetchModalDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await res.json();
  modal(data.petData);
};
const modal = (details) => {
  document.getElementById("myModal").showModal();
  const modalContainer = document.getElementById("modal-content");
  modalContainer.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
        <div class="">
        <img class="rounded-md w-full h-[250px] object-cover" src="${
          details.image
        }"/>
        </div>
        <h2 class="card-title mt-4 mx-7 font-bold text-2xl text-black">${
          details.pet_name
        }</h2>
        <div class="text-left text-sm font-semibold mt-3 md:flex justify-between mx-7">
            <div>
                <p class="flex gap-2"><span><img src="images/breed.png"/></span>Breed: ${
                  details.breed ? details.breed : "N/A"
                }</p>
                <p class="flex items-center gap-2"><span><img src="images/date.png"/></span>Birth: ${
                  details.date_of_birth ? details.date_of_birth : "N/A"
                }</p>
                <p class="flex gap-2"><span><img src="images/gender.png"/></span>Gender: ${
                  details.gender ? details.gender : "N/A"
                }</p>
            </div>
            <div>
                <p class="flex gap-2"><span><img src="images/price.png"/></span>price: ${
                  details.price ? `${details.price}$` : "N/A"
                }</p>
                <p class="flex gap-2"><span><img src="images/gender.png"/></span>vaccinated_status: ${
                  details.vaccinated_status
                    ? `${details.vaccinated_status}`
                    : "N/A"
                }</p>
            </div>
        </div>
        <div class="mt-4 mx-7 text-sm">
            <p class="font-bold text-lg mb-2">Detailed Information:</p>
            ${details.pet_details}
        </div>
    `;
  modalContainer.appendChild(div);
}; // end

// count down modal
const showModal = document.getElementById("adoptionModal");
const countDown = document.getElementById("countDown");
const adoptionModal = (btn) => {
  showModal.showModal();
  let count = 3;
  countDown.innerText = count;
  const timeOut = setInterval(() => {
    count--;
    countDown.innerText = count;

    if (count <= 0) {
      clearInterval(timeOut);
      showModal.close();
      // disable the button after countDown
      btn.setAttribute("disabled", true);
      btn.classList = "hover:none btn btn-sm";
    }
  }, 1000);
};

// fetch pets by category
const petCategory = async (name) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${name}`
    );
    const data = await res.json();
    showPetCard(data.data);
  } catch (err) {
    console.log("error: ", err);
  }
}; // fetch pets by ctegory ends

// add image on the right container with every like button click
const likedImage = (image) => {
  const imgContainer = document.getElementById("sideImgContainer");
  const div = document.createElement("div");
  div.innerHTML = `<img class="rounded-md" src="${image}" />`;
  imgContainer.appendChild(div);
  document.getElementById("sideImgContainer-title").style.display = "none";
}; // end

function drawerFuncById(petId) {
  const petData = pets.find((pet) => pet.petId === petId);
  drawerFunc(petData);
}

// Renders the pet info in the drawer
let adoptedPets = [];
const drawerFunc = (petData) => {
  const drawerContainer = document.getElementById("drawer-container");
  const noPetText = document.getElementById("no-pet");
  if (noPetText) noPetText.style.display = "none";

  // Add pet to the list
  if (petData) {
    adoptedPets.push(petData);
  }

  // Clear drawer content
  drawerContainer.innerHTML = "";

  // Render all adopted pets
  adoptedPets.forEach((pet) => {
    const div = document.createElement("div");
    div.classList = "border-b border-gray-300 py-2";

    div.innerHTML = `
      <div class="text-left space-y-1 flex flex-row justify-between items-center">
        <p class="font-semibold">Name: <span>${pet.pet_name}</span></p>
        <p class="font-semibold">Price: <span>$${pet.price ?? "N/A"}</span></p>
      </div>
    `;

    drawerContainer.appendChild(div);
  });

  // Calculate total
  const total = adoptedPets.reduce((sum, pet) => sum + (pet.price || 0), 0);

  // Add total and purchase button at the bottom
  const footer = document.createElement("div");
  footer.classList = "border-t mt-1";

  footer.innerHTML = `
    <div class="flex justify-between items-center">
      <button onclick="completePurchase()" class="bg-[#0E7A81] hover:bg-[#257178] text-xs text-white px-2 py-1 rounded-md">Purchase</button>
      <p class="font-semibold">Total: $${total}</p>
    </div>
  `;
  drawerContainer.appendChild(footer);
};

// purchase button functionality
const completePurchase = () => {
  const toast = document.getElementById("toast");
  const toastInner = document.getElementById("toast-inner");
  toast.classList.remove("hidden");

  requestAnimationFrame(() => {
    toastInner.classList.remove("translate-x-[150%]");
    toastInner.classList.add("translate-x-0");
  });

  // Auto-close after 3 seconds
  setTimeout(() => {
    closeToast();
  }, 3000);

  // Close drawer checkbox
  const drawerCheckbox = document.getElementById("my-drawer-4");
  if (drawerCheckbox) {
    drawerCheckbox.checked = false;
  }
  // empty the drawer after purchase
  const drawerContainer = document.getElementById("drawer-container");
  drawerContainer.innerHTML = "";
  document.getElementById("no-pet").style.display = 'block';
};

const closeToast = () => {
  const toast = document.getElementById("toast");
  const toastInner = document.getElementById("toast-inner");

  // Slide out
  toastInner.classList.remove("translate-x-0");
  toastInner.classList.add("translate-x-[200%]");

  // Hide the whole toast
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 500);
};

btnCategory();
petCardFetch();

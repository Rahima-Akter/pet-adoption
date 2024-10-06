// category button api fetch
const btnCategory = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
        const data = await res.json()
        showCategoryBtnEl(data.categories)
    }
    catch (err) {
        console.log('error:', err)
    }
};
const showCategoryBtnEl = (cat) => {
    const categoryEl = document.getElementById('category-btn')
    cat.forEach(item => {
        const btn = document.createElement('button');
        btn.classList = 'text-2xl font-semibold py-3 px-8 rounded-md border border-gray-300 bg-[#0E7A81] bg-opacity-5 hover:rounded-full hover:bg-[#0E7A81] hover:bg-opacity-10 hover:border-[#0E7A81] duration-100 flex justify-center items-center gap-4';
        btn.innerHTML = `<span><img class="" src="${item.category_icon}"/></span>${item.category}`
        categoryEl.appendChild(btn);
    });
};

// pet card section api fetch
const petCardFetch = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
        const data = await res.json()
        showPetCard(data.pets)
    }
    catch (err) {
        console.log('err:', err)
    }
};

const showPetCard = (pet) => {
    const cardContainer = document.getElementById('animal-container');
    pet.forEach(item => {
        const div = document.createElement('div');
        // div.classList = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-8';
        div.innerHTML = `
            
                <div class="border border-gray-200 rounded-md">
                    <figure class="h-[200px] p-2">
                        <img class="rounded-lg w-full h-full object-cover" src="${item.image}" alt="pet image"/>
                    </figure>
                    <div class="card-body -ml-5">
                        <h2 class="card-title -mt-3 font-bold text-2xl">${item.pet_name}</h2>
                        <div class="text-left">
                            <p class="flex gap-2"><span><img src="images/breed.png"/></span>Breed: ${item.breed}</p>
                            <p class="flex gap-2"><span><img src="images/date.png"/></span>Birth: ${item.date_of_birth}</p>
                            <p class="flex gap-2"><span><img src="images/gender.png"/></span>Gender: ${item.gender}</p>
                            <p class="flex gap-2"><span><img src="images/price.png"/></span>price: ${item.price}$</p>
                        </div>
                        <div class="border border-gray-200"></div>
                        <div class="flex justify-between mt-2">
                            <button class="px-3 py-1 border border-gray-300 hover:bg-[#0E7A81] rounded-md"><img src="images/thumbs-up.png" alt="">
                            </button>
                            <button  class="text-lg font-semibold rounded-md px-3 py-1 border border-gray-300 text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white hover:border-[#0E7A81] ">Adopt
                            </button>
                            <button class="text-lg font-semibold rounded-md px-3 py-1 border border-gray-300 text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white">Details
                            </button>
                        </div>
                    </div>
                </div>
        `
        cardContainer.append(div);
    });
}


btnCategory();
petCardFetch()
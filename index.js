// category button api fetch
const btnCategory = async () => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
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
        const div = document.createElement('div');
        // div.classList = 'text-2xl font-semibold py-2 w-[70%] rounded-md border border-gray-300 bg-[#0E7A81] bg-opacity-5 hover:rounded-full hover:bg-[#0E7A81] hover:bg-opacity-10 hover:border-[#0E7A81] duration-100 flex justify-center items-center gap-4';
        div.classList.add('style', 'w-[100%]');
        div.innerHTML = `
        <button onclick="petCategory('${item.category}'); btnStyles(this); spinner();" class="flex gap-2 justify-center items-center btn-group">
         <span><img src="${item.category_icon}"/></span>
         ${item.category}
        </button>`
        categoryEl.appendChild(div);
    });
};

// spinner
const spinner = () => {
    document.getElementById('loader').classList.remove('hidden')
    document.getElementById('animal-container').classList.add('hidden');
    setTimeout(function () {
        document.getElementById('loader').classList.add('hidden')
        document.getElementById('animal-container').classList.remove('hidden');
        // petCardFetch();
    }, 2000);
};  // end

const btnStyles = (clickedBtn) => {
    const buttons = document.getElementsByClassName('btn-group');
    for (const btn of buttons) {
        btn.classList.remove('active', 'max-[425px]:position-none');
    }
    clickedBtn.classList.add('active');

};

// pet card section api fetch
const petCardFetch = async () => {
    const loader = document.getElementById('loader');
    loader.style.display = "hidden";
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
    cardContainer.innerHTML = "";


    if (pet.length == 0) {
        const div = document.createElement('div')
        cardContainer.classList.remove('grid')
        div.classList = 'bg-gray-200 flex flex-col justify-center items-center rounded-md gap-3 py-8'
        div.innerHTML = `
        <img src="images/error.webp"/>
        <h3 class="font-bold text-2xl">No Information Available</h3>
        <p class="w-[60%]">Sorry no data found on this category! <br>Please try something else</p>
        `;
        cardContainer.append(div)
        return;
    }

    pet.forEach(item => {

        const div = document.createElement('div');
        cardContainer.classList.add('grid')
        div.innerHTML = `
                <div class="w-72 lg:w-[300px] border border-gray-200 rounded-md">
                    <figure class="h-[150px] p-2">
                        <img class="rounded-lg w-full h-full object-cover" src="${item.image}" alt="pet image"/>
                    </figure>
                    <div class="card-body -ml-5">
                        <h2 class="card-title -mt-3 font-bold text-2xl text-black">${item.pet_name}</h2>
                        <div class="text-left font-semibold">
                            <p class="flex gap-2"><span><img src="images/breed.png"/></span>Breed: ${item.breed ? item.breed : 'N/A'}</p>
                            <p class="flex gap-2"><span><img src="images/date.png"/></span>Birth: ${item.date_of_birth ? item.date_of_birth : 'N/A'}</p>
                            <p class="flex gap-2"><span><img src="images/gender.png"/></span>Gender: ${item.gender ? item.gender : 'N/A'}</p>
                            <p class="flex gap-2"><span><img src="images/price.png"/></span>price: ${item.price ? `${item.price}$` : 'N/A'}</p>
                        </div>
                        <div class="border border-gray-200"></div>
                        <div class="flex justify-between mt-2">
                            <button onclick="likedImage('${item.image}')" class="px-3 py-2 border border-gray-300 hover:bg-[#0E7A81] rounded-md"><img src="images/thumbs-up.png" alt="">
                            </button>
                            <button  class="text-sm font-semibold rounded-md px-3 py-2 border border-gray-300 text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white hover:border-[#0E7A81] ">Adopt
                            </button>
                            <button class="text-sm font-semibold rounded-md px-3 py-2 border border-gray-300 text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white">Details
                            </button>
                        </div>
                    </div>
                </div>
        `
        cardContainer.append(div);
    });
};

// fetch pets by category

const petCategory = async (name) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${name}`)
        const data = await res.json()
        showPetCard(data.data)
    }
    catch (err) {
        console.log('error: ', err)
    };
}; // fetch pets by ctegory ends

// add image on the right container with every like button click
const likedImage = (image) => {
    const imgContainer = document.getElementById('sideImgContainer');
    const div = document.createElement('div')
    div.innerHTML = `<img class="rounded-md" src="${image}" />`;
    imgContainer.appendChild(div);
}; // end

btnCategory();
petCardFetch()
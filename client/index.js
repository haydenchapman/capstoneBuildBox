const baseURL = "http://localhost:4567";

const addCars = document.querySelector("#addCar");
const displayCar = document.querySelector("#carDisplay");
const garageGallery = document.querySelector("#gallery");

const displayCars = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    createCarCard(arr[i]);
  }
};

const displayGallery = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    createCarCard(arr[i]);
  }
};

const createCarCard = (car) => {
  const newCarCard = document.createElement("section");

  newCarCard.classList.add("car-card");

  newCarCard.innerHTML = `
    <img alt='car-image' id='car-image' src=${car.picture}/>
    <section>
    <button onClick="updateLike(${car.id}, 'like')">Like!</button>
    Likes: ${car.likes}
    </section>
    <div>Year: ${car.year}</div><br>
    <div>Make: ${car.make}</div>
    <div>Model: ${car.model}</div>
    <div>Color: ${car.color}</div>
    <div>Auto Type: ${car.type}</div>
    <div>Miles: ${car.milage}</div>
    <div>Mods:<br> ${car.mods} </div>
    <button onClick="deleteCar(${car.id})">Delete ${car.model} build.</button>
    `;
  displayCar.appendChild(newCarCard);
};

const getAllCars = () => {
  axios
    .get(`${baseURL}/cars`)
    .then((res) => {
      //console.log(res.data)
      displayCars(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const addCar = () => {
  displayCar.innerHTML = "";
  const year = document.querySelector("#yearInput");
  const make = document.querySelector("#makeInput");
  const model = document.querySelector("#modelInput");
  const type = document.querySelector("#typeInput");
  const color = document.querySelector("#colorInput");
  const carImage = document.querySelector("#imageInput");
  const mods = document.querySelector("#modsInput");

  let bodyObj = {
    year: year.value,
    make: make.value,
    model: model.value,
    type: type.value,
    color: color.value,
    picture: carImage.value,
    mods: mods.value,
  };

  console.log(bodyObj);

  axios
    .post(`${baseURL}/addCars`, bodyObj)
    .then((res) => {
      year.value = "";
      make.value = "";
      model.value = "";
      color.value = "";
      carImage.value = "";
      mods.value = "";

      displayCars(res.data);
    })
    .catch((err) => {
      console.log("err");
    });
};

const deleteCar = (id) => {
  axios
    .delete(`${baseURL}/deleteCar/${id}`)
    .then((res) => {
      displayCar.innerHTML = "";
      displayCars(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateLike = (id, like) => {
  axios
    .put(`${baseURL}/likeCar/${id}`, { like })
    .then((res) => {
      displayCar.innerHTML = "";
      displayCars(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
getAllCars();
addCars.addEventListener("click", addCar);

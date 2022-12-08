//zoom zoom
const cars = require("./db.json");
let globalId = 4;

module.exports = {
  getCars: (req, res) => {
    res.status(200).send(cars);
  },

  addCars: (req, res) => {
    const { make, model, color, year, milage, type, picture, mods } = req.body;

    const newCar = {
      id: globalId,
      make,
      model,
      color,
      year,
      milage: 0,
      type,
      picture,
      likes: 0,
      mods,
    };
    cars.push(newCar);
    globalId++;

    res.status(200).send(cars);
  },

  deleteCar: (req, res) => {
    const index = cars.findIndex((el) => el.id === +req.params.id);

    cars.splice(index, 1);

    res.status(200).send(cars);
  },

  likeCar: (req, res) => {
    const index = cars.findIndex((el) => el.id === +req.params.id);
    const { like } = req.body;

    if (like === "like") {
      cars[index].likes++;
    } else if (like === "dislike") {
      cars[index].likes--;
    }
    res.status(200).send(cars);
  },

  updateMilage: (req, res) => {
    const index = cars.findIndex((el) => el.id === +req.params.id);
    const { addMiles } = req.body;

    cars[index].milage += addMiles;

    res.status(200).send(cars);
  },

  updateMods: (req, res) => {
    const index = cars.findIndex((el) => el.id === +req.params.id);
    const { addMods } = req.body;

    cars[index].mods += addMods;

    res.status(200).send(cars);
  },
};

//hello
//zoom zoom
const express = require("express");
const cors = require("cors");

//instance
const app = express();

//middle
app.use(express.json());
app.use(cors());

//endpoints
const {
  getCars,
  addCars,
  deleteCar,
  likeCar,
  updateMilage,
  updateMods,
} = require("./controller.js");

app.get("/cars", getCars);
app.post("/addCars", addCars);
app.delete("/deleteCar/:id", deleteCar);
app.put("/likeCar/:id", likeCar);
app.put("/updateMilage/:id", updateMilage);
app.put("/updateMods/:id", updateMods);

//app.listen server start

app.listen(4567, () => console.log("DOCKED at PORT 4567"));

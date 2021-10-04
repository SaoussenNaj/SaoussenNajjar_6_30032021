// importer express par require
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// creation variable app pour notre application et appeler express()ce qui permet de creer une application express
// Ajout d'un middleware et our passer à un autre on utilise next()
const app = express();
const userRoutes = require("./routes/user");
// Etablir la connexion avec la BD
mongoose
  .connect(
    "mongodb+srv://Saoussen_28:iris2801@cluster0.dw0rm.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log(error));

// middelware general appliqué a toytes les routes du serveur
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(bodyParser.json());

app.use("/api/auth", userRoutes);
// exporter cette const app pour qu'on puisse y acceder depuis les autres fichiers
module.exports = app;

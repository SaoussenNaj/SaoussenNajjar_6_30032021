const express = require("express");
const router = express.Router();
const signupControler = require("../controllers/signup");

// middelware post
//pour lire dans la BD
router.post("/signup", signupControler.createThing);

// pour chercher de la BD
router.get("api/auth/login/:id", (req, res, next) => {
  thing
    .findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(400).json({ error }));
});
// Pour enregisrer dans la BD
router.use("/api/auth/signup", (req, res, next) => {
  thing
    .find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.json({ error }));
});

// exporter le router de ce fichier
module.exports = router;

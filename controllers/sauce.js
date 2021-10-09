const Sauce = require("../models/Sauce");
const fs = require("fs");

// Create (Ajout d'une sauce)
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id; //l'id est généré automatiquement, donc on le supprime
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  console.log(req.body.sauce);
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
    .catch((error) => res.status(400).json({ error }));
};

// Delete (Suppression) d'une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// Update d'une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Read(lecture) d'une sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// Read(lecture) de toutes les sauces
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.postLike = (req, res, next) => {
  // const {userId, like} = req.body; //object destructuring
  const userId = req.body.userId;
  const like = req.body.like;
  const sauceId = req.params.id;
  const usersLiked = [];
  const usersDisliked = [];

  if (like === 1) {
    // 1- je recupere la sauce de la BD
    Sauce.findOne({ _id: sauceId })
      .then(() => res.status(200).json({ message: "Vous aimez la sauce !" }))
      .catch((error) => res.status(400).json({ error }));
    for (i = 0; i < usersLiked.length; i++) {
      const myData = new User(req.body.userId);
      myData
        .save()
        .then((idUser) => {
          res.send("idUser enregistré dans la base de données");
        })
        .catch((error) => {
          res.status(400).send("idUser non enregistré dans la base de donnée");
        });
      usersLiked = { userId };
    }
    console.log(usersLiked);
  }
  if (like === -1) {
    Sauce.findOne({ _id: sauceId })
      .then(() =>
        res.status(200).json({ message: "Vous n'aimez pas la sauce !" })
      )
      .catch((error) => res.status(400).json({ error }));
    for (i = 0; i < usersDisliked.length; i++) {
      usersDisliked = { userId };
    }
    console.log(usersDisliked);
  }
  if (like === 0) {
    Sauce.findOne({ _id: sauceId })
      .then(() =>
        res.status(200).json({
          message: "Vous n'avez pas donner votre avis sur cette sauce !",
        })
      )
      .catch((error) => res.status(400).json({ error }));
    if (usersLiked) {
      for (i = 0; i < usersLiked.length; i++) {
        deleteOne({ _id: req.params.userId })
          .then(() => res.status(200).json({ message: "UserId supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    }
    if (usersDisliked) {
      for (i = 0; i < usersDisliked.length; i++) {
        deleteOne({ _id: req.params.userId })
          .then(() => res.status(200).json({ message: "UserId supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    }
  }
};

const mongoose = require("mongoose");
// o crée un schéma de données contenant les champs souhaité pour chaque thing
const thingSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  userId: { type: String, required: true },
});
//  on exporte le  schéma en tant que modèle Mongoose appelé « Thing »
module.exports = mongoose.model("Thing", thingSchema);

const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://akhilfrancis69:MongoDB@cluster0.birvwqq.mongodb.net/");  // obtained from compass

//Connection String = mongodb+srv://akhilfrancis69:MongoDB@cluster0.birvwqq.mongodb.net/
// mongodb://localhost:27017/EWasteFacility

connect.then(() => {
    console.log("Database connected Successfully");
})
.catch(() => {
    console.log("Database cannot be connected");
});

const LoginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = new mongoose.model("user", LoginSchema);  //writecollectionnamehere = user, database name = EWasteFacility

module.exports = collection;
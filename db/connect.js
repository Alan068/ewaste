const mongoose = require("mongoose");

uri = "mongodb+srv://akhilfrancis69:MongoDB@cluster0.qrkomyl.mongodb.net/cluster()?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = () => {
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;
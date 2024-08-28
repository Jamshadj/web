const mongoose = require('mongoose');

function dbConnect() {
    mongoose.set('strictQuery', false);

    const dbUri = process.env.MONGO_URI || "mongodb://localhost:27017/crud"; // Use environment variable for URI

    mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });
}

module.exports = dbConnect;

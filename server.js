const app = require("./app");
require("dotenv").config();
const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err.message));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");

app.listen(process.env.PORT, () => {
    console.log(`El servicio se ha iniciado en http://localhost:${process.env.PORT}`);
});
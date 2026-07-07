const app = require("./app");

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`El servicio se ha iniciado en http://localhost:${PORT}`);
});
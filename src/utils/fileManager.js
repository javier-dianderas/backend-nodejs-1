const fs = require("fs/promises");

const readJson = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch(error) {
        console.error("Error leyendo archivo:", error);
    }
    return [];
}

const writeJson = async (filePath, data) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch(error) {
        console.error("Error escribiendo archivo:", error);
    }
}

module.exports = {
    readJson,
    writeJson
};
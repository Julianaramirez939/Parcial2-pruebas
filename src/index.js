const app = require("./app");
const { syncDB } = require("./models");

const PORT = 3000;

syncDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
  );
});

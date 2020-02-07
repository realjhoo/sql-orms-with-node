const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "movies.db"
});

// movie model
class Movie extends Sequelize.Model {}
Movie.init();

// async IIFE
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database...");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
})();

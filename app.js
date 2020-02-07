const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "movies.db"
});

// movie model
class Movie extends Sequelize.Model {}
Movie.init(
  {
    title: Sequelize.STRING
  },
  { sequelize }
); // same as {sequelize: sequelize}

// async IIFE
(async () => {
  // sync "Movies" table
  await sequelize.sync({ force: true });
  try {
    // instance of Movie class represents a database row
    const movie = await Movie.create({
      title: "Toy Story"
    });
    console.log(movie.toJSON());
    await sequelize.authenticate();
    console.log("Connected to database...");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
})();

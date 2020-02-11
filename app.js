const db = require("./db");
const { Movie, Person } = db.models;
const { Op } = db.Sequelize;

(async () => {
  await db.sequelize.sync({ force: true });

  try {
    const movie = await Movie.create({
      title: "Toy Story",
      runtime: 81,
      releaseDate: "1991-11-22",
      isAvailableOnVHS: true
    });

    const movie2 = await Movie.create({
      title: "The Incredibles",
      runtime: 115,
      releaseDate: "2004-04-14",
      isAvailableOnVHS: true
    });

    const movie3 = await Movie.build({
      title: "Toy Story 3",
      runtime: 103,
      releaseDate: "2010-06-18",
      isAvailableOnVHS: true
    });
    //
    await movie3.save(); // save the record
    //
    const movie4 = await Movie.build({
      title: "Not A Real Movie Part 2",
      runtime: 92,
      releaseDate: "2010-06-18",
      isAvailableOnVHS: true
    });
    await movie4.save();

    const godfather = await Movie.build({
      title: "The Godfather",
      runtime: 192,
      releaseDate: "2010-06-18",
      isAvailableOnVHS: true
    });
    await godfather.save();

    const godfather2 = await Movie.build({
      title: "godfather2",
      runtime: 192,
      releaseDate: "2010-06-18",
      isAvailableOnVHS: true
    });
    await godfather2.save();

    const learnIdo = await Movie.build({
      title: "Learn Ido",
      runtime: 2,
      releaseDate: "2010-06-18",
      isAvailableOnVHS: true
    });
    await learnIdo.save();

    //
    const person = await Person.create({
      firstName: "Hom",
      lastName: "Tanks"
    });

    const person2 = await Person.create({
      firstName: "Thunar",
      lastName: "Odinson"
    });

    const person3 = await Person.create({
      firstName: "Joe",
      lastName: "Biden"
    });

    const person4 = await Person.create({
      firstName: "Adolf",
      lastName: "Snitler"
    });

    const person5 = await Person.create({
      firstName: "Benny",
      lastName: "Trumpolini"
    });
    //
    ///
    //
    //

    const notAMovie = await Movie.findByPk(1);
    await notAMovie.destroy();
    //console.log(movieById.toJSON());
    const allMovies = await Movie.findAll();
    console.log(allMovies.map(movie => movie.toJSON()));

    //
    //
    //

    const movieByRuntime = await Movie.findOne({ where: { runtime: 115 } });
    // console.log(movieByRuntime.toJSON());

    const movies = await Movie.findAll({
      where: {
        runtime: 92,
        isAvailableOnVHS: true
      }
    });
    // console.log(movies.map(movie => movie.toJSON()));
    //
    // **********************************************
    // **********************************************
    const moviesWhere = await Movie.findAll({
      attributes: ["id", "title"],
      where: {
        title: {
          [Op.endsWith]: "story"
        }
      },
      order: [["id", "DESC"]]
    });
    //     runtime: {
    //       [Op.gt]: 95
    //     },
    //     title: {
    //       [Op.endsWith]: "3"
    //     }
    //   }
    // });
    // console.log(moviesWhere.map(movie => movie.toJSON()));

    //
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map(err => err.message);
      console.error("Validation errors: ", errors);
    } else {
      throw error;
    }
  }
})();

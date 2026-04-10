console.log("hello world");
const film1 = {
  title: "Killing of Flower Moon",
  director: "Martin Scorsese",
  times: ["15:35"],
  certificate: "15",
  duration: 112,
};
const film2 = {
  title: "Typist Artist Pirate King",
  director: "Carol Morley",
    times: ["12:00", "18:00"],
    certificate: "12A",
    duration: 108,
    };


//Goal: How to use film card component with an array

//Goal: How can we reuse functionality?

function createFilmCard(film) {
  const filmCard = document
    .getElementById("film-card-template")
    .content.cloneNode(true);

  filmCard.querySelector("h3").textContent = film.title;
  filmCard.querySelector("p").textContent = film.director;
  return filmCard;
}
document.body.append(createFilmCard(film1), createFilmCard(film2));

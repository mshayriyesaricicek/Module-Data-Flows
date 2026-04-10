console.log("hello world");
const film = {
  title: "Killing of Flower Moon",
  director: "Martin Scorsese",
  times: ["15:35"],
  certificate: "15",
  duration: 112,
};
console.log(film.title, "<---- film.title");

//Goal: Refactor this logic to use a film card template instead`

const filmCard = document
  .getElementById("film-card-template")
  .content.cloneNode(true);

console.log(filmCard);

filmCard.querySelector("h3").textContent = film.title;
filmCard.querySelector("p").textContent = film.director;
document.body.appendChild(filmCard);



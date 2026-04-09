console.log("hello world");
const film = {
  title: "Killing of Flower Moon",
  director: "Martin Scorsese",
  times: ["15:35"],
  certificate: "15",
  duration: 112,
};
console.log(film.title, "<---- film.title");

//Goal: Render the title of the  film card in the user interface

// create a film card (section)
// create a title element
// append title to that film card
// append film card to the dom

const filmCard = document.createElement("section");

const title = document.createElement("h1");
const director = document.createElement("p");
director.textContent = film.director;
title.textContent = film.title;
filmCard.appendChild(title);
filmCard.appendChild(director);

document.body.appendChild(filmCard);

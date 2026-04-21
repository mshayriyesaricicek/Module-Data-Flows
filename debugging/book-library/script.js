let myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];

function isValidAuthor(text) {
  for (let char of text) {
    const isLetter =
      (char >= "a" && char <= "z") ||
      (char >= "A" && char <= "Z");

    const isAllowedSymbol =  ". ',&-".includes(char); 

    if (!isLetter && !isAllowedSymbol) {
      return false;
    }
  }
  return true;
}

function isValidTitle(text) {
  for (let char of text) {
    const isLetter =
      (char >= "a" && char <= "z") ||
      (char >= "A" && char <= "Z");

    const isNumber = (char >= "0" && char <= "9");

    const isAllowedSymbol = ' \'.,!?&:-()"'.includes(char); 

    if (!isLetter && !isNumber && !isAllowedSymbol) {
      return false;
    }
  }
  return true;
}
// 2. then your other functions (populateStorage, render, etc)

function saveLibrary() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

document.getElementById("bookForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("check").checked;

  if (!isValidAuthor(author)) {
    alert("Invalid author name");
    return;
  }

  if (!isValidTitle(title)) {
    alert("Invalid book title");
    return;
  }

  populateStorage(title, author, pages, read);

  render();

  this.reset();

  $("#demo").collapse("hide");

});

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function

function populateStorage(title, author, pages, check) {
  let newBook = new Book(title, author, pages, check);
  myLibrary.push(newBook);
  saveLibrary();
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  const table = document.querySelector("#display tbody");
  table.innerHTML = "";

  //insert updated row and cells
  let length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    let row = table.insertRow();
    let titleCell = row.insertCell(0);
    let authorCell = row.insertCell(1);
    let pagesCell = row.insertCell(2);
    let wasReadCell = row.insertCell(3);
    let deleteCell = row.insertCell(4);
    titleCell.innerHTML = myLibrary[i].title;
    authorCell.innerHTML = myLibrary[i].author;
    pagesCell.innerHTML = myLibrary[i].pages;

    //add and wait for action for read/unread button
    let changeBut = document.createElement("button");

    changeBut.className = myLibrary[i].check
      ? "btn btn-success"
      : "btn btn-secondary";

    changeBut.innerText = myLibrary[i].check ? "Read" : "Unread";

    wasReadCell.appendChild(changeBut);

    changeBut.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      saveLibrary();
      render();
    });

    //add delete button to every row and render again
    let delBut = document.createElement("button");

    delBut.className = "btn btn-danger btn-sm";
    delBut.innerHTML = "Delete";

    deleteCell.appendChild(delBut);

    delBut.addEventListener("click", function () {
      myLibrary.splice(i, 1);

      saveLibrary();

      render();
    });
  }
}

function loadDefaultBooks() {
  if (myLibrary.length === 0) {
    populateStorage("Robinson Crusoe", "Daniel Defoe", "252", true);
    populateStorage(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      "127",
      false
    );
  }
}
window.addEventListener("load", function () {
  loadDefaultBooks();
  render();
});

const myLibrary = [];

function isValidAuthor(text) {
  for (let char of text) {
    const isLetter =
      (char >= "a" && char <= "z") || (char >= "A" && char <= "Z");

    const isAllowedSymbol = ". ',&-".includes(char);

    if (!isLetter && !isAllowedSymbol) {
      return false;
    }
  }
  return true;
}

function isValidTitle(text) {
  for (let char of text) {
    const isLetter =
      (char >= "a" && char <= "z") || (char >= "A" && char <= "Z");

    const isNumber = char >= "0" && char <= "9";

    const isAllowedSymbol = " '.,!?&:-()\"".includes(char);

    if (!isLetter && !isNumber && !isAllowedSymbol) {
      return false;
    }
  }
  return true;
}

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

  const success = populateStorage(title, author, pages, read);

  if (!success) return; // ❗ STOP if invalid

  render();
  saveLibrary();

  this.reset();
  $("#demo").collapse("hide");
});

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function

function populateStorage(title, author, pages, check) {
  if (!/^\d+$/.test(pages) || Number(pages) < 1 || Number(pages) > 5000) {
    alert("Pages must be a whole number between 1 and 5000");
    return false;
  }

  let newBook = new Book(title, author, pages, check);
  myLibrary.push(newBook);
  return true;
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  const tableBody = document.querySelector("#display tbody");
  tableBody.innerHTML = "";

  //insert updated row and cells
  let length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    let row = tableBody.insertRow();
    let titleCell = row.insertCell(0);
    let authorCell = row.insertCell(1);
    let pagesCell = row.insertCell(2);
    let wasReadCell = row.insertCell(3);
    let deleteCell = row.insertCell(4);
    titleCell.innerText = myLibrary[i].title;
    authorCell.innerText = myLibrary[i].author;
    pagesCell.innerText = myLibrary[i].pages;

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
      alert(`You've deleted title: ${myLibrary[i].title}`);
      myLibrary.splice(i, 1);

      saveLibrary();

      render();
    });
  }
}

function loadDefaultBooks() {
  myLibrary.push(
    new Book("Robinson Crusoe", "Daniel Defoe", "252", true),
    new Book("The Old Man and the Sea", "Ernest Hemingway", "127", false)
  );
}

window.onload = () => {
  myLibrary.length = 0;

  const saved = localStorage.getItem("myLibrary");

  if (saved && saved !== "[]") {
    myLibrary.push(...JSON.parse(saved));
  } else {
    loadDefaultBooks();
  }
  render();
};

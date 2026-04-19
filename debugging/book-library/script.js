let myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];

function saveLibrary() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

document.getElementById("bookForm").addEventListener("submit", function (e) {
  e.preventDefault();

const title = document.getElementById("title").value;
const author = document.getElementById("author").value;
const pages = document.getElementById("pages").value;
const read = document.getElementById("check").checked;

 if (!title || !author || !pages) {
    alert("Please fill all fields!");
    return;
  }

populateStorage(title, author, pages, read);

render();

  this.reset();

  $('#demo').collapse('hide');
});

function addBookToTable(title, author, pages, read) {
  const table = document.getElementById("display").getElementsByTagName("tbody")[0];

  const row = table.insertRow();

  row.insertCell(0).textContent = title;
  row.insertCell(1).textContent = author;
  row.insertCell(2).textContent = pages;
  row.insertCell(3).textContent = read ? "Yes" : "No";
}

function populateStorage(title, author, pages, check) {
 let newBook = new Book(title, author, pages, check);
    myLibrary.push(newBook);

    saveLibrary();
  }
      
//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
  function populateStorage(title, author, pages, check) {
    let newBook = new Book(title, author, pages, check);

  myLibrary.push(newBook);
  saveLibrary(); 
  };
  

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
   console.log("RENDER CALLED");
  
   const table = document.querySelector("#display tbody");
    table.innerHTML = "";

  //let rowsNumber = table.rows.length;
  //delete old table
  //for (let n = rowsNumber - 1; n > 0; n--) {
  //  table.deleteRow(n);
  //}
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

    //changeBut.id = i;

    changeBut.className = myLibrary[i].check
    ? "btn btn-success"
    : "btn btn-secondary";

    changeBut.innerText = myLibrary[i].check ? "Read" : "Unread";

    wasReadCell.appendChild(changeBut);

    //let readStatus = myLibrary[i].check ? "Yes" :  "No";
    //}

    changeBut.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      saveLibrary();
      render();
    });

    //add delete button to every row and render again
    let delBut = document.createElement("button");

    //delBut.id = i + 5;
    

    delBut.className = "btn btn-danger btn-sm";
    delBut.innerHTML = "Delete";

    deleteCell.appendChild(delBut);

    delBut.addEventListener("click", function () {
      //alert(`You've deleted title: ${myLibrary[i].title}`);
      myLibrary.splice(i, 1);

      saveLibrary();

      render();
    });
 }
} 
 window.addEventListener("load", function () {
  if (myLibrary.length === 0) {
    populateStorage("Robison Crusoe", "Daniel Defoe", "252", true);
    populateStorage( "The Old Man and the Sea", "Ernest Hemingway", "127", false);
    saveLibrary();
  }

  render();
 });

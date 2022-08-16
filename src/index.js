let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector(".add-toy-form")

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  //submit new toy info at form 
  form.addEventListener("submit", (event) => {
    event.preventDefault()
    formHandler(event);
  })

  //fetch toys data and create toy cards
  fetch("http://localhost:3000/toys")
    .then(data => data.json())
    .then(toys => toys.forEach(toy => createToyCard(toy)))
    
//add new DIV with h2, p, img, and button. Add event listener to button to increase likes
  function createToyCard(toy) {
    const toyCard =  document.createElement("div");
    toyCard.classList.add("card");
    const toyCollection = document.getElementById("toy-collection");
    toyCollection.append(toyCard);
    toyCard.innerHTML = `<h2>${toy.name}</h2><img src=${toy.image} class="toy-avatar"/><p id="p-${toy.id}">${toy.likes}</p><button class="like-btn" id=${toy.id}>Like</button>`

   
    const likeBtn = document.getElementById(`${toy.id}`)
    likeBtn.addEventListener("click",() => {handleLikes(toy.id)})
  }

  //submit form => post request to add new toy http://localhost:3000/toys
  //submit form => if successful toy added to DOM without reloading page

  function formHandler(event){
    const newToy = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    }

    createToyCard(newToy)

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newToy)
    }).then(res => res.json)
    .then(data => console.log(data))
  }

  //when like button is clicked => increase likes, send patch request to update
  function handleLikes(toyId) {
    const paraLikes = document.getElementById(`p-${toyId}`)
    const newNumberLikes = parseInt(paraLikes.textContent) + 1;
    paraLikes.textContent = newNumberLikes;

      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type" : "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": newNumberLikes
        })
      }).then(res => res.json)
      .then(data => console.log(data))
  }
});

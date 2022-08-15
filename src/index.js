let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

     

  const toyForm = document.querySelector(".add-toy-form")
  toyForm.addEventListener("submit", handleForm)


  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(data => data.forEach(toy => buildToyCard(toy)))
 


   function handlePatchRequest(toy, newLikes){
    fetch(`http://localhost:3000/toys/${toy}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({"likes": newLikes })
       })
       .then(data => data.json);
   } 

  function buildToyCard(toy){
    const toyCards = document.createElement("div")
    toyCards.classList.add("card");
    toyCards.innerHTML = `<h2>${toy.name}</h2><img src=${toy.image} class='toy-avatar'/><p>${toy.likes}</p><button class='like-btn' id="${toy.id}">Like</button>`
    const toyCollection = document.getElementById("toy-collection")
    toyCollection.append(toyCards); 
    
    const btn = document.getElementById(toy.id)

    btn.addEventListener("click", (event) => {
      const p = event.target.previousElementSibling
      const newLikes = parseInt(p.textContent) + 1
      p.textContent = newLikes;
      handlePatchRequest(toy.id, newLikes)
      
   })
  }

  

  // function increaseLikes(id){
  //   const p = document.querySelector(".card p")
  //   const newLikes = parseInt(p.textContent) + 1
  //   fetch(`http://localhost:3000/toys/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({"likes": newLikes })
  //   });

  // }



  function handleForm(e){
    e.preventDefault();

    const newToy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newToy)
    }).then(data => data.json)
  
    console.log(newToy)
   
  }
 

});

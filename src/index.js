document.addEventListener('DOMContentLoaded',function(){

  fetch('http://localhost:3000/pups')
    .then( res => res.json())
    .then( (dogs) => addToBar(dogs))


})


function addToBar(dogs) {
  let dogBar = document.querySelector("#dog-bar")
  dogs.forEach(function(dog){

    const span = document.createElement('span')
    span.textContent = dog.name
    span.id = dog.id

    dogBar.appendChild(span)
    span.addEventListener('click', function() {dogInfo(dog)})
  })
}

function dogInfo(dog) {

    const infoDiv = document.querySelector('#dog-info')

    if (infoDiv.hasChildNodes()) {
      infoDiv.removeChild(infoDiv.childNodes[0]);
    }
    const doggieCard = document.createElement('div')
    doggieCard.className = "card"
    const name = document.createElement('h2')
    name.textContent = dog.name

    const img = document.createElement('img')
    img.src = dog.image

    const status = document.createElement('button');
    status.id = "the_damn_button"
    if (dog.isGoodDog) {
      status.textContent = "Good Dog!"}
      else{
      status.textContent = "Bad Dog!"
    }
    status.addEventListener("click", function(){updateStatus(dog)})


    doggieCard.appendChild(name);
    doggieCard.appendChild(img);
    doggieCard.appendChild(status);
    infoDiv.appendChild(doggieCard)
}

function dogStatus(dog) {
  dog.isGoodDog = !dog.isGoodDog
}


function updateStatus(dog) {
   dogStatus(dog)

  console.log("test")
  fetch(`http://localhost:3000/pups/${dog.id}`,{
  headers:{
    'Content-Type': 'application/json',

  },
  method: "PATCH",
  // mode: "same-origin",
  body: JSON.stringify(dog)})
  const x = document.getElementById("the_damn_button")
  if (dog.isGoodDog) {
    x.textContent = "Good Dog!"}
    else{
    x.textContent = "Bad Dog!"
  }

}

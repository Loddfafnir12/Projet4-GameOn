function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Form data

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelectorAll(".close");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalClose.forEach((btn) => btn.addEventListener("click",hideModal));


// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// hide modal form
function hideModal(){
  modalbg.style.display ="none";
}

function validate(event) {
  if (event) event.preventDefault();

  const firstname = document.getElementById("first").value.trim();
  const lastname = document.getElementById("last").value.trim();
  const email = document.getElementById("email").value.trim();
  const radios = document.querySelectorAll('input[name="location"]');
  const cgu = document.getElementById("checkbox1");
  
  let isValid = true;

  if (firstname.length < 2) {
    console.log("Le prénom doit contenir au moins 2 caractères.");
    isValid = false;
  }

  if (lastname.length < 2) {
    console.log("Le nom doit contenir au moins 2 caractères.");
    isValid = false;
  }

  if (email === "") {
    console.log("L'email doit être rempli.");
    isValid = false;
  }
  let locationSelected = false;
  radios.forEach((radio) => {
    if (radio.checked) locationSelected = true;
  });

  if (!locationSelected) {
    console.log("Vous devez sélectionner un tournoi.");
    isValid = false;
  }
  if (!cgu.checked){
    console.log("cgu not checked")
    isValid = false;
  }

  

  if (isValid) {
    console.log("Formulaire valide !");
    console.log("Prénom :", firstname);
    console.log("Nom :", lastname);
    console.log("Email :", email);
    console.log("Tournoi choisi :", document.querySelector('input[name="location"]:checked').value);
    console.log("cgu value : ",cgu)

    
  } else {
    console.log("⚠ Formulaire invalide, corrigez les erreurs ci-dessus.");
  }

  // Ne jamais fermer la modal
  return false; 
}
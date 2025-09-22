function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// variable state

let formSuccess = false;

// DOM Elements
const form = document.querySelector('form[name="reserve"]'); 
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelectorAll(".close");
const formData = document.querySelectorAll(".formData");
const modalSuccessText = document.querySelector(".modal_success");
const modalBtnSuccess = document.querySelector(".btn-submit");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalClose.forEach((btn) => btn.addEventListener("click", hideModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// hide modal form
function hideModal(){
  modalbg.style.display = "none";
  // Si le formulaire a correctement été rempli on change le statut de formSuccess
  // Et on reset tout les elements de la modal et on réaffiche correctement les autres élements
  if(formSuccess == true){
    formSuccess = false;
    modalbg.style.display ="none";
    form.reset();
    formData.forEach(element => {
      element.style.display = "none";
      element.removeAttribute("data-error");
      element.removeAttribute("data-error-visible");
    });
  }
}

// Fonction pour afficher les erreurs
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const formDataDiv = field.closest('.formData');
  

  formDataDiv.setAttribute('data-error', message);
  formDataDiv.setAttribute('data-error-visible', 'true');
}

// Fonction pour masquer les erreurs
function hideError(fieldId) {
  const field = document.getElementById(fieldId);
  const formDataDiv = field.closest('.formData');
  
  // Retire les attributs d'erreur
  formDataDiv.removeAttribute('data-error');
  formDataDiv.setAttribute('data-error-visible', 'false');
}

// Fonction qui se déclanche au clic du btn-submit

function validate(event) {
  // Empeche le comportement de navigateur pour la gestion des inputs
  if (event) event.preventDefault();

  // Si formSuccess n'est pas true vérifie les champs pour valider ou non l'inscription
  if(formSuccess != true)
  {
  
  //Déclaration des variables pour la gestion des champs
  const firstname = document.getElementById("first").value.trim();
  const lastname = document.getElementById("last").value.trim();
  const email = document.getElementById("email").value.trim();
  const birth = document.getElementById("birthdate").value;
  const radios = document.querySelectorAll('input[name="location"]');
  const cgu = document.getElementById("checkbox1");
  
  
  /// Variable pour invalidé le submit en cas de champ non conforme
  let isValid = true;

  // Validation du prénom
  if (firstname.length < 2) {
    console.log("Le prénom doit contenir au moins 2 caractères.");
    showError("first", "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
    isValid = false;
  } else {
    hideError("first");
  }
  // Validation du nom
  if (lastname.length < 2) {
    console.log("Le nom doit contenir au moins 2 caractères.");
    showError("last", "Veuillez entrer 2 caractères ou plus pour le champ du nom.")
    isValid = false;
  }else{
    hideError("last");
  }
  // Validation du mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log("L'email doit être rempli.");
    showError("email", "Veuillez saisir un email valide (ex: nom@domaine.com).");
    isValid = false;
  }else {
    hideError("email");
  }
  // Validation de la date de naissance
  if (birth === ""){
    console.log("Veuillez entrer une date valide.");
    showError("birthdate","Vous devez entrer votre date de naissance.");
    isValid = false;
  }else{
    hideError("birthdate");
  }
  // Validation de la séléction de ville
  let locationSelected = false;
  radios.forEach((radio) => {
    if (radio.checked) locationSelected = true;
  });

   if (!locationSelected) {
    console.log("Vous devez sélectionner un tournoi.");
    showError("location1", "Vous devez sélectionner un tournoi.");
    isValid = false;
  } else {
    hideError("location1");
  }
  // Validation des CGU
  if (!cgu.checked){
    console.log("cgu not checked")
    showError("checkbox1","Vous devez vérifier que vous acceptez les termes et conditions.");
    isValid = false;
  }
  // Si tout les champs sont valide alors on console log les variable du formulaire
  // Puis on cache tout les elements du formulaire pour afficher un message de confirmation d'inscription

  if (isValid) {
    console.log("Formulaire valide !");
    console.log("Prénom :", firstname);
    console.log("Nom :", lastname);
    console.log("Email :", email);
    console.log("Tournoi choisi :", document.querySelector('input[name="location"]:checked').value);
    console.log("cgu value :", cgu)
    formData.forEach(element => {
      element.style.display = "none";
    });
    modalSuccessText.style.display ="block";
    //Change le text du bouton submit en fermer
    modalBtnSuccess.value = "Fermer";
    // On passe formSuccess a true pour gérer la suite de la modal
    formSuccess = true;
  } else {
    console.log("⚠ Formulaire invalide, corrigez les erreurs ci-dessus.");
    formSuccess = false;
  }

  return false; 
}// Si le formulaire est correctement rempli et envoyé alors le btn submit ferme la modal
if(formSuccess == true){
  hideModal();
}
}
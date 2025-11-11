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
const firstname = document.getElementById("first");
const lastname = document.getElementById("last");
const email = document.getElementById("email");
const birth = document.getElementById("birthdate");
const nbturnament = document.getElementById("quantity");
const radios = document.querySelectorAll('input[name="location"]');
const cgu = document.getElementById("checkbox1");

// Variable
const nameRegex = /^([A-Za-z|\s]{2,15})?([-]{0,1})?([A-Za-z|\s]{2,15})$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regexQuantity = /^([0-9]{1,2})$/;

// Message

const message = {
    name: 'Minimum 2 caractères, maximum 15 caractères. Les chiffres et caractères spéciaux différents de - ne sont pas autorisés',
    email: 'Veuillez renseigner une adresse mail valide.',
    birthdate: 'Vous devez avoir plus de 18 ans pour participer',
    quantity: 'Veuillez renseigner un nombre entre 0 et 99',
    city: 'Veuillez sélectionner une ville',
    conditions: `Vous devez accepter les conditions d'utilisation`,
};

 

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

//Fonction pour checker les données dans les champs
function checkInputValue(regex,element,message){
  if(!regex.test(element.value  )) {
    showError(element,message);
    return false;
  }
  hideError(element);
  return true;
}
// Fonction pour checker l'age
function checkIfUserIsYoungerThan18(element, message) {
    const birthdate = new Date(element.value);
    let difference = Date.now() - birthdate.getTime();
    difference = new Date(difference);
    const userAge = difference.getFullYear() - 1970;

    const currentYear = new Date().getFullYear();
    const birthYear = birthdate.getFullYear();
    
    if (birthYear < currentYear - 100 || birthYear.toString().length !== 4 || userAge < 18) {
        showError(element,message);
        return false;
    } 
    hideError(element);
    return true;
};
// Fonction pour checker si la ville est coché
function checkIfCitySelected(cities, message) {
    const isChecked = Array.from(cities).some(radio => radio.checked);
    if (!isChecked) {
        showError(cities[0], message);
        return false;
    };
    hideError(cities[0]);
    return true;
};
//Fonction pour vérifier si les conditions sont acceptées
function checkIfConditionsAccepted(element, message) {
    if(!element.checked) {
        showError(element, message);
        return false;
    } 
    hideError(element);
    return true;  
};
// Fonction pour afficher les erreurs
function showError(element, message) {
  const formDataDiv = element.closest('.formData');
  formDataDiv.setAttribute('data-error', message);
  formDataDiv.setAttribute('data-error-visible', 'true');
}
/*
function showError(element, message) {
  const field = element.closest('.formData');
  const formDataDiv = field.closest('.formData');
  

  formDataDiv.setAttribute('data-error', message);
  formDataDiv.setAttribute('data-error-visible', 'true');
}*/

// Fonction pour masquer les erreurs
function hideError(element) {
  const formDataDiv = element.closest('.formData');
  formDataDiv.removeAttribute('data-error');
  formDataDiv.setAttribute('data-error-visible', 'false');
}
/*
function hideError(fieldId) {
  const field = document.getElementById(fieldId);
  const formDataDiv = field.closest('.formData');
  
  // Retire les attributs d'erreur
  formDataDiv.removeAttribute('data-error');
  formDataDiv.setAttribute('data-error-visible', 'false');
}*/
firstname.addEventListener('input', () => checkInputValue(nameRegex, firstname, message.name));
lastname.addEventListener('input', () => checkInputValue(nameRegex, lastname, message.name));
email.addEventListener('input', () => checkInputValue(emailRegex, email, message.email));
birth.addEventListener('input', () => checkIfUserIsYoungerThan18(birth,message.birthdate));
nbturnament.addEventListener('input', () => checkInputValue(regexQuantity,nbturnament,message.quantity));
radios.forEach(radio => radio.addEventListener('change', () => checkIfCitySelected(radios,message.city)));
cgu.addEventListener('input', () => checkIfConditionsAccepted(cgu,message.conditions));

// Fonction qui se déclanche au clic du btn-submit
/*
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
  const nbturnament = document.getElementById("quantity").value;
  const radios = document.querySelectorAll('input[name="location"]');
  const cgu = document.getElementById("checkbox1");
  
  
  
  /// Variable pour invalidé le submit en cas de champ non conforme
  let isValid = true;

  // Validation du prénom
  if (firstname.length < 2) {
    console.log("Le prénom doit contenir au moins 2 caractères.");
    showError(firstname, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
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
 
  if (!emailRegex.test(email)) {
    console.log("L'email doit être rempli.");
    showError(email, "Veuillez saisir un email valide (ex: nom@domaine.com).");
    isValid = false;
  }else {
    hideError("email");
  }
  // Validation de la date de naissance
  if (birth === ""){
    console.log("Veuillez entrer une date valide.");
    showError(birth,"Vous devez entrer votre date de naissance.");
    isValid = false;
  }else{
    hideError("birthdate");
  }
  if (nbturnament === ""){
    console.log("Veuillez entrer un nombre de tournoi");
    showError(nbturnament,"Veuillez entrer un nombre de tournoi.");
    isValid = false;
  }
  else{
    hideError("quantity");
  }
  // Validation de la séléction de ville
  let locationSelected = false;
  radios.forEach((radio) => {
    if (radio.checked) locationSelected = true;
  });

   if (!locationSelected) {
    console.log("Vous devez sélectionner un tournoi.");
    showError(radios, "Vous devez sélectionner un tournoi.");
    isValid = false;
  } else {
    hideError("location1");
  }
  // Validation des CGU
  if (!cgu.checked){
    console.log("cgu not checked")
    showError(cgu,"Vous devez vérifier que vous acceptez les termes et conditions.");
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
}*/
function validate(event) {
    if (event) event.preventDefault();

    if(formSuccess != true)
    {
      // Check if all conditions are valid
    const isConditionsAccepted = checkIfConditionsAccepted(cgu, message.conditions);
    const isCitySelected = checkIfCitySelected(radios, message.city);
    const isUserAgeValid = checkIfUserIsYoungerThan18(birth, message.birthdate);
    const isQuantityValid = checkInputValue(regexQuantity,nbturnament,message.quantity)
    const isEmailValid = checkInputValue(emailRegex, email, message.email);
    const isLastNameValid = checkInputValue(nameRegex, lastname, message.name);
    const isFirstNameValid = checkInputValue(nameRegex, firstname, message.name);

    // If all conditions are valid 
    if (isConditionsAccepted && isCitySelected && isUserAgeValid && isQuantityValid && isEmailValid && isLastNameValid && isFirstNameValid) {
      formData.forEach(element => {
      element.style.display = "none";
      });
      modalSuccessText.style.display ="block";
    //Change le text du bouton submit en fermer
       modalBtnSuccess.value = "Fermer";
    // On passe formSuccess a true pour gérer la suite de la modal
    formSuccess = true;
    return false;
    
    }
    return false;
    

    
    } 
    if(formSuccess == true){
    hideModal();
}
};

// Send Form
//form.addEventListener('submit', e => validate(e));

// Close Success Modal
//document.querySelector('.modal_content button').addEventListener('click', () => modalSuccess.style.display = "none");
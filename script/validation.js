const form = document.getElementById("form");

// Section 1 — Informations personnelles
const nom = document.getElementById("nom");
const prenom = document.getElementById("prenom");
const dateNaissance = document.getElementById("dateNaissance");
const email = document.getElementById("email");
const tel = document.getElementById("tel");

// Section 2 — Informations de l'entreprise
const entreprise = document.getElementById("entreprise");
const secteur = document.getElementById("secteur");
const site = document.getElementById("site");
const tailleGroup = document.getElementById("taille-group");

// Section 3 — Paramètres du compte
const pseudo = document.getElementById("pseudo");
const planGroup = document.getElementById("plan-group");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const cgu = document.getElementById("cgu");
const newsletter = document.getElementById("newsletter");

// Barres de force du mot de passe
const bar1 = document.getElementById("bar1");
const bar2 = document.getElementById("bar2");
const bar3 = document.getElementById("bar3");
const bar4 = document.getElementById("bar4");

// ================================================
// SOUMISSION
// ================================================

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (validateForm()) {
    window.location.href = "confirmation.html";
  }
});

// ================================================
// VALIDATION COMPLÈTE
// ================================================

const validateForm = () => {
  let noError = true;

  // --------------------------------------------
  // SECTION 1 — INFORMATIONS PERSONNELLES
  // --------------------------------------------

  // Validation nom
  const nomValue = nom.value.trim();
  if (nomValue === "") {
    setError(nom, "Nom est requis");
    noError = false;
  } else {
    setSuccess(nom);
  }

  // Validation prénom
  const prenomValue = prenom.value.trim();
  if (prenomValue === "") {
    setError(prenom, "Prénom est requis");
    noError = false;
  } else {
    setSuccess(prenom);
  }

  // Validation date de naissance (18 ans minimum)
  const dateValue = dateNaissance.value;
  if (dateValue === "") {
    setError(dateNaissance, "Date de naissance requise");
    noError = false;
  } else {
    const birthDate = new Date(dateValue);
    const limite = new Date();
    limite.setFullYear(limite.getFullYear() - 18);

    if (birthDate > limite) {
      setError(dateNaissance, "Vous devez avoir au moins 18 ans");
      noError = false;
    } else {
      setSuccess(dateNaissance);
    }
  }

  // Validation email
  const emailValue = email.value.trim();
  if (emailValue === "") {
    setError(email, "Email est requis");
    noError = false;
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Email invalide");
    noError = false;
  } else {
    setSuccess(email);
  }

  // Validation téléphone (facultatif — format si rempli)
  const telValue = tel.value.trim();
  if (telValue !== "" && !/^[+\d][\d\s\-().]{6,19}$/.test(telValue)) {
    setError(tel, "Format de téléphone invalide");
    noError = false;
  } else {
    setSuccess(tel);
  }

  // --------------------------------------------
  // SECTION 2 — INFORMATIONS DE L'ENTREPRISE
  // --------------------------------------------

  // Validation entreprise
  const entrepriseValue = entreprise.value.trim();
  if (entrepriseValue === "") {
    setError(entreprise, "Nom de l'entreprise requis");
    noError = false;
  } else {
    setSuccess(entreprise);
  }

  // Validation secteur
  const secteurValue = secteur.value;
  if (secteurValue === "") {
    setError(secteur, "Veuillez choisir un secteur");
    noError = false;
  } else {
    setSuccess(secteur);
  }

  // Validation site web (facultatif — format https si rempli)
  const siteValue = site.value.trim();
  if (siteValue !== "" && !/^https?:\/\/.+/.test(siteValue)) {
    setError(site, "L'URL doit commencer par https://");
    noError = false;
  } else {
    setSuccess(site);
  }

  // Validation taille d'équipe
  const tailleChecked = document.querySelector('input[name="taille"]:checked');
  if (!tailleChecked) {
    setErrorGroupe(tailleGroup.closest(".form__input"), "Veuillez sélectionner une taille d'équipe");
    noError = false;
  } else {
    setSuccessGroupe(tailleGroup.closest(".form__input"));
  }

  // --------------------------------------------
  // SECTION 3 — PARAMÈTRES DU COMPTE
  // --------------------------------------------

  // Validation nom d'utilisateur (3-20 caractères, sans espaces)
  const pseudoValue = pseudo.value.trim();
  if (pseudoValue === "") {
    setError(pseudo, "Nom d'utilisateur requis");
    noError = false;
  } else if (!/^\S{3,20}$/.test(pseudoValue)) {
    setError(pseudo, "3 à 20 caractères, sans espaces");
    noError = false;
  } else {
    setSuccess(pseudo);
  }

  // Validation plan choisi
  const planChecked = document.querySelector('input[name="plan"]:checked');
  if (!planChecked) {
    setErrorGroupe(planGroup.closest(".form__input"), "Veuillez choisir un plan");
    noError = false;
  } else {
    setSuccessGroupe(planGroup.closest(".form__input"));
  }

  // Validation mot de passe
  const passwordValue = password.value.trim();
  if (passwordValue === "") {
    setError(password, "Mot de passe est requis");
    noError = false;
  } else if (passwordValue.length < 8) {
    setError(password, "Minimum 8 caractères");
    noError = false;
  } else if (!/[A-Z]/.test(passwordValue)) {
    setError(password, "Doit contenir au moins une majuscule");
    noError = false;
  } else if (!/[a-z]/.test(passwordValue)) {
    setError(password, "Doit contenir au moins une minuscule");
    noError = false;
  } else if (!/[0-9]/.test(passwordValue)) {
    setError(password, "Doit contenir au moins un chiffre");
    noError = false;
  } else if (!/[!@#$%^&*]/.test(passwordValue)) {
    setError(password, "Doit contenir au moins un caractère spécial (!@#$%^&*)");
    noError = false;
  } else {
    setSuccess(password);
  }

  // Validation confirmation mot de passe
  const confirmPasswordValue = confirmPassword.value.trim();
  if (confirmPasswordValue === "") {
    setError(confirmPassword, "Confirmation requise");
    noError = false;
  } else if (confirmPasswordValue !== passwordValue) {
    setError(confirmPassword, "Les mots de passe ne correspondent pas");
    noError = false;
  } else {
    setSuccess(confirmPassword);
  }

  // Validation conditions d'utilisation
  if (!cgu.checked) {
    setErrorGroupe(
      cgu.closest(".form__options--colonne"),
      "Vous devez accepter les conditions d'utilisation",
    );
    noError = false;
  } else {
    setSuccessGroupe(cgu.closest(".form__options--colonne"));
  }

  return noError;
};

// ================================================
// UTILITAIRES
// ================================================

const isValidEmail = (email) => {
  const re = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

const setError = (element, message) => {
  const formInput = element.closest(".form__input");
  const errorDisplay = formInput.querySelector(".form__error");
  errorDisplay.innerText = message;
  formInput.classList.add("erreur");
  formInput.classList.remove("succes");
};

const setSuccess = (element) => {
  const formInput = element.closest(".form__input");
  const errorDisplay = formInput.querySelector(".form__error");
  errorDisplay.innerText = "";
  formInput.classList.add("succes");
  formInput.classList.remove("erreur");
};

const setErrorGroupe = (container, message) => {
  const errorDisplay = container.querySelector(".form__error");
  if (errorDisplay) errorDisplay.innerText = message;
  container.classList.add("erreur");
  container.classList.remove("succes");
};

const setSuccessGroupe = (container) => {
  const errorDisplay = container.querySelector(".form__error");
  if (errorDisplay) errorDisplay.innerText = "";
  container.classList.add("succes");
  container.classList.remove("erreur");
};

// ================================================
// BARRE DE FORCE DU MOT DE PASSE
// ================================================

password.addEventListener("input", () => {
  const val = password.value;
  const bars = [bar1, bar2, bar3, bar4];

  let force = 0;
  if (val.length >= 8) force++;
  if (/[A-Z]/.test(val)) force++;
  if (/[0-9]/.test(val)) force++;
  if (/[!@#$%^&*]/.test(val)) force++;

  bars.forEach((bar, index) => {
    bar.className = "form__force-bar";
    if (index < force) bar.classList.add("s" + force);
  });
});

//hamburger start
const navigation = document.querySelector(".N-nav");
document.querySelector(".N-hamburger").onclick = function () {
  this.classList.toggle("N-hamburger__open");
  const icon = this.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
  navigation.classList.toggle("N-nav__open");
};
//hamburger end
//login-signup-change start
const loginBox = document.querySelector(".login");
const signupBox = document.querySelector(".signup");
document.getElementById("hiddenLogin").onclick = function (event) {
  event.preventDefault();
  loginBox.classList.toggle("login__hidden");
  signupBox.classList.toggle("signup__open");
};
document.getElementById("hiddenSignup").onclick = function (event) {
  event.preventDefault();
  loginBox.classList.remove("login__hidden");
  signupBox.classList.remove("signup__open");
};
document.getElementById("signSubmit").onclick = function (event) {
  event.preventDefault();
  loginBox.classList.remove("login__hidden");
  signupBox.classList.remove("signup__open");
};
//login-signup-change start end
//sign validation start
const signUsernameInput = document.getElementById("signUsername");
const signPasswordInput = document.getElementById("signPassword");
const signEmailInput = document.getElementById("signEmail");
const signSubmit = document.getElementById("signSubmit");
const signMessage = document.getElementById("signMessage");

function validateSignUsername() {
  const signUsername = signUsernameInput.value.trim();
  if (signUsername === "") {
    signUsernameInput.classList.remove("signup__valid");
    signUsernameInput.classList.add("signup__invalid");
  } else {
    signUsernameInput.classList.remove("signup__invalid");
    signUsernameInput.classList.add("signup__valid");
  }
}
function validateSignPassword() {
  const signPassword = signPasswordInput.value.trim();
  if (signPassword === "") {
    signPasswordInput.classList.remove("signup__valid");
    signPasswordInput.classList.add("signup__invalid");
  } else {
    signPasswordInput.classList.remove("signup__invalid");
    signPasswordInput.classList.add("signup__valid");
  }
}
function validateSignEmail() {
  const signEmail = signEmailInput.value.trim();
  if (signEmail === "") {
    signEmailInput.classList.remove("signup__valid");
    signEmailInput.classList.add("signup__invalid");
  } else {
    signEmailInput.classList.remove("signup__invalid");
    signEmailInput.classList.add("signup__valid");
  }
}
signUsernameInput.addEventListener("blur", validateSignUsername);
signPasswordInput.addEventListener("blur", validateSignPassword);
signEmailInput.addEventListener("blur", validateSignEmail);
//sign validation end
//login validation start
//login validation end

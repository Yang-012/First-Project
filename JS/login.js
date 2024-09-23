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
//login start
const loginBox = document.querySelector(".login");
const signupBox = document.querySelector(".signup");
document.getElementById("hiddenLogin").onclick = function (event) {
  event.preventDefault();
  loginBox.classList.toggle("login__hidden");
};
document.getElementById("hiddenSignup").onclick = function (event) {
  event.preventDefault();
  signupBox.classList.toggle("signup__hidden");
};
//login end

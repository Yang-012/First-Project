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
const signPasswordInputRepeat = document.getElementById("signPasswordRepeat");
const signEmailInput = document.getElementById("signEmail");
const signSubmit = document.getElementById("signSubmit");
const signMessage = document.getElementById("signMessage");
const currentErrors = {};

function validateField(field) {
  let isValid = true;
  let errorMsg = "";

  switch (field.id) {
    case "signUsername":
      const signUsername = field.value.trim();
      if (signUsername === "") {
        isValid = false;
        errorMsg = "請輸入使用者名稱!";
      }
      break;
    case "signPassword":
      const signPassword = field.value.trim();
      if (signPassword === "") {
        isValid = false;
        errorMsg = "請輸入密碼!";
      }
      break;
    case "signPasswordRepeat":
      const password = signPasswordInput.value.trim();
      const passwordRepeat = field.value.trim();
      if (passwordRepeat === "") {
        isValid = false;
        errorMsg = "請確認密碼!";
      } else if (password !== passwordRepeat) {
        isValid = false;
        errorMsg = "密碼不匹配!";
      }
      break;
    case "signEmail":
      const signEmail = field.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (signEmail === "") {
        isValid = false;
        errorMsg = "請輸入電子郵件!";
      } else if (!emailPattern.test(signEmail)) {
        isValid = false;
        errorMsg = "請輸入有效的電子郵件!";
      }
      break;
    default:
      break;
  }

  if (!isValid) {
    field.classList.remove("signup__valid");
    field.classList.add("signup__invalid");
    currentErrors[field.id] = errorMsg;
  } else {
    field.classList.remove("signup__invalid");
    field.classList.add("signup__valid");
    delete currentErrors[field.id];
  }

  updateErrorMessage();
  toggleSubmitButton()
}
function updateErrorMessage() {
  const errors = Object.values(currentErrors);
  if (errors.length > 0) {
    signMessage.innerHTML = `<p>${errors.join("<br>")}</p>`;
    signMessage.style.display = "block";
    signMessage.style.color = "red";
  } else {
    signMessage.style.display = "none";
  }
}
function toggleSubmitButton() {
  if (
      Object.keys(currentErrors).length === 0 &&
      signUsernameInput.value.trim() !== "" &&
      signPasswordInput.value.trim() !== "" &&
      signPasswordInputRepeat.value.trim() !== "" &&
      signEmailInput.value.trim() !== ""
  ) {
      signSubmit.disabled = false;
  } else {
      signSubmit.disabled = true;
  }
}

signUsernameInput.addEventListener("blur", () => validateField(signUsernameInput));
signPasswordInput.addEventListener("blur", () => validateField(signPasswordInput));
signPasswordInputRepeat.addEventListener("blur", () => validateField(signPasswordInputRepeat));
signEmailInput.addEventListener("blur", () => validateField(signEmailInput));

//sign validation end

//login validation start
//login validation end

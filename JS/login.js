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

const loginUsernameInput = document.getElementById("loginUsername");
const loginPasswordInput = document.getElementById("loginPassword");
const loginSubmit = document.getElementById("loginSubmit");
const loginMessage = document.getElementById("loginMessage");

const currentSignErrors = {};
const currentLoginErrors = {};

function validatesign(sign) {
  let isValid = true;
  let Msg = "";

  switch (sign.id) {
    case "signUsername":
      const signUsername = sign.value.trim();
      if (signUsername === "") {
        isValid = false;
        Msg = "請輸入使用者名稱!";
      }
      break;
    case "signPassword":
      const signPassword = sign.value.trim();
      if (signPassword === "") {
        isValid = false;
        Msg = "請輸入密碼!";
      }
      break;
    case "signPasswordRepeat":
      const password = signPasswordInput.value.trim();
      const passwordRepeat = sign.value.trim();
      if (passwordRepeat === "") {
        isValid = false;
        Msg = "請確認密碼!";
      } else if (password !== passwordRepeat) {
        isValid = false;
        Msg = "密碼錯誤!";
      }
      break;
    case "signEmail":
      const signEmail = sign.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (signEmail === "") {
        isValid = false;
        Msg = "請輸入電子郵件!";
      } else if (!emailPattern.test(signEmail)) {
        isValid = false;
        Msg = "請重新輸入電子郵件!";
      }
      break;
    default:
      break;
  }

  if (!isValid) {
    sign.classList.remove("signup__valid");
    sign.classList.add("signup__invalid");
    currentSignErrors[sign.id] = Msg;
  } else {
    sign.classList.remove("signup__invalid");
    sign.classList.add("signup__valid");
    delete currentSignErrors[sign.id];
  }

  updateErrorMessage();
  toggleSubmitButton();
}
function updateErrorMessage() {
  const signErrors = Object.values(currentSignErrors);
  const loginErrors = Object.values(currentLoginErrors);
  if (signErrors.length > 0) {
    signMessage.innerHTML = `<p>${signErrors.join("<br>")}</p>`;
    signMessage.style.display = "block";
    signMessage.style.color = "red";
  } else {
    signMessage.style.display = "none";
  }
  if (loginErrors.length > 0) {
    loginMessage.innerHTML = `<p>${loginErrors.join("<br>")}</p>`;
    loginMessage.style.display = "block";
    loginMessage.style.color = "red";
  } else {
    loginMessage.style.display = "none";
  }
}
function toggleSubmitButton() {
  if (
    Object.keys(currentSignErrors).length === 0 &&
    signUsernameInput.value.trim() !== "" &&
    signPasswordInput.value.trim() !== "" &&
    signPasswordInputRepeat.value.trim() !== "" &&
    signEmailInput.value.trim() !== ""
  ) {
    signSubmit.disabled = false;
  } else {
    signSubmit.disabled = true;
  }
  if (
    Object.keys(currentLoginErrors).length === 0 &&
    loginUsernameInput.value.trim() !== "" &&
    loginPasswordInput.value.trim() !== ""
  ) {
    loginSubmit.disabled = false;
  } else {
    loginSubmit.disabled = true;
  }
}

function setupToLocalStorage() {
  signSubmit.addEventListener("click", () => {
    let userData = JSON.parse(localStorage.getItem("userData")) || [];
    const username = signUsernameInput.value.trim();
    const password = signPasswordInput.value.trim();
    const email = signEmailInput.value.trim();
    userData.push({
      userName: username,
      email: email,
      userPassword: password,
      isLogin: false,
    });
    localStorage.setItem("userData", JSON.stringify(userData));
  });
}
function validateLogin(login) {
  let isValid = true;
  let Msg = "";
  const storedUsers = JSON.parse(localStorage.getItem("userData")) || [];
  switch (login.id) {
    case "loginUsername":
      const loginUsername = login.value.trim();
      if (
        !loginUsername ||
        !storedUsers.some((u) => u.userName === loginUsername)
      ) {
        isValid = false;
        Msg = "請輸入有效的帳號!";
      }
      break;
    case "loginPassword":
      const loginPassword = login.value.trim();
      if (
        !loginPassword ||
        !storedUsers.some((u) => u.userPassword === loginPassword)
      ) {
        isValid = false;
        Msg = "請輸入有效的密碼!";
      }
      break;
    default:
      break;
  }

  if (!isValid) {
    login.classList.remove("--valid");
    login.classList.add("--invalid");
    currentLoginErrors[login.id] = Msg;
  } else {
    login.classList.remove("--invalid");
    login.classList.add("--valid");
    delete currentLoginErrors[login.id];
  }
  updateErrorMessage();
  toggleSubmitButton();
}

signUsernameInput.addEventListener("blur", () =>
  validatesign(signUsernameInput)
);
signPasswordInput.addEventListener("blur", () =>
  validatesign(signPasswordInput)
);
signPasswordInputRepeat.addEventListener("blur", () =>
  validatesign(signPasswordInputRepeat)
);
signEmailInput.addEventListener("blur", () => validatesign(signEmailInput));
loginUsernameInput.addEventListener("blur", () =>
  validateLogin(loginUsernameInput)
);
loginPasswordInput.addEventListener("blur", () =>
  validateLogin(loginPasswordInput)
);
loginSubmit.addEventListener("click", (e) => {
  const currentUsers = JSON.parse(localStorage.getItem("userData"));
  const inputUserName = loginUsernameInput.value.trim();
  const currentUserIndex = currentUsers.findIndex(
    (user) => user.userName === inputUserName
  );
  e.preventDefault();
  console.log(currentUsers);
  console.log(currentUserIndex);
  loginSubmit.value = "登入成功.....請稍後";
  currentUsers[currentUserIndex].isLogin = true;
  localStorage.setItem("userData", JSON.stringify(currentUsers));
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
});
setupToLocalStorage();

//sign validation end
//cartQuantity display start

let cartQuantityElement = document.querySelector(".N-nav__openCart");
function getTotalCartQuantity() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.reduce((total, item) => total + Number(item.quantity), 0);
}

function updateTotalCartQuantity() {
  const totalQuantity = getTotalCartQuantity();
  cartQuantityElement.textContent = totalQuantity;
  if (totalQuantity > 0) {
    cartQuantityElement.classList.remove("openCart--close");
  } else {
    cartQuantityElement.classList.add("openCart--close");
  }
}
updateTotalCartQuantity();
//cartQuantity display end

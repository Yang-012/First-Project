//login start
export function navberChange() {
  const navberContainer = document.getElementById("navber");
  const userData = JSON.parse(localStorage.getItem("userData")) || [];
  const loggedInUser = userData.find((user) => user.isLogin === true);
  if (loggedInUser) {
    const logoutListItem = document.createElement("li");
    logoutListItem.classList.add("N-nav__link");

    const logoutLink = document.createElement("a");
    logoutLink.href = "index.html";
    logoutLink.innerHTML = `<i class="fas fa-sign-out-alt"></i><span>登出</span>`;

    logoutListItem.appendChild(logoutLink);
    navberContainer.appendChild(logoutListItem);

    logoutLink.addEventListener("click", () => {
      const userIndex = userData.findIndex(
        (user) => user.userName === loggedInUser.userName
      );
      if (userIndex !== -1) {
        userData[userIndex].isLogin = false;
        localStorage.setItem("userData", JSON.stringify(userData));
        location.reload();
      }
    });
  } else {
    const loginListItem = document.createElement("li");
    loginListItem.classList.add("N-nav__link");

    const loginLink = document.createElement("a");
    loginLink.href = "login.html";
    loginLink.innerHTML = `<i class="fas fa-sign-in-alt"></i><span>登入</span>`;

    loginListItem.appendChild(loginLink);
    navberContainer.appendChild(loginListItem);
  }
}
//login end

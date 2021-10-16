(function () {
  const backdrop = document.querySelector(".backdrop");
  const dropdownBtn = document.querySelector("#dropdown-btn");
  const openDropdown = document.querySelector("#open-dropdown");
  const closeDropdown = document.querySelector("#close-dropdown");

  dropdownBtn.addEventListener("click", function (e) {
    const isOpen = backdrop.classList.contains("visible");
    backdrop.classList.toggle("visible");
    openDropdown.classList.toggle("visible");
    closeDropdown.classList.toggle("visible");
    // phoneImg.classList.toggle("visible");

    if (isOpen) {
      document.body.style.overflowY = "visible";
    } else {
      document.body.style.overflowY = "hidden";
    }
  });

  const btnSignIn = document.querySelector("#sign-in-btn");
  const btnSignUp = document.querySelector("#sign-up-btn");
  const signIn = document.querySelector(".sign-in");
  const signUp = document.querySelector(".sign-up");

  btnSignUp.addEventListener("click", (e) => {
    signIn.classList.add("sign-in-hidden");
    signUp.classList.add("sign-up-show");
    console.log("clicked..");

    e.preventDefault();
  });

  btnSignIn.addEventListener("click", (e) => {
    signIn.classList.remove("sign-in-hidden");
    signUp.classList.remove("sign-up-show");
    e.preventDefault();
  });
})();

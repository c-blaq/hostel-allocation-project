(function () {
  const btnRent = document.querySelector(".btnRent");
  const payment = document.querySelector(".bb");
  const input = document.querySelector(".payment");

  btnRent.addEventListener("click", () => {
    payment.classList.add("visible");
    input.classList.add("visible");
    console.log("clicked..");
  });
})();

window.addEventListener("load", () => {
  const startBtn = document.querySelector(".button");

  startBtn.addEventListener("click", () => {
    Game.init();
    const WelcomeBoard = document.getElementById("welcome");
    WelcomeBoard.style.display = "none";
    const Canvas = document.getElementById("canvas");
    Canvas.style.display = "flex"; // fixed typo here
  });
});

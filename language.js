let buttonEN = document.getElementById("btnEN");
let buttonDK = document.getElementById("btnDK");

let textEN = document.getElementsByClassName("langEN");
let textDK = document.getElementsByClassName("langDK");

console.log("Hi there Maz")


buttonEN.addEventListener("click", () => {

  let textEN = document.getElementsByClassName("langEN");
  let textDK = document.getElementsByClassName("langDK");

  console.log(textEN)
      for (let i = 0; i < textEN.length; i++) {
          console.log(textEN[i])
        textEN[i].classList.remove("hide");
      }

      for (let i = 0; i < textDK.length; i++) {
        textDK[i].classList.add("hide");
      }
})

buttonDK.addEventListener("click", () => {

  let textEN = document.getElementsByClassName("langEN");
  let textDK = document.getElementsByClassName("langDK");

      for (let i = 0; i < textEN.length; i++) {
        textEN[i].classList.add("hide");
      }

      for (let i = 0; i < textDK.length; i++) {
        textDK[i].classList.remove("hide");
      }
})

let infoSegments = document.getElementsByClassName("linker");
let icons = [];
let text = [];
let hexVals = ["#5099ec", "#c74442", "#922fc3", "#f76819"];
let glowVals = ["rgba(23, 117, 212, 0.8)", "rgba(230, 0, 99, 0.8)", "rgba(120, 247, 82, 0.8)"];


let securitySegments = document.getElementsByClassName("securitySegment");
let circles = [];

for (let i = 0; i < securitySegments.length; i++)
{
  circles.push(securitySegments[i].getElementsByClassName("iconContainer"));
}

for (let i = 0; i < securitySegments.length; i++) {
  securitySegments[i].addEventListener("mouseenter", () => {
  circles[i][0].style.transform = "translateY(-7px)";
  circles[i][0].firstElementChild.style.boxShadow = `0px 3px 35px ${glowVals[i]}`;
  })
  securitySegments[i].addEventListener("mouseleave", () => {
  circles[i][0].style.transform = "translateY(7px)";
  circles[i][0].firstElementChild.style.boxShadow = "0px 3px 15px rgba(0,0,0,0.2)";
  })

}


for (let i = 0; i < infoSegments.length; i++) {
  icons.push(infoSegments[i].getElementsByClassName("iconArrow"));
  text.push(infoSegments[i].getElementsByClassName("colorChange"));
}
// let winIcon = infoSegments[0].getElementsByClassName("iconArrow");
// let killIcon = infoSegments[1].getElementsByClassName("iconArrow");
// let levelIcon = infoSegments[2].getElementsByClassName("iconArrow");
// let challengeIcon = infoSegments[3].getElementsByClassName("iconArrow");



//
// let winText = infoSegments[0].getElementsByClassName("colorChange");

for (let i = 0; i < infoSegments.length; i++) {

infoSegments[i].addEventListener("mouseover", () => {
  icons[i][0].classList.remove("fadeOutRight");
  icons[i][0].style.display = "block"
  icons[i][0].classList.add("fadeIn");
  text[i][0].style.color = hexVals[i];


})

infoSegments[i].addEventListener("mouseout", () => {
    icons[i][0].classList.remove("fadeIn");
    icons[i][0].classList.add("fadeOutRight");
    text[i][0].style.color = "inherit";
})

infoSegments[i].addEventListener("click", () => {
    document.getElementById("redirectJS").click();
})

}

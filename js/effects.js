

  let links = document.getElementsByClassName("enlarger");
  let len = links.length;

  for(var i = 0; i < len; i++) {
    let h3tag = links[i].parentNode.parentNode;

    let img = h3tag.previousElementSibling.firstElementChild;

    links[i].addEventListener("mouseover", function() {img.classList.add("enlarge");});
    links[i].addEventListener("mouseout", function() {img.classList.remove("enlarge");});
  };

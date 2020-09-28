

  // let links = document.getElementsByClassName("enlarger");
  // let len = links.length;
  //
  // for(var i = 0; i < len; i++) {
  //   let h3tag = links[i].parentNode.parentNode;
  //
  //   let img = h3tag.previousElementSibling.firstElementChild;
  //
  //   links[i].addEventListener("mouseover", function() {img.classList.add("enlarge");});
  //   links[i].addEventListener("mouseout", function() {img.classList.remove("enlarge");});
  // };




 var h3tags = $(".enlarger").parent().parent();

 h3tags.each (function() {
   let img = $(this).prev().find("img");
   $(this).mouseenter(function() { img.addClass("enlarge"); });
   $(this).mouseleave(function() { img.removeClass("enlarge"); });
 });


// Viewport checking

var $animation_elements = $('.invis');
var $window = $(window);

 function check_if_in_view() {
   var window_height = $window.height();
   var window_top_position = $window.scrollTop();
   var window_bottom_position = (window_top_position + window_height);

   $.each($animation_elements, function() {
     var $element = $(this);
     var element_height = $element.outerHeight();
     var element_top_position = $element.offset().top;
     var element_bottom_position = (element_top_position + element_height);

     //check to see if this current container is within viewport
     if ((element_bottom_position >= window_top_position) &&
         (element_top_position <= window_bottom_position)) {
           if ($element.hasClass("left")) {
             $element.addClass('animate__fadeInLeft');
           };
        $element.removeClass("invis");



     }
   });
 }

 $window.on('scroll resize', check_if_in_view);
 $window.trigger('scroll');

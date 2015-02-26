$(document).ready(function() {
  $("section").hide(function() {
    $("section").fadeIn(1000);
    $( ".alias" ).focus();
  });
});

/*$("section").get( "http://localhost:3000/search?q=javascript", function( data ) {
  $( ".result" ).html( data );
  alert( "Load was performed." );
});*/


function loadXMLDoc() {

  var sectionColor = document.getElementById("section");
  var name = document.getElementById("alias").value;
  var xmlhttp;
  xmlhttp = new XMLHttpRequest();

  if (document.getElementById("alias").value == "" || document.getElementById("alias").value == undefined) {
    sectionColor.style.color = "#FF0000";
  }
  else {
    sectionColor.style.color = "#000000";
  }

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      document.getElementById("section").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET","http://bootcamp.aws.af.cm/welcome/" + name, true);
  xmlhttp.send();
}


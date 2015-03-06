$(document).ready(function(){


var sourceh = $("#some-template").html(); 
var template = Handlebars.compile(sourceh); 

var template1 = _.template($('#some-template1').html()); 

var template2 = dust.compile($("#some-template2").html(), "intro");
dust.loadSource(template2);

Handlebars.registerHelper('fullName', function(person) {
return person.firstName + " " + person.lastName;
});

$('body').append(template(data));
$('body').append(template1(data));

dust.render("intro", data, function(err, out) {
        $('#salida').html(out);


});
})
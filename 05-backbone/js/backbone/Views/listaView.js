// Sacar template de aca!
var temp = "<a href='#/new' class='button'>Agregar</a> <hr /><table class='tbox' ><thead><tr><th class='hbox'>Titulo</th><th class='hbox'>Categoria</th><th class='hbox'>Editar</th><th></th></tr></thead><tbody><% _.each(movies, function(movie,index) { %><tr><td class='tSection'><%= movie.titulo %></td><td class='cSection'><%= movie.categoria %></td><td class='editSection'><a class='buttonEd' href='#/edit/<%= index+1 %>'>Edit</a></td></tr><% }); %></tbody></table>";


var Vista = Backbone.View.extend({

    el: '.page',

    render: function() {
        var that = this;
        var movie = new Movie();
        var movielist = movie.getAllMovies();
        console.log(movielist);
        var template = _.template(temp);
        console.log(template);
        console.log(movielist);
        that.$el.html(template(movielist));
    } 

});
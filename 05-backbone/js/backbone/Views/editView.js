 //funcion para pasar a json el form

 $.fn.serializeObject = function() {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
          if (o[this.name] !== undefined) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || '');
          } else {
              o[this.name] = this.value || '';
          }
      });
      return o;
    };


// Sacar template de aca! 
var tempEdit = "<form class='editMovieForm'><legend class='hboxV'><%= movie ? 'Editar' : 'Nueva' %> pelicula</legend><label> Titulo:</label>  <input name='titulo' type='text' value='<%= movie ? movie.titulo  : ''  %>'><label> Categoria:</label>    <input name='categoria' type='text' value='<%= movie ? movie.categoria : ''  %>'><hr /><button type='submit' class='btn'><%= movie ? 'Update' : 'Create' %></button><% if(movie) { %><input type='hidden' name='id' value='<%= id %>' />   <button data-movie-id='<%= id %>' type='button' class='btn btn-danger delete' id = 'delete'>Delete</button><% }; %></form>";

var Edit = Backbone.View.extend({

    el: '.page',

    render: function(param) {

        if (param.id) {
            
            var that = this;
            console.log(param.id);
            var idL = localStorage.key(param.id-1);
            console.log(idL);
            var movie = new Movie(JSON.parse(localStorage.getItem(parseInt(idL))));
            console.log(movie);
            var template = _.template(tempEdit);
            this.$el.html(template({movie : movie.attributes, id: idL}));

        } else {
            console.log("nuevo");
        var template = _.template(tempEdit);
        this.$el.html(template({movie : ""}));
        }
    },

    events: {
        'submit .editMovieForm' : 'saveMovie',
        'click .delete ' : 'deleteMovie'
    },

    saveMovie : function (ev) {
        var formDetails = $(ev.currentTarget).serializeObject();
        if (formDetails.id) {
            console.log("edit");
            var movieDetails = {titulo : formDetails.titulo, categoria: formDetails.categoria};
            var movie = new Movie();
            movie.edit(formDetails.id,movieDetails);
            var router = new Router();
            router.navigate('', {trigger:true});
            window.location.reload(true);
        } else {
            console.log("creacion");
            var movieDetails = {titulo : formDetails.titulo, categoria: formDetails.categoria};
            console.log(movieDetails);
            var movie = new Movie();
            movie.save(movieDetails);
            var router = new Router();
            router.navigate('', {trigger:true});
        }
    },
    deleteMovie : function (ev) {
        var formDetails = $(ev.currentTarget).parent().serializeObject();
        var routerD = new Router();
        router.navigate('', {trigger:true});
        var movie = new Movie();
        console.log(ev);
        console.log(formDetails.id);
        movie.del(formDetails.id);
        window.location.reload(true);
    }
        

});
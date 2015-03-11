var Movie = Backbone.Model.extend({

    save: function (o) {
        if (o.titulo === "") {
            alert("Nombre vacio!!");
        }
        else {
            var len = localStorage.length;
            if (len === 0) {
                localStorage.setItem("1", JSON.stringify(o));
            }
            else {
                var flag = 0;
                for (x=0; x<=localStorage.length-1; x++)  {  
                    clave = localStorage.key(x);
                    moviel =(JSON.parse(localStorage.getItem(clave))) ;
                    if (moviel.titulo == o.titulo) {
                        flag = 1;
                    }
                }
                if (flag==1) {
                    alert("Esa pelicula ya esta cargada!!");
                }
                else {
                    var index = len - 1;
                    var key = parseInt(localStorage.key(index)) + 1;
                    console.log("save");
                    localStorage.setItem(key, JSON.stringify(o));
                }
            }
        }
    console.log(localStorage);
    },

    edit: function (id,o) {
        localStorage.removeItem(id);
        localStorage.setItem(id, JSON.stringify(o));
    },

    del: function (id){
        console.log("borrar");
        localStorage.removeItem(id);
    },

    getAllMovies: function () {
        var movielist = ' {"movies": ['  ;
        var local = $(localStorage);
    
        for (x=0; x<=localStorage.length-1; x++)  {  
            clave = localStorage.key(x); 
            //console.log(JSON.parse(localStorage.getItem(clave)));
             movielist =movielist  + (localStorage.getItem(clave)) ;
             if (x != localStorage.length-1) {
                 movielist =movielist  + ",";
             }
        }
        movielist = movielist + "] }";
        return (JSON.parse(movielist));
    }
});

Backbone.emulateJSON = true;

    var vista = new Vista();
    var edit = new Edit();
    var router = new Router();



    router.on('route:home', function () {
        vista.render(); 
    });
    router.on('route:editMovie', function (id) {
        edit.render({id : id});
    });
    router.on('route:editMovie/*', function (id) {
        edit.render({id : id});
    });
    

    Backbone.history.start();

    
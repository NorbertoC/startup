var Router = Backbone.Router.extend({
    routes: {
        '' : 'home',
        'new' : 'editMovie',
        'edit/:id' : 'editMovie',
        '#' : 'home',
    }
});
// Movie Class

define(["director"], function() {
    // constructor
    var Movie = function (){
        this.attributes = {};
       
    };
    // Methods
    Movie.prototype = {
        constructor:Movie,
        
        set:function(attr, value){
            this.attributes[attr] = value;
        },

        get:function(attr){
            return this.attributes[attr];
        },
    };
 
    return Movie;
});      
// Director Class

define(function() {
    // constructor
    var Director = function (theName){
        this.name = theName;
        this.attributes = [];
    };
    // methods
    Director.prototype = {
        constructor:Director,
        
        set:function(attr, value){
            this.attributes[attr] = value;
        },

        speak:function(){
            return this.name+' says: '+JSON.stringify(this.attributes['quotes'])  //this.attributes['quotes'].toString();
        },
    };
 
    return Director;
});      
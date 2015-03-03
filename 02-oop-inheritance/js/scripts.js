Object.create = function (o) {
        function F() {
        }

        F.prototype = o;
        return new F();
};


// Mixin

function extend(destination, source) {
    for (var prop in source) {
        if (source.hasOwnProperty(prop)) {
            destination[prop] = source[prop];
        }
    }
}


//Social Class 

function Social(){
    
};

Social.prototype.share = function(friend){
        console.log('Sharing '+this.attributes.title+' with '+friend);
};

Social.prototype.like = function(){
        console.log('You like '+this.attributes.title);
};
    

// Inheritance Function

function inheritPrototype(childObject, parentObject) {
    var copyOfParent = Object.create(parentObject.prototype);

    copyOfParent.constructor = childObject;
     
    childObject.prototype = copyOfParent;
};


// Movie Class

function Movie(){
    this.attributes = {};
    this.attributes['actors'] = [];
};


Movie.prototype = {
    constructor:Movie,
    
    play:function(){
       // $.publish(MovieObserver,'playing', {title: this.get('title')} ); // publish
    },
    
    stop:function(){
        // $.publish(MovieObserver,'stopped', {title: this.get('title')} ); // publish
    },
    
    set:function(attr, value){
        this.attributes[attr] = value;
    },

    get:function(attr){
        return this.attributes[attr];
    },
    
    addActor:function(theActor){
        this.attributes['actors'].push(theActor);           
    },
    
    showActors:function(){
        console.log('Actors: '+JSON.stringify(this.attributes['actors']));
    }
   
};

extend(Movie.prototype, Social.prototype);

// Downloadable Movie Class

function DownloadableMovie(){
    Movie.call(this);
};

inheritPrototype(DownloadableMovie, Movie); // DownloadableMovie inherits from Movie

DownloadableMovie.prototype.download = function(){
        console.log(this.get('title')+' downloading...')
};


// Actor Class

function Actor(theName){
    this.name = theName;
};

// Observer

function MovieObserver(){
   //$.subscribe('playing', this, function(asd){console.log('playing'+asd.data.title);});   //subscribe
   //$.subscribe('stopped', this, function(asd){console.log('stopped'+asd.data.title);});   //subscribe
   //$.subscribe('downloading', this, function(asd){console.log('downloading'+asd.data.title);});   //subscribe
};


// Pub-Sub Method (Observer)

var subscriptions = [];
 
$.subscribe = function(eventType, subscriber, callback){
   
    if (!(eventType in subscriber)){
        subscriptions[ eventType ] = [];        
    }
   
    subscriptions[ eventType ].push({
        subscriber: subscriber,
        callback: callback
    });
};
 
 
$.publish = function( publisher, eventType, data ){
 
    var event = {
        type: eventType,
        target: publisher,
        data: (data || []),
        result: null
    };
   
    var eventArguments = [ event ].concat( event.data );
   
$.each(
        subscriptions[ eventType ],
        function( index, subscription ){
            event.result = subscription.callback.apply(
                subscription.subscriber,
                eventArguments
            );
           
            return( event.result );
        }
    );
   
    return ( event );
};


// Testing da app!

var ipman = new Movie();
ipman.set('title','Ip Man');
ipman.set('year','2008');
ipman.play();
ipman.stop();
var dYen = new Actor('Donnie Yen');
ipman.addActor(dYen);
var hLynn = new Actor('Lynn Hung');
ipman.addActor(hLynn);

console.log(ipman.get('title'));
console.log(ipman.get('year'));
ipman.showActors();

var inception = new DownloadableMovie();
inception.set('title','Inception');
inception.set('year','2009');
inception.download();

inception.share('Juan Perez');
inception.like();
ipman.like()
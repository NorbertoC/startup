define(['movie', 'director'], function(Movie, Director){
    var avatar = new Movie();
    avatar.set('title','Avatar');
    avatar.set('year','2009');
    console.log(avatar.get('title'));
    console.log(avatar.get('year'));

    var jamesCameron = new Director('James Cameron');
    jamesCameron.set('quotes',['This is better than Titanic','I love the effects!','You should watch it in 3D']);
    avatar.set('director', jamesCameron);
    console.log(avatar.get('director').speak());
    
    // Using jQuery show Director quotes
    $(document).ready(function(){
        $('.btnQuotes').click(function(){
            $('.divMain').append(avatar.get('director').speak()
            );
        });
    });
})
       

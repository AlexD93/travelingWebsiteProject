module.exports.SignInPage = function (req, res){
    //res.render('SignInPage',{title: 'Sign In Page'});
    console.log(req.body.EmailAddress);
    console.log(req.body.Password);

    // Set our internal DB variable
    var db = req.db;

    // Set our collection
    var collection = db.get('usercollection');

    collection.find({email : req.body.EmailAddress}, function(err, docs){
        if (err){
            console.log(err);
        }
        else if(docs){
            
            if (req.body.Password==docs[0].password){
                res.render('WishList',{title: 'Wish List'});
            }
        }
        else{
            console.log('person is not find');
        }
    });


}
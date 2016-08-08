module.exports.SignUpPage = function (req, res){
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var Firstname = req.body.Firstname;
    var Lastname = req.body.Lastname;
    var Email = req.body.EmailAddress;
    var Password = req.body.Password;
   
    

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "firstname" : Firstname,
        "lastname" : Lastname,
        "email":Email,
        "password":Password        
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.render('SignUpWorks',{title: 'Sign Up Page'});//redirection is going here
        }
    });
    
}
module.exports.WishList = function (req, res){
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var Search = req.body.search;
    var Date = req.body.date;
    

    // Set our collection
    var collection = db.get('addplacecollection');
    
    //retriving data from database
    collection.find({},{}, function (e, docs) {
        res.render('WishList',{
            "WishList": docs
        });
    });
    // finish retriving data from database
    

    // Submit to the DB
    collection.insert({
        "search" : Search,
        "date" : Date     
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.render('WishListWorks',{title: 'Wish List'});//redirection is going here
        }
    });
    
}
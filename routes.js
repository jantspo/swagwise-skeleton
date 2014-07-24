module.exports = function(app) {
	// Require mongoose dependency
    var mongoose = require('mongoose');

    /* Add the dependency to passport after the mongoose require decleration */
    var passport = require('passport');

    /* ======================= REST ROUTES ====================== */
    // Handle API calls

    // Swag API route
    app.route('/api/swag')
        .get(function(req, res) {
            // use mongoose to get all products in the database
            mongoose.model('Swag').find(req.query, function(err, swag) {

                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err)
                    res.send(err);


                res.send(swag); // return products in JSON format
            });
        });

    app.route('/api/swag/:id')
        .get(function(req, res) {
            // use mongoose to get a product in the database by id
            mongoose.model('Swag').findOne({id: req.params.id}, function(err, product) {
                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.send(product); // return the product in JSON format
            });
        });



    /* Add the following routes after the products routes */
// logout API route
    app.get('/api/logout', function(req, res, next) {
        req.logout();
        res.send(200);
    });

    // login API route
    app.post('/api/login', passport.authenticate('local'), function(req, res) {
        res.cookie('user', JSON.stringify(req.user));
        res.send(req.user);
    });

    // signup API route
    app.post('/api/signup', function(req, res, next) {
        var User = mongoose.model('User');
        var user = new User({
            email: req.body.email,
            password: req.body.password
        });
        user.save(function(err) {
            if (err) return next(err);
            res.send(200);
        });
    });

    /* ========================= FRONT-END ROUTES ======================= */
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./app/index.html'); // load our public/index.html file
    });

};
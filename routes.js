module.exports = function(app) {
	// Require mongoose dependency
    var mongoose = require('mongoose');

    /* Add the dependency to passport after the mongoose require decleration */
    var passport = require('passport');
    /*=========== add stripe dependency==================*/
     var stripe  = require('stripe')('sk_test_4UP0FzHDT1BSSYJeFs1oyWdW');
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

//    =============== CHECKOUT STUFF ===============================
    app.route('/api/checkout')
        .post(function(req, res, next){
            stripe.charges.create({
                amount: 5000,
                currency: "usd",
                card: {
                    number: '4242424242424242',
                    exp_month: 07,
                    exp_year: 2015,
                    name: 'J Jonah Jameson',
                    "brand": "Visa",
                    "funding": "credit",
                    "country": "US",
                    "address_line1": null,
                    "address_line2": null,
                    "address_city": null,
                    "address_state": null,
                    "address_zip": null,
                    "address_country": null,
                    "cvc_check": null,
                    "address_line1_check": null,
                    "address_zip_check": null,
                    "customer": null
                }
            }, function(err, charge) {
                response.send(charge);
        });

    /* ========================= FRONT-END ROUTES ======================= */
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./app/index.html'); // load our public/index.html file
    });

};
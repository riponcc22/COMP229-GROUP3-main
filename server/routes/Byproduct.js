let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

let productController = require('../controllers/Byproduct');


// Helper function for guard purposes
function requireAuth(req, res, next) {
    // Check if the user is logged in
    if (!req.isAuthenticated()) 
    {
        return res.redirect('/login');
    } 
    else 
    {
        next();
    }
}

/* Get route for the Data List Page - READ OPERATION */
router.get('/', productController.displayProductList);

/* GET route for displaying ADD Page - CREATE OPERATION */
router.get('/add', requireAuth, productController.displayAddPage);

/* POST route for processing ADD Page - CREATE OPERATION */
router.post('/add', requireAuth, productController.processAddPage );

/* GET route for displaying EDIT Page - UPDATE OPERATION */
router.get('/edit/:id', requireAuth,  productController.displayEditPage );

/* POST route for processing EDIT Page - UPDATE OPERATION */
router.post('/edit/:id', requireAuth,productController.processEditPage );

/* GET to perform DELETION - DELETE OPERATION */
router.get('/delete/:id', requireAuth, productController.performDelete );

module.exports = router;


let express = require('express');

 let router = express.Router();

let mongoose= require('mongoose');

// create a reference  to the model

let Byproduct = require('../models/Byproduct');

module.exports.displayProductList = async (req, res, next) => {
    try {
        const ProductList = await Byproduct.find();
        res.render('list', { title: 'Incident Survey list', 
        productlist: ProductList, 
        displayName: req.user ? req.user.displayName : '' });
    } catch (err) {
        console.error(err);
        next(err); // Pass the error to the error handling middleware
    }
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('add', { title: 'Add Incident Here',
    displayName: req.user ? req.user.displayName : ''  });

}


module.exports.performDelete = (req, res, next) => {
    const id = req.params.id;

    Byproduct.findByIdAndRemove(id)
        .then(() => {
            res.redirect('/data');
        })
        .catch((err) => {
            console.log(err);
            res.end(err);
        });
}

module.exports.displayEditPage = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userToEdit = await Byproduct.findById(id);
        res.render('edit', { title: 'Edit User', user: userToEdit,
        displayName: req.user ? req.user.displayName : ''  });
    } catch (err) {
        console.error(err);
        next(err); // Pass the error to the error handling middleware
    }
}

module.exports.processEditPage = (req, res, next) => {
    const id = req.params.id;

    const updateUser = {
        "incident": req.body.incident,
        "description": req.body.description,
        "date": req.body.date
    };

    Byproduct.findByIdAndUpdate(id, updateUser)
        .then(() => {
            res.redirect('/data');
        })
        .catch((err) => {
            console.log(err);
            res.end(err);
        });
}

module.exports.processAddPage = (req, res, next) => {
    const newUser = new Byproduct({
        "incident": req.body.incident,
        "description": req.body.description,
        "date": req.body.date
    });

    newUser.save()
        .then((Byproduct) => {
            res.redirect('/data');
        })
        .catch((err) => {
            console.log(err);
            res.end(err);
        });
}
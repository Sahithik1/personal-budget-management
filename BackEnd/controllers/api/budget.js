// importing packages
const router = require('express').Router()
const jsonParser = require('body-parser').json();
const Category = require('../../models/categories');
const Expense = require('../../models/budget_details');
// importing dependencies
const authenticateToken = require('../authentication/authenticateToken');

// dashboard api
router.get('/dashboard', authenticateToken, (req, res) => {
    let email = req.user["email"]
    let month = req.query["month"]
    Expense.findOne({ userEmail: email, month: month },(err, result) => {
        if (err) {
            // console.log(err)
            res.statusCode = 400
            res.json({msg: 'Request Failed'})
        } else {
        // console.log(result);
        res.statusCode = 200
        res.json(result);
        }
    })
})

// get categories
router.get('/category', authenticateToken, (req, res) => {
    let email = req.user["email"]
    Category.findOne({ userEmail: email }).exec((err, result) => {
        // console.log(result);
        res.json(result);
    })
})

// add category
router.post('/addCategory', authenticateToken, jsonParser, (req, res) => {
    let email = req.user["email"]
    Category.findOne({ userEmail: email }).exec((err, response) => {
        // console.log(response);
        if (response) {           
            let updatedCategories = response.categories;
            // console.log(updatedCategories)
            // console.log(req.body.categories)
            for (category of req.body.categories) {
                console.log(category)
                updatedCategories.push({ categoryName: category.categoryName, limit: category.limit });
            }
            Category.updateOne({ userEmail: email },
                { $set: { "categories": updatedCategories } }).then((value) => {
                    res.statusCode = 201
                    res.json({ msg: 'success' })
                })
                .catch(value => console.log(value));
        } else {
            const newCategory = new Category({
                userEmail: email,
                categories: req.body.categories
            });
            newCategory.save()
                .then((value) => {
                    // success code to be submitted  here
                    res.statusCode = 201
                    res.json({ msg: 'success' })
                    // console.log(value)
                })
                .catch(value => console.log(value));
        }
    })
})

// add expense
router.post('/addExpense', authenticateToken, jsonParser, (req, res) => {
    let document = {
        userEmail: req.user["email"],
        month: req.body.month,
        expenses: req.body.expenses
    }
    Expense.replaceOne({ userEmail: document.userEmail, month: document.month }, document, (err, result) => {
        if (err) {
            // console.log(email)
            res.statusCode = 400
            res.json({msg: err.message});
        } else {
            if (result.n == 0) {
                const newExpense = new Expense(document)
                newExpense.save()
                    .then((value) => {
                        // success code to be submitted  here
                        res.statusCode = 201
                        res.json({ msg: 'Document created' })
                    })
                    .catch((value) => {
                           res.statusCode = 400
                        res.json({msg: value.message})
                    });
            } else {
                res.statusCode = 201
                res.json('Document already existed, so updated')
            }
        }
    })
})

module.exports = router
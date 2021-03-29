const express = require('express');
const { body, validationResult } = require('express-validator');
const controllers = require('../controllers/controllers');
const fileUpload = require('../middelware/file-upload');
const isAuth = require('../middelware/isAuth');

const route = express.Router();

// Url: http://localhost:5000/api/products/posts
// Method: GET
// Desc: Fetch All Posts
// Public
route.get('/posts', controllers.getPosts);

// Url: http://localhost:5000/api/products/new-item
// Method: POST + Multer Function
// Desc: Create New Dress
// Private
route.post('/new-item', [
    isAuth,
    fileUpload.single('image')
] ,controllers.postDress);

// Url: http://localhost:5000/api/products/delete/:id
// Method: DELETE
// Desc: Remove Single Dress
// Private
route.delete('/delete/:id', isAuth ,controllers.deleteDress);

// Url: http://localhost:5000/api/products
// Method: GET
// Desc: Fetch All Dresses
// Public
route.get('/', controllers.getDresses);

// Url: http://localhost:5000/api/products/:id
// Method: GET
// Desc: Fetch Single Dress
// Public
route.get('/:id', controllers.getDress);

// Url: http://localhost:5000/api/products/post
// Method: POST
// Desc: Post Comment
// Public
route.post('/post', controllers.postPost);

// Url: http://localhost:5000/api/products/delete-post/:id
// Method: DELETE
// Desc: Delete Comment
// Private
route.delete('/delete-post/:id', controllers.deletePost);

// Url: http://localhost:5000/api/products/admin
// Method: POST
// Desc: Admin
// Public
route.post('/admin', [
    body('email', 'Vaild email is required').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
] ,controllers.postAdmin);

module.exports = route;
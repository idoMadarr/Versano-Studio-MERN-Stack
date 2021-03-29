const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const jwtSecret = 'secret_token';
const bcryptjs = require('bcryptjs');
const Dress = require('../models/dress');
const Post = require('../models/post');
const Admin = require('../models/admin');

exports.postAdmin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    
    if (email !== 'yasminversano@gmail.com') {
        return res.status(400).json({ errors: [{msg: 'Permission apply only to admin'}] });
    }
    
    const admin = await Admin.findOne({ email });
    const isMatch = await bcryptjs.compare(password, admin.password);
    if (!isMatch) {
        return res.status(400).json({ errors: ['Invalid Password'] });
    }
    
    const payload = { id: admin._id };
    jwt.sign(payload, jwtSecret, (error, token) => {
        return res.status(200).json(token);
    })
}

exports.postDress = async (req, res, next) => {
    try {
        const newDress = Dress({
            ...req.body,
            image: req.file.path
        });
        await newDress.save();
        return res.status(200).json(newDress);
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.deleteDress = async (req, res, next) => {
    const dressId = req.params.id;
    try {
        const dress = await Dress.findOneAndDelete({ _id: dressId });
        return res.status(200).json(dress);    
    } catch (error) {
        return res.status(400).json(error);   
    }
}

exports.getDresses = async (req, res, next) => {
    try {
        const dresses = await Dress.find();
        return res.status(200).json(dresses);        
    } catch (error) {
        return res.status(400).json(error)
    }
}

exports.getDress = async (req, res, next) => {
    const dressId = req.params.id;
    try {
        const dress = await Dress.findById({ _id: dressId });
        return res.status(200).json(dress);
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.postPost = async (req, res, next) => {
    const user = req.body;
    const post = {
        name: user.firstName + ' ' + user.lastName,
        note: user.text,
        for: user.for,
        email: user.email
    }

    const newPost = Post(post);
    await newPost.save();
    return res.status(200).json(newPost);
}

exports.deletePost = async (req, res, next) => {
    const postId = req.params.id;
    try {
        const post = await Post.findOneAndDelete({ _id: postId });
        return res.status(200).json(post);
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        return res.status(200).json(posts);            
    } catch (error) {
        return res.status(400).json(error);
    }
}


const Question = require("../models/Question");
const User = require("../models/User");
const util = require("../util/util");
const _ = require("../util/underscore");


getSender = async (user) => {
    let sender = await User.findByUsername(user.username);
    _sender = _.pick(sender, ["username", "_id"]);

    return _sender
}

exports.askQuestion = async (req, res) => {
    let sender;

    if (!req.user) {
        sender = {username: "Anon", _id: process.env.ANON_ID}
    } else {
        sender = await getSender(req.user);
    }

    const destination = await User.findByUsername(req.body.destination);

    let question = {
        text: req.body.text,
        sender,
        destination
    }

    try {
        const entry = await (Question(question).save());
        res.send(entry)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

exports.getUsers = async (req, res) => {
    const users = await  User.find({});
    res.json(users)
}

exports.loginPage = async (req, res) => {
    res.render("login")
}

exports.signupPage = async (req, res) => {
    console.log("user wants to signup")
    res.render("signup")
}
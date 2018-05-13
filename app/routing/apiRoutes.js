var express = require("express");
var app = express();
var friends = require("../data/friends.js");


module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        return res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        var score;
        var me = req.body;
        var match = friends[0];

        friends.forEach(function (friend) {
            const diffArray = friend.scores.map((score, i) => score = Math.abs(me.scores[i] - score));
            const matchDif = me.scores.map((score, i) => score = Math.abs(match.scores[i] - score));
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            matchDif.reduce(reducer) >= diffArray.reduce(reducer) ? match = friend : console.log('no match change');
            console.log("Your Match Is: " + match.name);
        });
        friends.push(req.body);
        res.send(match);


    });

}
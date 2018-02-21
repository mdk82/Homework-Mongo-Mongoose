const express = require("express");
const router = express.Router();
const axios = require("axios");
const mongoose = require("mongoose");
const cheerio = require("cheerio");

// Require all models //
// ================== //
const db = require("../models");

// All routes //
// ========== //

router.get("/", (req, res) => {
  res.redirect("/articles")
});

// Scraper route //
// =============== //
router.get("/scrape", (req, res) => {
    axios.get("https://news.ycombinator.com/").then((response) => {
        // Allow cheerio to parse the html body //
        let $ = cheerio.load(response.data);

        // Get each element that holds title and link data //
        // =============================================== //
        $(".athing").each((i, element) => {
            let athing = {};
            console.log(athing)

            // Push data into data object
            athing.title = $(this)
                .children(".title")
                .children(".title")
                .text()
            athing.link = $(this)
                .children(".title")
                .children("a")
                .attr("href")

            // console.log(data.title)
            // console.log(data.link)

            if (athing.title && athing.link) {
                db.article.create({
                    title: athing.title,
                    link: athing.link
                }), (err, inserted) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(inserted)
                    }
                }
            }
        });

        res.redirect("/");
    });
});


router.get("/articles", (req, res) => {

    db.article.find({})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            // Error handling //
            // ============== //
            res.json(err);
        });
});


router.get("/articles/:id", (req, res) => {

    db.article.findOne({
            _id: req.params.id
        }, (error, data) => {
            if (error) {
                console.log(error)
                res.send(error)
            } else {
                res.json(data)
            }
        }).populate("note")
        .then(function(dbArticle) {

            res.json(dbArticle);
        })
        .catch(function(err) {
 
            res.json(err);
        });
});


router.post("/articles/:id", (req, res) => {

    db.Note.create(req.body)
        .then(function(dbNote) {
            
            return db.article.findOneAndUpdate({ _id: req.params.id }, { $push: { note: dbNote._id } }, { new: true });
        })
        .then(function(dbArticle) {

            res.json(dbArticle);
        })
        .catch(function(err) {
      
            res.json(err);
        });
});

module.exports = router

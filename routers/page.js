const mongoose = require('mongoose');
const Page = require('../models/page');
// const pageID = new mongoose.Types.ObjectId();

module.exports = {
    loadPage: function (req, res) {
        // console.log("Inside loadPage");
        Page.find(function (err, pages) {
            if (err) {
                // console.log("Inside loadPage if");
                // res.append("Access-Control-Allow-Origin:  http://127.0.0.1:4040");
                // res.append("Access-Control-Allow-Methods: POST");
                // res.append("Access-Control-Allow-Headers: Content-Type, Authorization");
                return res.status(404).json(err);
            } else if (!pages.length) {
                // console.log("Inside loadPage else if");
                // res.append("Access-Control-Allow-Origin:  http://127.0.0.1:4040");
                // res.append("Access-Control-Allow-Methods: POST");
                // res.append("Access-Control-Allow-Headers: Content-Type, Authorization");
                res.json({});
            } else {
                // console.log("Inside loadPage else");
                // res.append("Access-Control-Allow-Origin:  http://127.0.0.1:4040");
                // res.append("Access-Control-Allow-Methods: POST");
                // res.append("Access-Control-Allow-Headers: Content-Type, Authorization");
                res.json(pages.pop());
            }
        });
    },
    storePage: function (req, res) {
        // console.log("INSIDE STORE PAGE");
        console.log("Request Parameters: " + req.params);
        // Clear up some space
        Page.find(function (err, pages){
            if (pages.length > 0){
                if (pages.length >= 50){
                    for (let i = 0; i < 20; i++){
                        Page.findOneAndDelete({ _id: pages[i]._id }, (err, deletedPage) => {
                            if (err) console.log("Error occured while deleting page at index " + index + " error: " + err);
                            // console.log("Page deleted: " + deletedPage);
                        });
                    }
                }
            }
        });
        let newPageDetails = req.body;
        // newPageDetails._id = pageID;
        newPageDetails._id = new mongoose.Types.ObjectId();
        let page = new Page(newPageDetails);
        page.save(function (err) {
            if (err) console.log("BRUH THERES AN ISSUE: " + err);
            console.log("Saving content now " + new Date());
            res.json(page);
        });
    }
};
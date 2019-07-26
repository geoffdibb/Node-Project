const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Item = require("./usernameschema.js")
const validateemail = require("./emailvalidation.js");
const bcrypt = require("bcryptjs");


//show all
router.get("/all", (req, res) => {
  const errors = {};
  Item.find({}, "-password")
    .then(items => {
      if (!items) {
        errors.noItems = "There are no items";
        res.status(404).json(errors);
      }
      res.json(items);
    })
    .catch(err => res.status(404).json({ noItems: "There are nothing at all" }));
});


//create
router.post("/addItem", (req, res) => {
  const { errors, isValid } = validateemail(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

    const item = new Item({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
  });
 bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(item.password, salt, (err, hash) => {
      if (err) throw err;
      item.password = hash;
      item.save().then(item => res.json(item))
      .catch(err => console.log(err));
   });

  });
});




//delete
router.delete("/delete", (req, res) => {
  Item.deleteOne({'username': req.body.username})
  .then(({ ok, n }) => {
              res.json(Item)
    })})


module.exports = router;

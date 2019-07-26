const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Item = require("./usernameschema")
const validateemail = require("./emailvalidation");
const bcrypt = require("bcryptjs");

// @route   GET item/username
// @desc    Show all - password
// @access  Public
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



// @route   GET item/username
// @desc    Get all items from one username
// @access  Public

//login2
router.post("/login", (req, res) => {

  let errors = {};

  const password = req.body.password;
  let hashedpassword;


  Item.findOne({ username: req.body.username })
    .then(items => {
      hashedpassword = items.password;

      bcrypt.compare(password, hashedpassword).then(isMatch => {
        if (isMatch) {

          res.status(200).json("Login Valid");
          console.log("valid login")

            .then(() => {
              res.json({ success: true });
            })
            .catch(err =>
              res.status(404).json({ usernotfound: "No user found" })
            );

        } else {
          return res.status(400).json(errors);
        }
      });

    }).catch(err => res.status(404).json({ err }));

});

// @route   Post item/username
// @desc    Create a new account
// @access  Public
//create
router.post("/createlogin", (req, res) => {
  const { errors, isValid } = validateemail(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const item = new Item({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    password2: req.body.password2
  });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(item.password, salt, (err, hash) => {
      if (err) throw err;
      item.password = hash;
      item.save().then(item => res.json(item))
        .catch(err => console.log(err));
    });

  });
}
);



// @route   DELETE item/username
// @desc    Delete an account on username
// @access  Public
//delete
router.delete("/delete", (req, res) => {
  Item.deleteOne({ 'username': req.body.username })
    .then(({ ok, n }) => {
      res.json(Item)
    })
})


module.exports = router;



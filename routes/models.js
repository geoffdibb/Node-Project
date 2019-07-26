const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Item = require("./mongoschema.js");
const validateusername = require("./modelsvalidation");
const validaterepname = require("./repvalid");
const validateemail = require("./emailvalidation");
const bcrypt = require("bcryptjs");


//getall
router.get("/all", (req, res) => {
  const errors = {};
  Item.find({}, "-password" )
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
  const { errors, isValid } = validateusername(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  

  const item = new Item({
    username: req.body.username,
    contents: req.body.contents,
    email: req.body.email
  });
 bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(item.email, salt, (err, hash) => {
      if (err) throw err;
      item.email = hash;
      item.save().then(item => res.json(item))
      .catch(err => console.log(err));
   });

  });
});





//update
router.put("/updatename", (req, res) => {
  const { errors, isValid } = validaterepname(req.body);
  if (!isValid) {
    return res.status(400).json(err);
  }

  
  Item.replaceOne({ 'username': req.body.username },
    { 'username': req.body.replacementname, "contents": req.body.contents, "email": req.body.email })
    .then(({ ok, n }) => {

      
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(Item.email, salt, (err, hash) => {
      if (err) throw err;
      Item.email = hash;
      Item.save().then(Item => res.json(Item))
      .catch(err => console.log(err));
   });

  });
    })
    
})

//delete
// router.delete("/delete", (req, res) => {
//   Item.deleteOne({ 'username': req.body.username })
//     .then(({ ok, n }) => {
//       res.json(Item)
//     })
// })

router.delete("/delete", (req,res) =>{
    errors = {};
const email = req.body.email;
  const hashedValue = req.body.hashedValue;
  //Check Value
  bcrypt.compare(email, hashedValue).then(isMatch => {
    if (isMatch) {
    Item.deleteOne({'email': req.body.hashedValue})
    .then(({ok, n}) => {
        res.json({ message: "Deleted" });
    })
    .catch(err => res.status(404).json(err));
    } else {
    errors.value = "Incorrect";
    return res.status(400).json(errors);
    }
  });
});

// @route   GET item/username
// @desc    Get all items from one username
// @access  Public
router.post("/username", (req, res) => {
  const errors = {};
  const email = req.body.email;
      let hashedemail;

  Item.findOne({ username: req.body.username})
    .then(items => {
      console.log(items);
      hashedemail=items.email;
      console.log(email);
      console.log(hashedemail);
      if (!items) {
        res.status(404).json(errors);
      }
bcrypt.compare(email, hashedemail).then(isMatch => {
   if (isMatch) {
      res.status(200).json(isMatch);
    console.log("matchedemails")
   }

    })
    .catch(err => res.status(404).json(err));
})});







module.exports = router;

const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Item = require("./usernameschema.js")


router.get("/all", (req, res) => {
  const errors = {};
  Item.find()
    .then(items => {
      if (!items) {
        errors.noItems = "There are no items";
        res.status(404).json(errors);
      }
      res.json(items);
    })
    .catch(err => res.status(404).json({ noItems: "There are nothing at all" }));
});


router.post("/addItem", (req, res) => {
    const item = new Item({
        username: req.body.username,
        contents: req.body.contents
})
item.save().then(() =>{
      res.json(item)

console.log('complete')});
});

router.put("/updatename", (req, res) => {
  Item.replaceOne({'username': req.body.username},
{'username': req.body.replacementname, "contents": req.body.contents})
  .then(({ ok, n }) => {
              res.json(Item)
    })})


router.delete("/delete", (req, res) => {
  Item.deleteOne({'username': req.body.username})
  .then(({ ok, n }) => {
              res.json(Item)
    })})


module.exports = router;
© 2019 GitHub, Inc.
var express = require('express');
const Product = require('./../models/product')
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res) {
  const products = await Product.find();
  if (products != undefined)
    res.json(products);
  else
    res.send("No product");
});

router.post('/', async function (req, res, next) {
  req.product = new Product()
  console.log(req.body)
  next()
}, saveProductAndGiveFeedback())

function saveProductAndGiveFeedback() {
  return async (req, res) => {
      let product = req.product;
      product.name = req.body.name;
      product.count = 0;
      try{
          product = await product.save();
          res.redirect("back");
      } catch(e) {
          res.send("Product can't be added")
      }
  }
}

router.get('/:name', async function (req, res) {
  var paramName = req.params.name;
  const product = await Product.findOne({ name: paramName });
  if (product != undefined)
    res.json(product);
  else
    res.send("No matching product");
});

router.put('/:name', async function (req, res) {
  var paramName = req.params.name;
  var queryCount = req.query.count;
  await Product.updateOne({name:paramName}, {$set: {count: queryCount}})
});

router.delete('/:name', async function (req, res) {
  var paramName = req.params.name;
  await Product.deleteOne({name: paramName});
});



module.exports = router;

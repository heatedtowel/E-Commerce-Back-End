const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      },
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findOne({
      where: { id: req.params.id },
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'stock', 'price']
      }
    })
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name
    })
    return res.json(categoryData)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categories = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (categories) return res.json(categories)
    res.status(404).json({ message: 'No such category' })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categories = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!categories) { res.status(404).json({ message: 'No such category' })
    } return res.json(categories);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

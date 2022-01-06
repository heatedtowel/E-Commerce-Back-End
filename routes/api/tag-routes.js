const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'stock', 'price', 'category_id']
      }
    })
    return res.json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'stock', 'price']
      }
    })
    return res.json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name
    })
    return res.json(tagData)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (!tagData) {
      res.status(404).json({ message: 'No such tag' })
    } else return res.json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!tagData) {
      res.status(404).json({ message: 'No such tag' })
    } else return res.json(tagData);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

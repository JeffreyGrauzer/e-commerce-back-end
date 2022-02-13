const router = require("express").Router();
const { Tag, Product, ProductTag, Category } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  Tag.findAll({
    include: [Product],
  })
    .then((tags) => {
      res.json(tags);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  // find all tags
  // be sure to include its associated Product data
});

router.get("/:id", (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  })
    .then((tag) => {
      res.json(tag);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      res.json(tag);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value

  Tag.update(req.body, {
    tag_id: req.body.tag_id,
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      res.json(tag);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      if (!tag) {
        res.status(404).json({ message: "No tag found with this id" });
        return;
      }
      res.json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

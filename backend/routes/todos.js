const express = require("express");
const router = express.Router();
const Todo = require("../models/index").Todo;

//Initial Route to get all the elements inside the DataBase - R
router.get("/", async (req, res) => {
  console.log(Todo);
  try {
    const query = await Todo.findAll();
    res.statusCode = 200;
    res.json(query);
  } catch (error) {
    res.sendStatus(400);
  }
});

//Route to get element by it's id - R
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    if (isNaN(id)) {
      res.sendStatus(400);
    } else {
      const query = await Todo.findOne({
        where: {
          id: id,
        },
        raw: true,
      });

      if (!query) {
        //If query find no one
        res.sendStatus(404);
      } else {
        //if it found
        res.sendStatus(200);
      }
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

//route to add item to database - C
router.post("/", async (req, res) => {
  const title = req.body.title;
  const finished = req.body.finished;

  try {
    if (title && finished != undefined) {
      const query = await Todo.create({
        title: title,
        finished: finished,
      });
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

//route to update item in database - U
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const finished = req.body.finished;

  try {
    if (id && title && finished !== undefined && !isNaN(id)) {
      const query = await Todo.update(
        { title: title, finished: finished },
        { where: { id: id } }
      );
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(400);
  }
});

//route to delete item in database
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (!isNaN(id)) {
      const query = await Todo.destroy({
        where: {
          id: id,
        },
      });
      if (query) {
        res.sendStatus(200);
      }else{
        res.sendStatus(400)
      }
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

//crud completo

module.exports = router;

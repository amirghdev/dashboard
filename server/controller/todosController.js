const { Op } = require("sequelize");
//- models
const Todos = require("../model/Todos");
//- schemas
const todoSchema = require("../schemas/todos");
//- utils
const { date2, date3 } = require("../utils/dateValidation");

async function findAll(req, res, next) {
  try {
    date3(req, res);
    const { year, month, day } = req.body;
    // 2: find all todos
    let todos = await Todos.findAll({
      where: { day, month, year, userId: req.user.id },
    });
    res.status(200).json({ todos });
  } catch (error) {
    next(error);
  }
}

async function findUndone(req, res, next) {
  try {
    date3(req, res);
    const { year, month, day } = req.body;
    // 1: find all undone todos before current date
    let todos = await Todos.findAll({
      where: {
        year,
        month,
        userId: req.user.id,
        day: { [Op.lt]: day },
        completed: false,
      },
    });
    res.status(200).json({ todos });
  } catch (error) {
    next(error);
  }
}

async function createTodo(req, res, next) {
  try {
    // 1: input validation
    await todoSchema.validate(req.body, { abortEarly: false });
    try {
      // 2: front validation
      date3(req, res);
      // 3: create todo
      await Todos.create({ ...req.body, userId: req.user.id });
      res.status(201).json({ message: `${req.body.text} با موفقیت ساخته شد` });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    error.message = error.errors.join(" , ");
    error.statusCode = 422;
    next(error);
  }
}

async function change(req, res, next) {
  try {
    // 1: validate todo
    let todo = await Todos.findOne({ where: { id: req.body.id, userId: req.user.id } });

    if (todo == null) {
      const error = new Error("کار روزانه در پایگاه داده وجود ندارد");
      error.statusCode = 404;
      throw error;
    }

    // 2: update todo
    todo.completed = !todo.completed;
    todo.updatedAt = Math.floor(Date.now() / 1000);
    await todo.save();
    res.status(200).json({ message: `${todo.text} با موفقیت عوض شد`, type: todo.completed });
  } catch (error) {
    next(error);
  }
}

//* not nececery function
function updateTime(req, res, next) {
  const { id, time } = req.body;
  Todos.findByPk(id)
    .then((todo) => {
      todo.time = time;
      todo.updatedAt = Date.now();
      todo
        .save()
        .then(() => {
          res.status(200).json({ status: 1 });
        })
        .catch((err) => {
          console.log(err);
          res.status(200).json({
            status: 0,
            message: "مشکلی در آپدیت کردن این کار وجود دارد",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({ status: 0, message: "مشکلی در پیدا کردن این کار وجود دارد" });
    });
}

async function deleteTodo(req, res, next) {
  try {
    // 1: validate todo
    let todo = await Todos.findOne({ where: { id: req.body.id, userId: req.user.id } });

    if (todo == null) {
      const error = new Error("کار روزانه در پایگاه داده وجود ندارد");
      error.statusCode = 404;
      throw error;
    }

    // 2: delete todo
    await Todos.destroy({ where: { id: todo.id } });
    res.status(200).json({ message: `${todo.text} با موفقیت حذف شد` });
  } catch (error) {
    next(error);
  }
}

async function addToTomorrow(req, res, next) {
  try {
    // 1: validate todo
    let todo = await Todos.findOne({ where: { id: req.body.id, userId: req.user.id } });

    if (todo == null) {
      const error = new Error("کار روزانه در پایگاه داده پیدا نشد");
      error.statusCode = 404;
      throw error;
    }

    // 2 : update todo
    let day = todo.day;
    let month = todo.month;
    let year = todo.year;
    day++;
    if (month <= 6) {
      if (day > 31) {
        day = 1;
        month++;
      }
    }
    if (month > 6 && month < 11) {
      if (day > 30) {
        day = 1;
        month++;
      }
    }
    if (month == 12) {
      if (day > 29) {
        month = 1;
        day = 1;
        year++;
      }
    }
    todo.day = day;
    todo.month = month;
    todo.year = year;
    // 3: save todo
    await todo.save();
    res.status(200).json({ message: `${todo.text} با موفقیت به فردا انتقال یافت` });
  } catch (error) {
    next(error);
  }
}

async function move(req, res, next) {
  try {
    // 1: validate todo
    let todo = await Todos.findOne({ where: { id: req.body.id, userId: req.user.id } });

    if (todo == null) {
      const error = new Error("کار روزانه در پایگاه داده پیدا نشد");
      error.statusCode = 404;
      throw error;
    }

    date3(req, res);
    const { year, month, day } = req.body;
    // 2: update todo
    todo.day = day;
    todo.month = month;
    todo.year = year;
    todo.updatedAt = Date.now() / 1000;
    await todo.save();
    res.status(200).json({ message: `${todo.text} با موفقیت انتقال یافت` });
  } catch (error) {
    next(error);
  }
}

async function count(req, res, next) {
  // 1: get all todos for a specific month
  try {
    date2(req, res);
    const { month, year } = req.body;
    let todosCount = await Todos.count({
      where: { userId: req.user.id, month, year },
    });
    res.status(200).json({ todosCount });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createTodo,
  findAll,
  findUndone,
  change,
  updateTime,
  deleteTodo,
  count,
  addToTomorrow,
  move,
};

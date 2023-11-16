//- models
const Users = require("../model/Users");
const Financial = require("../model/Financial");
const FinancialCategory = require("../model/financialCategory");
//- schemas
const financialCategory = require("../schemas/financialCategory");
const financial = require("../schemas/financial");
const userFinancial = require("../schemas/userFinancial");
//- utils
const { date2, date3 } = require("../utils/dateValidation");

// @desc : set user financial (once for each user at this time)
async function setUserFinancial(req, res, next) {
  try {
    await userFinancial.validate(req.body);
    try {
      let user = await Users.findByPk(req.user.id);
      user.financial = +req.body.financial;
      await user.save();
      res.status(200).json({ message: "اکانت شما با موفقیت بروزرسانی شد" });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    // validation catch
    error.message = error.errors.join(" , ");
    error.statusCode = 422;
    next(error);
  }
}

// @desc : find all financial for user such as (total , year , month )
async function findAllFinancial(req, res, next) {
  try {
    date2(req, res);
    const { month, year } = req.body;
    let financialItems = await Financial.findAll({ where: { year, month, userId: req.user.id, type: "financial" }, order: [["day", "ASC"]] });
    let monthFinancial = await Financial.sum("price", { where: { year, month, userId: req.user.id, type: "financial" } });
    let yearFinancial = await Financial.sum("price", { where: { year, userId: req.user.id, type: "financial" } });
    let totalFinancial = await Financial.sum("price", { where: { userId: req.user.id, type: "financial" } });
    //-
    let incomeItems = await Financial.findAll({ where: { year, month, userId: req.user.id, type: "income" }, order: [["day", "ASC"]] });
    let monthIncome = await Financial.sum("price", { where: { year, month, userId: req.user.id, type: "income" } });
    let yearIncome = await Financial.sum("price", { where: { year, userId: req.user.id, type: "income" } });
    let totalIncome = await Financial.sum("price", { where: { userId: req.user.id, type: "income" } });
    res.status(200).json({ financialItems, monthFinancial, yearFinancial, totalFinancial, incomeItems, monthIncome, yearIncome, totalIncome });
  } catch (error) {
    next(error);
  }
}

// @desc : find all financial categories
async function findAllCategory(req, res, next) {
  try {
    let categories = await FinancialCategory.findAll({ where: { userId: req.user.id } });
    res.status(200).json({ categories });
  } catch (error) {
    next(error);
  }
}

// @desc : create financial category
async function createCategory(req, res, next) {
  try {
    await financialCategory.validate(req.body, { abortEarly: false });
    try {
      const { name } = req.body;
      let category = await FinancialCategory.findOne({ where: { name, userId: req.user.id } });
      if (category == null) {
        await FinancialCategory.create({ name: name.trim(), userId: req.user.id });
        res.status(201).json({ message: `${name} با موفقیت ساخته شد` });
      } else {
        const error = new Error(`دسته بندی ای با نام ${name} از قبل وجود دارد`);
        error.statusCode = 422;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  } catch (error) {
    // validation catch
    error.message = error.errors.join(" , ");
    error.statusCode = 422;
    next(error);
  }
}

async function createFinancial(req, res, next) {
  // 1: validate financial
  try {
    await financial.validate(req.body, { abortEarly: false });
    try {
      date3(req, res);
      const { subject, price, day, month, year, type } = req.body;
      // 2: create new financial
      // check if user wants to add financial to category
      if (req.body.catId != undefined) {
        // 3: find financialCategory
        let category = await FinancialCategory.findByPk(req.body.catId);
        if (category != null) {
          await Financial.create({ subject: subject.trim(), price: price.trim(), day, month, year, cat_id: category.id, userId: req.user.id, type });
          // 4: update category total
          category.total += Number(price);
          await category.save();
          res.status(201).json({ message: `${subject} در دسته بندی ${category.name} ساخته شد` });
        } else {
          const error = new Error("این دسته بندی وجود ندارد");
          error.statusCode = 404;
          throw error;
        }
      } else {
        // default creation
        await Financial.create({ subject: subject.trim(), price: price.trim(), day, month, year, userId: req.user.id, type });
        res.status(201).json({ message: `${subject} ساخته شد` });
      }
    } catch (error) {
      next(error);
    }
  } catch (error) {
    // validation catch
    error.message = error.errors.join(" , ");
    error.statusCode = 422;
    next(error);
  }
}

async function deleteCategory(req, res, next) {
  try {
    let category = await FinancialCategory.findByPk(req.body.id);

    if (category == null) {
      const error = new Error("دسته بندی در پایگاه داده پیدا نشد");
      error.statusCode = 404;
      throw error;
    }

    let items = await Financial.findAll({ where: { userId: req.user.id, cat_id: category.id } });
    if (items.length > 0) {
      items.forEach(async (item) => {
        await Financial.destroy({ where: { id: item.id } });
      });
    }
    await FinancialCategory.destroy({ where: { id: category.id } });
    res.status(200).json({ message: `${category.name} با موفقیت حذف شد` });
  } catch (error) {
    next(error);
  }
}

async function deleteFinancial(req, res, next) {
  try {
    let financial = await Financial.findByPk(req.body.id);

    if (financial == null) {
      const error = new Error("آیتم در پایگاه داده پیدا نشد");
      error.statusCode = 404;
      throw error;
    }

    await Financial.destroy({ where: { id: financial.id } });
    if (financial.cat_id != null) {
      let categories = await FinancialCategory.findByPk(financial.cat_id);
      categories.total -= +financial.price;
      await categories.save();
    }
    res.status(200).json({ message: `${financial.subject} با موفقیت حذف شد` });
  } catch (error) {
    next(error);
  }
}

async function deleteIncome(req, res, next) {
  try {
    let financial = await Financial.findByPk(req.body.id);

    if (financial == null) {
      const error = new Error("آیتم در پایگاه داده پیدا نشد");
      error.statusCode = 404;
      throw error;
    }

    await Financial.destroy({ where: { id: financial.id } });
    if (financial.cat_id != null) {
      let categories = await FinancialCategory.findByPk(financial.cat_id);
      categories.total -= +financial.price;
      await categories.save();
    }
    res.status(200).json({ message: `${financial.subject} با موفقیت حذف شد` });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  findAllFinancial,
  findAllCategory,
  createFinancial,
  createCategory,
  deleteCategory,
  deleteFinancial,
  setUserFinancial,
  deleteIncome,
};

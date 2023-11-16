const Users = require("../model/Users");
const { findOne } = require("../utils/findOne");
const Income = require("../model/Income");
const income = require("../schemas/income");
const { monthChanger } = require("../utils/monthChanger");

async function findAll(req, res) {
  const { month, year } = req.body.data;
  // 1: find all incomes
  try {
    let incomes = await Income.findAll({ where: { month, year, userId: req.user.id } });
    if (incomes != null) {
      res.json({ status: 1, incomes });
    } else {
      return res.json({ status: 0, message: `برای ${monthChanger(month)} ماه ${year} درامدی وارد نشده است` });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: 0, message: `مشکلی در دریافت درامد های ${monthChanger(month)} ماه ${year} وجود دارد` });
  }
}

async function createIncome(req, res) {
  const { subject } = req.body.data;
  // 1: validate
  try {
    await income.validate(req.body.data, { abortEarly: false });
    // 2: create income
    try {
      await income.create({ ...req.body.data, userId: req.user.id });
      // 3: update user income
      try {
        req.user.financial += Number(req.body.data.price);
        await req.user.save();
        res.json({ status: 1, price: req.body.data.price });
      } catch (error) {
        console.log(error);
        return res.json({ status: 0, message: "مشکلی در بروزرسانی اکانت شما وجود دارد" });
      }
    } catch (error) {
      console.log(error);
      return res.json({ status: 0, message: `مشکلی در ساختن ${subject} وجود دارد` });
    }
  } catch (error) {
    console.log(error);
    let path = error.inner[0].path;
    let message = error.errors.join(" , ");
    return res.json({ status: 0, message, title: "اعتبارسنجی", path });
  }
}

async function deleteIncome(req, res) {
  // 1: find income
  let income = await findOne(req.body.id, res, Income);
  try {
    // 2: delete income
    await Income.destroy({ where: { id: income.id } });
    // 3: update user income
    try {
      req.user.financial -= Number(income.price);
      await req.user.save();
      res.json({ status: 1, price: income.price });
    } catch (error) {
      console.log(error);
      return res.json({ status: 0, message: `مشکلی در بروزرسانی اکانت شما وجود دارد` });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: 0, message: `مشکلی در حذف کردن ${income.subject} وجود دارد` });
  }
}

module.exports = {
  findAll,
  createIncome,
  deleteIncome,
};

//- models
const Bookmarks = require("../model/Bookmarks");
const BookmarksCategory = require("../model/BookmarksCategory");
//- schemas
const { bookmarkSchema, categorySchema, updateSchema } = require("../schemas/bookmarks");

// @desc : find all bookmarks and categories for user
module.exports.findAll = async (req, res, next) => {
  try {
    const bookmarks = await Bookmarks.findAll({ where: { userId: req.user.id, cat_id: null } });
    const categories = await BookmarksCategory.findAll({ where: { userId: req.user.id } });
    res.status(200).json({ bookmarks, categories });
  } catch (error) {
    next(error);
  }
};

// @desc : find all none category bookmarks for insert in category insert component
module.exports.findForInsert = async (req, res, next) => {
  try {
    const bookmarks = await Bookmarks.findAll({ where: { userId: req.user.id, cat_id: null } });

    // if (bookmarks.length == 0) {
    //   const error = new Error("بوک مارکی بدون دسته بندی پیدا نشد");
    //   error.statusCode = 404;
    //   throw error;
    // }

    res.status(200).json({ bookmarks });
  } catch (error) {
    next(error);
  }
};

// @desc : find all users categories
module.exports.findCategories = async (req, res, next) => {
  try {
    const categories = await BookmarksCategory.findAll({ where: { userId: req.user.id } });
    res.status(200).json({ categories });
  } catch (error) {
    next(error);
  }
};

// @desc : find a single bookmark
module.exports.findSingle = async (req, res, next) => {
  try {
    const bookmark = await Bookmarks.findOne({ where: { name: req.body.name, userId: req.user.id } });

    if (bookmark == null) {
      const error = new Error("بوک مارک در پایگاه داده پیدا نشد");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ bookmark });
  } catch (error) {
    next(error);
  }
};

// @desc : find all bookmarks for a category and category itself
module.exports.findCategoryItems = async (req, res, next) => {
  try {
    const category = await BookmarksCategory.findOne({ where: { name: req.body.name, userId: req.user.id } });

    if (category == null) {
      const error = new Error("دسته بندی در پایگاه داده پیدا نشد");
      error.statusCode = 404;
      throw error;
    }

    let items = await Bookmarks.findAll({ where: { cat_id: category.id } });
    res.status(200).json({ items, category });
  } catch (error) {
    next(error);
  }
};

// @desc : insert bookmark in category
module.exports.insert = async (req, res, next) => {
  try {
    let bookmark = await Bookmarks.findOne({ where: { id: req.body.id, userId: req.user.id } });

    if (bookmark == null) {
      const error = new Error("بوک مارک در پایگاه داده پیدا نشد");
      error.statusCode = 404;
      throw error;
    }

    let category = await BookmarksCategory.findOne({ where: { name: req.body.name, userId: req.user.id } });

    if (category == null) {
      const error = new Error("دسته بندی در پایگاه داده پیدا نشد");
      error.statusCode = 404;
      throw error;
    }

    bookmark.cat_id = category.id;
    await bookmark.save();

    res.status(200).json({ message: `${bookmark.name} بروزرسانی شد` });
  } catch (error) {
    next(error);
  }
};

// @desc : create bookmark with or without category
module.exports.createBookmark = async (req, res, next) => {
  try {
    // validation
    await bookmarkSchema.validate(req.body, { abortEarly: false });
    try {
      const { name, link } = req.body;
      // @desc : check if bookmark has cat_id or not if it has then create with category if it has not create without category
      if (req.body.cat_name && req.body.cat_name != "") {
        const category = await BookmarksCategory.findOne({ where: { name: req.body.cat_name, userId: req.user.id } });

        if (category == null) {
          const error = new Error("دسته بندی در پایگاه داده وجود ندارد");
          error.statusCode = 404;
          throw error;
        }

        const bookmark = await Bookmarks.findOne({ where: { userId: req.user.id, cat_id: category.id, name } });

        if (bookmark != null) {
          const error = new Error("بوک مارکی با این نام و دسته بندی از قبل وجود دارد");
          error.statusCode = 422;
          throw error;
        }

        await Bookmarks.create({
          userId: req.user.id,
          cat_id: category.id,
          link,
          name,
        });

        res.status(201).json({ message: `${name} در دسته بندی ${category.name} با موفقیت ساخته شد`, name: category.name });
      } else {
        const bookmark = await Bookmarks.findOne({ where: { name, cat_id: null } });

        if (bookmark != null) {
          const error = new Error("بوک مارکی با این نام از قبل وجود دارد");
          error.statusCode = 422;
          throw error;
        }

        await Bookmarks.create({
          userId: req.user.id,
          link,
          name,
        });

        res.status(201).json({ message: `${name} با موفقیت ساخته شد` });
      }
    } catch (error) {
      next(error);
    }
  } catch (error) {
    error.message = error.errors.join(" , ");
    error.statusCode = 422;
    next(error);
  }
};

// @desc : create category
module.exports.createCategory = async (req, res, next) => {
  try {
    await categorySchema.validate(req.body, { abortEarly: false });
    try {
      const category = await BookmarksCategory.findOne({ where: { name: req.body.name } });

      if (category != null) {
        const error = new Error("دسته بندی ای با این نام از قبل وجود دارد");
        error.statusCode = 422;
        throw error;
      }

      await BookmarksCategory.create({
        name: req.body.name,
        userId: req.user.id,
      });

      res.status(201).json({ message: `${req.body.name} با موفقیت ساخته شد` });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    error.message = error.errors.join(" , ");
    error.statusCode = 422;
    next(error);
  }
};

// @desc : delete bookmark
module.exports.deleteBookmark = async (req, res, next) => {
  try {
    const bookmark = await Bookmarks.findOne({ where: { id: req.body.id, userId: req.user.id } });
    if (bookmark == null) {
      const error = new Error("بوک مارک در پایگاه داده پیدا نشد");
      error.statusCode = 404;
      throw error;
    }
    await Bookmarks.destroy({ where: { id: bookmark.id } });
    res.status(200).json({ message: `${bookmark.name} با موفقیت حذف شد` });
  } catch (error) {
    next(error);
  }
};

// @desc : delete category
module.exports.deleteCategory = async (req, res, next) => {
  try {
    let category = await BookmarksCategory.findOne({ where: { id: req.body.id, userId: req.user.id } });

    if (category == null) {
      const error = new Error("دسته بندی در پایگاه داده پیدا نشد");
      error.statusCode = 404;
      throw error;
    }

    let items = await Bookmarks.findAll({ where: { cat_id: category.id } });

    if (items.length > 0) {
      items.forEach(async (item) => {
        await Bookmarks.destroy({ where: { id: item.id } });
      });
    }

    await BookmarksCategory.destroy({ where: { id: category.id } });
    res.status(200).json({ message: `${category.name} با موفقیت حذف شد` });
  } catch (error) {
    next(error);
  }
};

// @desc : update bookmark (link only)
module.exports.updateBookmark = async (req, res, next) => {
  try {
    await updateSchema.validate(req.body, { abortEarly: false });
    try {
      const bookmark = await Bookmarks.findByPk(req.body.id);

      if (bookmark == null) {
        const error = new Error("بوک مارک در پایگاه داده پیدا نشد");
        error.statusCode = 404;
        throw error;
      }

      bookmark.link = req.body.link;
      bookmark.updatedAt = Math.floor(Date.now() / 1000);
      await bookmark.save();
      res.status(200).json({ message: `${bookmark.name} با موفقیت بروزرسانی شد` });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    error.message = error.errors.join(" , ");
    error.statusCode = 422;
    next(error);
  }
};

// @desc : update category (for update maybe)
// module.exports.updateCategory = async (req, res, next) => {
//   let category = await findOne(req.body.id, res, BookmarksCategory);
//   try {
//     await schema.validate(req.body, { abortEarly: false });
//     try {
//       category.name = req.body.name;
//       await category.save();
//       res.status(200).json({ message: `${category.name} با موفقیت بروزرسانی شد` });
//     } catch (error) {
//       next();
//     }
//   } catch (error) {
//     error.message = error.errors.join(" , ");
//     error.statusCode = 422;
//     next(error);
//   }
// };

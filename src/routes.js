// home
import Home from "./components/shared/Home.vue";

////////// 404 //////////

const notFound = (resolve) => {
  require.ensure(["./components/layouts/404.vue"], () => {
    resolve(require("./components/layouts/404.vue"));
  });
};

////////// active //////////

const active = (resolve) => {
  require.ensure(["./components/layouts/Active.vue"], () => {
    resolve(require("./components/layouts/Active.vue"));
  });
};

////////// auth //////////

const register = (resolve) => {
  require.ensure(["./components/layouts/register.vue"], () => {
    resolve(require("./components/layouts/register.vue"));
  });
};

const login = (resolve) => {
  require.ensure(["./components/layouts/login.vue"], () => {
    resolve(require("./components/layouts/login.vue"));
  });
};

const Forgot = (resolve) => {
  require.ensure(["./components/layouts/Forgot.vue"], () => {
    resolve(require("./components/layouts/Forgot.vue"));
  });
};

const ForgotChange = (resolve) => {
  require.ensure(["./components/layouts/ForgotChange.vue"], () => {
    resolve(require("./components/layouts/ForgotChange.vue"));
  });
};

// import register from "./components/layouts/register.vue";
// import login from "./components/layouts/login.vue";

////////// todos //////////

const appStart = (resolve) => {
  require.ensure(["./components/shared/AppStart.vue"], () => {
    resolve(require("./components/shared/AppStart.vue"));
  });
};

////////// todos //////////

const Todos = (resolve) => {
  require.ensure(["./components/shared/todos/TodoTest.vue"], () => {
    resolve(require("./components/shared/todos/TodoTest.vue"));
  });
};

const CreateTodos = (resolve) => {
  require.ensure(["./components/shared/todos/CreateTodoTest.vue"], () => {
    resolve(require("./components/shared/todos/CreateTodoTest.vue"));
  });
};

const Redo = (resolve) => {
  require.ensure(["./components/shared/todos/Redo.vue"], () => {
    resolve(require("./components/shared/todos/Redo.vue"));
  });
};

// import Todos from "./components/shared/Todo.vue";
// import CreateTodos from "./components/shared/CreateTodo.vue";

////////// texts //////////

const Texts = (resolve) => {
  require.ensure(["./components/shared/texts/Text.vue"], () => {
    resolve(require("./components/shared/texts/Text.vue"));
  });
};

const CreateText = (resolve) => {
  require.ensure(["./components/shared/texts/CreateText.vue"], () => {
    resolve(require("./components/shared/texts/CreateText.vue"));
  });
};

const ShowText = (resolve) => {
  require.ensure(["./components/shared/texts/ShowText.vue"], () => {
    resolve(require("./components/shared/texts/ShowText.vue"));
  });
};

// import Texts from "./components/shared/Text.vue";
// import CreateText from "./components/shared/CreateText.vue";
// import ShowText from "./components/shared/ShowText.vue";

////////// exams //////////

const Exams = (resolve) => {
  require.ensure(["./components/shared/exams/Exam.vue"], () => {
    resolve(require("./components/shared/exams/Exam.vue"));
  });
};

const ExamStart = (resolve) => {
  require.ensure(["./components/shared/exams/ExamStart.vue"], () => {
    resolve(require("./components/shared/exams/ExamStart.vue"));
  });
};

const CreateExams = (resolve) => {
  require.ensure(["./components/shared/exams/CreateExam.vue"], () => {
    resolve(require("./components/shared/exams/CreateExam.vue"));
  });
};

const ShowExam = (resolve) => {
  require.ensure(["./components/shared/exams/ShowExam.vue"], () => {
    resolve(require("./components/shared/exams/ShowExam.vue"));
  });
};

const ManageExam = (resolve) => {
  require.ensure(["./components/shared/exams/ManageExam.vue"], () => {
    resolve(require("./components/shared/exams/ManageExam.vue"));
  });
};

// import Exams from "./components/shared/Exam.vue";
// import CreateExams from "./components/shared/CreateExam.vue";
// import ShowExam from "./components/shared/ShowExam.vue";
// import ManageExam from "./components/shared/ManageExam.vue";

////////// university //////////

const University = (resolve) => {
  require.ensure(["./components/shared/university/University.vue"], () => {
    resolve(require("./components/shared/university/University.vue"));
  });
};

const UniversityStart = (resolve) => {
  require.ensure(["./components/shared/university/UniversityStart.vue"], () => {
    resolve(require("./components/shared/university/UniversityStart.vue"));
  });
};

const CreateSemester = (resolve) => {
  require.ensure(["./components/shared/university/CreateSemester.vue"], () => {
    resolve(require("./components/shared/university/CreateSemester.vue"));
  });
};

const ShowSemester = (resolve) => {
  require.ensure(["./components/shared/university/ShowSemester.vue"], () => {
    resolve(require("./components/shared/university/ShowSemester.vue"));
  });
};

const CreateCourse = (resolve) => {
  require.ensure(["./components/shared/university/CreateCourse.vue"], () => {
    resolve(require("./components/shared/university/CreateCourse.vue"));
  });
};

const ShowCourse = (resolve) => {
  require.ensure(["./components/shared/university/ShowCourse.vue"], () => {
    resolve(require("./components/shared/university/ShowCourse.vue"));
  });
};

const ManageCourse = (resolve) => {
  require.ensure(["./components/shared/university/ManageCourse.vue"], () => {
    resolve(require("./components/shared/university/ManageCourse.vue"));
  });
};

const SemesterTexts = (resolve) => {
  require.ensure(["./components/shared/university/SemesterTexts.vue"], () => {
    resolve(require("./components/shared/university/SemesterTexts.vue"));
  });
};

const CreateSemesterTexts = (resolve) => {
  require.ensure(["./components/shared/university/CreateSemesterText.vue"], () => {
    resolve(require("./components/shared/university/CreateSemesterText.vue"));
  });
};

const ShowSemesterText = (resolve) => {
  require.ensure(["./components/shared/university/ShowText.vue"], () => {
    resolve(require("./components/shared/university/ShowText.vue"));
  });
};

// import University from "./components/shared/University.vue";
// import CreateSemester from "./components/shared/CreateSemester.vue";
// import ShowSemester from "./components/shared/ShowSemester.vue";
// import CreateCourse from "./components/shared/CreateCourse.vue";
// import ShowCourse from "./components/shared/ShowCourse.vue";
// import ManageCourse from "./components/shared/ManageCourse.vue";

////////// financial //////////

const Financial = (resolve) => {
  require.ensure(["./components/shared/financial/Financial.vue"], () => {
    resolve(require("./components/shared/financial/Financial.vue"));
  });
};

const CreateFinancial = (resolve) => {
  require.ensure(["./components/shared/financial/CreateFinancial.vue"], () => {
    resolve(require("./components/shared/financial/CreateFinancial.vue"));
  });
};

const CreateTotal = (resolve) => {
  require.ensure(["./components/shared/financial/TotalFinancial.vue"], () => {
    resolve(require("./components/shared/financial/TotalFinancial.vue"));
  });
};

const FinancialMonth = (resolve) => {
  require.ensure(["./components/shared/financial/FinancialMonth.vue"], () => {
    resolve(require("./components/shared/financial/FinancialMonth.vue"));
  });
};

const CreateIncome = (resolve) => {
  require.ensure(["./components/shared/financial/CreateIncome.vue"], () => {
    resolve(require("./components/shared/financial/CreateIncome.vue"));
  });
};

// import Financial from "./components/shared/Financial.vue";
// import CreateFinancial from "./components/shared/CreateFinancial.vue";

////////// book //////////

const Book = (resolve) => {
  require.ensure(["./components/shared/books/Book.vue"], () => {
    resolve(require("./components/shared/books/Book.vue"));
  });
};

const CreateBook = (resolve) => {
  require.ensure(["./components/shared/books/CreateBook.vue"], () => {
    resolve(require("./components/shared/books/CreateBook.vue"));
  });
};

const ShowBook = (resolve) => {
  require.ensure(["./components/shared/books/ShowBook.vue"], () => {
    resolve(require("./components/shared/books/ShowBook.vue"));
  });
};

const ManageBook = (resolve) => {
  require.ensure(["./components/shared/books/ManageBook.vue"], () => {
    resolve(require("./components/shared/books/ManageBook.vue"));
  });
};

// import Book from "./components/shared/Book.vue";
// import CreateBook from "./components/shared/CreateBook.vue";
// import ShowBook from "./components/shared/ShowBook.vue";
// import ManageBook from "./components/shared/ManageBook.vue";

////////// admin //////////

const Admin = (resolve) => {
  require.ensure(["./components/private/Admin.vue"], () => {
    resolve(require("./components/private/Admin.vue"));
  });
};

const AdminStart = (resolve) => {
  require.ensure(["./components/private/AdminStart.vue"], () => {
    resolve(require("./components/private/AdminStart.vue"));
  });
};

const Users = (resolve) => {
  require.ensure(["./components/private/Users.vue"], () => {
    resolve(require("./components/private/Users.vue"));
  });
};

const AdminActive = (resolve) => {
  require.ensure(["./components/private/AdminActive.vue"], () => {
    resolve(require("./components/private/AdminActive.vue"));
  });
};

const AdminResponse = (resolve) => {
  require.ensure(["./components/private/AdminResponse.vue"], () => {
    resolve(require("./components/private/AdminResponse.vue"));
  });
};

const AdminResponseContact = (resolve) => {
  require.ensure(["./components/private/AdminResponseContact.vue"], () => {
    resolve(require("./components/private/AdminResponseContact.vue"));
  });
};

const AdminSetting = (resolve) => {
  require.ensure(["./components/private/AdminSetting.vue"], () => {
    resolve(require("./components/private/AdminSetting.vue"));
  });
};

// import Admin from "./components/private/Admin.vue";
// import AdminStart from "./components/private/AdminStart.vue";
// import Users from "./components/private/Users.vue";
// import AdminActive from "./components/private/AdminActive.vue";
// import AdminResponse from "./components/private/AdminResponse.vue";
// import AdminResponseContact from "./components/private/AdminResponseContact.vue";

////////// setting //////////

const Setting = (resolve) => {
  require.ensure(["./components/setting/Setting.vue"], () => {
    resolve(require("./components/setting/Setting.vue"));
  });
};

const SettingStart = (resolve) => {
  require.ensure(["./components/setting/SettingStart.vue"], () => {
    resolve(require("./components/setting/SettingStart.vue"));
  });
};

const SettingGuide = (resolve) => {
  require.ensure(["./components/setting/SettingGuide.vue"], () => {
    resolve(require("./components/setting/SettingGuide.vue"));
  });
};

const SettingContact = (resolve) => {
  require.ensure(["./components/setting/SettingContact.vue"], () => {
    resolve(require("./components/setting/SettingContact.vue"));
  });
};

const Password = (resolve) => {
  require.ensure(["./components/setting/Password.vue"], () => {
    resolve(require("./components/setting/Password.vue"));
  });
};

const ActiveUniversity = (resolve) => {
  require.ensure(["./components/setting/ActiveUniversity.vue"], () => {
    resolve(require("./components/setting/ActiveUniversity.vue"));
  });
};

// import Setting from "./components/Setting/Setting.vue";
// import SettingStart from "./components/Setting/SettingStart.vue";
// import SettingGuide from "./components/Setting/SettingGuide.vue";
// import SettingContact from "./components/Setting/SettingContact.vue";
// import SettingUserSetting from "./components/Setting/SettingUserSetting.vue";
// import SettingActive from "./components/Setting/SettingActive.vue";

////////// bookmark //////////

const bookmark = (resolve) => {
  require.ensure(["./components/shared/bookmarks/BookMark.vue"], () => {
    resolve(require("./components/shared/bookmarks/BookMark.vue"));
  });
};

const createBookMark = (resolve) => {
  require.ensure(["./components/shared/bookmarks/CreateBookMark.vue"], () => {
    resolve(require("./components/shared/bookmarks/CreateBookMark.vue"));
  });
};

const ManageBookMark = (resolve) => {
  require.ensure(["./components/shared/bookmarks/ManageBookMark.vue"], () => {
    resolve(require("./components/shared/bookmarks/ManageBookMark.vue"));
  });
};

const CreateCategory = (resolve) => {
  require.ensure(["./components/shared/bookmarks/CreateCategory.vue"], () => {
    resolve(require("./components/shared/bookmarks/CreateCategory.vue"));
  });
};

const Category = (resolve) => {
  require.ensure(["./components/shared/bookmarks/Category.vue"], () => {
    resolve(require("./components/shared/bookmarks/Category.vue"));
  });
};

const CreateCategoryBookMark = (resolve) => {
  require.ensure(["./components/shared/bookmarks/CreateCategoryBookMark.vue"], () => {
    resolve(require("./components/shared/bookmarks/CreateCategoryBookMark.vue"));
  });
};

const CategoryInsert = (resolve) => {
  require.ensure(["./components/shared/bookmarks/CategoryInsert.vue"], () => {
    resolve(require("./components/shared/bookmarks/CategoryInsert.vue"));
  });
};

//- profile section -//
// const profile = (resolve) => {
//   require.ensure(["./components/private/profile.vue"], () => {
//     resolve(require("./components/private/profile.vue"));
//   });
// };
//- profile section -//

export const Routes = [
  {
    path: "/",
    component: login,
    name: "login",
  },
  {
    path: "/Register",
    component: register,
    name: "register",
  },
  {
    path: "/Home",
    component: Home,
    children: [
      {
        path: "/",
        component: appStart,
        name: "home",
      },
      {
        path: "Todos",
        component: Todos,
        name: "todos",
      },
      {
        path: "Todos/Create",
        component: CreateTodos,
        name: "createTodo",
      },
      {
        path: "Todos/Redo",
        component: Redo,
        name: "redo",
      },
      {
        path: "Texts",
        component: Texts,
        name: "texts",
      },
      {
        path: "Texts/Create",
        component: CreateText,
        name: "createText",
      },
      {
        path: "Texts/:id",
        component: ShowText,
        name: "showText",
      },
      {
        path: "Exams",
        component: Exams,
        children: [
          {
            path: "/",
            component: ExamStart,
            name: "exams",
          },
          {
            path: "Create",
            component: CreateExams,
            name: "createExam",
          },
          {
            path: "showExam/:id",
            component: ShowExam,
            name: "showExam",
          },
          {
            path: "Manage/:id",
            component: ManageExam,
            name: "manageExam",
          },
        ],
      },
      {
        path: "University",
        component: University,
        children: [
          {
            path: "/",
            component: UniversityStart,
            name: "university",
          },
          {
            path: "Create",
            component: CreateSemester,
            name: "createSemester",
          },
          {
            path: "Semester/:id",
            component: ShowSemester,
            name: "showSemester",
          },
          {
            path: "Semester/:id/Course/Create",
            component: CreateCourse,
            name: "createCourse",
          },
          {
            path: "Semester/:id/Course/:courseId",
            component: ShowCourse,
            name: "showCourse",
          },
          {
            path: "Semester/:id/Course/Manage/:courseId",
            component: ManageCourse,
            name: "manageCourse",
          },
          {
            path: "Semester/:id/Texts",
            component: SemesterTexts,
            name: "universityTexts",
          },
          {
            path: "Semester/:id/Texts/Create",
            component: CreateSemesterTexts,
            name: "createSemesterText",
          },
          {
            path: "Semester/:id/Texts/:semesterId",
            component: ShowSemesterText,
            name: "showSemesterText",
          },
        ],
      },
      {
        path: "Financial",
        component: Financial,
        name: "financial",
      },
      {
        path: "Financial/Create",
        component: CreateFinancial,
        name: "createFinancial",
      },
      {
        path: "Financial/Total",
        component: CreateTotal,
      },
      {
        path: "Financial/Month",
        component: FinancialMonth,
      },
      {
        path: "Financial/Income",
        component: CreateIncome,
        name: "createIncome",
      },
      {
        path: "Book",
        component: Book,
        name: "books",
      },
      {
        path: "Book/Create",
        component: CreateBook,
        name: "createBook",
      },
      {
        path: "Book/:id",
        component: ShowBook,
        name: "showBook",
      },
      {
        path: "Book/Manage/:id",
        component: ManageBook,
        name: "manageBook",
      },
      {
        path: "Setting",
        component: Setting,
        name: "setting",
        // children: [
        //   {
        //     path: "/",
        //     component: SettingStart,
        //   },
        //   {
        //     path: "Password",
        //     component: Password,
        //     name: "password",
        //   },
        //   {
        //     path: "ActiveUniversity",
        //     component: ActiveUniversity,
        //     name: "ActiveUniversity",
        //   },
        //   {
        //     path: "profile",
        //     component: profile,
        //     name: "profile",
        //   },
        // ],
      },
      {
        path: "Admin",
        component: Admin,
        children: [
          {
            path: "/",
            component: AdminStart,
          },
          {
            path: "Users",
            component: Users,
          },
          {
            path: "Active",
            component: AdminActive,
          },
          {
            path: "Response",
            component: AdminResponse,
          },
          {
            path: "Response/:id",
            component: AdminResponseContact,
          },
          {
            path: "Setting",
            component: AdminSetting,
            name: "siteSetting",
          },
        ],
      },
      {
        path: "BookMark",
        component: bookmark,
        name: "bookmarks",
      },
      {
        path: "BookMark/CreateBookMark",
        component: createBookMark,
        name: "createBookMark",
      },
      {
        path: "BookMark/Manage/:name",
        component: ManageBookMark,
        name: "manageBookmark",
      },
      {
        path: "BookMark/CreateCategory",
        component: CreateCategory,
        name: "createCategory",
      },
      {
        path: "BookMark/Category/:name",
        component: Category,
        name: "manageCategory",
      },
      {
        path: "BookMark/:name/Create",
        component: CreateCategoryBookMark,
        name: "createCategoryBookMark",
      },
      {
        path: "BookMark/:name/Insert",
        component: CategoryInsert,
        name: "categoryInsert",
      },
    ],
  },
  {
    path: "/forgot-password",
    component: Forgot,
    name: "forgot",
  },
  {
    path: "/reset-password/:token",
    component: ForgotChange,
  },
  {
    path: "/active-user/:token",
    component: active,
  },
  {
    path: "*",
    redirect: "/404",
  },
  {
    path: "/404",
    component: notFound,
  },
];

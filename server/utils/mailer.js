const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const transportDetails = smtpTransport({
  host: process.env.MAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports.sendMail = (email, fullname, subject, message) => {
  const transporter = nodemailer.createTransport(transportDetails);
  transporter
    .sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject,
      html: `سلام ${fullname} <br> ${message}`,
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.sendHtml = (email, subject, html, filename, path) => {
  const transporter = nodemailer.createTransport(transportDetails);
  transporter
    .sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject,
      html,
      attachments: [
        {
          filename,
          path,
          cid: "image",
        },
      ],
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.sendRegister = (email, fullName, link) => {
  const transport = nodemailer.createTransport(transportDetails);
  transport
    .sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "تایید اکانت",
      /*html*/
      html: `<html lang="en">

      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>خوش آمدید</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/vazir-font/27.0.0/font-face.min.css" integrity="sha512-FOp1/1tT19/xw6wkob5zvDLQUPFTgmYy6fXIKpo/nvZyMiyhe72YNhgSRlrE/FLS8OgYFONMGvqazSVLbO2/6Q==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      color: #000;
    }

    body {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: right;
      font-family: "vazir" !important;
    }

    main {
      display: flex;
      flex-direction: column;
      border: 1px solid #cecece;
      padding: 20px 40px;
    }

    p {
      margin-top: 10px;
      text-align: center;
    }

    button {
      background-color: royalblue;
      color: white !important;
      border: none;
      border-radius: 7px;
      padding: 10px;
      font-family: "vazir" !important;
      margin-top: 15px;
      cursor: pointer;
    }

    a {
      text-decoration: none;
      color: white !important;
      width : 100%;
    }
        </style>
      </head>
      
      <body>
        <main>
          <h3>
            <center>
              سلام ${fullName}
            </center>
          </h3>
          <p>
            به سامانه داشبورد خوش آمدی
          </p>
          <p>
            اگر نظر یا انتقادی داری با من در میان بزار
          </p>
          <div style="text-align:center;">
        <button>
          <a href="${link}" target="_blank">
            لطفا اکانت خودت را تایید کن
          </a>
        </button>
    </div>
        </main>
      </body>
      
      </html>`,
    })
    .catch((err) => {
      console.log(err);
    });
};

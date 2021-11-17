// const formData = require("form-data");
// const Mailgun = require("mailgun.js");
// const mailgun = new Mailgun(formData);
// const mg = mailgun.client({
//   username: "api",
//   key: process.env.MAILGUN_API_KEY,
//   public_key: process.env.MAILGUN_PUBLIC_KEY,
// });
// const DOMAIN = process.env.MAILGUN_DOMAIN;

// mg.messages
// .create(DOMAIN, {
//   from: "Homely <bbayejuadesina@gmail.com>",
//   to: "babayejuadesina@gmail.com",
//   subject: `Email Verification`,
//   template: "email",
//   "h:X-Mailgun-Variables": JSON.stringify({
//     // be sure to surely stringify your payload
//     title: "email verify",
//   }),
//   "h:Reply-To": "bbayejuadesina@gmail.com",
// })
// .then((msg) => console.log(msg)) // logs response data
// .catch((err) => console.log(err));

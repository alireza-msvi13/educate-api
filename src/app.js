const path = require("path");
const express = require("express");
const { setHeaders } = require("./middlewares/headers");
const { errorHandler } = require("./middlewares/errors");

//*routes import
const usersRoutes = require("./modules/user/user.router");
const articlesRoutes = require("./modules/article/article.router");
const authRoutes = require("./modules/auth/auth.router");
const courseRoutes = require("./modules/course/course.router");
const menuRoutes = require("./modules/menu/menu.router");
const categoryRoutes = require("./modules/category/category.router");
const commentsRoutes = require("./modules/comment/comment.router");
const contactRoutes = require("./modules/contact/contact.router");
const searchRoutes = require("./modules/search/search.router");
const infosRoutes = require("./modules/admin/admin.router");
const offsRoutes = require("./modules/off/off.router");
const ordersRoutes = require("./modules/order/order.router");
const ticketsRoutes = require("./modules/ticket/ticket.router");

const app = express();

//* BodyPaser
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

//* CORS Policy Definitions
app.use(setHeaders);

//* Static Folder
app.use(express.static(path.join(__dirname, ".." ,"public")));


app.get("/", (req, res) => {
  res.json({ message: "welcome to educate api" })
})

//* Routes
app.use("/articles", articlesRoutes);
app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);
app.use("/comments", commentsRoutes);
app.use("/contact", contactRoutes);
app.use("/courses", courseRoutes);
app.use("/infos", infosRoutes);
app.use("/menus", menuRoutes);
app.use("/offs", offsRoutes);
app.use("/orders", ordersRoutes);
app.use("/search", searchRoutes);
app.use("/tickets", ticketsRoutes);
app.use("/users", usersRoutes);

//* Error Controller
app.use((req, res) => {
  console.log("this path is not available:", req.path);
  res.status(404).json({ message: "404 OOPS! PATH NOT FOUND" });
});
app.use(errorHandler);

module.exports = app;

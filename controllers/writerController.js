const { Sequelize } = require("sequelize");
const { Article, User, Comment } = require("../models");
const formidable = require("formidable");

async function indexWriter(req, res) {
  const articles = await Article.findAll({ include: User });

  return res.render("writer", { articles });
}

async function createForm(req, res) {
  const articles = await Article.findAll();
  return res.render("crear");
}

async function createArticle(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    const newArticle = await Article.create({
      title: fields.title,
      content: fields.content,
      author: fields.author,
      image: files.image.newFilename,
      userId: req.user.id,
    });

    return res.redirect("/admin");
  });
}

async function editForm(req, res) {
  const article = await Article.findByPk(req.params.id);
  res.render("edit", { article });
}

async function editArticle(req, res) {
  const newArticle = await Article.update(
    {
      title: `${req.body.title}`,
      content: `${req.body.content}`,
      date: {
        type: Sequelize.DATE,
        field: "updated_at",
      },
      image: `${req.body.image}`,
      author: `${req.body.author}`,
    },
    { where: { id: req.params.id } },
  );
  return res.redirect("/admin");
}

async function deleteArticle(req, res) {
  const deleteArticle = await Article.destroy({
    where: { id: req.params.id },
  });
  return res.redirect("/writer");
}

module.exports = {
  indexWriter,
  createForm,
  createArticle,
  editForm,
  editArticle,
  deleteArticle,
};

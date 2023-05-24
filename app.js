const fs = require("fs");

const express = require("express");
const app = express();
const port = 3000;

const id = require("uniqid");

app.set("view engine", "pug");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  let created = req.query.create;

  let medicine = getAll("medicine");
  if (created) {
    res.render("list", { created: true, medicine: medicine });
  } else {
    res.render("list", { created: false, medicine: medicine });
  }
  res.render("list", {});
});

app.get("/create", (req, res) => {
  res.render("create", {});
});

app.post("/create", (req, res) => {
  let data = req.body;

  let medicines = {
    id: id(),
    Name: data.Name,
    Number: data.Number,
    Seria: data.Seria,
    email: data.email,
    expiration_date: data.expiration_date,
  };

  let medicine = getAll("medicine");

  medicine.push(medicines);

  writeAll("medicine", medicine);

  res.redirect("/?created=true");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function getAll(filename) {
  return JSON.parse(fs.readFileSync(`./App/${filename}.json`));
}

function writeAll(filename, data) {
  return fs.writeFileSync(`./App/${filename}.json`, JSON.stringify(data));
}

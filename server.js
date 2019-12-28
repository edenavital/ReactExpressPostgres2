const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pg = require("pg");
const morgan = require("morgan");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();

//Config for working with postgres in localhost environment:
config = {
  user: "postgres",
  database: "postgres",
  password: "1a2d3i4",
  host: "localhost",
  port: 5432,
  max: 10
};

/*Config For working with postgres in deployment environment - heroku:
config = {
  connectionString: process.env.DATABASE_URL,
  ssl: true
}*/

//Enable access from all requests, parse the data to json format, and using morgan for logs
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

const pool = new pg.Pool(config);

app.get("/api/todos", (req, res) => {
  //Call back function - Connect to the pool of clients of the database
  //If the pool is not full, a new client will be created - db - A new client inside the database, done is a release function

  pool.connect((err, db, done) => {
    if (err) {
      return res.status(400).send(err);
    }
    //table = received data
    db.query("SELECT * from todolist", (err, table) => {
      done();
      if (err) {
        return res.status(400).send(err);
      }

      return res.status(200).send(table.rows);
    });
  });
});

// Post a new TODO item
app.post("/api/postTodo", (req, res) => {
  console.log(req.body);

  const title = req.body.title;
  const description = req.body.description;

  const values = [title, description];

  pool.connect((err, db, done) => {
    if (err) return res.status(400).send(err);

    db.query(
      "INSERT INTO todolist (title, description) VALUES($1, $2)",
      [...values],
      err => {
        done();
        if (err) return res.status(400).send(err);

        console.log("INSERTED DATA SUCCESSFULLY");
        res.status(201).send({ msg: "Data inserted!" });
      }
    );
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  console.log(`DELETE FROM BACKEND INVOKED WITH ID ${id}`);

  pool.connect((err, db, done) => {
    if (err) return res.status(400).send(err);

    db.query("DELETE FROM todolist WHERE id=$1", [id], err => {
      done();
      if (err) return res.status(400).send(err);

      return res
        .status(200)
        .send({ msg: `todo with id ${id} has been deleted` });
    });
  });
});

app.put("/api/update/:id", (req, res) => {
  const id = req.params.id;
  console.log(`PUT FROM BACKEND INVOKED WITH ID ${id}`);
  const title = req.body.title;
  const description = req.body.description;

  console.log(id);
  console.log(title);
  console.log(description);

  let values = [title, description, id];

  pool.connect((err, db, done) => {
    if (err) return res.status(400).send(err);

    db.query(
      "UPDATE todolist SET title=$1, description=$2 WHERE id=$3",
      [...values],
      (err, result) => {
        done();
        if (err) return res.status(400).send(err);

        return res
          .status(200)
          .send({ msg: `id of todo ${id} has been updated !` });
      }
    );
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
  });
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/public/index.html"));
});

app.listen(PORT, () => console.log("Listening on port " + PORT));

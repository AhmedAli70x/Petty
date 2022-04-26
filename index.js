const express = require("express");
const app = express();      //Create express instance
const sqlite3 = require('sqlite3').verbose();


var HTTP_PORT = 5000  // HTTP port


let db = new sqlite3.Database('petty.db', err=>{
    if(err){
        console.log(err.message);
    }
    else{
        console.log("Connected to petty database");
        db.run('DROP TABLE IF EXISTS pets');
        db.run(`
            CREATE TABLE IF NOT EXISTS pets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            animal text , 
            description text,
            location text
            );`,
        (err) => {
            if (err) {
                // console.log(err);
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO pets (name, animal, description,location) VALUES (?,?,?,?);'
                db.run(insert, ["ِAcorn", "dog", "bworn small, small", "central park"])
                db.run(insert, ["Blink", "dog", "black small", "vex park"])
                db.run(insert, ["Dibby", "dog", "black big", "padminton road"])
                db.run(insert, ["Cutie", "cat", "While cat", "Harly road"])
                db.run(insert, ["Piper", "cat", "Gray cat", "west bank lake "])
               
        
            }
        });  
    }
});

app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`)
});


app.get("/api/pets", (req, res) => {
    var sql = "SELECT * FROM pets"
    var params = []
    db.all(sql, params, (err, records) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "success": true,
            "data":records
        })
      });
});

app.get("/api/pet/:id", (req, res, next) =>{
    var sql = 'SELECT * FROM pets where id =?'
    var params = [ req.params.id]

  db.get(sql, params, (err, row) => {
      if (err) {
          res.status(400).json({"error":err.message});
          return;
      }
      res.json({
        "success": true,
        "data":row
      })
  })
});
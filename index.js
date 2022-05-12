
 express = require("express");
const app = express();      //Create express instance
const sqlite3 = require('sqlite3').verbose();

app.set("view engine", "ejs");
app.use(express.static("public"))
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



var HTTP_PORT = 5000  // HTTP port


let db = new sqlite3.Database('petty.db', err=>{
    if(err){
        console.log(err.message);
    }
    else{
        console.log("Connected to petty database");
        
    }
});

app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`)
});


app.get("/api/reports", (req, res) => {
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

app.get("/api/report/:id", (req, res) =>{
    var sql = 'SELECT * FROM pet WHERE id =?'
    var params = [ req.params.id]

    
  db.all(sql, params, (err, row) => {
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

app.post("/api/report/", (req,res) =>{
    var errors = []

    var data = {
        name: req.body.name,
        animal: req.body.animal,
        description: req.body.description,
        location: req.body.location
    }
    var sql = 'INSERT INTO pets (name, animal, description, location) VALUES (?,?,?,?);'
    var params =  [req.body.name, req.body.animal, req.body.description, req.body.location]
    db.run(sql, params, function(err, result) {
        if(err, result){
            res.status(400).json({"error": err.message})
        }
        res.json({
            "success": true,
            "data": data,
            "id": this.lastID
        })
    })

    
})

app.put("/api/report/:id", (req, res) =>{
    var data = {
        name: req.body.name,
        animal: req.body.animal,
        description: req.body.description,
        location: req.body.location
    }
    console.log(data.description)
    db.run(
        `UPDATE pets SET
        name = COALESCE(?, name),
        animal = COALESCE(?, animal),
        description = COALESCE(?, description),
        location = COALESCE(?, location)
        WHERE id = ?`,
        [data.name, data.animal, data.description, data.location, req.params.id],
        function(err, result){
            if(err){
                res.status(400).json({"error": res.message})
                console.log(err)
                return;
            }

            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
        }
        
    )


})

app.delete("/api/report/:id", (req, res) =>{
    db.run(
        "DELETE FROM pets WHERE id = ?;", req.params.id,
        function(err, result){
            if(err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message": "deleted", changes: this.changes})
        }
    )

})

app.get("/", (req, res) =>{
 
    res.render("index")

});
app.get("/report", (req, res) =>{
 
    res.render("report")

});
app.get("/reports", (req, res) =>{
 
    res.render("reports")
});












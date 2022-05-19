
express = require("express");
const app = express();      //Create express instance
const sqlite3 = require('sqlite3').verbose();

app.set("view engine", "ejs");
app.use(express.static("public"))
var bodyParser = require("body-parser");
const res = require("express/lib/response");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



var HTTP_PORT = 5000  // HTTP port


let db = new sqlite3.Database('petty.db', err=>{
    if(err){
        console.log(err.message);
        return;
    }
    else{
        console.log("Connected to petty database");

    }
});

app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`)
});


function chechReportExist(id){
    db.get("SELECT id FROM newpets \
    WHERE id = ?", id, function(err, result){
        if(err){
            console.log("error here")
        }
        else{
            return result
        }

})
}

app.get("/api/reports", (req, res) => {
    var sql = "SELECT id, name, animal, description, road, area, city FROM newpets as p \
    INNER JOIN location as l ON l.location_id = p.location_id;"
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
    //check if there report is exist
    db.get("SELECT id FROM newpets \
    WHERE id = ?", req.params.id, function(err, result){
        if(err){
            console.log("error here")
        }
        else if(result) {
            var sql = "SELECT id, name, animal, description, road, area, city FROM newpets as p \
            INNER JOIN location as l ON l.location_id = p.location_id \
               WHERE id = ?;"   
           db.all(sql, req.params.id, (err, row) => {
             if (err) {
                 res.status(400).json({"error":err.message});
                 return;
             }
                   res.json({
                       "success": true,
                       "data":row
                   })
               })
            }
        else{
            res.status(204).json({"error": "No Report Found"});

        }

        })
});

app.get("/api/search/:name", (req, res) =>{
    var sql = "SELECT id, name, animal, description, road, area, city FROM newpets as p \
    INNER JOIN location as l ON l.location_id = p.location_id \
    WHERE name LIKE '%' || ? || '%' "
    var params = [ req.params.name]    
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
    var data = {
        name: req.body.name,
        animal: req.body.animal,
        description: req.body.description,
        road: req.body.road,
        area: req.body.area,
        city: req.body.city
    }
    //Insert record into location table first according to sqlite_sequence table 
    var  insertLocation = "INSERT INTO location (road, area, city) VALUES (?, ?, ?);"
    db.run(insertLocation,[data.road, data.area, data.city], function(err) {
        
        if(err){
            res.status(400).json({"error": err.message})
        }

        else{
            db.get("SELECT location_id FROM location \
            ORDER BY location_id DESC \
            LIMIT 1", [], function(err, result){
                if(err){
                     res.status(400).json({"error": err.message})
                }
                else{
                    // console.log(result)
                    let lastLocationId = result.location_id
                    // console.log(lastLocationId)
                    var insertReport = 'INSERT INTO newpets (name, animal, description, location_id) VALUES (?,?,?,?);'
                    db.run(insertReport, [data.name, data.animal, data.description, lastLocationId], function(err,result){
                        if(err){
                            res.status(400).json({"error": err.message})
                        }
                        else{
                            res.json({
                                "success": true,
                                "data": data,
                                "id": this.lastID
                            })
                        }

                    })

                }

            })

        }
      });
    
})

app.put("/api/report/:id", (req, res) =>{
    var data = {
        name: req.body.name,
        animal: req.body.animal,
        description: req.body.description,
        road: req.body.road,
        area: req.body.area,
        city: req.body.city
    }

    db.get("SELECT id FROM newpets WHERE id = ?;",[req.params.id], function(err, result){
        if(err){
            res.status(400).json({"error": res.message})
            return ;
        }
        else{
            if(result){
                db.run(
                    `UPDATE newpets SET
                    name = COALESCE(?, name),
                    animal = COALESCE(?, animal),
                    description = COALESCE(?, description)
                    WHERE id = ?`,
                    [data.name, data.animal, data.description, req.params.id],
                    function(err){
                        if(err){
                            res.status(400).json({"error": res.message})
                            console.log(err)
                            return;
                        }
                        else{
                            console.log("First insert done")
                            db.get("SELECT p.location_id FROM newpets as p \
                            INNER JOIN location as l ON l.location_id = p.location_id \
                            WHERE id = ?;",[req.params.id], function(err, result){
                                if(err){
                                    res.status(400).json({"error": res.message})
                                    console.log(err)
                                    return;
                                }
                                else{
                                    console.log("Select Statement  done")
                                    let locationId = result.location_id
                                    db.run(`
                                    UPDATE location SET
                                    road = COALESCE(?, road),
                                    area = COALESCE(?, area),
                                    city = COALESCE(?, city)
                                    WHERE location_id = ?`,[data.road, data.area, data.city, locationId], function(err){
            
                                        if(err){
                                            res.status(400).json({"error": res.message})
                                            console.log(err)
                                            return;
                                        }
                                        else{
                                            res.json({
                                                message: "success",
                                                data: data,
                                                changes: this.changes
                                            })
                                        }
                                    })
                                }
            
                            })
                        }
                        
                    }
                    
                )

            }
            else{
                res.status(404).json({"error": "No Report Found"})
                return ;

            }
        }
    })
})

app.delete("/api/report/:id", (req, res) =>{
    let locationID
 
    db.get("SELECT location_id FROM newpets WHERE id = ?;",[req.params.id], function(err, result){
        if(err){
            res.status(400).json({"error": res.message})
            return ;
        }
        else{
            if(result){
                locationID = result.location_id
                db.run("DELETE FROM newpets WHERE id = ?;", req.params.id, function(err){
                    if(err){
                        res.status(400).json({"error": res.message})
                    return;
                    }
    
                    else{
                        db.run("DELETE FROM location WHERE location_id = ?;", locationID, function(err){
                            if(err){
                                res.status(400).json({"error": res.message})
    
                            }
                            else{
                                res.json({"message": "deleted", changes: this.changes})
    
                            }
                        })
                        
                    }
    
                })

            }
            else{
        

                res.status(204).json({"error": "No Report Found"})
                return ;

            }

            

        }
    })
})


app.get("/", (req, res) =>{
 
    res.render("index")

});
app.get("/report/:id", (req, res) =>{

    db.get("SELECT id FROM newpets \
        WHERE id = ?", req.params.id, function(err, result){
        if(err){
            console.log(err.message)
            return
        }
        else if(result) {
            res.render("reportDetails")
          
            }
        else{
            res.render("error404")

        }

        })
 
});

app.get("/report", (req, res) =>{
 
    res.render("report")
});

app.get("/reports", (req, res) =>{
 
    res.render("reports")
});


app.get("/quiz", (req, res) =>{
 
    res.render("quiz")
});

app.get("*", (req, res) =>{
 
    res.render("error404")
});














let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept"
  );
  next();
});
const port = 2410;
app.listen(port, () => console.log(`Listening on port ${port} !`));

let { carData , carMasterData } = require("./carsJson.js");

app.get("/cars",function(req,res){
    let minprice = +req.query.minprice
    let maxprice = +req.query.maxprice
    let fule = req.query.fule
    let sort = req.query.sort
    let type = req.query.type
    let arr1= carData
    if(minprice)
      arr1 = arr1.filter(cr=>cr.price>=minprice)
    if(maxprice)
      arr1 = arr1.filter(cr=>cr.price<=maxprice)
    if(fule)
      arr1 = arr1.filter(cr=>cr.model===carMasterData.find(ms=>ms.fuel==fule).model)
    if(type)
      arr1 = arr1.filter(cr=>cr.model===carMasterData.find(ms=>ms.type==type).model)
    if(sort=="price")
     arr1 = arr1.sort((s1,s2)=>s1.price-s2.price) 
     if(sort=="kms")
     arr1 = arr1.sort((s1,s2)=>s1.kms-s2.kms) 
     if(sort=="year")
     arr1 = arr1.sort((s1,s2)=>s1.year-s2.year)  
    res.send(arr1)
})

app.get("/carmaster",function(req,res){
    let arr1 = carMasterData
    res.send(arr1)
})
app.get("/cars/:id",function(req,res){
   let id = req.params.id
   let arr1 = carData.find(cr=>cr.id==id) 
    res.send(arr1)
})

app.post("/cars", function (req, res) {
    let body = req.body;
    let maxId = carData.reduce((acc, curr) => (curr.id >= acc ? cur.id : acc), 0);
    let newId = maxId + 1;
    let newCar = { id: newId, ...body };
    carData.push(body);
    res.send(newCar);
  });
  app.put("/cars/:id", function (req, res) {
    let id = req.params.id
    let body = req.body
    let index = carData.findIndex(cr=>cr.id===id)
    if(index>=0){
    let updateCar = {id:id , ...body}
    carData[index] = updateCar
    res.send(updateCar);
    }else{
        res.status(404).send("Car Not Found")
    }
  });
  app.delete("/cars/:id", function (req, res) {
    let id = req.params.id;
    let index = carData.findIndex(cr=>cr.id==id)
    if(index>=0){
    let deleteCar = carData.splice(index,1) 
    res.send(deleteCar);}
    else{
        res.status(404).send("Car Not Found")
    }
  });
const express=require("express");
const bodyParser=require("body-parser");
const date=require(__dirname+"/date.js");

// console.log(date.getDay());          //add parenthisis for getting return statement

const app=express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));        //for loading css along with js and ejs in localhost

let items=["Eat","Sleep","Code","Repeat"];
let workList=[];
// var times=["12:00 AM","12:00 AM","12:00 AM","12:00 AM"];

app.get("/",function(req,res){
      let day=date.getDay();
      res.render("index",{
            kindOfDay:day,
            newItems:items,
            // currTimes:times
      });
})

app.post("/",function(req,res){
      let item=req.body.newItem;

      if(req.body.index === "Work List"){
            workList.push(item);
            res.redirect("/work")
      }
      else{
            items.push(item);
            res.redirect("/");
      }
})

app.get("/work",function(req,res){
      res.render("index",{
            kindOfDay:"Work List",
            newItems:workList
      })
})

app.post("/work",function(req,res){
      let item=req.body.newItem;
      workList.push(item);
      res.redirect("/work");
})

app.get("/about",function(req,res){
      res.render("about");
})

app.listen(5500,function(){
      console.log("Server 5500 up and running...");
})

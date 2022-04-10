const express=require("express");
const bodyParser=require("body-parser");

const app=express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

var items=[];

app.get("/",function(req,res){

      var today=new Date();         //object of type date is created
      var today2=new Date();


      var options={
            weekday:"long",         //weekday is a keyword
            day:"numeric",
            month:"long"
      };

      var options2={
            hour:"numeric",
            minute:"numeric",
            second:"numeric",
            millisecond:"numeric"
      }

      var day=today.toLocaleDateString("en-IN",options);
      var time=today2.toLocaleTimeString("en-IN",options2);

      res.render("index",{
            kindOfDay:day,
            newItems:items,
            currTime:time
      });
})

app.post("/",function(req,res){
      item=req.body.newItem;
      items.push(item);
      console.log(time);
      res.redirect("/");
})

app.listen(5500,function(){
      console.log("Server 5500 up and running...");
})
const express=require("express");
const bodyParser=require("body-parser");
const date=require(__dirname+"/date.js");
const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true});

// console.log(date.getDay());          //add parenthisis for getting return statement

const app=express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));        //for loading css along with js and ejs in localhost

// let items=["Eat","Sleep","Code","Repeat"];
let workList=[];
// var times=["12:00 AM","12:00 AM","12:00 AM","12:00 AM"];

const itemsSchema={
      name:String
}

const Item=mongoose.model("Item",itemsSchema);

const def1=new Item({name:"Eat"});
const def2=new Item({name:"Sleep"});
const def3=new Item({name:"Code"});
const def4=new Item({name:"Repeat"});

let defaultItems=[def1,def2,def3,def4];

var flag=0


app.get("/",function(req,res){
      Item.find({},function(err,foundItems){
            if(foundItems.length===0 && flag==0){
                  Item.insertMany(defaultItems,function(err){
                        if(err)
                              console.log(err);
                        else
                              console.log("Successfully Added!");
                  });
                  res.redirect("/");
            }
            else{
                  flag=1;
                  let day=date.getDay();
                  res.render("index",{
                        kindOfDay:day,
                        newItems:foundItems,
                        // currTimes:times
                  });
            }
      });
      
      
})

app.post("/",function(req,res){
      let itemName=req.body.newItem;

      const item=new Item({name:itemName});
      item.save();
      res.redirect("/");
      // if(req.body.index === "Work List"){
      //       workList.push(item);
      //       res.redirect("/work")
      // }
      // else{
      //       items.push(item);
      //       res.redirect("/");
      // }
});

app.post("/delete",function(req,res){
      const deleteId=req.body.checkbox;
      Item.findByIdAndDelete(deleteId,function(err){
            if(err)
                  console.log("Yeah your code has errors.");
            else
                  console.log("Deleted from database successfully!");
      })
      res.redirect("/");
})

// app.get("/work",function(req,res){
//       res.render("index",{
//             kindOfDay:"Work List",
//             newItems:workList
//       })
// })

// app.post("/work",function(req,res){
//       let item=req.body.newItem;
//       workList.push(item);
//       res.redirect("/work");
// })

const listSchema={
      name:String,
      items:[itemsSchema]
}

const List=mongoose.model("List",listSchema);

app.get("/:customLists",function(req,res){
      const customListName=req.params.customLists;
      // console.log(req.params.customLists);
      

      List.findOne({name:customListName},function(err,foundList){
            if(!err){
                  if(!foundList){
                        //create new list
                        const list=new List({
                        name:customListName,
                        items:defaultItems
                  });
                  list.save();
                  }
                  else{
                        //display existing list
                        res.render("list",{listTitle:foundList.name,newListItems:foundList.items})
                  }
            }
      })
})

app.get("/about",function(req,res){
      res.render("about");
})

app.listen(5500,function(){
      console.log("Server 5500 up and running...");
})

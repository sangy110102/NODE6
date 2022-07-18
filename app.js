const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const _ = require('lodash');
const date = require(__dirname + "/date");

// Connection URI
const uri =
  "mongodb://localhost:27017/toDoListDB";

const url =
  'mongodb+srv://sangy11:sangy11@cluster1todolist.thgfh.mongodb.net/toDoListDB';

mongoose.connect(url,{useNewUrlParser : true});

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('public'));

const itemSchema = new mongoose.Schema({
    name : String
});

const listSchema = new mongoose.Schema({
  name : String,
  items : [itemSchema]
});

  
const Item = mongoose.model('Item',itemSchema);
const List = mongoose.model('List',listSchema);


app.get('/',(req,res) => {
    Item.find({} , function(err,items){
        if(err){
          console.log(err);
        }else{
            if(items.length === 0){
                    const item1 = new Item({
                        name : 'Welcome to your ToDo list'
                      });
                    
                    const item2 = new Item({
                        name : 'Write to your ToDo list'
                      });
                      
                    const defaultItems = [item1,item2];
                    Item.insertMany(defaultItems,function(err){
                      if(err){
                        console.log(err);
                      }else{
                        console.log('inserted 2 items in todo lists');
                        //mongoose.connection.close();
                      }
                    });
                    res.redirect('/');
                }else{
                    res.render('list',{listTitle : "Today",newListItem : items});
                    //mongoose.connection.close();
                    // items.forEach(function(item){
                    //     console.log(item.name);
                    // });
                }
        }
      });
    //let day = date.getDate();
});

app.get('/:customListName',(req,res) =>{
  //console.log(req.params.customListName);
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name:customListName},(err,foundList) => {
      if(!err){
        if(!foundList){
          //console.log("Doesn't exist");
          const item1 = new Item({
              name : `Welcome to your ${customListName} list`
            });
    
          const item2 = new Item({
              name : `Write to your ${customListName} list`
          });
      
          const defaultItems = [item1,item2];
    
          const list = new List({
              name: customListName,
              items: defaultItems
          });
          list.save();
          res.redirect('/'+customListName);
        }else{
          res.render('list',{listTitle : foundList.name,newListItem : foundList.items});
        }
    }
  });
});


app.post('/',(req,res) => {
    //console.log(req.body.list);
    const itemName = req.body.newItem;
    const listName = req.body.list;
    const item = new Item({
      name : itemName
    });
    
    if(req.body.list == 'Today'){
        //items.push(item);  
        item.save();
        res.redirect('/');
    }else{
      List.findOne({name:listName},(err,foundList) => {
            foundList.items.push(item);
            foundList.save();
            res.redirect('/'+listName);
          });
        }
});

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;
  //console.log(req.body);

  if(listName === 'Today'){
      Item.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item in ToDo List.");
        res.redirect("/");
      }
    });
  }
  else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
      if (!err){
        res.redirect("/" + listName);
      }
    });
  } 
});


app.get('/about',(req,res) =>{
  res.render('about');
});

app.listen(3000,() => console.log('server is running on port 3000'));


//note use all while node6 is as your main folder
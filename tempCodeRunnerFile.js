const checkedItemId = req.body.checkbox;
    // const checkedItemListName = Item.findById(checkedItemId,function (err, docs) {
    //     if (err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log("Result : ", docs);
    //     }
    // });
    // Item.findByIdAndDelete(checkedItemId, function(err){
    //     if(!err){
    //         console.log('Deleted Successfully');
    //         if(checkedItemListName.listTitle == 'ToDo'){
    //             res.redirect('/');
    //         }else{
    //             res.redirect('/work');
    //         }
    //     }else{
    //         console.log(err);
    //     }
    // });
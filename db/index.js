const mongoose = require("mongoose");
module.exports.init = async()=>{
    try {
        await mongoose.connect('mongodb+srv://anwesh:anwesh2022@cluster0.1s07sqk.mongodb.net/?retryWrites=true&w=majority');
    }catch(err){
        console.log(err)
    }
    
}

const product = require("../models/product").Model;

/*
* Create product
* not doing any input sanitization,since this api is not part of requirment
*/
module.exports.create = async(req,res) => {
    try {
       const productCreated = await new product({
            name:req.body.name,
            price:req.body.price,
            average_rating:req.body.average_rating // idea is to calculate this on each rating insertion to ratings table
        }).save()
        res.status(201).json(productCreated)
    }catch(err){
        console.log(err)
    }
}

/*
* get all products 
* By default it will fetch first 10 products
*/
module.exports.getAll = async(req,res) =>{
    try {
        const {rangeLowerBound,rangeUpperBound,rating} = req.query;
        let limit = 10;
        let page = 0;
       
        if (req.query.page) {
            page = Number.isInteger(req.query.page) ? parseInt(req.query.page) : 0;
        }
        if (req.query.limit) {
            limit = Number.isInteger(req.query.limit) ? parseInt(req.query.page) : 0;
        }
        let whereClause = {"$and":[]};
        if(rangeLowerBound && !rangeUpperBound){
            res.status(400).json({message:"Invalid range input"})
        }
        if( rangeUpperBound){
            whereClause["$and"].push({price:{$lte:parseInt(rangeUpperBound)}})
        }
        if(rangeLowerBound){
            whereClause["$and"].push({price:{$gte:parseInt(rangeLowerBound)}});
        }
        if(rating){
            whereClause["$and"].push({average_rating: parseInt(rating)})
        }
        console.log(whereClause)
        const products = await product.find(whereClause).skip(page*limit).limit(limit);
        const total = await product.countDocuments(whereClause)
        res.status(200).json({data:products,total});
    }catch(err){
        console.log(err)
        res.status(500).json({"message":err.message || "something went wrong"})
    }
    
}

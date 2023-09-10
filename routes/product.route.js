const {Router} =require('express');
const {ProductModel}=require('../models/products.model')


const productRoutes=Router();



//post furniture Create
productRoutes.post("/add",async (req,res)=>{
    try{
        const {name,price,quantity,category,subcategory,description,image}=req.body;
    const new_product=new ProductModel({
        name,
        price,
        quantity,
        category,
        subcategory,
        description,
        image
    })
    await new_product.save();
    res.send({msg:"New Product added",product:new_product});
    }
    catch(err){
        res.send({msg:"Error while adding new Product",error:err})
    }
})

productRoutes.get("/",async (req,res)=>{
    try{
        const {category,subcategory,search}=req.query;
        const query={};
        if(category) query.category=category;
        if(subcategory) query.subcategory=subcategory;
        if(search) {
            const searchQuery=new RegExp(search,'i');
            query.$or=[
                {name:searchQuery },
                {description:searchQuery},
                {category:searchQuery},
                {subcategory:searchQuery}
            ];
        }
        
        const data=await ProductModel.find(query);
        res.json({
            data
        })
    }
    catch(err){
        res.send({msg:"Error while Fetching All Products",error:err});
    }

})







module.exports={productRoutes};
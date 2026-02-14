const express = require('express');
const router = express.Router();

const MenuItem= require('./../models/MenuItem');


router.post('/',async(req,res)=>{
    try{
        const mIdata=req.body; 
        const newMenuItem =new MenuItem(mIdata);
        
        const resp = await newMenuItem.save();
        console.log('Menu Item Saved');
        res.status(200).json(resp);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Srever Error'});
    }
    
})

//GET method to get the menu Item
router.get('/',async (req,res)=>{
    try{
        const mIdata= await MenuItem.find();
        console.log('Menu Item Data Fetched');
        res.status(200).json(mIdata);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Srever Error'});
    }
})

router.get('/:taste', async (req,res)=>{
    try{
        const taste=req.params.taste; //Extract the work type from the url parameter
        if(taste=='Spicy' || taste=='Sweet' || taste=='Sour'){
            const response= await MenuItem.find({taste: taste});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'Invalid work type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Srever Error'});
    }
})

//comment added for testing purpose
module.exports=router;
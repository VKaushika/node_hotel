const express = require('express');
const router = express.Router();

const Person=require('./../models/Person');

//POST route to add a person
router.post('/',async(req,res)=>{
    try{
        const data=req.body; // Assuming the request  body contains the person data

        //Create a new Person document using Mongoose model
        const newPerson =new Person(data);
        
        //Save the new Person to the database
        const response = await newPerson.save();
        console.log('data Saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Srever Error'});
    }
    
})
//GET method to get the person
router.get('/',async (req,res)=>{
    try{
        const data= await Person.find();
        console.log('Data Fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Srever Error'});
    }
})

router.get('/:workType', async (req,res)=>{
    try{
        const workType=req.params.workType; //Extract the work type from the url parameter
        if(workType=='chef' || workType=='manager' || workType=='waiter'){
            const response= await Person.find({work: workType});
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

router.put('/:id', async (req,res)=>{
    try{
        const personId= req.params.id;  // Extract the id from the url parameter
        const UpdatedPersonData=req.body;

        const response= await Person.findByIdAndUpdate(personId, UpdatedPersonData, {
            new: true,         //Return the updated document
            runValidators:true  //Run Mongoose Validation
        })

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('data updated')
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Srever Error'});
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        const personId = req.params.id;
        
        const response=await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('data deleted')
        res.status(200).json({message: 'person Deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Srever Error'});
    }
})

module.exports=router;
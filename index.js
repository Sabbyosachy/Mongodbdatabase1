const express = require('express');
const { MongoClient } = require('mongodb');
const cors=require('cors');
const ObjectId=require('mongodb').ObjectId;

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());



// name : user1
//pass:8OohCESB2k37p0R0




const uri = "mongodb+srv://user1:8OohCESB2k37p0R0@cluster0.edakp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db("foodmaster");
    const usersCollection = database.collection("users");

    //Gget API
    app.get('/users' ,async(req,res)=>{

      const cursor =usersCollection.find({});
      const users =await cursor.toArray();
      res.send(users);
    });


    
    // POST API
    app.post('/users', async(req,res)=> {
      const newUser=req.body;
      const result = await usersCollection.insertOne(newUser);
      // console.log('hitting the post',req.body);
      // console.log('added user' , result);
      res.json(result);
     
    });

    //Deleate Users
    app.delete('/users/:id', async(req,res)=>{
      const id=req.params.id;
      const query={_id:ObjectId(id)};
      const result = await usersCollection.deleteOne(query);
      res.json(result);
    });

    //User Id
   app.get('/users/:id',async(req,res)=>{
     const id=req.params.id;
     const query={_id:ObjectId(id)};
     const result=await usersCollection.findOne(query);
     console.log('load user with id',id);
     res.json(result);
   })

    
  } 
  finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Run Baby World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
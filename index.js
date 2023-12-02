const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());


// console.log(process.env)
// const uri = 'mongodb://0.0.0.0:27017/'
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9lqzgjv.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try
  {
    
     const usersCollection = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTOIN);

    //  all user info get
      app.get('/allCourse', async (req, res) => {
          try {
            const result = await usersCollection.find().toArray();
            res.send(result);
          } catch (error) {
            // handle  error
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
          }
      });

  

    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// mongodb end


app.get('/', (req, res) => {
  res.send('Users management server is running');
});

app.get('/users', (req, res) => {
  res.send(users);
});

app.listen(port, () => {
  console.log(`Users management server is running on port ${port}`);
});

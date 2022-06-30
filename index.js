const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h2yyl.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const servicesCollection = client.db('todo-list').collection('services')

        

        app.post('/service', async (req, res) => {
            const service = req.body
            const result = servicesCollection.insertOne(service )
            res.send(result)
        })

        app.get('/service', async(req, res) =>{
            const query = {}
            const cursor = servicesCollection.find(query)
            const services = await cursor. toArray()
            res.send(services)
        })

        app.delete('/service/:id', async(req, res) =>{
            const id =req.params.id
            const query = {_id:ObjectId(id)}
            const result= await servicesCollection.deleteOne(query)
            res.send(result)
        });
        
    }
    finally {

    }
}

run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('Hello todo!')
})

app.listen(port, () => {
    console.log(`todo listening on port ${port}`)
})
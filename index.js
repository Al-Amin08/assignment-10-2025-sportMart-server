require('dotenv').config()
const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.nextTick.PORT | 5000

// middleware
app.use(cors())
app.use(express.json())

// 1X1sXi5C0ZCosEfa
// assignment-10-2025-sportMart


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jtk1w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const equipmentCollection = client.db('equipmentDB').collection('equipment')

        app.post('/equipment', async (req, res) => {
            const newEquipment = req.body
            console.log(newEquipment)
            const result = await equipmentCollection.insertOne(newEquipment)
            res.send(result)
        })
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Sports mart')
})

app.listen(port, () => {
    console.log("sport port", port);

})
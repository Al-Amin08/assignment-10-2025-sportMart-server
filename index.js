require('dotenv').config()
const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        app.get('/equipments', async (req, res) => {
            const cursor = equipmentCollection.find()
            const result = await cursor.toArray()
            res.send(result)

        })
        app.get('/equipments/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await equipmentCollection.findOne(query)
            res.send(result)
        })

        // app.get('/myEquipments/:email', async (req, res) => {
        //     const email = req.params.email
        //     console.log(email)
        //     const query = {
        //         email: email
        //     }
        //     const cursor = equipmentCollection.find(query)
        //     const result = await cursor.toArray()
        //     res.send(result)
        // })

        app.get('/myEquipments/:email', async (req, res) => {
            try {
                const email = req.params.email;

                // Basic email validation
                // if (!email || !email.includes('@')) {
                //     return res.status(400).json({ message: 'Invalid email format' });
                // }

                const query = { email: email };
                const cursor = equipmentCollection.find(query);
                const results = await cursor.toArray();
                res.send(results)

                // if (results.length === 0) {
                //     return res.status(404).json({ message: 'No equipment found for this email' });
                // }

                // res.status(200).json(results);
            } catch (error) {
                console.error('Error fetching equipment by email:', error);

            }
        });






        app.post('/equipments', async (req, res) => {
            const newEquipment = req.body
            console.log(newEquipment)
            const result = await equipmentCollection.insertOne(newEquipment)
            res.send(result)
        })
        app.put('/equipments/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const options = { upsert: true }
            const updatedDoc = {
                $set: req.body
            }
            const result = await equipmentCollection.updateOne(query, updatedDoc, options)
            res.send(result)
        })

        app.delete('/equipments/:id', async (req, res) => {
            console.log('going to delete', req.params.id);
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await equipmentCollection.deleteOne(query)
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
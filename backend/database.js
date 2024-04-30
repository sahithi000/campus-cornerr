const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Hardcoded MongoDB connection URI
const uri = 'mongodb+srv://21pa1a1256:21pa1a1256@cluster0.lhxsa2x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect()
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

  
  app.post('/signup', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const database = client.db('react');
      const collection = database.collection('olxusers');
  
      // Check if the username already exists
      const existingUser = await collection.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists. Please choose a different username.' });
      }
  
      // If username is unique, insert the new user
      const newUser = { username, email, password };
      await collection.insertOne(newUser);
      console.log('User registered successfully!');
      res.status(201).json({ message: 'User registered successfully!' });
    } 
      catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'An error occurred while registering user.' });
    }
  });


app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const database = client.db('react');
    const collection = database.collection('olxusers');

    const user = await collection.findOne({ username, password });

    if (user) {
      res.status(200).json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ error: 'Invalid username or password.' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'An error occurred while logging in.' });
  }
});

app.post('/create', async (req, res) => {
  try {
    const db = client.db('react');
    const collection = db.collection('products');
    const { name, price, desc, stuName, depName, phnNo, image } = req.body; 

    // Here you can directly store image URL as you're sending it from the client
    await collection.insertOne({ 
      name,
      price,
      desc,
      stuName,
      depName,
      phnNo,
      image 
    });

    res.status(201).json({ message: 'Product created successfully!' });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: 'An error occurred while creating product.' });
  }
});

// Existing code

// Assuming 'collection' refers to the collection where products are stored
app.get('/products', async (req, res) => {
  try {
    const db = client.db('react');
    const collection = db.collection('products');
    
    // Fetch all products from the collection
    const products = await collection.find({}).toArray();
    
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: 'An error occurred while fetching products.' });
  }
});

// Existing code



app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

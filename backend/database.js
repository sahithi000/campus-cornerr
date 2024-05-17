require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(cors({ origin: 'http://localhost:3000' }));

// MongoDB connection URI
const uri = 'mongodb+srv://21pa1a1256:21pa1a1256@cluster0.lhxsa2x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect()
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate email domain
    if (!email.endsWith('@vishnu.edu.in')) {
        return res.status(400).json({ error: 'Email must be from the domain vishnu.edu.in' });
    }

    const database = client.db('react');
    const collection = database.collection('olxusers');

    // Check if the username or email already exists
    const existingUser = await collection.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        const errorMsg = existingUser.username === username ?
            'Username already exists. Please choose a different username.' :
            'Email already exists. Please use a different email address.';
        return res.status(400).json({ error: errorMsg });
    }

    // If username and email are unique, insert the new user
    const newUser = { username, email, password };
    await collection.insertOne(newUser);
    console.log('User registered successfully!');
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An error occurred while registering user.' });
  }
});

app.post('/upload-image', async (req, res) => {
  try {
    const { base64 } = req.body;
    const database = client.db('react');
    const collection = database.collection('images');
    await collection.insertOne({ image: base64 });
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ status: 'error', data: error });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const database = client.db('react');
    const collection = database.collection('olxusers');

    const user = await collection.findOne({ username, password });

    if (user) {
      // Generate JWT token using the secret key
      const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful!', token });
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

// Fetch all products from the collection
app.get('/products', async (req, res) => {
  try {
    const db = client.db('react');
    const collection = db.collection('products');
    
    const products = await collection.find({}).toArray();
    
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: 'An error occurred while fetching products.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

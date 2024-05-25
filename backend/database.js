require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
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
      const emailDomain = "@vishnu.edu.in";
      const emailPrefix = email.substring(0, email.indexOf(emailDomain));

      if (!email.endsWith(emailDomain) || emailPrefix !== username) {
        return res.status(400).json({ error: `Email must be of the format username${emailDomain}, where username is your college registration number` });
      }

      // Validate that the username meets the specified criteria
      const validateUsername = (username) => {
        // Check if the length is 10
        if (username.length !== 10) return false;
        // Check if the first two characters are integers
        if (isNaN(username[0]) || isNaN(username[1])) return false;
        // Check if the 3rd and 4th characters are "pa"
        return username[2] === 'p' && username[3] === 'a';
      };

      if (!validateUsername(username)) {
        return res.status(400).json({ error: 'Username must be a valid college registration number (first two characters must be integers, 3rd and 4th characters must be "pa", and total length must be 10 characters).' });
      }

      const database = client.db('react');
      const collection = database.collection('olxusers');

      const existingUser = await collection.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        const errorMsg = existingUser.username === username ?
            'Username already exists. Please choose a different username.' :
            'Email already exists. Please use a different email address.';
        return res.status(400).json({ error: errorMsg });
      }

      const newUser = { username, email, password };
      await collection.insertOne(newUser);
      console.log('User registered successfully!');
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'An error occurred while registering user.' });
    }
  });

// app.post('/signup', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     if (!email.endsWith('@vishnu.edu.in')) {
//         return res.status(400).json({ error: 'Email must be from the domain vishnu.edu.in' });
//     }

//     const database = client.db('react');
//     const collection = database.collection('olxusers');

//     const existingUser = await collection.findOne({ $or: [{ username }, { email }] });
//     if (existingUser) {
//         const errorMsg = existingUser.username === username ?
//             'Username already exists. Please choose a different username.' :
//             'Email already exists. Please use a different email address.';
//         return res.status(400).json({ error: errorMsg });
//     }

//     const newUser = { username, email, password };
//     await collection.insertOne(newUser);
//     console.log('User registered successfully!');
//     res.status(201).json({ message: 'User registered successfully!' });
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ error: 'An error occurred while registering user.' });
//   }
// });

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
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const { name, price, desc, stuName, depName, phnNo, image } = req.body;

    // Verify stuName matches the logged-in user's username
    if (stuName !== decoded.username) {
      return res.status(401).json({ error: 'Unauthorized: stuName does not match logged-in user.' });
    }

    const db = client.db('react');
    const collection = db.collection('products');

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
    res.status(500).json({ error: 'An error occurred while creating product.', details: err.message });
  }
});

// app.post('/create', async (req, res) => {
//   try {
//     const db = client.db('react');
//     const collection = db.collection('products');
//     const { name, price, desc, stuName, depName, phnNo, image } = req.body; 

//     await collection.insertOne({ 
//       name,
//       price,
//       desc,
//       stuName,
//       depName,
//       phnNo,
//       image 
//     });
//     res.status(201).json({ message: 'Product created successfully!' });
//   } catch (err) {
//     console.error("Error creating product:", err);
//     res.status(500).json({ error: 'An error occurred while creating product.' });
//   }
// });

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

app.get('/user-details', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const database = client.db('react');
    const collection = database.collection('olxusers');
    const user = await collection.findOne({ username: decoded.username });

    if (user) {
      res.status(200).json({ username: user.username, email: user.email });
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'An error occurred while fetching user details.' });
  }
});

app.get('/user-products', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const database = client.db('react');
    const collection = database.collection('products');
    const products = await collection.find({ stuName: decoded.username }).toArray();

    if (products) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ error: 'No products found for this user.' });
    }
  } catch (error) {
    console.error('Error fetching user products:', error);
    res.status(500).json({ error: 'An error occurred while fetching user products.' });
  }
});

app.delete('/delete-product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const database = client.db('react');
    const collection = database.collection('products');

    const product = await collection.findOne({ _id: new ObjectId(id) });
    if (product && product.stuName === decoded.username) {
      await collection.deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: 'Product deleted successfully!' });
    } else {
      res.status(401).json({ error: 'Unauthorized or product not found.' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'An error occurred while deleting the product.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


// require('dotenv').config(); // Load environment variables from .env file

// const express = require('express');
// const cors = require('cors');
// const { MongoClient } = require('mongodb');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// app.use(cors({ origin: 'http://localhost:3000' }));

// // MongoDB connection URI
// const uri = 'mongodb+srv://21pa1a1256:21pa1a1256@cluster0.lhxsa2x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect()
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// app.post('/signup', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Validate email domain
//     if (!email.endsWith('@vishnu.edu.in')) {
//         return res.status(400).json({ error: 'Email must be from the domain vishnu.edu.in' });
//     }

//     const database = client.db('react');
//     const collection = database.collection('olxusers');

//     // Check if the username or email already exists
//     const existingUser = await collection.findOne({ $or: [{ username }, { email }] });
//     if (existingUser) {
//         const errorMsg = existingUser.username === username ?
//             'Username already exists. Please choose a different username.' :
//             'Email already exists. Please use a different email address.';
//         return res.status(400).json({ error: errorMsg });
//     }

//     // If username and email are unique, insert the new user
//     const newUser = { username, email, password };
//     await collection.insertOne(newUser);
//     console.log('User registered successfully!');
//     res.status(201).json({ message: 'User registered successfully!' });
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ error: 'An error occurred while registering user.' });
//   }
// });

// app.post('/upload-image', async (req, res) => {
//   try {
//     const { base64 } = req.body;
//     const database = client.db('react');
//     const collection = database.collection('images');
//     await collection.insertOne({ image: base64 });
//     res.status(200).json({ status: 'ok' });
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     res.status(500).json({ status: 'error', data: error });
//   }
// });

// app.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const database = client.db('react');
//     const collection = database.collection('olxusers');

//     const user = await collection.findOne({ username, password });

//     if (user) {
//       // Generate JWT token using the secret key
//       const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
//       res.status(200).json({ message: 'Login successful!', token });
//     } else {
//       res.status(401).json({ error: 'Invalid username or password.' });
//     }
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ error: 'An error occurred while logging in.' });
//   }
// });

// app.post('/create', async (req, res) => {
//   try {
//     const db = client.db('react');
//     const collection = db.collection('products');
//     const { name, price, desc, stuName, depName, phnNo, image } = req.body; 

//     // Here you can directly store image URL as you're sending it from the client
//     await collection.insertOne({ 
//       name,
//       price,
//       desc,
//       stuName,
//       depName,
//       phnNo,
//       image 
//     });

//     res.status(201).json({ message: 'Product created successfully!' });
//   } catch (err) {
//     console.error("Error creating product:", err);
//     res.status(500).json({ error: 'An error occurred while creating product.' });
//   }
// });

// // Fetch all products from the collection
// app.get('/products', async (req, res) => {
//   try {
//     const db = client.db('react');
//     const collection = db.collection('products');
    
//     const products = await collection.find({}).toArray();
    
//     res.status(200).json(products);
//   } catch (err) {
//     console.error("Error fetching products:", err);
//     res.status(500).json({ error: 'An error occurred while fetching products.' });
//   }
// });


// app.get('/user-details', async (req, res) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);

//     const database = client.db('react');
//     const collection = database.collection('olxusers');
//     const user = await collection.findOne({ username: decoded.username });

//     if (user) {
//       res.status(200).json({ username: user.username, email: user.email });
//     } else {
//       res.status(404).json({ error: 'User not found.' });
//     }
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     res.status(500).json({ error: 'An error occurred while fetching user details.' });
//   }
// });


// // Add this endpoint to fetch products by username
// app.get('/user-products', async (req, res) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);

//     const database = client.db('react');
//     const collection = database.collection('products');
//     const products = await collection.find({ stuName: decoded.username }).toArray();

//     if (products) {
//       res.status(200).json(products);
//     } else {
//       res.status(404).json({ error: 'No products found for this user.' });
//     }
//   } catch (error) {
//     console.error('Error fetching user products:', error);
//     res.status(500).json({ error: 'An error occurred while fetching user products.' });
//   }
// });


// // Add this endpoint to delete a product by ID
// app.delete('/delete-product/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const token = req.headers.authorization.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);

//     const database = client.db('react');
//     const collection = database.collection('products');

//     // Verify if the product belongs to the logged-in user
//     const product = await collection.findOne({ _id: new MongoClient.ObjectId(id) });
//     if (product && product.stuName === decoded.username) {
//       await collection.deleteOne({ _id: new MongoClient.ObjectId(id) });
//       res.status(200).json({ message: 'Product deleted successfully!' });
//     } else {
//       res.status(401).json({ error: 'Unauthorized or product not found.' });
//     }
//   } catch (error) {
//     console.error('Error deleting product:', error);
//     res.status(500).json({ error: 'An error occurred while deleting the product.' });
//   }
// });



// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`);
// });

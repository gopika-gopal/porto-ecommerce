const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const router = express.Router();//define router module
const cors = require('cors');
const app = express();
const nodemailer = require('nodemailer');

//userSchema 
const user = require('./model/userSchema');

//productSchema and orderSchema
const order = require('./model/OrderSchema');
const product = require('./model/ProductSchema');
const cart = require('./model/AddToCartSchema')
//to get data in json format from frontend
app.use(express.json());
app.use(cors());

const router = express.Router();


dotenv.config({ path: './config.env' });
const PORT = process.env.PORT;
const db = process.env.DATABASE;


// Connect to MongoDB
mongoose.connect(db, {
  useNewUrlParser: true,
  //useCreateIndex: true,
  //useFindAndModify : false,
  useUnifiedTopology: true,
}).then(() => {
  console.log('connection successfull');
}).catch((error) => console.log('connection error:', error.message));

//signup route
app.post('/sign-up', async (req, res) => {
  const { firstName, middleName, lastName, email, confirmPassword, password,tokens } = req.body;

  if (!firstName || !middleName || !lastName || !email || !confirmPassword || !password) {
    return res.status(422).json({ error: "Please fill the details properly" });
  }
  try {
    const userExist = await user.findOne({ email });

    if (userExist) {
      return res.status(422).json({ error: email + " already Exists" });
    }
    else if (password != confirmPassword) {
      return res.status(422).json({ error: "Passwords are not matching" });
    } else {


      //  Method 1 to post data to db.
      //  const userdetail = new user({ firstName, middleName, lastName, email, password, confirmPassword, tokens });
      //  userdetail.save();

      // Method 2 to post data to db.
      // user.create(req.body)
      //   .then(response => { res.json(response) })
      //   .catch(err => res.json(err));


      // res.status(201).json({ message: "User registered successfully" });



      //code for checking successfullregistration
       const userdetail = new user({ firstName, middleName, lastName, email, password, confirmPassword, tokens });
      const userRegister = await userdetail.save();
      if(userRegister) {
       res.status(201).json({message: "User registered successfully - "+userdetail.firstName});
       }else {
        res.status(500).json({error: "Failed to register"});
       }
    }
  }
  catch (err) {
    console.log(err);
  }

});


// Login route
app.post('/login', async (req, res) => {
  try {
    const { emailAddress, password } = req.body;
    if (!emailAddress || !password) {
      return res.status(400).json({ error: "Please fill the data" })
    }
    const userLogin = await user.findOne({ email: emailAddress })
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      // token =  userLogin.generateAuthToken(); //token generate
      const token1 = jwt.sign({ email:userLogin.email, id: userLogin._id }, process.env.SECRET_KEY, { expiresIn: '10h' });
      if (!isMatch) {
        res.status(400).json({ error: "invalid credentials " });
      } else {
        res.json({ message: "Login Successfull", token: token1 });
      }
    } else {
      res.status(400).json({ error: "invalid credentials " });
    }

  } catch (err) {
    console.log(err);
  }
});
//End Routing and Validation part here 

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


//FB login
app.post('/facebook-login', async (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email:userExist.email, id: userExist._id }, process.env.SECRET_KEY, { expiresIn: '10s' });
  res.json({ message: "FB Login success", token: token });
});
// Forgot password
app.post('/forgot-password', async (req, res) => {
  try {
    const { emailAddress } = req.body;
    if (!emailAddress ) {
      return res.status(400).json({ error: "Please enter your email" })
    }
    const userExist = await user.findOne({ email: emailAddress })
    if (userExist) {
      const token1 = jwt.sign({ email:userExist.email, id: userExist._id }, process.env.SECRET_KEY, { expiresIn: '10s' });
      res.json({ message: "User exists", token: token1 });

      // nodemailer
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'testspprtml@gmail.com',
          pass: 'ecwo yeqm dvuy qejl'
        }
      });

      var mailOptions = {
        to: userExist.email,
        subject: 'Reset password',
        text:  `Hi ${userExist.firstName},
        Forgot your password?
        We received a request to reset your password.
        To reset your password, click on the link below.
        https://localhost:3001/reset-password/${userExist._id}/${token1}`
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });



    } else {
      res.status(400).json({ mesage: "User does not exist" });
    }

  } catch (err) {
    console.log(err);
  }
});

// Endpoint to retrieve all products (catalog)
app.get('/product-catalogue', async (req,res) => {
  try {
    const products = await product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Endpoint to retrieve a specific product by ID (product details)
app.get('/:productId', async (req, res) => {
  const productId = req.params.productId;

  try {
    const productbyId = await product.findById(productId);
    if (!productbyId) {
     res.status(500).json({ error: 'Product not found' });
    }
    res.json(productbyId);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});  

app.post('/addToCart', async (req,res) => {
  try { 
    const itemdetail = new cart(req.body);
    const addtocart = await itemdetail.save();
    res.json(addtocart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/addToCart/items', async (req,res) => {
  try {
    const cartItems = await cart.find({userEmail:req.body.email,isDeleted:false,isItemCheckout:false});
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// New endpoint for placing orders
app.post('/place-order', async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = new order(orderData);
    await newOrder.save(); // Save the order to the database
    
    res.json({ success: true, message: 'Order placed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to place the order.' });
  }

  // const orderData = new order({ userId, productId, quantity, totalPrice });
  // orderData.save();
});

app.put('/deleteItem', async (req,res) => {
  try {
    const cartItems = await cart.findByIdAndUpdate(req.body,{isDeleted:true})
    res.json("item removed");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/increaseQuantity', async (req,res) => {
  try {
    const item = await cart.findById(req.body)
    const cartItems = await cart.findByIdAndUpdate(req.body, { quantity: item.quantity + 1 })
    res.json(item.name + " quantity updated");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.put('/decreaseQuantity', async (req,res) => {
  try {
    const item = await cart.findById(req.body)
    // if (item.quantity < 1) {
    //   res.json(item.name + " quantity cannot be reduced.");
    // } else {
    const cartItems = await cart.findByIdAndUpdate(req.body, { quantity: item.quantity - 1 });
    const item2 = await cart.findById(req.body)
    if (item2.quantity <= 0) {
      const cartItems2 = await cart.findByIdAndUpdate(req.body, { isDeleted: true })
    }
      res.json(item.name + " quantity updated");

    // }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/checkOutItem', async (req,res) => {
  try {
    const cartItems = await cart.findByIdAndUpdate(req.body,{isItemCheckout:true})
    res.json("item checked out");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/isWhishlisted', async (req,res) => {
  try {
    const cartItems = await cart.findByIdAndUpdate(req.body,{isWishlisted:true})
    res.json("Item wishlisted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/isWhishlisted/items', async (req,res) => {
  try {
    const cartItems = await cart.find({userEmail:req.body.email,isDeleted:false,isWishlisted:true});
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


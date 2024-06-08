const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://aarishfaiz456:TwdgfxApEQ0QT5xf@cluster0.dibtcr2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {}
  )
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => {
    console.log("Error Connecting the mongodb", err);
  });

app.listen(port, () => {
  console.log("Server is running at Port 8000");
});

const User = require("./models/user");
const Order = require("./models/order");

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "aarishfaiz456@gmail.com",
      pass: "ujsx fsqn oetp fsrm", // Correct field name
    },
  });

  const mailOptions = {
    from: "aarishfaiz456@gmail.com",
    to: email, // Correct email referencing
    subject: "Email Verification",
    text: `Please click the following link to verify the email: http://localhost:8000/verify/${verificationToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error in sending the verification email", error);
  }
};

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email is already registered",
      });
    }

    const newUser = new User({ name, email, password });
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    await newUser.save();

    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.log("Error while registering the user", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({
      message: "Email verification successfully done",
    });
  } catch (error) {
    res.status(500).json({ message: "Email verification failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(30).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid Email",
      });
    }
    if (user.password !== password) {
      return res.status(401).json({
        message: "Password is incorrect",
      });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Login failed",
    });
  }
});



app.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;

    // find the user by Id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    // adding the address
    user.addresses.push(address);

    // save

    await user.save();

    res.status(200).json({ message: "Address created Successfully " });
  } catch (error) {
    console.log("Error in Saving the Address", error);
    res.status(500).json({ message: "Error in Handling the Address Saving " });
  }
});

app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User is Not found" });
    }

    const addresses = user.addresses;
    res.status(200).json({addresses});
  } catch (error) {
    console.log("Error in Saving the Address", error);
    res.status(500).json({ message: "Error in Handling the Address Getting " });
  }
});

app.post("/order", async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "user Not found" });
    }
    
    const products =  cartItems.map((item)=>({
      name: item?.titlec,
      quantity: item?.quantity,
      price: item?.price,
      image: item?.image,
    }))

    const order = new Order({
      user: userId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod
    })

    await order.save();

    res.status(200).json({message: "order Successfully made"})
  } catch (error) {
    console.log("Error in placing order", error);
    res.status(500).json({
      message: "There is Some error in Placing the error",
    });
  }
});


// user Profile

app.get("/profile/:userId", async(req, res)=> {
  try {
    const userId = req.params.userId;

    const user  = await User.findById(userId);

     
    if(!user) {
      return res.status(404).json({ message: "user Not found" });
    }

  } catch (error) {
    console.log("Error in placing order", error);
    res.status(500).json({
      message: "There is Some error in Profile",
    });

  }
})


// get the order

app.get("/order/:userId", async(req, res)=> {
  try{
    const userId = req.params.userId;

    const orders  = await Order.find({user:userId}).populate("user");

    if(!orders || orders.length === 0 ) {
      return res.status(404).json({ message: "user order Not found" });
    }

    res.status(200).json({ orders });
  } catch(error) {
    console.log("Error in placing order", error);
    res.status(500).json({
      message: "There is Some error in getting the order",
    });
  }
})

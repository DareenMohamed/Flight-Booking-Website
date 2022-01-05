const express = require("express");
const app = express();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const stripe = require('stripe')('sk_test_51K8WOHIYl2C21a0iJRwT0vGtrRncQP5GmQfCEp9UbVdAeQqnz4GffjbLfYHSyn73MWbTRPlBARke0uWSk9qLgz0i00vfn3Qnl7');
require("dotenv").config();
const uuid = require('uuidv4')
const nodemailer = require('nodemailer')
const userModel = require("../Models/User");
const reservationModel = require("../Models/Reservation");
var cors = require('cors');
app.use(cors())




app.post("/payment", (req, res) => {
  // const { product, token } = req.body
  // const idempontencyKey = uuid()
  console.log(req.body)
  return stripe.customers.create({
    email: req.body.email,
    source: "tok_visa"
  })
    .then(customer => {
      stripe.charges.create({
        amount: req.body.amount * 100,
        currency: 'egp',
        customer: customer.id,
        receipt_email: req.body.email,
        // description: "My First Test Charge (created for API docs)"
      },
        //  { idempontencyKey }
      )
    })
    .then(result => res.status(200).send(result))
    .catch(err => console.log(err));
}
)




app.get("/allUsers", async (request, response) => {
  const users = await userModel.find({});

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/searchUser", async (request, response) => {  //search with Criteria
  console.log("ana el request:------- ")

  var q = {}
  let body = {
    password: "lala@la",
    email: "hii"

  };
  console.log("body: ", request.body)
  console.log("q", q)

  let v = JSON.stringify(q)
  console.log("v", v)
  const user = await userModel.find(body);

  try {
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.get("/userById/:id", async (request, response) => {
  const user = await userModel.findById(request.params.id);

  try {
    response.send(user);
  }
  catch (error) {
    response.status(500).send(error);
  }
});

app.patch("/user/:id", verifyJWT ,async (request, response) => {  //updateUser
  try {

    console.log("Request: ", request.body)
    var q = {}

    if (request.body.firstName.firstName != "") {
      q.firstName = request.body.firstName.firstName
    }
    if (request.body.lastName.lastName != "") {
      q.lastName = request.body.lastName.lastName
    }
    if (request.body.passportNumber.passportNumber != "") {
      q.passportNumber = request.body.passportNumber.passportNumber
    }
    if (request.body.email.email != "") {
      q.email = request.body.email.email
    }
    

    console.log(q);
    console.log(request.params.id);
    await userModel.findByIdAndUpdate(request.params.id, q);
    response.send();
  } catch (error) {
    response.status(500).send(error);
  }
});


app.post('/login', (req, res) => {
  const userLoggedIn = req.body
  userModel.findOne({ username: userLoggedIn.username })
    .then(dbUser => {
      if (!dbUser) {
        return res.json({
          message: "Invalid Username or Password"
        })
      }
      bcrypt.compare(userLoggedIn.password, dbUser.password)
        .then(isCorrect => {
          if (isCorrect) {
            const payload = {
              id: dbUser._id,
              username: dbUser.username,
              type:dbUser.type
            }
            jwt.sign(
              payload,
              "" + process.env.JWT_SECRET,
              { expiresIn: 86400 },
              (err, token) => {
                if (err) return res.json({ message: err })
                return res.json({
                  message: "Success",
                  token: "Bearer " + token,
                  UserID : payload.id,
                  type:payload.type
                })
              }
            )

            //console.log("token", token)
          }
          else {
            return res.json({
              message: "Invalid Username or Password"
            })
          }
        })
    })
})




app.post('/batates', (req, res) => {
  const userLoggedIn = req.body
  console.log("userLoggedIn",req.body)
  userModel.findOne({ username: userLoggedIn.username })
    .then(dbUser => {
      if (!dbUser) {
        console.log("!DBUSER")
        return res.json({
          message: "Invalid Username or Password"
        })
      }
console.log("userLoggedIn.password: ",userLoggedIn.password)
console.log("dbUser.password: ",dbUser.password)
          if (userLoggedIn.password == dbUser.password) {
             // console.log("res",res)
              return res.json({
                message: "correct password"
              })
          }
          else {
            return res.json({
              message: "Wrong Password"
            })
          }
        })
    })

    app.post('/passwordCheck/:id', verifyJWT, async (req, res) => {
      try {
        const user = await userModel.findOne({ username: req.user.username }).exec();
        console.log(user);
        let oldPassword = await bcrypt.hash(req.body.oldpassword, 10);
        let newPassword = await bcrypt.hash(req.body.newpassword, 10);
        console.log("old" , oldPassword)
        console.log("new" , newPassword)
        console.log("user.password",user.password)
        bcrypt.compare( req.body.oldpassword, user.password)
        .then(isCorrect => {
          if (!isCorrect) {
            throw 'Parameter is not a number!';
            
          //   console.log("correct")
          //  newPassword,
          //   user.changePassword(
          //     req.user.username,
          //     oldPassword,
          //     newPassword,
          //     function (err) {
          //       if (err) {
          //         console.log(err);
          //         console.log("inccorect old password");
          //         res.sendStatus(401);
          //       } else {
          //         console.log("password changed");
          //         res.sendStatus(200);
          //       }
          //     }
          //   );


            //console.log("token", token)
          }
        })
          let q = {}
          q.password = newPassword
          console.log(q)
          console.log("user id " ,req.params.id)
          await userModel.findOneAndUpdate({username: req.user.username}, q);
            
             console.log("updated")
             res.send();
         
       
      
      } catch (error) {
        console.log(error);
        res.sendStatus(401);
      }
       

        
    })




app.post('/register', async (req, res) => {
  const user = req.body;
  console.log(user);
  const takenUsername = await userModel.findOne({ username: user.username })
 console.log(takenUsername);

    if(takenUsername){
      res.json({ message: "username taken" })
    }else {
      user.password = await bcrypt.hash(req.body.password, 10);
  
      const dbUser = new userModel({
        username: user.username,
        email: user.email.toLowerCase(),
        password: user.password,
        type: 1,
        firstName: user.firstName,
        lastName: user.lastName,
        passportNumber: user.passportNumber,
        reservations: [],
        address : user.address,
        telephone1: user.telephone1,   
        telephone2: user.telephone2
      }
      )
      dbUser.save()

      const payload = {
        id: dbUser._id,
        username: dbUser.username,
      }
      jwt.sign(
        payload,
        "" + process.env.JWT_SECRET,
        { expiresIn: 86400 },
        (err, token) => {
          if (err) return res.json({ message: err })
          return res.json({
            token: "Bearer "+token,
            message :"success",
            UserId : payload.id
          })
        }
      )

    }
  }
  
)


app.get('/CheckAdmin',verifyJWTAdmin ,  async (req, res) => {
      res.json({ message: "ADMIN" })
})

app.patch('/changePassword/:id', async (req, res) => {
  const user = req.body;
  
//console.log("req.body.password", req.body.password);
 user.password = await bcrypt.hash(req.body.password, 10);
 //console.log("encrypted user.password",user.password);
 try {
  var q = {}
  
  q.password = user.password
  //console.log("q.password CROISSANT",q.password)

  //console.log("req.params CROISSANT",req.params.id)
  await userModel.findByIdAndUpdate(req.params.id, q);
  res.send();
} catch (error) {
  res.status(500).send(error);
}
  }
  )


app.post('/CheckUsername', async (req, res) => {
  const user = req.body;
  console.log(user);
  const takenUsername = await userModel.findOne({ username: user.username })
console.log(takenUsername)
    if(takenUsername){
      res.json({ message: "taken" })
    }else {
      res.json({ message: "not" })
      }
  
  
})


app.get("/usersflight/:id", verifyJWT  ,async (request, response) => {
  var user = {};
  user.UserID = request.params.id;
  const reservedFlights = await reservationModel.find(user);
  console.log(reservedFlights)

  try {
    response.send(reservedFlights);
  } catch (error) {
    response.status(500).send(error);
  }
});


function verifyJWT(req , res , next) {
  const token = req.headers["x-access-token"]?.split(' ')[1]
  if(token){
    jwt.verify(token, process.env.JWT_SECRET, (err ,decoded) => {
      if(err) {
        console.log("failed to auth")
        return res.json({
          isLoggedIn: false,
          message: "Failed To Authenticate"
        })
     
      }
      console.log("succeded to auth")
      req.user = {};
      req.user.id = decoded.id
      req.user.username = decoded.username
      req.user.type = decoded.type
      if(req.user.type !== 1){
        return res.json({
          isLoggedIn: false,
          message: "Access Restricted To Users Only"
        })
      }
      next()
    })
  }else{
    console.log("Wrong Token")
    res.json({message : "Incorrect Token Given" , isLoggedIn:false})
  }
}

function verifyJWTAdmin(req , res , next) {
  const token = req.headers["x-access-token"]?.split(' ')[1]
  
  if(token){
    jwt.verify(token, process.env.JWT_SECRET, (err ,decoded) => {
      if(err) return res.json({
        isLoggedIn: false,
        message: "Failed To Authenticate"
      })
      req.user = {};
      req.user.id = decoded.id
      req.user.username = decoded.username
      req.user.type = decoded.type
      if(req.user.type !== 0){
        return res.json({
          isLoggedIn: false,
          message: "Access Restricted To Admin Only"
        })
      }
      next()
    })
  }else{
    res.json({message : "Incorrect Token Given" , isLoggedIn:false})
  }
}


module.exports = app;
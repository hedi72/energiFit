const express = require("express");
//import mongoose
const mongoose = require("mongoose");
// import model user
const User = require("./models/user");
// import model plat 
// const Plat =require('./models/plat');
const Classe =require('./models/classe');
// import model plat 
const Reservation =require('./models/reservation');

//import boody-parser
const bodyParser = require("body-parser");
const user = require("./models/user");
//import bcrypt
const bcrypt = require("bcrypt");

const { $ } = require("protractor");
const { isNull } = require("util");

// instance express in app
const app = express();

// Connect to Data Base port de db ** 27017 **
mongoose.connect("mongodb://localhost:27017/energyFitDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Security configuration

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// traitement create user
app.post("/api/createUser", (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }).then((doc) => {
    if (doc) {
      res.status(200).json({ message: "user exist" });
    } else {
      bcrypt.hash(req.body.password, 10).then((cryptedPassword) => {
        //etape 1
        let user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: cryptedPassword,
          tel: req.body.tel,
          role: req.body.role,
          speciality: req.body.speciality,
          experience: req.body.experience,
          dateOfBirth: req.body.dateOfBirth,
        });
        //etape 2

        user.save();
        //etape 3
        res.status(200).json({
          message: "User added with success",
        });
      });
    }
  });
});
//Traitement de get all users
app.get("/api/allUsers", (req, res) => {
  console.log("here in function get all Users");

  //etape 1
  user.find((err, docs) => {
    if (err) {
      console.log("error in DB");
    } else {
      //success
      res.status(200).json({
        users: docs,
      });
    }
  });
});
//Traitement de get user by ID
app.get("/api/allUsers/:id", (req, res) => {
  console.log("here in function get user by id");
  //etape 1
  let id = req.params.id;
  console.log("id user to search:", id);
  //etape 2
  User.findOne({ _id: id }).then((doc) => {
    console.log("finded User", doc);
    res.status(200).json({
      user: doc,
    });
  });
});
// Traitement delete user
app.delete("/api/allUsers/:id", (req, res) => {
  console.log("here in function delete user");
  //etape 1
  let id = req.params.id;
  console.log("user id to delete", id);
  //recherche
  User.findOne({ _id: id }).then((result) => {
    console.log("user", result);
    if (result.role == "trainers") {
      //suppression des classes
      Classe.deleteMany({ idTrainer: result._id }).then(() => {
        console.log("deleted classes");
      });
        //suppression des classes
        Reservation.deleteMany({ idTrainer: result._id }).then(() => {
          console.log("deleted reservation");
        });
      //  User.deleteOne({_id:id}).then(
      //     (result)=>{
      //         console.log("delete result",result);
      //         if (result) {
      //             //success
      //          res.status(200).json({
      //              message:"user deleted with success"
      //          })

      //         }
      //     }
      // )
    }else if (result.role == "player") {
        //suppression des classes
        Reservation.deleteMany({ idPlayer: result._id }).then(() => {
          console.log("deleted reservation");
        });
      
    }
    User.deleteOne({ _id: id }).then((findedUser) => {
      console.log("delete findedUser", findedUser);
      if (findedUser) {
        //success
        res.status(200).json({
          message: "user deleted with success",
        });
      }
    });
  });
  //    //etape 2
  //    User.deleteOne({_id:id}).then(
  //        (result)=>{
  //            console.log("delete result",result);
  //            if (result) {
  //                //success
  //             res.status(200).json({
  //                 message:"user deleted with success"
  //             })

  //            }
  //        }
  //    )
});
//traitement edit chef
app.put('/api/allUsers/:id',(req,res)=>{
    console.log('here in function edit User');
    console.log("requette",req.body.firstName);
    // Etape 1: regroupement de modification
    let user={
        _id:req.body._id,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password,
        tel:req.body.tel,
        speciality:req.body.speciality,
        experience:req.body.experience,
        dateOfBirth:req.body.dateOfBirth,
        role:req.body.role,

    };
    console.log('hehoo',user);
    // Etape 2
    User.updateOne({_id:req.body._id},user).then(
        (result)=>{
            console.log("result update",result);
            res.status(200).json({
                message:"edited with success"
            });
        }
    )
});

// traitement login
app.post("/api/login", (req, res) => {
  console.log("Here in login", req.body);
  // etape 1:recherche de l'utilisateur avec l'email
  User.findOne({ email: req.body.email })
    .then((resultEmail) => {
      console.log("resultEmail", resultEmail);
      //si l'email n'existe pas
      if (!resultEmail) {
        res.status(200).json({
          findedUser: "Wrong Email",
        });
      }
      //sinon on passe à la comparaison du mot de passe ecrit en FE par le mot de passe associé à l'email trouvé
      return bcrypt.compare(req.body.password, resultEmail.password);
    })
    .then((resultPwd) => {
      console.log("resultPwd", resultPwd);
      //si les mots de passe ne sont pas identiques
      if (!resultPwd) {
        res.status(200).json({
          findedUser: "Wrong password",
        });
      } else {
        // si l'email et le mot de passe existent donc on passe à la recherche de l'utlisateur par son email
        User.findOne({ email: req.body.email }).then((result) => {
          console.log("result", result);
          res.status(200).json({
            findedUser: result,
          });
        });
      }
    });
});

 // ***************************************//
    //traitement create classe
    app.post('/api/addClasse',(req,res)=>{
      console.log('here in add classe');
      Classe.findOne({className:req.body.className,idTrainer:req.body.idTrainer}).then(
          (doc)=>{
              if (doc) {
                  res.status(200).json(
                      {message:"classe already exist"}
                  )
                  
              }else{
                       //etape 1
              let classe = new Classe({
                className:req.body.className,
                  price:req.body.price,
                  category:req.body.category,
                  date:req.body.date,
                  level:req.body.level,
                 
                  idTrainer:req.body.idTrainer
                  
              });
              //etape 2
              classe.save();
              //etape 3
              res.status(200).json({
                  message:'Classe added with success'
              });

              }
          }
      )
      console.log('Here in function addClasse');
     
         
         
          
      })
          //Traitement de get all classes
          app.get('/api/allClasses',(req,res)=>{
              console.log("here in function get all classes");
          
          //etape 1
          // Classe :model
          Classe.find((err,docs)=>{
              if(err){
                  console.log("error in DB");
              }else{
                  //success
                  res.status(200).json({
                    classes:docs
                  })
              }
          })
      
      });
         //Traitement de get classe by ID
         app.get('/api/allClasses/:id',(req,res)=>{
             console.log("here in function get classe by id");
             //etape 1
             let id =req.params.id;
             console.log("id classe to search:",id);
             //etape 2
             Classe.findOne({_id:id}).then(
                 (doc)=>{
                     console.log("finded Classe",doc);
                     res.status(200).json({
                      classe : doc
                     })
                 }
      
             )
         });
         // Traitement delete user
         app.delete('/api/allClasses/:id',(req,res)=>{
             console.log("here in function delete classe");
             //etape 1
             let id = req.params.id;
             console.log("classe id to delete",id);
             //etape 2
             Classe.deleteOne({_id:id}).then(
                 (result)=>{
                     console.log("delete result",result);
                     if (result) {
                         //success
                      res.status(200).json({
                          message:"classe deleted with success"
                      })
                         
                     }
                 }
             )

          }
      )
// Traitement get my classes
app.get('/api/myClasses/:id',(req,res)=>{
  console.log("here in get my classes");
  let id=req.params.id;
  Classe.find({idTrainer:id},(err,docs)=>{
      if (err) {
          console.log("err in DB");
          
      }else{
          res.status(200).json({
              myClasses:docs
          })
      }
  })
});
// Traitement "get classe by id"
app.get(`/api/allClasses/:id`,(req,res)=>{
  console.log('here in function display classe by id');
  let id=req.params.id;
  Classe.findOne({_id:id}).then(
      (doc)=>{
          console.log(doc);
          res.status(200).json({
            classe:doc
          })
      }
      
  )
});

//traitement delete classe
app.delete('/api/myClasses/:id',(req,res)=>{
  console.log("here functions delete classe");
  let id=req.params.id;
  Classe.deleteOne({_id:id}).then(
      (result)=>{
          res.status(200).json(
              {message:"Deleted with success"}
          )
      }
  )
});
//traitement edit classe
app.put('/api/allClasses/:id',(req,res)=>{
  console.log("here in function edit classe");
  let classe={
      _id:req.body._id,
      className:req.body.className,
      price:req.body.price,
      description:req.body.description,
      idTrainer:req.body.idTrainer
  };
  Classe.updateOne({_id : req.body._id},classe).then(
      (result)=>{
          res.status(200).json({
              message:"Classe edited with success"
          })
      }
  )

});


// ***************************************//
    //traitement create reservation
    app.post('/api/addReservation',(req,res)=>{
      console.log('here in add Reservation');
      Reservation.findOne({idClass: req.body.idClass,idPlayer:req.body.idPlayer}).then(
          (doc)=>{
              if (doc) {
                  res.status(200).json(
                      {message:"reservation already exist"}
                  )
                  
              }else {
                       //etape 1
              let reservation = new Reservation({
                idClass:req.body.idClass,
                 idPlayer:req.body.idPlayer,
                 namePlayer:req.body.namePlayer,
                 
                  
              });
              //etape 2
             
              
                reservation.save();

              
               
             
             
              //etape 3
              res.status(200).json({
                  message:'Reservation added with success'
              });

              }
          }
      )
      console.log('Here in function addReservation');
     
         
         
          
      })
          //Traitement de get all classes
          app.get('/api/allReservations',(req,res)=>{
              console.log("here in function get all Reservations");
          
          //etape 1
          // Plat :model
          Reservation.find((err,docs)=>{
              if(err){
                  console.log("error in DB");
              }else{
                  //success
                  res.status(200).json({
                    reservations:docs
                  })
              }
          })
      
      });
      //    //Traitement de get plat by ID
      //    app.get('/api/allPlats/:id',(req,res)=>{
      //        console.log("here in function get plat by id");
      //        //etape 1
      //        let id =req.params.id;
      //        console.log("id plat to search:",id);
      //        //etape 2
      //        Plat.findOne({_id:id}).then(
      //            (doc)=>{
      //                console.log("finded Plat",doc);
      //                res.status(200).json({
      //                    plat : doc
      //                })
      //            }
      
      //        )
      //    });
      //    // Traitement delete user
      //    app.delete('/api/allPlats/:id',(req,res)=>{
      //        console.log("here in function delete plat");
      //        //etape 1
      //        let id = req.params.id;
      //        console.log("plat id to delete",id);
      //        //etape 2
      //        Plat.deleteOne({_id:id}).then(
      //            (result)=>{
      //                console.log("delete result",result);
      //                if (result) {
      //                    //success
      //                 res.status(200).json({
      //                     message:"plat deleted with success"
      //                 })
                         
      //                }
      //            }
      //        )

      //     }
      // )
// Traitement get my plats
// app.get('/api/myPlats/:id',(req,res)=>{
//   console.log("here in get my plats");
//   let id=req.params.id;
//   Plat.find({idTrainer:id},(err,docs)=>{
//       if (err) {
//           console.log("err in DB");
          
//       }else{
//           res.status(200).json({
//               myPlats:docs
//           })
//       }
//   })
// });
// // Traitement "get plat by id"
// app.get(`/api/allPlats/:id`,(req,res)=>{
//   console.log('here in function display plat by id');
//   let id=req.params.id;
//   Plat.findOne({_id:id}).then(
//       (doc)=>{
//           console.log(doc);
//           res.status(200).json({
//               plat:doc
//           })
//       }
      
//   )
// });

// //traitement delete plat
// app.delete('/api/myPlats/:id',(req,res)=>{
//   console.log("here functions delete plat");
//   let id=req.params.id;
//   Plat.deleteOne({_id:id}).then(
//       (result)=>{
//           res.status(200).json(
//               {message:"Deleted with success"}
//           )
//       }
//   )
// });
// //traitement edit plat
// app.put('/api/allPlats/:id',(req,res)=>{
//   console.log("here in function edit plat");
//   let plat={
//       _id:req.body._id,
//       className:req.body.className,
//       price:req.body.price,
//       description:req.body.description,
//       idTrainer:req.body.idTrainer
//   };
//   Plat.updateOne({_id : req.body._id},plat).then(
//       (result)=>{
//           res.status(200).json({
//               message:"Plat edited with success"
//           })
//       }
//   )

// });
// **********************************

// traitement search
app.post('/api/searchChef',(req,res)=>{
  console.log("here in search");
  // etape 1:recuperation de la valeur 
  let searchValue=req.body.searchValue;
  console.log("searcValue",searchValue);
  // etape 2 : la recherche
  User.find({
      $or:[
          {speciality: {$regex: `.*${searchValue}`}},
          {firstName: {$regex: `.*${searchValue}`}},
          
      ]
  }).then(
      (docs)=>{
          if (docs) {
              console.log("result",docs);
              res.status(200).json({
                  chefs:docs
              })
              
          }
      }
  )
})

// export app
module.exports = app;

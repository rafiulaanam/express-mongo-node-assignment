const { getDb } = require("../utils/dbConnect");





module.exports.getAllUsers = async (req, res, next) => {
    try {
      const { limit, page } = req.query;
      const db = getDb();
  
      // cursor => toArray(), forEach()
      const user = await db
        .collection("users")
        .find({})
        // .project({ _id: 0 })
        // .skip(+page * limit)
        .limit(+limit)
        .toArray();
  
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  };


module.exports.getRandomUsers = async (req, res, next) => {
    try {
      const { limit, page } = req.query;
      const db = getDb();
  
      // cursor => toArray(), forEach()
      const user = await db
        .collection("users")
        .find({})
        // .project({ _id: 0 })
        // .skip(+page * limit)
        // .limit(+limit)
        .toArray();
          // Generate a random index within the bounds of the users array
  const randomIndex = Math.floor(Math.random() * user.length);
  
  // Select the user at the random index
  const randomUser = user[randomIndex];
  
      res.status(200).json({ success: true, data: randomUser });
    } catch (error) {
      next(error);
    }
  };



  module.exports.saveAUser = async (req, res, next) => {
    try {
      const db = getDb();
      const user = req.body;
  
      const result = await db.collection("users").insertOne(user);
      console.log(result);
  
      if (!result.insertedId) {
        return res.status(400).send({ status: false, error: "Something went wrong!" });
      }
  
      res.send({ success: true, message: `Tool added with id: ${result.insertedId}` });
    } catch (error) {
      next(error);
    }
  };

  module.exports.updateUser = async (req, res, next) => {
    try {
      const db = getDb();
      const { id } = req.params;
  
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "Not a valid user id." });
      }
  
      const user = await db.collection("users").updateOne({ _id: ObjectId(id) }, { $set: req.body });
  
      if (!user.modifiedCount) {
        return res.status(400).json({ success: false, error: "Couldn't update the user" });
      }
  
      res.status(200).json({ success: true, message: "Successfully updated the user" });
    } catch (error) {
      next(error);
    }
  };


  module.exports.deleteUser = async (req, res, next) => {
    try {
      const db = getDb();
      const { id } = req.params;
  
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "Not a valid user id." });
      }
  
      const user = await db.collection("users").deleteOne({ _id: ObjectId(id) });
  
      if (!user.deletedCount) {
        return res.status(400).json({ success: false, error: "Couldn't delete the user" });
      }
  
      res.status(200).json({ success: true, message: "Successfully deleted the user" });
    } catch (error) {
      next(error);
    }
  };
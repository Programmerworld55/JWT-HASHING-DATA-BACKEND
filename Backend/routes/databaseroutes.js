const express = require("express");
const LargeData = require("../models/user_schema");
const verifyToken = require('../middleware/verifyToken');


const router = express.Router();



router.get("/", (req, res) => {
  res.send("u are at home page");
  console.log("user at home page");
});

// router.post("/SaveLargeData", async (req, res) => {
router.post("/SaveLargeData", verifyToken,async (req, res) => {
  console.log('Headers:', req.headers);
  console.log('Request Body:', req.body);


  try {
;

    const SavedData = await LargeData.create(req.body);
    res
      .status(201)
      .json({ message: "User created successfully!", data: SavedData });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log("error while saving data in database : ", error);
  }
});

//fetch all data
router.get("/GetLargeData", verifyToken,async (req, res) => {
// router.get("/GetLargeData",async (req, res) => {

  try {
    const Data = await LargeData.find();
    res.status(201).json({ message: "data fetched successfully!", data: Data });
  } catch (error) {
    res
      .status(400)
      .json({
        message: "error occured while fetching data ",
        error: error.message,
      });
  }
});

//get data  by title
router.get("/GetLargeData/title/:title", verifyToken,async (req, res) => {
  try {
    const Data = await LargeData.findOne({ title: req.params.title });
    console.log(req.params.title);
    if (!Data) {
      res.status(404).json({ message: "data not found " });
    }
    res.json(Data);
  } catch (error) {
    res
      .status(400)
      .json({
        message: "error occured while fetching data with title ",
        error: error.message,
      });
  }
});

router.put("/ModifyLargeData/id/:id", verifyToken,async (req, res) => {
  try {
    console.log("Request ID:", req.params.id);
    console.log("Request Body:", req.body);

    const updatedData = await LargeData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedData) {
      return res
        .status(404)
        .json({ message: "error occured whie updating data" });
    }
    res.json(updatedData);
  } catch (error) {
    // res.status(400).json({message:"error occured while modifying data with id  ",error:error.message})
    res
      .status(400)
      .json({
        message: `Error occurred while modifying data with id ${req.params.id}`,
        error: error.message,
      });

    console.log("error occured while modifying data ");
  }
});

//delete whole data
router.delete("/DeleteLargeData/id/:id", verifyToken,async (req, res) => {
  try {
    console.log("Request ID:", req.params.id);

    const DeletedData = await LargeData.findByIdAndDelete(req.params.id);

    if (!DeletedData) {
      return res.status(404).json({ message: "Error occurred while deleting data: ID not found." });
    }

    res.json({ message: "Data deleted successfully", data: DeletedData });
  } catch (error) {
    res.status(400).json({
      message: "Error occurred while deleting data",
      error: error.message,
    });
    console.log("Error occurred while deleting data:", error);
  }
});


//delete comment

router.delete("/DeleteLargeData/id/:id/commentid/:commentid", verifyToken,async (req, res) => {
  try {
    console.log("Request ID:", req.params.id);
    const { id, commentid } = req.params;
    
    const UpdatedData = await LargeData.findByIdAndUpdate(
      id,
      { $pull: { 'metadata.comments': { _id: commentid } } }, // Match the comment's _id
      { new: true } // Optionally return the updated document
    );

    if (!UpdatedData) {
      return res.status(404).json({
        message: "Error occurred while deleting data: ID not found.",
      });
    }

    res.json({ message: "Comment deleted successfully", data: UpdatedData });
  } catch (error) {
    res.status(400).json({
      message: "Error occurred while deleting data",
      error: error.message,
    });
    console.log("Error occurred while deleting comment:", error);
  }
});


module.exports = router;

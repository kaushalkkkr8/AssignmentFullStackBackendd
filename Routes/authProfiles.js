const { alldata, updateProfile, deleteProfile, follow, unfollow, addNotification, deleteNotification } = require("../Controller/authData");
const authProfile = require("../Middleware/authProfileValidation");

const router = require("express").Router();

router.get("/profiles", authProfile, alldata);
router.get("/profile", authProfile, (req, res) => {
    res.status(200).json({ success: true, profile: req.user });
  });

router.put("/updateprofile",authProfile,  updateProfile);

router.delete("/deleteprofile/:id", deleteProfile);
router.put("/follow/:userId", follow);
router.put("/unfollow/:userId", unfollow);
router.put("/notification/:userId", addNotification);
router.put("/removenotification/:userId", deleteNotification);





module.exports = router;

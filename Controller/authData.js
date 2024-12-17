const UserModel = require("../Model/userSchema");

const alldata = async (req, res) => {
  try {
    const allProfile = await UserModel.find();
    if (allProfile.length > 0) {
      res.status(200).json(allProfile);
    } else res.status(400).json({ error: "Unable to find Data or there is no data" });
  } catch (error) {
    res.status(500).json({ eror: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  const { name, email, skill, interests, role, bio } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    const updatedUser = await UserModel.findByIdAndUpdate(user._id, { name, skill, interests, role, bio }, { new: true });
    console.log("updatedUser", updatedUser);

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ eror: "Internal server error" });
  }
};
const deleteProfile = async (req, res) => {
  const { id } = req.params; // Get the user ID from the URL params

  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const follow = async (req, res) => {
  const userId = req.params.userId;
  const { targetUserId } = req.body;
 
  

  try {
    const userProfile = await UserModel.findById(userId);

    if (!userProfile) {
      return res.status(404).json({ error: "User or target profile not found" });
    }

    const updatedUserProfile = await UserModel.findByIdAndUpdate(userId, { $addToSet: { following: { user: targetUserId } } }, { new: true });

    const updatedTargetProfile = await UserModel.findByIdAndUpdate(targetUserId, { $addToSet: { follower: { user: userId } } }, { new: true });

    res.json({ message: "Follow relationship added successfully", updatedUserProfile, updatedTargetProfile });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const unfollow = async (req, res) => {
  const userId = req.params.userId;
  const { targetUserId } = req.body;

  try {
    const userProfile = await UserModel.findById(userId);

    if (!userProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    const updatedUserProfile = await UserModel.findByIdAndUpdate(userId, { $pull: { following: { user: targetUserId } } }, { new: true });

    const updatedTargetProfile = await UserModel.findByIdAndUpdate(targetUserId, { $pull: { follower: { user: userId } } }, { new: true });

    res.json({ message: "Follow relationship removed successfully", updatedUserProfile, updatedTargetProfile });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addNotification = async (req, res) => {
  const userId = req.params.userId;
  const { targetUserId } = req.body;


  try {
    const targettedProfile = await UserModel.findById(targetUserId);

    if (!targettedProfile) {
      return res.status(404).json({ error: "User or target profile not found" });
    }

    const updatedTargetProfile = await UserModel.findByIdAndUpdate(targetUserId, 
      { $addToSet:
         { 
          notifications: { user: userId }
        } 
      }, { new: true });

    res.json({ message: "Follow relationship added successfully", updatedTargetProfile });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteNotification = async (req, res) => {
  const userId = req.params.userId;
  const { targetUserId } = req.body;
  console.log("userId",userId);
  console.log("targetUserId",targetUserId);
  try {
    const targettedProfile = await UserModel.findById(userId);
console.log("targettedProfile",targettedProfile);

    if (!targettedProfile) {
      return res.status(404).json({ error: "User or target profile not found" });
    }

    const updatedTargetProfile = await UserModel.findByIdAndUpdate(userId, { $pull: { notifications: { user: targetUserId } } }, { new: true });

    res.json({ message: "Follow relationship removed successfully", updatedTargetProfile });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { updateProfile, alldata, deleteProfile, follow, unfollow, addNotification, deleteNotification };

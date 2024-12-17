const UserModel = require("../Model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "User Already Exist", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = new UserModel({ name, email, password: hashedPassword });

    userData.save();
    res.status(201).json({ message: "SignUp successfully", success: true, userData });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
  
    if (!user) {
      return res.status(409).json({ message: "Email or Passward is incorrect", success: false });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(409).json({ message: "Email or Passward is incorrect", success: false });
    }
    const token = jwt.sign({ email: user.email,name:user.name, id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    res.status(200).json({ message: "Login successfully", success: true, token, email, name: user.name });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { signUp, logIn };

import User from "./../models/User.model.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    const user = await newUser.save();
    return res.status(200).send({ email, name, id: user._id });
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal Server error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user.password === password) {
      res.cookie("jwt", user.email, { httpOnly: true, secure: true, sameSite: true });
      return res.status(200).json({ message: "success", email: user.email, id: user._id, name: user.name });
    }
    return res.status(400).json({ message: "Invalid credentials" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server error");
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.log("Internal Server Error");
    res.status(500).send("Internal Server error");
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}).select("-password -createdAt -updatedAt -__v ");
    return res.status(200).json({ users: allUsers });
  } catch (error) {}
};

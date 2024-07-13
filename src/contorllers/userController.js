const User = require('../models/User')

// register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password })
    await user.save();
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

//get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
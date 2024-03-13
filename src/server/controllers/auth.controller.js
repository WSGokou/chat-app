import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

export const signup = async (req, res) => {
  try {
    // Take the username and password from the request body
    const {username, password, confirmPassword} = req.body;

    // Check if the password and confirmPassword are the same
    if (password !== confirmPassword) {
      return res.status(400).json({error: 'Passwords do not match'});
    }

    // Check if the username already exists
    const user = await User.findOne({username});

    if (user) {
      return res.status(400).json({error: 'Username already exists'});
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the new user to the database
    if (newUser) {
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
      });
    }
  } catch (error) {
    console.log('Signup controller error: ', error.message);
    res.status(500).json({error: 'Internal server error'});
  }
};

export const login = async (req, res) => {
  console.log('login user');
};

export const logout = async (req, res) => {
  res.send('logout user');
};

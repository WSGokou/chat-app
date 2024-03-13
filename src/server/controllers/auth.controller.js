import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import generatenTokenAndSetCookie from '../utils/generateToken.js';

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
      // Generate a token and set it as a cookie
      generatenTokenAndSetCookie(newUser._id, res);
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
  try {
    // Take the username and password from the request body
    const {username, password} = req.body;
    // Check if the user exists and the password is valid
    const user = await User.findOne({username});
    const validPassword = await bcrypt.compare(password, user?.password || ''); // empty string to prevent error

    // Return error if user doesn't exist or password is invalid
    if (!user || !validPassword) {
      return res.status(400).json({error: 'Invalid username or password'});
    }

    // Generate a token and set it as a cookie if login is successful
    generatenTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
    });
  } catch (error) {
    console.log('Login controller error: ', error.message);
    res.status(500).json({error: 'Internal server error'});
  }
};

export const logout = async (req, res) => {
  res.send('logout user');
};

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { sequelize } = require('../models'); 

exports.test = async (req, res, next) => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    res.status(200).json({ message: 'Database connection successful.' });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    res.status(500).json({ message: 'Database connection failed' });
  }
}


exports.signup = async (req, res, next) => {
  try {
    // Hash the password using bcrypt
    const hash = await bcrypt.hash(req.body.password, 10);

    // Create the user
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash
    });

    // Respond with success message
    res.status(201).json({
      message: 'User added successfully!',
      user: user // Optionally, you can return the user object here
    });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({
      message: 'Error adding user.',
      error: error.message
    });
  }
};

exports.login = async (req, res, next) => {
  try {

    const user = await User.findOne({ where: { email: req.body.email } });

    // console.log('User found:', user);

    if (!user) {
      return res.status(401).json({
        error: 'User not found!' 
      });
    }
    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid) {
      return res.status(401).json({
        error: 'Incorrect password!' 
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.id }, 
      'RANDOM_TOKEN_SECRET', // Replace this with a stronger secret in production
      { expiresIn: '24h' }
    );

    res.status(200).json({
      userId: user.id,  
      token: token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: error.message || 'An error occurred during login.' 
    });
  }
};
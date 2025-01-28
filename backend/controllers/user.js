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
    });
  } catch (error) {
    console.error('Error signing up user:', error);

    // Check if the error is a unique constraint violation for the email field
    if (error.name === 'SequelizeUniqueConstraintError' && error.errors.some(err => err.path === 'email')) {
      return res.status(400).json({
        message: 'Check credentials.',
        error: error.message
      });
    }

    // For other errors, send a generic error response
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
        error: 'Invalid Credentials.'
      });
    }
    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid) {
      return res.status(401).json({
        error: 'Invalid Credentials.'
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.id },
      'RANDOM_TOKEN_SECRET',
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

  exports.deleteUser = (req, res, next) => {
    User.findOne({ _id: req.params.id }).then(
      (user) => {
        User.deleteOne({ _id: req.params.id }).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      });
  }
};

//TODO CHECK USER CREDENTIALS

exports.deleteUser = async (req, res, next) => {
  try {
    userId = req.params.id
    const user = await User.findOne({ where: { id: userId } });
    // Delete the post
    console.log(userId)
    await user.destroy()
    // Respond with success message
    res.status(200).json({
      message: `User ${userId} data deleted successfully!`
    });
  } catch (error) {
    console.error('Failed to delete user info:', error);
    res.status(500).json({
      message: 'Delete Failed.',
      error: error.message
    });
  }
};
const User = require('../models/userModel');

const getAllUsers = async (filters) => {
  try {
    return await User.find(filters);
  } catch (error) {
    throw new Error('Error fetching users from the database');
  }
};

const getUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    throw new Error('Error fetching user by ID from the database');
  }
};

const addUser = async (userData) => {
  const newUser = new User(userData);
  try {
    return await newUser.save();
  } catch (error) {
    throw new Error('Error saving user to the database');
  }
};

const updateUser = async (id, userData) => {
  try {
    return await User.findByIdAndUpdate(id, userData, { new: true });
  } catch (error) {
    throw new Error('Error updating user in the database');
  }
};

const deleteUser = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting user from the database');
  }
};

module.exports = { getAllUsers, getUserById, addUser, updateUser, deleteUser };

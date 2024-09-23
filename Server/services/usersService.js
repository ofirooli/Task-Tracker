const userRepo = require('../repositories/usersRepo');

const getAllUsers = async () => {
  try {
    const users = await userRepo.getAllUsers();
    console.log('Fetched all users');
    return users;
  } catch (error) {
    console.error('Error fetching users:', error.message);
    throw new Error('Error fetching users');
  }
};

const getUserById = async (id) => {
  try {
    const user = await userRepo.getUserById(id);
    console.log(`Fetched user with ID: ${id}`);
    return user;
  } catch (error) {
    console.error(`Error fetching user by ID ${id}:`, error.message);
    throw new Error('Error fetching user by ID');
  }
};

const addUser = async (userData) => {
  try {
    const newUser = await userRepo.addUser(userData);
    console.log('Added new user');
    return newUser;
  } catch (error) {
    console.error('Error adding user:', error.message);
    throw new Error('Error adding user');
  }
};

const updateUser = async (id, userData) => {
  try {
    const updatedUser = await userRepo.updateUser(id, userData);
    console.log(`Updated user with ID: ${id}`);
    return updatedUser;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error.message);
    throw new Error('Error updating user');
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await userRepo.deleteUser(id);
    console.log(`Deleted user with ID: ${id}`);
    return deletedUser;
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error.message);
    throw new Error('Error deleting user');
  }
};

module.exports = { getAllUsers, getUserById, addUser, updateUser, deleteUser };

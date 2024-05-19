const User = require('../models/userModel');
const Rental = require('../models/rentalModel');

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    console.log('User created:', newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(`Error saving new property: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params; 
    const updateFields = req.body;

    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update specific fields
    for (let field in updateFields) {
      if (updateFields.hasOwnProperty(field)) {
        user[field] = updateFields[field];
      }
    }
    // Save the updated user
    user = await user.save();

    console.log('User updated:', user);
    res.status(200).json(user);
  } catch (error) {
    console.error(`Error updating user: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const readUser = async (req, res) => {
  try {
    const { id } = req.params;
    const targetUser = await User.findById(id);
    if (!targetUser) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log('User found:', targetUser);
    res.status(200).json(targetUser);

  } catch (error) {
    console.error(`Error reading user: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const rentals = await Rental.find({ user: id });
    const hasActiveRentals = rentals.some(rental => rental.status === 'Active');
    if (hasActiveRentals) {
      return res.status(400).json({ error: "Cannot delete user with active rentals" });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log('User deleted:', deletedUser);
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error(`Error deleting user: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createUser, readUser ,updateUser, deleteUser
};


const Milestone = require('../models/milestoneModel');

const getAllMilestones = async (filters) => {
  try {
    return await Milestone.find(filters);
  } catch (error) {
    throw new Error('Error fetching milestones from the database');
  }
};

const getMilestoneById = async (id) => {
  try {
    return await Milestone.findById(id);
  } catch (error) {
    throw new Error('Error fetching milestone by ID from the database');
  }
};

const addMilestone = async (milestoneData) => {
  const newMilestone = new Milestone(milestoneData);
  try {
    return await newMilestone.save();
  } catch (error) {
    throw new Error('Error saving milestone to the database');
  }
};

const updateMilestone = async (id, milestoneData) => {
  try {
    return await Milestone.findByIdAndUpdate(id, milestoneData, { new: true });
  } catch (error) {
    throw new Error('Error updating milestone in the database');
  }
};

const deleteMilestone = async (id) => {
  try {
    return await Milestone.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting milestone from the database');
  }
};

module.exports = { getAllMilestones, getMilestoneById, addMilestone, updateMilestone, deleteMilestone };

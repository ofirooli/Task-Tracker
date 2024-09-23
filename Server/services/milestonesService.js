const milestoneRepo = require('../repositories/milestonesRepo');

const getAllMilestones = async () => {
  try {
    const milestones = await milestoneRepo.getAllMilestones();
    console.log('Fetched all milestones');
    return milestones;
  } catch (error) {
    console.error('Error fetching milestones:', error.message);
    throw new Error('Error fetching milestones');
  }
};

const getMilestoneById = async (id) => {
  try {
    const milestone = await milestoneRepo.getMilestoneById(id);
    console.log(`Fetched milestone with ID: ${id}`);
    return milestone;
  } catch (error) {
    console.error(`Error fetching milestone by ID ${id}:`, error.message);
    throw new Error('Error fetching milestone by ID');
  }
};

const addMilestone = async (milestoneData) => {
  try {
    const newMilestone = await milestoneRepo.addMilestone(milestoneData);
    console.log('Added new milestone');
    return newMilestone;
  } catch (error) {
    console.error('Error adding milestone:', error.message);
    throw new Error('Error adding milestone');
  }
};

const updateMilestone = async (id, milestoneData) => {
  try {
    const updatedMilestone = await milestoneRepo.updateMilestone(id, milestoneData);
    console.log(`Updated milestone with ID: ${id}`);
    return updatedMilestone;
  } catch (error) {
    console.error(`Error updating milestone with ID ${id}:`, error.message);
    throw new Error('Error updating milestone');
  }
};

const deleteMilestone = async (id) => {
  try {
    const deletedMilestone = await milestoneRepo.deleteMilestone(id);
    console.log(`Deleted milestone with ID: ${id}`);
    return deletedMilestone;
  } catch (error) {
    console.error(`Error deleting milestone with ID ${id}:`, error.message);
    throw new Error('Error deleting milestone');
  }
};

module.exports = { getAllMilestones, getMilestoneById, addMilestone, updateMilestone, deleteMilestone };

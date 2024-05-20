<<<<<<< HEAD
const Property = require('../models/propertyModel');
const Rental = require('../models/rentalModel');

const createProperty = async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    await newProperty.save();
    console.log('Rental created:', newProperty);
    res.status(201).json(newProperty);
  } catch (error) {
    console.error(`Error saving new property: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const readProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const targetProperty = await Property.findById(id);
    if (!targetProperty) {
      return res.status(404).json({ error: "Property not found" });
    }
    console.log('Property found:', targetProperty);
    res.status(200).json(targetProperty);

  } catch (error) {
    console.error(`Error reading property: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
}

const updateProperty = async (req, res) => {
  try {
    const { id } = req.params; 
    const updateFields = req.body;

    let property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Update specific fields
    for (let field in updateFields) {
      if (updateFields.hasOwnProperty(field)) {
        property[field] = updateFields[field];
      }
    }
    // Save the updated user
    property = await property.save();

    console.log('Property updated:', property);
    res.status(200).json(property);
  } catch (error) {
    console.error(`Error updating property: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const rentals = await Rental.find({ property: id });

    // Check if any rental has an 'Active' status
    const hasActiveRentals = rentals.some(rental => rental.status === 'Active');
    if (hasActiveRentals) {
      return res.status(400).json({ error: "Cannot delete property with active rentals" });
    }

    const deletedProperty = await Property.findByIdAndDelete(id);
    if (!deletedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }
    console.log('Property deleted:', deletedProperty);
    res.status(200).json(deletedProperty);

  } catch (error) {
    console.error(`Error deleting property: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
}


module.exports = {
  createProperty, readProperty , updateProperty, deleteProperty
};

=======
const Property = require('../models/propertyModel');
const Rental = require('../models/rentalModel');

const createProperty = async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    await newProperty.save();
    console.log('Rental created:', newProperty);
    res.status(201).json(newProperty);
  } catch (error) {
    console.error(`Error saving new property: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const readProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const targetProperty = await Property.findById(id);
    if (!targetProperty) {
      return res.status(404).json({ error: "Property not found" });
    }
    console.log('Property found:', targetProperty);
    res.status(200).json(targetProperty);

  } catch (error) {
    console.error(`Error reading property: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
}

const updateProperty = async (req, res) => {
  try {
    const { id } = req.params; 
    const updateFields = req.body;

    let property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Update specific fields
    for (let field in updateFields) {
      if (updateFields.hasOwnProperty(field)) {
        property[field] = updateFields[field];
      }
    }
    // Save the updated user
    property = await property.save();

    console.log('Property updated:', property);
    res.status(200).json(property);
  } catch (error) {
    console.error(`Error updating property: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const rentals = await Rental.find({ property: id });

    // Check if any rental has an 'Active' status
    const hasActiveRentals = rentals.some(rental => rental.status === 'Active');
    if (hasActiveRentals) {
      return res.status(400).json({ error: "Cannot delete property with active rentals" });
    }

    const deletedProperty = await Property.findByIdAndDelete(id);
    if (!deletedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }
    console.log('Property deleted:', deletedProperty);
    res.status(200).json(deletedProperty);

  } catch (error) {
    console.error(`Error deleting property: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
}


module.exports = {
  createProperty, readProperty , updateProperty, deleteProperty
};

>>>>>>> 0315b01986024b1d9743b4ccd722b5f1d19f21d7

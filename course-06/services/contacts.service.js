const Contact = require("../models/contact.model");

const getAll = async (query) => {
  return Contact.find(query);
};

// const getOne = async (id) => {
//   return Contact.findById(id);
// };

const getOne = async (id, userId) => {
  return Contact.findOne({ _id: id, owner: userId });
};

const create = async (data) => {
  return Contact.create(data);
};

// const update = async (id, data) => {
//   return Contact.findByIdAndUpdate(id, data, { new: true });
// };

const update = async (id, userId, data) => {
  return Contact.findOneAndUpdate({ _id: id, owner: userId }, data, {
    new: true,
  });
};

const updateFavorite = async (id, userId, favorite) => {
  return Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    { favorite },
    { new: true }
  );
};

// const remove = async (id) => {
//   return Contact.findByIdAndDelete(id);
// };

const remove = async (id, userId) => {
  return Contact.findOneAndDelete({ _id: id, owner: userId });
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  updateFavorite,
  remove,
};

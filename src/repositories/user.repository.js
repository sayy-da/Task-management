const User = require("../entity/user.entity");

class UserRepository {
  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async findById(id) {
    return await User.findById(id).select("-password");
  }

  async create(data) {
    return await User.create(data);
  }
}

module.exports = new UserRepository();
const userRepository = require("../repositories/user.repository");
const jwt = require("jsonwebtoken");

class UserService {
  async register(name, email, password) {
    const exists = await userRepository.findByEmail(email);
    if (exists) throw new Error("Email already registered");

    const user = await userRepository.create({ name, email, password });
    return { id: user._id, name: user.name, email: user.email };
  }

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw new Error("Invalid email or password");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return {
      user: { id: user._id, name: user.name, email: user.email },
      token,
    };
  }
}

module.exports = new UserService();
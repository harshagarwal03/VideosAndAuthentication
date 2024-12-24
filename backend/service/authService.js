class AuthService {
  constructor(User) {
    this.User = User;
  }

  async registerUser(username, password) {
    const hashedPassword = await this.hashPassword(password);
    const newUser = new this.User({ username, password: hashedPassword });
    return await newUser.save();
  }

  async signInUser(username, password) {
    const user = await this.User.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }
    const isValid = await this.validatePassword(password, user.password);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }
    return user;
  }

  async hashPassword(password) {
    const bcrypt = require("bcryptjs");
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async validatePassword(password, hashedPassword) {
    const bcrypt = require("bcryptjs");
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = AuthService;

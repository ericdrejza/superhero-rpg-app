const Profile = require('../model/Profile');
const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { email, user, pwd } = req.body;
  if (!email || !user || !pwd) {
    return res
      .status(400)
      .json({ message: 'email, username, and password are required' });
  }
  // Check for duplicate usernames in the db
  const duplicate = await User.findOne({
    $or: [{ username: user }, { email: user }]
  }).exec();
  if (duplicate) return res.sendStatus(409); // Conflict status
  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // Create and store the new user
    const result = await User.create({
      email: email,
      username: user,
      password: hashedPwd
    });

    // alternate ways to create and save
    // alt 1
    // const newUser = new User();
    // newUser.username = user; // set via dot notation
    // const result = await newUser.save();

    // alt 2
    // const newUser = new User({
    //   username: user,
    //   password: hashedPwd
    // }); // pass object as arg to constructor
    // const result = await newUser.save();

    console.log(result);

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };

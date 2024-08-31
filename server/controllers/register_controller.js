const Profile = require('../model/Profile');
const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  // Verify that all required fields exist
  const { email, user, pwd, firstname, lastname } = req.body;
  if (!email || !user || !pwd || !firstname || !lastname) {
    return res.status(400).json({
      message: 'email, username, password, firstname, and lastname are required'
    });
  }

  // Check for duplicate usernames in the db
  const duplicate = await User.findOne({
    $or: [{ username: user }, { email: email }]
  }).exec();
  if (duplicate) return res.sendStatus(409); // Conflict status

  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    const profileResult = await Profile.create({
      firstName: firstname,
      lastName: lastname
    });

    // Create and store the new user
    const result = await User.create({
      email: email,
      username: user,
      password: hashedPwd,
      profile: profileResult._id
    });

    console.log(result);

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };

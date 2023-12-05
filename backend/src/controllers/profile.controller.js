const db = require('../models');
const { User, Profile } = db;

exports.profile = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.userId,
    },
    include: 'Profile',
  });

  if (!user) return res.status(404).send('User not found');

  let profile = user.Profile;

  if (!profile) {
    profile = await Profile.create();

    await user.setProfile(profile);
  }

  res.send(profile);
};

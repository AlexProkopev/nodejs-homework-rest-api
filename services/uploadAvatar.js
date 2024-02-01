const path = require("path");
const Jimp = require("jimp");
const { User } = require("../models/users");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const uploadAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}@${originalname}`;
  try {
    const resultUpload = path.join(avatarsDir, filename);

    const img = await Jimp.read(tempUpload);
    await img.resize(250, 250).writeAsync(tempUpload);

    await fs.rename(tempUpload, resultUpload);
    const avatarResponse = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarUrl: avatarResponse });

    res.status(200).json({ avatarUrl: avatarResponse });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  uploadAvatar,
};

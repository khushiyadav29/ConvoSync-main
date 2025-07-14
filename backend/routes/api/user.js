const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const ChatRoom = require('../../models/ChatRoom'); // Make sure this model exists

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
    });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// @route    GET api/users/search
// @desc     Search users by username (name)
// @access   Private
router.get('/search', auth, async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);
    const users = await User.find({
      name: { $regex: q, $options: 'i' },
      _id: { $ne: req.user.id }
    }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// @route    POST api/users/add-to-chat
// @desc     Add user to chat room
// @access   Private
router.post('/add-to-chat', auth, async (req, res) => {
  try {
    const { chatRoomId, userIdToAdd } = req.body;
    const chatRoom = await ChatRoom.findById(chatRoomId);
    if (!chatRoom) return res.status(404).json({ msg: 'Chat room not found' });

    if (!chatRoom.joinedUsers.includes(userIdToAdd)) {
      chatRoom.joinedUsers.push(userIdToAdd);
      await chatRoom.save();
    }
    res.json({ msg: 'User added to chat', chatRoom });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
const express = require('express');
const { accessChat, fetchChat, createGroupchat, renameGroup, removeFromGroup, addToGroup } = require('../controllers/chatControllers');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();


router.route("/").post(protect, accessChat   )
router.route("/").get(protect, fetchChat)
router.route("/group").post(protect, createGroupchat)
router.route("/rename").put(protect, renameGroup)
router.route("/groupadd").put(protect, addToGroup)
router.route("/groupremove").put(protect, removeFromGroup)


module.exports = router; 
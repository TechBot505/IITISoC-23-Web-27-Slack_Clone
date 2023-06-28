const express = require("express")
const { route } = require("./userRoutes")
const { protect } = require("../middleware/authMiddleware")
const { sendMessages, allMessages } = require("../controllers/messageControllers")
const router = express.Router()


router.route('/').post(protect ,sendMessages)
router.route('/:chatId ').get(protect ,allMessages)

module.exports = router ; 
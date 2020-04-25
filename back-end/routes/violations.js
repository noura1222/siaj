const router = require("express").Router();
const User = require("../models/User");

// Get all Violations
router.get("/", async (req, res) => {
    try {
        violations = await User.find()
            .select(["violations", "firstname", "lastname"])
            .sort("time");

        res.json(violations);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]);
});

module.exports = router;


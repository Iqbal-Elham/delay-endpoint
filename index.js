const express = require("express");

const app = express();
app.use(express.json());

app.post("/delay", async (req, res) => {
  const delay = Number(req.body.delay || 0);

  // validations
  if (delay < 0) {
    return res.status(400).json({ error: "Invalid delay" });
  }

  if (delay > 300000) {
    return res.status(400).json({ error: "Max delay is 5 minutes" });
  }

  console.log("Delay requested:", delay);

  // ⏳ wait
  await new Promise(resolve => setTimeout(resolve, delay));

  // ✅ respond after delay
  return res.json({
    success: true,
    waited: delay
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Delay API running on port", PORT);
});
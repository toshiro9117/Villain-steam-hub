const express = require("express");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(express.json());

// Endpoint to handle branch download
app.post("/download-branch", async (req, res) => {
  const { branch } = req.body;

  if (!branch) {
    return res.status(400).json({ error: "Branch name is required" });
  }

  const zipUrl = `https://github.com/toshiro9117/Villain-steam-hub/archive/refs/heads/${branch}.zip`;
  const filePath = path.join(__dirname, `${branch}.zip`);

  try {
    // Download the ZIP file
    const response = await axios({
      url: zipUrl,
      method: "GET",
      responseType: "stream",
    });

    // Save the file to the server
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    writer.on("finish", () => {
      res.json({ downloadUrl: `/download/${branch}` });
    });

    writer.on("error", (err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to save the file" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to download the branch" });
  }
});

// Endpoint to serve the file for download
app.get("/download/:branch", (req, res) => {
  const branch = req.params.branch;
  const filePath = path.join(__dirname, `${branch}.zip`);

  if (fs.existsSync(filePath)) {
    res.download(filePath, `${branch}.zip`, (err) => {
      if (err) {
        console.error(err);
      } else {
        // Delete the file after download
        fs.unlinkSync(filePath);
      }
    });
  } else {
    res.status(404).json({ error: "File not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
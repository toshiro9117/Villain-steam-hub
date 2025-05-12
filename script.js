// Function to check for a branch in the GitHub repository
async function checkBranch() {
  const branch = document.getElementById("branchInput").value.trim();
  const message = document.getElementById("message");
  const loading = document.getElementById("loading");

  if (!branch) {
    message.textContent = "Please enter Appid.";
    return;
  }

  message.textContent = "";
  loading.style.display = "block";

  const apiUrl = `https://api.github.com/repos/toshiro9117/Villain-steam-hub/branches/${branch}`;

  try {
    const response = await fetch(apiUrl);
    loading.style.display = "none";

    if (response.ok) {
      message.textContent = `✅ Appid "${branch}" found. Downloading ZIP...`;
      const zipUrl = `https://github.com/toshiro9117/Villain-steam-hub/archive/refs/heads/${branch}.zip`;
      window.location.href = zipUrl;
    } else {
      message.textContent = `❌ Game "${branch}" does not exist.`;
    }
  } catch (error) {
    console.error(error);
    loading.style.display = "none";
    message.textContent = "⚠️ Error checking the branch. Please try again.";
  }
}

// Disable right-click context menu
document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

// Disable certain key combinations (e.g., F12, Ctrl+Shift+I, etc.)
document.addEventListener("keydown", (event) => {
  if (
    event.key === "F12" || 
    (event.ctrlKey && event.shiftKey && event.key === "I") || 
    (event.ctrlKey && event.shiftKey && event.key === "J") || 
    (event.ctrlKey && event.key === "U")
  ) {
    event.preventDefault();
  }
});

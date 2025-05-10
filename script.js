// Function to search for a branch in the GitHub repository
async function searchBranch() {
    const branchName = document.getElementById('branchInput').value.trim().toLowerCase();
    const messageDiv = document.getElementById('message');

    if (!branchName) {
        messageDiv.textContent = "Please enter a branch name.";
        return;
    }

    // Your GitHub repository details
    const repoOwner = "toshiro9117"; // Replace with your GitHub username or org
    const repoName = "Villain-steam-hub"; // Replace with your repository name

    try {
        // Use a proxy to bypass CORS issues
        const proxyUrl = ""; // Leave empty if no proxy is needed
        const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/branches`;
        const response = await fetch(proxyUrl + apiUrl);

        if (response.ok) {
            const branches = await response.json();
            const branchExists = branches.some(branch => branch.name.toLowerCase() === branchName);

            if (branchExists) {
                // Ask the user if they want to download the branch
                const downloadConfirm = confirm(`The branch "${branchName}" exists. Do you want to download it?`);

                if (downloadConfirm) {
                    // Trigger the download of the files
                    const downloadUrl = `https://github.com/${repoOwner}/${repoName}/archive/refs/heads/${branchName}.zip`;
                    window.location.href = downloadUrl;
                } else {
                    // Clear the input field
                    document.getElementById('branchInput').value = '';
                    messageDiv.textContent = "Branch search cancelled.";
                }
            } else {
                messageDiv.textContent = `"${branchName}" is not available in the database.`;
            }
        } else {
            throw new Error('Error fetching branches from GitHub API');
        }
    } catch (error) {
        if (error.message.includes("Failed to fetch")) {
            messageDiv.textContent = "Network error: Unable to connect to the GitHub API.";
        } else {
            messageDiv.textContent = "An unexpected error occurred. Please try again.";
        }
        console.error(error);
    }
}

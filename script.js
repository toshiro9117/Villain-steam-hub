// Function to search for a branch in the GitHub repository
async function searchBranch() {
    const branchName = document.getElementById('branchInput').value;
    const messageDiv = document.getElementById('message');

    if (!branchName) {
        messageDiv.textContent = "Please enter a branch name.";
        return;
    }

    // Your GitHub repository details
    const repoOwner = "YOUR_GITHUB_USERNAME"; // Replace with your GitHub username or org
    const repoName = "YOUR_REPO_NAME"; // Replace with your repository name

    try {
        // Fetch branches from the GitHub API
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/branches`);
        
        if (response.ok) {
            const branches = await response.json();
            const branchExists = branches.some(branch => branch.name === branchName);

            if (branchExists) {
                // Ask the user if they want to download the branch
                const downloadConfirm = confirm(`The branch "${branchName}" exists. Do you want to download it?`);

                if (downloadConfirm) {
                    // Trigger the download of the files (GitHub API cannot directly download the whole branch, so redirecting)
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
        messageDiv.textContent = "There was an error while searching for the branch.";
        console.error(error);
    }
}

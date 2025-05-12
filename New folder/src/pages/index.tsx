import { useState } from 'react';

const Home = () => {
  const [branch, setBranch] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const checkBranch = async () => {
    if (!branch) {
      setMessage("Please enter a branch name.");
      return;
    }

    setMessage('');
    setLoading(true);

    const apiUrl = `https://api.github.com/repos/toshiro9117/Villain-steam-hub/branches/${branch}`;

    try {
      const response = await fetch(apiUrl);
      setLoading(false);

      if (response.ok) {
        setMessage(`✅ Branch "${branch}" found. Downloading ZIP...`);
        const zipUrl = `https://github.com/toshiro9117/Villain-steam-hub/archive/refs/heads/${branch}.zip`;
        window.location.href = zipUrl;
      } else {
        setMessage(`❌ Branch "${branch}" does not exist.`);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setMessage("⚠️ Error checking the branch. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Villain Branch Downloader</h1>
      <input
        type="text"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
        placeholder="Enter branch name (e.g. 3655300)"
      />
      <button onClick={checkBranch}>Download</button>
      <div id="message">{message}</div>
      {loading && <div className="loading">Checking branch... <div className="spinner"></div></div>}
    </div>
  );
};

export default Home;
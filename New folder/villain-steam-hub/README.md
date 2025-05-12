# Villain Steam Hub

## Overview
The Villain Steam Hub is a web application that allows users to download specific branches of a GitHub repository as ZIP files. Users can enter a branch name, and the application will check if the branch exists in the repository. If it does, the application will initiate the download of the branch.

## Features
- User-friendly interface for downloading branches.
- Input validation to ensure branch names are provided.
- Error handling for non-existent branches and API errors.
- Disables right-click and certain key combinations to enhance security.

## Project Structure
```
villain-steam-hub
├── public
│   ├── bg.jpg
├── src
│   ├── pages
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   └── index.tsx
│   ├── styles
│   │   └── globals.css
├── package.json
├── tsconfig.json
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/toshiro9117/Villain-steam-hub.git
   ```
2. Navigate to the project directory:
   ```
   cd villain-steam-hub
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
1. Start the development server:
   ```
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000`.
3. Enter the branch name (e.g., `3655300`) in the input field and click the "Download" button.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
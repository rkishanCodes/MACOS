

# MacOS 

**Tech Stack**: ReactJS, Tailwind CSS, Redux, Framer Motion, Lenis, NodeJS, Python, Google Generative AI

## Table of Contents
- [Project Description](#project-description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Applications Overview](#applications-overview)
- [Contributing](#contributing)
- [Live Demo](#live-demo)

## Project Description
**MacOS ** is a custom web-based MacOS experience that recreates the look and feel of MacOS, offering users a range of applications, including **Finder**, **Safari**, **About**, **Terminal**, **AI Calculator**, **Gemini App**, and **Bin**. The platform features synchronized operations between Finder and Terminal, and introduces the **first-ever AI-powered calculator** powered by **Google Generative AI**, enabling smart task assistance via the Gemini App.

This project is designed to enhance user interaction by simulating a MacOS-like environment with smooth animations and responsive performance.

## Features
- **MacOS-Inspired Applications**: Includes Finder, Safari, Terminal, AI Calculator, Gemini App, and more.
- **AI-Powered Calculator**: Integrates Google Generative AI to assist users with personalized and intelligent calculations.
- **Seamless Syncing**: Finder and Terminal are fully synchronized for a real-time interaction experience.
- **Smooth Animations**: Powered by Framer Motion and Lenis for fluid animations and transitions.
- **Highly Responsive UI**: Styled with Tailwind CSS to ensure a responsive, clean user interface across devices.

## Tech Stack

### Frontend:
- **ReactJS**: A powerful JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for custom styling.
- **Redux**: State management to handle complex state transitions.
- **Framer Motion**: Animation library for smooth transitions.
- **Lenis**: For custom smooth scrolling and animations.

### Backend:
- **NodeJS**: Handles server-side operations and API requests.
- **Python**: Integration for the AI-powered calculator.
- **Google Generative AI**: Powers the AI-driven features of the Gemini App.

## Installation

### Prerequisites:
- **Node.js** and **npm** installed on your machine.
- **Python** installed if you want to run the AI Calculator locally.

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/rkishanCodes/MACOS.git
   cd MACOS
   ```

2. Install dependencies for both frontend and backend:
   - Frontend:
     ```bash
     cd client
     npm install
     ```

   - Backend:
     ```bash
     cd ../server
     npm install
     ```

   - For the AI Calculator:
     ```bash
     cd ../cal-backend
     ```

3. Set up a Python virtual environment (for the AI Calculator):
   ```bash
   python -m venv venv
   ```

   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

   - Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up **Google Generative AI** and environment variables for AI Calculator:
   - Create a `.env` file in the `backend` directory with your API keys:
     ```bash
     GEMINI_API_KEY=your_google_ai_api_key
     ```

5. Start the backend server:
   ```bash
   cd server
   npm start
   ```
   - For the AI Calculator:
   ```bash
   cd ../cal-backend
   python3 main.py
   ```

6. Start the frontend:
   ```bash
   cd client
   npm run dev
   ```

## Usage
1. **Finder**: Explore and interact with files in the MacOS environment.
2. **Safari**: Browse web pages.
3. **AI Calculator**: Perform advanced calculations with the help of Google Generative AI.
4. **Gemini App**: Utilize the AI-driven Gemini App for smart task assistance and recommendations.
5. **Terminal**: Experience a terminal synced with Finder for real-time file operations.

## Applications Overview

### 1. **Finder**
   - A file explorer that mimics the MacOS Finder.
   - Browse, open, and manage files within the environment.

### 2. **Safari**
   - Basic functionality for web browsing.

### 3. **AI Calculator**
   - Powered by Google Generative AI for enhanced calculations.
   - Personalized assistance for complex mathematical operations.

### 4. **Gemini App**
   - AI-driven app providing prompt-based information.

### 5. **Terminal**
   - Command-line interface integrated into the platform.
   - Synced with Finder to allow file management through commands.

## Contributing
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Added feature X"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

## Live Demo
Check out the live version of the project here: [MacOS - Website](https://macosai.vercel.app)


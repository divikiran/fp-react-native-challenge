# Activity Logger - Coding Challenge

## Overview

Build a single-screen app to log fitness activities. Users should be able to add an activity and see a list of their previously logged activities. The data should persist between app launches. This challenge is designed to be completed within **2 hours** and focuses on state management, form handling, and local data persistence.

**Important:** The goal is not necessarily to finish every feature. We are most interested in seeing your approach to problem-solving, your coding style, and the architectural decisions you make. A well-structured, partially complete solution is better than a rushed, fully complete one.

## Provided Assets

- A basic Expo TypeScript boilerplate project (in the `app/` folder)

## Core Requirements (MVP for 2 hours)

### 1. UI Components

- A form with input fields for:
  - **Activity Name**
  - **Duration (minutes)** (numeric input)
  - **Notes** (optional text field)
- A **"Log Activity"** button
- A list displaying all previously logged activities, showing the name and duration

### 2. Functionality

- When the user fills out the form and taps the button, the new activity is added to the list
- The list of activities must be **saved to the device's local storage**
- When the app is closed and reopened, the previously logged activities should still be visible
- Include **basic form validation** (Activity Name and Duration are required)

### 3. Technical Requirements

- The project must be written in **TypeScript**
- Choose and implement a state management solution. Be prepared to discuss why you chose it
- Implement local data persistence (choose an appropriate solution for React Native)

## Stretch Goals (If you have extra time)

- Allow the user to **delete** a logged activity
- **Group activities by date** in the list
- Add unit tests for the data persistence logic
- Calculate and display the **"Total Time Spent"** for all activities
- Add timestamps to activities and display them in a readable format

## Getting Started

1. Navigate to the `app/` folder:
   ```bash
   cd app
   ```

2. Install dependencies (already done, but you can run again if needed):
   ```bash
   npm install
   ```

3. You may need to install additional packages for data persistence (choose what you need)

4. Run on your preferred platform:
   ```bash
   npm run ios      # for iOS
   npm run android  # for Android
   npm run web      # for Web
   ```

## Submission

When you're ready to submit:

1. Ensure your code is well-structured and includes comments where helpful
2. Be prepared to discuss your architectural decisions and trade-offs
3. Submit your solution by either:
   - Sharing a link to a public GitHub repository, or
   - Zipping up the challenge folder and emailing it back to us

Good luck! We look forward to seeing what you build.

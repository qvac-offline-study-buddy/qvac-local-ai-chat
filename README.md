# QVAC Study Buddy

A local AI study assistant built with the QVAC SDK. It lets students ask questions and get answers using local AI inference.

## Features

- Study-focused local AI assistant
- Ask questions and get answers on your phone
- Optional study materials for additional context
- Local model inference with QVAC
- Simple QVAC Study Buddy interface

## Requirements

- Node.js
- npm
- QVAC SDK 0.20.0

## Installation

Clone the repository:

```bash
git clone https://github.com/qvac-offline-study-buddy/qvac-local-ai-chat.git
cd qvac-local-ai-chat
```
## Run
Install the dependencies:

```bash
npm install
```
Start the application:

```bash
npm start
```
Then open the local URL provided by the application.


## QVAC Usage

QVAC Study Buddy uses the QVAC SDK to load a local AI model with `loadModel()` and generate answers with `completion()`. The app builds a study-focused prompt from the student's question and optional study materials.


## Project

QVAC Study Buddy is a local AI study assistant for students. It uses the QVAC SDK to load a local AI model and generate study-focused answers from questions and optional study materials.


# Tiny Wins 🎯

**Tiny Wins** is a voice-first habit tracker that helps users log small daily accomplishments with minimal effort.

The app is designed for moments when users feel tired, overwhelmed, or low on motivation but still want to recognize progress, build consistency, and maintain momentum.

### 🚀 Live Demo

https://tiny-wins-beta.vercel.app/

---

## 📖 Overview

Most habit and productivity tools require users to:

* Open an app
* Type detailed entries
* Select categories
* Fill multiple fields

Tiny Wins removes that friction by allowing users to log a win naturally through voice or quick text input.

The MVP focuses on a simple but powerful feedback loop:

1. Log a small win
2. Detect difficulty automatically
3. Award XP
4. Track daily consistency

---

## ✨ Features

### Voice-First Win Logging

* Log accomplishments using the browser's Speech Recognition API.
* Designed for quick, low-effort interactions.

### Text Input Fallback

* Supports manual text entry when voice recognition is unavailable.
* Ensures accessibility across browsers and devices.

### Automatic Difficulty Detection

Tiny Wins analyzes the user's input and assigns a difficulty level.

Supported difficulty keywords:

| Difficulty | Keywords                            |
| ---------- | ----------------------------------- |
| Easy       | easy, simple, quick                 |
| Medium     | medium, normal, moderate            |
| Hard       | hard, difficult, tough, challenging |

If no difficulty is detected, the win defaults to **Medium**.

---

## 🏆 XP System

Users earn XP based on the difficulty of the win:

| Difficulty | XP Awarded |
| ---------- | ---------- |
| Easy       | 10 XP      |
| Medium     | 25 XP      |
| Hard       | 50 XP      |

Examples:

```text
I drank water, easy
I read for 20 minutes, medium
I worked out, difficult
I cleaned my desk
```

---

## 📊 Progress Tracking

* Today's wins list
* Daily XP tracking
* Daily streak tracking
* Persistence using browser localStorage
* Mobile-friendly responsive interface

---

## 🛠 Tech Stack

### Frontend

* React
* TypeScript
* Vite
* CSS

### Browser APIs

* Speech Recognition API
* localStorage

### Deployment & Version Control

* GitHub
* Vercel

---

## 💡 Product Decisions

### Why Voice-First?

Tiny Wins is built around the idea that logging progress should require as little effort as possible. Voice input reduces friction and encourages users to capture achievements immediately.

### Why Include Text Fallback?

Speech recognition support varies by browser and device. A text fallback ensures users can continue logging wins without interruption.

### Why localStorage for the MVP?

The MVP prioritizes instant usability. Users can start tracking wins immediately without creating an account or signing in.

Future versions can introduce authentication and cloud synchronization for cross-device access.

---

## ✅ Manual Testing

The application has been manually tested for:

* Logging an Easy win
* Logging a Medium win
* Logging a Hard win
* Recognizing difficulty synonyms (e.g., "difficult")
* Defaulting to Medium when no difficulty is specified
* Correct XP calculation
* Showing only today's wins
* Persisting data after page refresh
* Daily streak calculation
* Handling voice recognition failures gracefully

---

## ⚠️ Known Limitations

* Voice recognition depends on browser support and works best in Chromium-based browsers.
* Some environments may return Speech Recognition network errors.
* Data is currently stored locally in the browser.
* No account system yet.
* No edit or delete functionality.
* No historical analytics beyond current streak tracking.

---

## 🗺 Roadmap

### Phase 1: Core Improvements

* Improve voice recognition reliability
* Add edit and delete functionality
* Support backdated win logging

### Phase 2: Progress & Motivation

* Weekly and monthly progress views
* Achievement badges and levels
* Smart reminders
* Milestone celebrations

### Phase 3: AI Enhancements

* AI-powered progress insights
* Pattern detection and recommendations
* Personalized coaching suggestions
* Agentic assistant for daily guidance and performance summaries

### Phase 4: Expanded Input Methods

* Image-based win capture using OCR
* Scan handwritten notes, journals, and task lists

### Phase 5: Platform Growth

* User accounts
* Cloud database synchronization
* Progressive Web App (PWA)
* Automated testing suite

---

## 🎯 Vision

Tiny Wins aims to make progress visible, even on difficult days.

By lowering the effort required to track accomplishments, users can build confidence, maintain momentum, and develop sustainable habits one small win at a time.

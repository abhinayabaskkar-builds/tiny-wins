import { useEffect, useState } from 'react'
import './App.css'

type BrowserSpeechResultEvent = {
  results: {
    [resultIndex: number]: {
      [alternativeIndex: number]: {
        transcript: string
      }
    }
  }
}

type BrowserSpeechErrorEvent = {
  error: string
}

type BrowserSpeechRecognition = {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  start: () => void
  onresult: ((event: BrowserSpeechResultEvent) => void) | null
  onerror: ((event: BrowserSpeechErrorEvent) => void) | null
  onend: (() => void) | null
}

type BrowserSpeechRecognitionConstructor = new () => BrowserSpeechRecognition

declare global {
  interface Window {
    SpeechRecognition?: BrowserSpeechRecognitionConstructor
    webkitSpeechRecognition?: BrowserSpeechRecognitionConstructor
  }
}

type Difficulty = 'Easy' | 'Medium' | 'Hard'

type Win = {
  id: number
  title: string
  difficulty: Difficulty
  xp: number
  createdDate: string
}

const difficultyXp: Record<Difficulty, number> = {
  Easy: 10,
  Medium: 25,
  Hard: 50,
}

const winsStorageKey = 'tiny-wins-list'

function getDateKey(date: Date) {
  return date.toISOString().split('T')[0]
}

function getTodayDate() {
  return getDateKey(new Date())
}

function getPreviousDate(dateKey: string) {
  const date = new Date(`${dateKey}T00:00:00`)
  date.setDate(date.getDate() - 1)

  return getDateKey(date)
}

function calculateStreak(wins: Win[]) {
  const winDates = new Set(wins.map((win) => win.createdDate))

  let streak = 0
  let dateToCheck = getTodayDate()

  while (winDates.has(dateToCheck)) {
    streak += 1
    dateToCheck = getPreviousDate(dateToCheck)
  }

  return streak
}

function parseWinFromSpeech(spokenText: string): Omit<Win, 'id' | 'createdDate'> {
  const difficultyKeywords: Record<Difficulty, string[]> = {
    Easy: ['easy', 'simple', 'quick'],
    Medium: ['medium', 'normal', 'moderate'],
    Hard: ['hard', 'difficult', 'tough', 'challenging'],
  }

  let difficulty: Difficulty = 'Medium'
  let matchedKeyword = ''

  for (const [level, keywords] of Object.entries(difficultyKeywords) as [
    Difficulty,
    string[],
  ][]) {
    const foundKeyword = keywords.find((keyword) =>
      new RegExp(`\\b${keyword}\\b`, 'i').test(spokenText),
    )

    if (foundKeyword) {
      difficulty = level
      matchedKeyword = foundKeyword
      break
    }
  }

  const title = matchedKeyword
    ? spokenText
        .replace(new RegExp(`\\b${matchedKeyword}\\b`, 'i'), '')
        .replace(/[,.!?]+$/g, '')
        .trim()
    : spokenText.trim()

  return {
    title: title || spokenText,
    difficulty,
    xp: difficultyXp[difficulty],
  }
}

function loadWinsFromStorage(): Win[] {
  const savedWins = localStorage.getItem(winsStorageKey)

  if (!savedWins) {
    return []
  }

  try {
    return JSON.parse(savedWins) as Win[]
  } catch {
    return []
  }
}

function App() {
  const [wins, setWins] = useState<Win[]>(loadWinsFromStorage)
  const [isListening, setIsListening] = useState(false)
  const [spokenText, setSpokenText] = useState('')
  const [voiceMessage, setVoiceMessage] = useState('Ready to listen')
  const [fallbackText, setFallbackText] = useState('')

  const today = getTodayDate()
  const todaysWins = wins.filter((win) => win.createdDate === today)
  const xpToday = todaysWins.reduce((total, win) => total + win.xp, 0)
  const streak = calculateStreak(wins)

  useEffect(() => {
    localStorage.setItem(winsStorageKey, JSON.stringify(wins))
  }, [wins])

  function addWinFromText(text: string) {
    const trimmedText = text.trim()

    if (!trimmedText) {
      setVoiceMessage('Please say or type a win first.')
      return
    }

    const parsedWin = parseWinFromSpeech(trimmedText)

    const newWin: Win = {
      id: Date.now(),
      createdDate: getTodayDate(),
      ...parsedWin,
    }

    setWins((currentWins) => [newWin, ...currentWins])
    setSpokenText(trimmedText)
    setFallbackText('')
    setVoiceMessage(`Saved as ${parsedWin.difficulty}`)
  }

  function startVoiceLog() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      setVoiceMessage('Voice input is not supported in this browser.')
      return
    }

    const recognition = new SpeechRecognition()

    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    setIsListening(true)
    setVoiceMessage('Listening... say your win')

    recognition.start()

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      addWinFromText(transcript)
      setIsListening(false)
    }

    recognition.onerror = (event) => {
      if (event.error === 'network') {
        setVoiceMessage('Voice service is having trouble here. Try again or use text fallback.')
      } else {
        setVoiceMessage(`Voice error: ${event.error}`)
      }

      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }
  }

  function submitFallbackWin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addWinFromText(fallbackText)
  }

  return (
    <main className="app-shell">
      <header className="top-bar" aria-label="App header">
        <button className="icon-button" type="button" aria-label="Open menu">
          ☰
        </button>
        <h1>Tiny Wins</h1>
        <div className="avatar" aria-label="User initial">
          A
        </div>
      </header>

      <section className="voice-section" aria-label="Voice logging">
        <button
          className={`voice-button ${isListening ? 'listening' : ''}`}
          type="button"
          aria-label="Start voice log"
          onClick={startVoiceLog}
        >
          <span className="microphone-icon">🎙</span>
        </button>

        <p className="voice-instruction">{voiceMessage}</p>

        {spokenText && (
          <p className="spoken-preview">
            Heard: <strong>{spokenText}</strong>
          </p>
        )}

        <div className="example-chips" aria-label="Example voice commands">
          <span>“I drank water, easy”</span>
          <span>“I exercised, hard”</span>
          <span>“I cooked today, medium”</span>
        </div>

        <form className="fallback-form" onSubmit={submitFallbackWin}>
          <label htmlFor="fallback-win">Text fallback</label>
          <div>
            <input
              id="fallback-win"
              type="text"
              value={fallbackText}
              onChange={(event) => setFallbackText(event.target.value)}
              placeholder="I studied for 30 minutes, medium"
            />
            <button type="submit">Log win</button>
          </div>
        </form>
      </section>

      <section className="summary-card" aria-label="Daily progress summary">
        <div>
          <p className="summary-label">XP Today</p>
          <strong>{xpToday}</strong>
        </div>

        <div className="summary-divider" />

        <div>
          <p className="summary-label">Streak</p>
          <strong>
            {streak} <span>{streak === 1 ? 'day' : 'days'}</span>
          </strong>
        </div>
      </section>

      <section className="wins-section" aria-label="Today's wins">
        <h2>Today</h2>

        {todaysWins.length === 0 ? (
          <p className="empty-state">No wins logged yet.</p>
        ) : (
          <div className="wins-list">
            {todaysWins.map((win) => (
              <article className="win-card" key={win.id}>
                <div className="win-icon" aria-hidden="true">
                  ✦
                </div>

                <div>
                  <h3>{win.title}</h3>
                  <p>{win.difficulty}</p>
                </div>

                <strong>+{win.xp} XP</strong>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default App
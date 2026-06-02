import './App.css'

const sampleWins = [
  { id: 1, title: 'Drank water', difficulty: 'Easy', xp: 10 },
  { id: 2, title: 'Exercised', difficulty: 'Hard', xp: 50 },
  { id: 3, title: 'Cooked at home', difficulty: 'Medium', xp: 25 },
]

function App() {
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
        <button className="voice-button" type="button" aria-label="Start voice log">
          <span className="microphone-icon">🎙</span>
        </button>

        <p className="voice-instruction">Tap and say your win</p>

        <div className="example-chips" aria-label="Example voice commands">
          <span>“I drank water, easy”</span>
          <span>“I exercised, hard”</span>
          <span>“I cooked today, medium”</span>
        </div>
      </section>

      <section className="summary-card" aria-label="Daily progress summary">
        <div>
          <p className="summary-label">XP Today</p>
          <strong>85</strong>
        </div>

        <div className="summary-divider" />

        <div>
          <p className="summary-label">Streak</p>
          <strong>
            4 <span>days</span>
          </strong>
        </div>
      </section>

      <section className="wins-section" aria-label="Today's wins">
        <h2>Today</h2>

        <div className="wins-list">
          {sampleWins.map((win) => (
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
      </section>
    </main>
  )
}

export default App
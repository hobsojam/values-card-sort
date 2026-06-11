const STEPS = [
  { n: 1, label: 'Sort',    desc: 'Into three columns by importance' },
  { n: 2, label: 'Narrow',  desc: 'Choose the five that matter most' },
  { n: 3, label: 'Reflect', desc: 'Review and keep your core values' },
];

export default function WelcomePhase({ onStart, count = 51 }) {
  return (
    <div className="phase phase--welcome">
      <div className="welcome">
        <svg className="welcome__mark" viewBox="0 0 48 48" width="58" height="58" aria-hidden="true">
          <rect x="9" y="13" width="25" height="31" rx="3" fill="#ece4d4" stroke="#cdbf9f" transform="rotate(-9 21 28)" />
          <rect x="14" y="11" width="25" height="31" rx="3" fill="#ffffff" stroke="#d8c9ad" transform="rotate(7 26 26)" />
          <rect x="11" y="8" width="25" height="31" rx="3" fill="#3e6230" />
          <path d="M17.5 24.5 l4 4 l7 -8" fill="none" stroke="#d9e5cb" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <h1 className="welcome__title">Values Card Sort</h1>
        <p className="welcome__sub">
          Sort {count} value cards by what matters to you, narrow them to a focused few,
          and reflect on the core values that guide how you live and work.
        </p>

        <ol className="welcome__steps">
          {STEPS.map((s, i) => (
            <li key={s.n} className="step">
              {i > 0 && <span className="step__connector" aria-hidden="true" />}
              <span className={`step__num${s.n === 1 ? ' step__num--active' : ''}`}>{s.n}</span>
              <span className="step__label">{s.label}</span>
              <span className="step__desc">{s.desc}</span>
            </li>
          ))}
        </ol>

        <button className="btn btn--primary btn--lg" onClick={onStart}>Begin the sort</button>

        <p className="welcome__meta">About 10 minutes &middot; {count} values &middot; Nothing saved online</p>
      </div>
    </div>
  );
}

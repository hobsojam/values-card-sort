import { useState } from 'react';
import PropTypes from 'prop-types';

const MAX = 5;

function NarrowPhase({ cards, onComplete }) {
  const [selected, setSelected] = useState([]);

  function toggle(id) {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < MAX ? [...prev, id] : prev
    );
  }

  const remaining = MAX - selected.length;

  return (
    <div className="phase phase--narrow">
      <header className="phase__header">
        <div className="phase__header-text">
          <h1>Choose Your Top 5</h1>
          <p className="phase__subtitle">
            You marked {cards.length} values as Very Important. Select the 5 that matter most.
          </p>
        </div>
        <span className="narrow__tally">
          {selected.length} / {MAX} selected
        </span>
      </header>

      <div className="narrow-grid">
        {cards.map(v => {
          const isSelected = selected.includes(v.id);
          const isDisabled = !isSelected && selected.length >= MAX;
          return (
            <button
              key={v.id}
              className={`card card--pick${isSelected ? ' card--picked' : ''}${isDisabled ? ' card--dim' : ''}`}
              onClick={() => toggle(v.id)}
            >
              {isSelected && <span className="card__check" aria-hidden="true">✓</span>}
              <span className="card__name">{v.name}</span>
              <span className="card__desc">{v.description}</span>
            </button>
          );
        })}
      </div>

      <footer className="phase__footer">
        <button
          className="btn btn--primary"
          disabled={selected.length !== MAX}
          onClick={() => onComplete(selected)}
        >
          {selected.length === MAX ? 'Continue →' : `Pick ${remaining} more`}
        </button>
      </footer>
    </div>
  );
}

NarrowPhase.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default NarrowPhase;

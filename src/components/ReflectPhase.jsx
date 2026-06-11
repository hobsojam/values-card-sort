import PropTypes from 'prop-types';

function ReflectPhase({ topValues, onRestart }) {
  return (
    <div className="phase phase--reflect">
      <header className="phase__header">
        <div className="phase__header-text">
          <h1>Your Core Values</h1>
          <p className="phase__subtitle">These are the values that matter most to you right now.</p>
        </div>
      </header>

      <div className="reflect-grid">
        {topValues.map((value, i) => (
          <div key={value.id} className="reflect-card">
            <span className="reflect-card__rank">{i + 1}</span>
            <span className="reflect-card__name">{value.name}</span>
            <span className="reflect-card__desc">{value.description}</span>
          </div>
        ))}
      </div>

      <footer className="phase__footer">
        <button className="btn btn--ghost" onClick={onRestart}>Start over</button>
        <button className="btn btn--primary" onClick={() => window.print()}>Print results</button>
      </footer>
    </div>
  );
}

ReflectPhase.propTypes = {
  topValues: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
  onRestart: PropTypes.func.isRequired,
};

export default ReflectPhase;

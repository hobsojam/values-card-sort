import { useState } from 'react';
import { values } from './data/values.js';
import WelcomePhase from './components/WelcomePhase.jsx';
import SortPhase from './components/SortPhase.jsx';
import NarrowPhase from './components/NarrowPhase.jsx';
import ReflectPhase from './components/ReflectPhase.jsx';

export default function App() {
  const [phase, setPhase] = useState('welcome');
  const [assignments, setAssignments] = useState(() =>
    Object.fromEntries(values.map(v => [v.id, 'unsorted']))
  );
  const [topValues, setTopValues] = useState([]);

  function handleAssign(cardId, columnId) {
    setAssignments(prev => ({ ...prev, [cardId]: columnId }));
  }

  function handleSortComplete() {
    const veryImportant = values.filter(v => assignments[v.id] === 'very-important');
    if (veryImportant.length <= 5) {
      setTopValues(veryImportant.map(v => v.id));
      setPhase('reflect');
    } else {
      setPhase('narrow');
    }
  }

  function handleNarrowComplete(selectedIds) {
    setTopValues(selectedIds);
    setPhase('reflect');
  }

  function handleRestart() {
    setAssignments(Object.fromEntries(values.map(v => [v.id, 'unsorted'])));
    setTopValues([]);
    setPhase('welcome');
  }

  const veryImportantCards = values.filter(v => assignments[v.id] === 'very-important');

  if (phase === 'welcome') {
    return <WelcomePhase onStart={() => setPhase('sort')} count={values.length} />;
  }
  if (phase === 'sort') {
    return <SortPhase values={values} assignments={assignments} onAssign={handleAssign} onComplete={handleSortComplete} />;
  }
  if (phase === 'narrow') {
    return <NarrowPhase cards={veryImportantCards} onComplete={handleNarrowComplete} />;
  }
  return <ReflectPhase topValues={topValues.map(id => values.find(v => v.id === id))} onRestart={handleRestart} />;
}

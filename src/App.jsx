import { useState } from 'react';
import { values } from './data/values.js';
import SortPhase from './components/SortPhase.jsx';
import NarrowPhase from './components/NarrowPhase.jsx';
import ReflectPhase from './components/ReflectPhase.jsx';

export default function App() {
  const [phase, setPhase] = useState('sort');
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
    setPhase('sort');
  }

  const veryImportantCards = values.filter(v => assignments[v.id] === 'very-important');

  if (phase === 'sort') {
    return <SortPhase values={values} assignments={assignments} onAssign={handleAssign} onComplete={handleSortComplete} />;
  }
  if (phase === 'narrow') {
    return <NarrowPhase cards={veryImportantCards} onComplete={handleNarrowComplete} />;
  }
  return <ReflectPhase topValues={topValues.map(id => values.find(v => v.id === id))} onRestart={handleRestart} />;
}

import { useState } from 'react';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const COLUMNS = [
  { id: 'not-important',  label: 'Not Important',  color: '#998269', text: '#5a4a39' },
  { id: 'important',      label: 'Important',       color: '#8db176', text: '#3e6230' },
  { id: 'very-important', label: 'Very Important',  color: '#3e6230', text: '#2f4a26' },
];

function Card({ value, small, faded }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: value.id });

  return (
    <div
      ref={setNodeRef}
      className={`card${small ? ' card--small' : ''}${isDragging ? ' card--ghost' : ''}${faded ? ' card--faded' : ''}`}
      {...listeners}
      {...attributes}
    >
      <span className="card__name">{value.name}</span>
      <span className="card__desc">{value.description}</span>
    </div>
  );
}

function CategoryColumn({ col, cards, assignments }) {
  const { setNodeRef, isOver } = useDroppable({ id: col.id });
  const colCards = cards.filter(v => assignments[v.id] === col.id);

  return (
    <div
      ref={setNodeRef}
      className={`column${isOver ? ' column--over' : ''}`}
      style={{ '--col-color': col.color, '--col-text': col.text }}
    >
      <div className="column__header">
        <span className="column__label">{col.label}</span>
        <span className="column__count">{colCards.length}</span>
      </div>
      <div className="column__cards">
        {colCards.map(v => <Card key={v.id} value={v} small />)}
      </div>
    </div>
  );
}

function UnsortedPool({ cards, assignments }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'unsorted' });
  const unsorted = cards.filter(v => assignments[v.id] === 'unsorted');

  return (
    <div className="pool">
      <div className="pool__header">
        Unsorted <span className="pool__count">{unsorted.length}</span>
      </div>
      <div ref={setNodeRef} className={`pool__cards${isOver ? ' pool__cards--over' : ''}`}>
        {unsorted.map(v => <Card key={v.id} value={v} />)}
      </div>
    </div>
  );
}

export default function SortPhase({ values, assignments, onAssign, onComplete }) {
  const [activeValue, setActiveValue] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const sortedCount = values.filter(v => assignments[v.id] !== 'unsorted').length;
  const allSorted = sortedCount === values.length;

  function handleDragStart({ active }) {
    setActiveValue(values.find(v => v.id === active.id));
  }

  function handleDragEnd({ active, over }) {
    setActiveValue(null);
    if (over && over.id !== assignments[active.id]) {
      onAssign(active.id, over.id);
    }
  }

  return (
    <div className="phase phase--sort">
      <header className="phase__header">
        <div className="phase__header-text">
          <h1>Values Card Sort</h1>
          <p className="phase__subtitle">Drag each card into the column that best fits how important this value is to you.</p>
        </div>
        <div className="progress-wrap">
          <div className="progress">
            <div className="progress__bar" style={{ width: `${(sortedCount / values.length) * 100}%` }} />
          </div>
          <span className="progress__label">{sortedCount} of {values.length} sorted</span>
        </div>
      </header>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="sort-body">
          <UnsortedPool cards={values} assignments={assignments} />
          <div className="columns">
            {COLUMNS.map(col => (
              <CategoryColumn key={col.id} col={col} cards={values} assignments={assignments} />
            ))}
          </div>
        </div>

        <DragOverlay dropAnimation={null}>
          {activeValue && (
            <div className="card card--overlay">
              <span className="card__name">{activeValue.name}</span>
              <span className="card__desc">{activeValue.description}</span>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <footer className="phase__footer">
        <button className="btn btn--primary" disabled={!allSorted} onClick={onComplete}>
          {allSorted ? 'Continue →' : `${values.length - sortedCount} cards left to sort`}
        </button>
      </footer>
    </div>
  );
}

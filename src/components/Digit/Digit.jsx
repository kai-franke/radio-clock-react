// src/components/Digit/Digit.jsx
import React, { useEffect, useState, useRef } from 'react';
import './Digit.css';

const Digit = ({ value }) => {
  const [current, setCurrent] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const [noTransition, setNoTransition] = useState(false);
  const flipCardRef = useRef(null);

  useEffect(() => {
    if (value !== current) {
      // Stelle sicher, dass .no-transition deaktiviert ist, bevor der Flip startet
      setNoTransition(false);
      // Starte den Flip-Effekt
      setFlipping(true);
      const flipCard = flipCardRef.current;

      const handleTransitionEnd = () => {
        // Sobald die Transition endet:
        // - Deaktiviere den Flip-Effekt und aktualisiere den aktuellen Wert
        setNoTransition(true);
        setFlipping(false);
        setCurrent(value);
        flipCard.removeEventListener('transitionend', handleTransitionEnd);
        // Kurze Verzögerung, damit noTransition nur temporär aktiv ist
        setTimeout(() => {
          setNoTransition(false);
        }, 50);
      };

      flipCard.addEventListener('transitionend', handleTransitionEnd);
    }
  }, [value, current]);

  return (
    <article className="flip-clock__digit">
      {/* Hintergrundkarte – hier soll in der oberen Hälfte bereits der neue Wert erscheinen */}
      <div className="flip-clock__card flip-clock__card--background">
        <div className="flip-clock__half flip-clock__half--upper flip-clock__half--shadowed">
          <div className="flip-clock__digit-value flip-clock__digit-value--upper flip-clock__digit-value--background">
            {value}
          </div>
        </div>
        <div className="flip-clock__half flip-clock__half--lower flip-clock__half--shadowed">
          <div className="flip-clock__digit-value flip-clock__digit-value--lower flip-clock__digit-value--background">
            {current}
          </div>
        </div>
      </div>

      {/* Vordergrundkarte – hier zeigt der obere Bereich noch den alten Wert, der untere schon den neuen */}
      <div
        className={`flip-clock__card flip-clock__card--foreground ${flipping ? 'flip' : ''} ${noTransition ? 'no-transition' : ''}`}
        ref={flipCardRef}
      >
        <div className="flip-clock__half flip-clock__half--upper">
          <div className="flip-clock__digit-value flip-clock__digit-value--upper flip-clock__digit-value--foreground">
            {current}
          </div>
        </div>
        <div className="flip-clock__half flip-clock__half--lower">
          <div className="flip-clock__digit-value flip-clock__digit-value--lower flip-clock__digit-value--foreground">
            {value}
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </article>
  );
};

export default Digit;

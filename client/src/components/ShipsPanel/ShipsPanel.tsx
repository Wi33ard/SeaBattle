import { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import Ship from '../Ship/Ship';
import './styles/ShipsPanel.css';

type TDeckCount = '1' | '2' | '3' | '4';
const shipsSet: Record<TDeckCount, number> = {
  4: 1,
  3: 2,
  2: 3,
  1: 4,
};

const ShipsPanel = () => {
  const [isPanelShown, setPanelShown] = useState(true);

const left = isPanelShown ? '0' : '-300px';
const toggleButtonText = isPanelShown ? '<<' : '>>';

  const handleTogglePanel = useCallback(() => {
    setPanelShown((prev) => !prev);
  }, []);

  const shipsPanelComponent = (
    <div className='shipsPanelContainer' style={{ left }}>
      <div className="shipsPanel">
        {Object.keys(shipsSet).map((deckCount) => {
          return (
            <div className='shipSlot'>
              <Ship deckCount={Number(deckCount)} />
              <span className='counter'>x{shipsSet[deckCount as TDeckCount]}</span>
            </div>
          )
        })}
      </div>
      <button
        className='toggleButton'
        onClick={handleTogglePanel}
      >
        {toggleButtonText}
      </button>
    </div>
  );

  return createPortal(shipsPanelComponent, document.body);
}

export default ShipsPanel;
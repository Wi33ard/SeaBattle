import { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import Ship from '../Ship/Ship';
import './styles/ShipsPanel.css';
import { useAppSelector } from '../../utils/hooks/reduxHooks';

type TDeckCount = '1' | '2' | '3' | '4';
// const shipsSet: Record<TDeckCount, number> = {
//   4: 1,
//   3: 2,
//   2: 3,
//   1: 4,
// };

const ShipsPanel = () => {
  const [isPanelShown, setPanelShown] = useState(false);
  const left = isPanelShown ? '0' : '-300px';
  const toggleButtonText = isPanelShown ? '<<' : '>>';
  const ships = useAppSelector((state) => state.pier.ships)

  const handleTogglePanel = useCallback(() => {
    setPanelShown((prev) => !prev);
  }, []);

  const shipsPanelComponent = (
    <div className='shipsPanelContainer' style={{ left }}>
      <div className="shipsPanel">
        {Object.keys(ships).map((deckCount, index) => {
          const count = ships[deckCount as TDeckCount];

          return (
            <div className='shipSlot' key={index}>
              <Ship deckCount={Number(deckCount)} disabled={count <= 0} />
              <span className='counter'>x{count}</span>
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
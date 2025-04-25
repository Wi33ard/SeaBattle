import { useDraggable } from "@dnd-kit/core";
import { Orientation } from "../../types";
import "./styles/Ship.css";

interface ShipProps {
  deckCount: number;
  orientation?: Orientation;
  disabled: boolean;
}

const Ship = ({ deckCount, disabled }: ShipProps) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: deckCount,
    disabled,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(1.3)`,
  } : undefined;
  
  return (
    <div
      ref={setNodeRef}
      className="ship"
      style={style}
      {...listeners}
      {...attributes}
    >
      {Array.from({ length: deckCount}).map((_, index) => (
          <div
            key={index}
            className="shipDeck"
            style={disabled ? {opacity: 0} : undefined}
          />
      ))}
    </div>
  )
}

export default Ship;
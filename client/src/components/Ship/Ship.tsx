import { useDraggable } from "@dnd-kit/core";
import { Orientation } from "../../types";
import "./styles/Ship.css";

interface ShipProps {
  deckCount: number;
  orientation?: Orientation;
}

const Ship = ({ deckCount }: ShipProps) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: deckCount,
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
          <div className="shipDeck" key={index}></div>
      ))}
    </div>
  )
}

export default Ship;
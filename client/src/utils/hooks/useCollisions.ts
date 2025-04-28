import { Collision, useDndMonitor } from '@dnd-kit/core';
import { useState } from 'react';

export const useCollisions = () => {
  const [collisions, setCollisions] = useState<Collision[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useDndMonitor({
    onDragStart: () => {
      setIsDragging(true);
    },
    onDragEnd: () => {
      setIsDragging(false);
      setCollisions([]);
    },
    onDragMove: (event) => {
      if (event.collisions) {
        setCollisions(event.collisions);
      }
    }
  });

  return { collisions, isDragging };
}; 
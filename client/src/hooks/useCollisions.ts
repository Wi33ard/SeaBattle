import { useDndMonitor } from '@dnd-kit/core';
import { useState, useEffect } from 'react';

export const useCollisions = () => {
  const [collisions, setCollisions] = useState<any[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useDndMonitor({
    onDragStart: () => {
      setIsDragging(true);
    },
    onDragEnd: () => {
      setIsDragging(false);
      setCollisions([]);
    },
    onDragOver: (event) => {
      if (event.collisions) {
        setCollisions(event.collisions);
      }
    }
  });

  return { collisions, isDragging };
}; 
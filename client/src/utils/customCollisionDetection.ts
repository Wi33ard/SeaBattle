import { Collision, CollisionDetection } from '@dnd-kit/core';
import { useAppDispatch } from './hooks/reduxHooks';
import { addTime } from '../store/performanceSlice';

// Custom collision detection function based on overlap percentage
export const useOverlapCollisionDetection: CollisionDetection = ({
  active,
  collisionRect,
  droppableContainers,
}) => {
  const dispatch = useAppDispatch();
  const startTime = performance.now();
  let countCalculations = 0;

  // If no active item or collision rectangle, return empty array
  if (!active || !collisionRect) return [];

  // Get data about the dragged item
  const activeRect = active.rect.current.translated;

  if (!activeRect) {
    return [] as Collision[];
  }

  const dummyCollision = { id: 'id'};
  
  // Filter and map droppable containers to find collisions
  const collisions: Collision[] = droppableContainers
    .filter(container => {
      const containerRect = container.rect.current;

      if (!containerRect) return false;

      return activeRect.right >= containerRect.left
        && activeRect.left <= containerRect.right
        && activeRect.top <= containerRect.bottom
        && activeRect.bottom >= containerRect.top;
    })
    .map(container => {
      countCalculations++;
      const containerRect = container.rect.current;
      
      if (!containerRect) return dummyCollision;
      
      // Custom collision detection logic
      // Calculate overlap between rectangles
      const overlapX = Math.max(
        0,
        Math.min(activeRect.right, containerRect.right) - 
        Math.max(activeRect.left, containerRect.left)
      );
      
      const overlapY = Math.max(
        0,
        Math.min(activeRect.bottom, containerRect.bottom) - 
        Math.max(activeRect.top, containerRect.top)
      );
      
      const overlapArea = overlapX * overlapY;
      const activeArea = activeRect.width * activeRect.height * 1.3 / Number(active.id);
      const overlapPercentage = overlapArea / activeArea;
      
      const OVERLAP_THRESHOLD = 0.35;
      
      if (overlapPercentage > OVERLAP_THRESHOLD) {
        return {
          id: container.id,
          data: {
            droppableContainer: container,
            value: overlapPercentage,
          }
        };
      }
      
      return dummyCollision;
    }).filter(collision => collision.id !== dummyCollision.id);
    
    const endTime = performance.now();
    const timeDiff = endTime - startTime; //in ms 
    const milliseconds = timeDiff;
    dispatch(addTime(milliseconds));

    return collisions;
};


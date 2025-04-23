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

  // If no active item or collision rectangle, return empty array
  if (!active || !collisionRect) return [];

  // Get data about the dragged item
  const activeRect = active.rect.current.translated;

  if (!activeRect) {
    return [] as Collision[];
  }

  // console.log('active: ', active);
  // console.log('collisionRect: ', collisionRect);
  // console.log('droppableContainers: ', droppableContainers);
  // return [] as Collision[];

  const dummyCollision = { id: 'id'};
  
  // Filter and map droppable containers to find collisions
  const collisions: Collision[] = droppableContainers
    .filter(container => {
      // Skip certain elements if needed (optional)
      return true;
    })
    .map(container => {
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
      const activeArea = activeRect.width * activeRect.height / Number(active.id);
      const overlapPercentage = overlapArea / activeArea;
      // console.log('overlapPercentage: ', overlapPercentage);
      
      const OVERLAP_THRESHOLD = 0.6;
      
      if (overlapPercentage > OVERLAP_THRESHOLD) {
        // console.log('activeRect: ', activeRect);
        // console.log('containerRect: ', containerRect);
        // console.log('overlapX: ', overlapX);
        // console.log('overlapY: ', overlapY);
        // console.log('overlapArea: ', overlapArea);
        // console.log('activeArea: ', activeArea);

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
    
    // console.log('collisions: ', collisions);

    const endTime = performance.now();
    const timeDiff = endTime - startTime; //in ms 
    const milliseconds = Math.round(timeDiff);
    // console.log('%c Time elapsed: ', 'background: red; color: white', milliseconds + " ms");
    dispatch(addTime(milliseconds));

    return collisions;
};


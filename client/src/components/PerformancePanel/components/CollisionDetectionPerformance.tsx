import { useAppSelector } from "../../../utils/hooks/reduxHooks";
import './style.css';


const CollisionDetectionPerformance = () => {
  const elapsedTime = useAppSelector((state) => state?.performance.elapsedTime);
  const count = useAppSelector((state) => state?.performance.count);

  return (
    <div>
      <span>{`count: ${count}`}</span>
      <span>{`time total: ${Math.round(elapsedTime)} ms`}</span>
      <span>{`time average: ${(elapsedTime/(count || 1)).toFixed(3)} ms`}</span>
    </div>
  )


}

export default CollisionDetectionPerformance;

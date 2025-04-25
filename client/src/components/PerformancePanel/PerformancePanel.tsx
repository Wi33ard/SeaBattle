import { createPortal } from "react-dom";
import { CollisionDetectionPerformance } from "./components";
import './styles/PerformancePanel.css';


const PerformancePanel = () => {

  const renderPanel = () => {
    return (
      <div className="performancePanel">
        <CollisionDetectionPerformance />
      </div>
    )
  }

  return createPortal(renderPanel(), document.body);
}

export default PerformancePanel;

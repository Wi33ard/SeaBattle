import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Room from "../components/Room/Room";
import { Game } from "../components/Game/Game";
import Field3D from "../components/Field3D/Field3D";
import IntroScreen from "../components/IntroScreen/IntroScreen";

const AppRoutes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<IntroScreen />} />
        <Route path="/room" element={<Room />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/3d" element={<Field3D />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default AppRoutes;

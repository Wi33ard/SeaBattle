import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from "../App";
import Room from "../components/Room/Room";
import { Game } from "../components/Game/Game";


const AppRoutes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
          <Route path="/room" element={<Room />} />
          <Route path="/game/:id" element={<Game />} />
        </Route>
      //   {/* <Route element={<AuthLayout />}>
      //     <Route
      //       path="login"
      //       element={<Login />}
      //       loader={redirectIfUser}
      //     />
      //     <Route path="logout" action={logoutUser} />
      //   </Route> */}
    )
  );

  return <RouterProvider router={router} />;
};

export default AppRoutes;

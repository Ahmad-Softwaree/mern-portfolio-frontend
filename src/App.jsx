import { Suspense } from "react";
import { Fallback } from "./pages";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/Index";
function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <RouterProvider router={routes} />
    </Suspense>
  );
}

export default App;

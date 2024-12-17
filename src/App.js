import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProblemPage from './pages/ProblemPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProblemPage />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

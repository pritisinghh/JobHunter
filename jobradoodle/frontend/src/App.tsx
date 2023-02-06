import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './App.css';
import KanbanView, { loader as kanbanLoader } from './routes/kanban/kanban-view';
import SpreadsheetView from './routes/spreadsheet-view';
import Root, { loader as rootLoader } from './routes/root';
import ErrorPage from './error-page';
import NewBoardView from './routes/new-board-view';
import { loader as spreadsheetLoader } from './routes/spreadsheet-view';
import { useEffect } from 'react';
import WebFont from 'webfontloader';
import Home from './routes/home/home';
import Chart from './routes/jobMetric/jobMetric';
import { loader as newBoardLoader }	from './routes/new-board-view';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Amiko', 'Hammersmith One', 'Harmattan']
      }
    });
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={ <Root /> } loader={rootLoader} errorElement={ <ErrorPage />}>
		<Route path='home' element={ <Home /> } />
    <Route path='jobMetric1' element={ <Chart /> } />
		<Route path='track/new' element={ <NewBoardView /> } loader={newBoardLoader} />
        <Route path='/track/:boardId/kanban' element={< KanbanView />} loader={kanbanLoader}></Route>
        <Route path='/track/:boardId/spreadsheet' element={< SpreadsheetView />} loader={spreadsheetLoader}></Route>
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;
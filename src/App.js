import './style/global.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  useOutlet,
} from 'react-router-dom';
import Home from './screen/home';
import Add from './screen/add';
import Detail from './screen/detail';
import Edit from './screen/edit';

export const MainLayout = () => {
  const outlet = useOutlet();
  return (
    <>
      <nav
        style={{
          textAlign: 'center',
          backgroundColor: 'blue',
          color: 'white',
          padding: '8px',
        }}
      >
        simple CRUD
      </nav>
      <main>{outlet}</main>
    </>
  );
};

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route path='/' element={<Home />} />
      <Route path='/add' element={<Add />} />
      <Route path='/detail/:id' element={<Detail />} />
      <Route path='/edit/:id' element={<Edit />} />
      <Route path='*' element={<span>Page not found</span>} />
    </Route>
  )
);

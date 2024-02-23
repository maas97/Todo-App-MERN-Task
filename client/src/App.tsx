import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import TopBar from './components/nav/header/TopBar';

const Home = lazy(() => import('./views/home/Home'));

function App() {
  return (
    <main className="relative text-dark overflow-x-hidden h-full">
      <TopBar />
          <Routes>
            <Route path="/" Component={Home} />         
          </Routes>
    </main>
  );
}

export default App;

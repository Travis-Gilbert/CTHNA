import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Apply from './pages/Apply';
import Sponsors from './pages/Sponsors';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/sponsors" element={<Sponsors />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

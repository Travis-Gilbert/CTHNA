import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import VideoBackground from './components/VideoBackground';
import Landing from './pages/Landing';
import Apply from './pages/Apply';
import Sponsors from './pages/Sponsors';
import Board from './pages/Board';
import PaymentThanks from './pages/PaymentThanks';

export default function App() {
  return (
    <>
      <VideoBackground />
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/apply/thanks" element={<PaymentThanks />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/board" element={<Board />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

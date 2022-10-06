import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation';
import Books from "./pages/Books";
import NewBook from "./pages/NewBook";
import ReviewBook from './pages/ReviewBook';
import Reviews from './pages/Reviews';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Books />} />
          <Route path="review-book/:id" element={<ReviewBook />} />
          <Route path="book/:id" element={<Reviews />} />
          <Route path="new-book" element={<NewBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

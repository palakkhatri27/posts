import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import PostEdit from './pages/PostEdit';
import PostCreate from './pages/PostCreate';
import PostSentiment from './pages/PostSentiment';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/edit/:id" element={<PostEdit />} />
        <Route path="/post/new" element={<PostCreate />} />
        <Route path="/sentiment" element={<PostSentiment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

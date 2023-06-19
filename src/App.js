import  Header  from './components/Header/Header'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { managePodcastData } from './services/podcasts-data';
import PodcastChapter from './views/PodcastChapter/PodcastChapter'
import PodcastDetail from './views/PodcastDetail/PodcastDetail'
import Main from './views/Main/Main'

function App() {
  managePodcastData()
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
            <Route exact path="/" element={<Main></Main>} />
            <Route path="/podcast/:podcastId" element={<PodcastDetail></PodcastDetail>} />
            <Route path="/podcast/:podcastId/episode/:episodeId" element={<PodcastChapter></PodcastChapter>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

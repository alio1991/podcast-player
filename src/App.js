import  Header  from './components/Header/Header'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { dataSubscriber } from './services/podcast-subscriber';
import PodcastChapter from './views/PodcastChapter/PodcastChapter'
import PodcastDetail from './views/PodcastDetail/PodcastDetail'
import Main from './views/Main/Main'
import { getPodcastsData } from './services/podcasts-data';

function App() {
  dataSubscriber()
  getPodcastsData()
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
            <Route exact path="/" element={<Main></Main>} />
            <Route path="/detail" element={<PodcastDetail></PodcastDetail>} />
            <Route path="/chapter" element={<PodcastChapter></PodcastChapter>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

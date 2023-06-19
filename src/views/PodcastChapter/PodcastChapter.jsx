import { useParams } from 'react-router';
import './PodcastChapter.scss';
  
function PodcastChapter() {
    const { episodeId } = useParams();
    
    return (
        <div className="podcast-chapter">
            <h3>PODCAST CHAPTER {episodeId}</h3>
        </div>
    )
}

export default PodcastChapter;
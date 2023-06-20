
import './PodcastResume.scss';
import { useNavigate } from 'react-router-dom';


function PodcastResume({podcastDetail, podcastId}) {
    const navigate = useNavigate();

    return (
        <div className="podcast-resume">
            <img onClick={() => navigate(`/podcast/${podcastId}`)} src={podcastDetail?.artworkUrl100} alt="" />
            <h3>{podcastDetail?.collectionName}</h3>
            <p className="author" onClick={() => navigate(`/podcast/${podcastId}`)}>by {podcastDetail?.artistName}</p>
            <hr />
            <p><b>Description:</b></p>
            <p>{podcastDetail?.description}</p>
        </div>
    )
}

export default PodcastResume;
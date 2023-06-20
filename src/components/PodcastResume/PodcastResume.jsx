
import './PodcastResume.scss';
import { useNavigate } from 'react-router-dom';


function PodcastResume({podcastDetail, podcastId}) {
    const navigate = useNavigate();

    return (
        <div className="podcast-resume">
            <img onClick={() => navigate(`/podcast/${podcastId}`)} src={podcastDetail?.artworkUrl100} alt="" />
            <div className="owner-data">
                <h4>{podcastDetail?.collectionName}</h4>
                <p className="author" onClick={() => navigate(`/podcast/${podcastId}`)}>by {podcastDetail?.artistName}</p>
            </div>
            <hr />
            <p><b>Description:</b></p>
            <div className="description" dangerouslySetInnerHTML={{ __html: podcastDetail?.description?.replace('<![CDATA[', '').replace(']]>', '') }}></div>

            {/* <p className="description">{podcastDetail?.description?.replace('<![CDATA[', '').replace(']]>', '')}</p> */}
        </div>
    )
}

export default PodcastResume;
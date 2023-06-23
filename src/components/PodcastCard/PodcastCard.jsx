import './PodcastCard.scss';
import {
    useNavigate
  } from 'react-router-dom';

function PodcastCard({image, title, author, id}) {
    const navigate = useNavigate();

    const maxTitleLength = 35;
    const maxAuthorLength = 20;

    return (
        <div className="podcast-card" onClick={() => navigate(`/podcast/${id}`)}>
            <div className="card-shadow main-shadow">
            <img src={image} alt="" />
                <h3>{title.length < maxTitleLength ? title : title.slice(0, maxTitleLength) + '...'}</h3>
                <p>{author.length < maxAuthorLength ? author : author.slice(0, maxAuthorLength) + '...'}</p>
            </div>
        </div>
    )
}

export default PodcastCard;
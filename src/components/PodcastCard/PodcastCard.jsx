import { useEffect } from 'react';
import './PodcastCard.scss';
import {
    useNavigate
  } from 'react-router-dom';

function PodcastCard({image, title, author, id}) {
    const navigate = useNavigate();

    const maxTitleLength = 60;
    const maxAuthorLength = 40;

    return (
        <div className="podcast-card" onClick={() => navigate(`/podcast/${id}`)}>
            <img src={image} alt="" />
            <h3>{title.length < maxTitleLength ? title : title.slice(0, maxTitleLength) + '...'}</h3>
            <p>{author.length < maxAuthorLength ? author : author.slice(0, maxAuthorLength) + '...'}</p>
        </div>
    )
}

export default PodcastCard;
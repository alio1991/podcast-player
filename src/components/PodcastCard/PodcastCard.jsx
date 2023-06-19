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
            <h2>{title.length < maxTitleLength ? title : title.slice(0, maxTitleLength) + '...'}</h2>
            <h3>{author.length < maxAuthorLength ? author : author.slice(0, maxAuthorLength) + '...'}</h3>
        </div>
    )
}

export default PodcastCard;
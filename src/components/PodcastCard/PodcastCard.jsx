import { useEffect } from 'react';
import './PodcastCard.scss';
  
function PodcastCard({image, title, author}) {

    const maxTitleLength = 60;
    const maxAuthorLength = 40;

    return (
        <div className="podcast-card">
            <img src={image} alt="" />
            <h2>{title.length < maxTitleLength ? title : title.slice(0, maxTitleLength) + '...'}</h2>
            <h3>{author.length < maxAuthorLength ? author : author.slice(0, maxAuthorLength) + '...'}</h3>
        </div>
    )
}

export default PodcastCard;
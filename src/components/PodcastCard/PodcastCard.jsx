import './PodcastCard.scss';
  
function PodcastCard({image, title, author}) {

    return (
        <div className="podcast-card">
            <img src={image} alt="" />
            <h1>{title}</h1>
            <h3>{author}</h3>
        </div>
    )
}

export default PodcastCard;
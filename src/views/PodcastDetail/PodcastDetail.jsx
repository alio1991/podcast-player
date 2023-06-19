import { useEffect, useState } from 'react';
import './PodcastDetail.scss';
import { getPodcastDetail } from '../../services/podcasts-data';
import { useNavigate, useParams } from 'react-router-dom';

function PodcastDetail() {
    const navigate = useNavigate();

    const { podcastId } = useParams();
    const [ podcastDetail, setPodcastDetail ] = useState(null)

    useEffect(()=> {
        if(podcastId){
            getPodcastsData()
        }
    },[podcastId])


    return (
        <div className="podcast-detail">
            <div className="podcast-resume">
                <img src={podcastDetail?.artworkUrl100} alt="" />
                <h3>{podcastDetail?.collectionName}</h3>
                <p>by {podcastDetail?.trackName}</p>
                <hr />
                <p><b>Description:</b></p>
                <p>{podcastDetail?.description}</p>
            </div>
            <div className="episodes-container">
                <h2>Episodes: {podcastDetail?.episodes?.length}</h2>
                <div className="episodes">
                    <div className="episode" key="header">
                        <div><b>Title</b></div>
                        <div><b>Date</b></div>
                        <div><b>Duration</b></div>
                    </div>
                    {podcastDetail?.episodes.map((elem, i) => 
                        <div className="episode" key={i}>
                            <div onClick={() => navigate(`/podcast/${podcastId}/episode/${elem.id}`)}>{elem.title}</div>
                            <div>{formatDate(elem.date)}</div>
                            <div>{elem.duration}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

    async function getPodcastsData(){
        setPodcastDetail(await getPodcastDetail(podcastId))
    }

    function formatDate(dateString){
        const date = new Date(dateString)
        const day = date.getDate();
        const month = date.getMonth() + 1; // Los meses en JavaScript se indexan desde 0, por lo que se suma 1 al resultado
        const year = date.getFullYear();
        return  `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
    }
}

export default PodcastDetail;
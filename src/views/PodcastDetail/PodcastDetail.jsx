import { useEffect, useState } from 'react';
import './PodcastDetail.scss';
import { getPodcastDetail } from '../../services/podcasts-data';
import { json, useParams } from 'react-router-dom';

function PodcastDetail() {
    const { podcastId } = useParams();
    const [ podcastDetail, setPodcastDetail ] = useState(null)

    useEffect(()=> {
        if(podcastId){
            getPodcastsData()
        }
    },[podcastId])
    useEffect(()=> {
        if(podcastDetail){
            console.log('RAW', podcastDetail);
        }
    },[podcastDetail])

    return (
        <div className="podcast-detail">
            {podcastId}
            <div className="podcast-resume">
                <img src={podcastDetail?.artworkUrl100} alt="" />
                <h3>{podcastDetail?.collectionName}</h3>
                <p>by {podcastDetail?.trackName}</p>
                <hr />
                <p><b>Description:</b></p>
                <p>Lorem Ipsum</p>
            </div>
            <div className="episodes-container">
                <h1>Episodes: XXX</h1>
                <div className="episodes">
                    {["asdsadsad", "asdadad", "asfdgnhgf"].map(elem => elem)}
                </div>
            </div>
        </div>
    )

    async function getPodcastsData(){
        // console.log('sasad', JSON.parse(await getPodcastDetail(podcastId)));
        setPodcastDetail(JSON.parse(await getPodcastDetail(podcastId)).results[0])
    }
}

export default PodcastDetail;
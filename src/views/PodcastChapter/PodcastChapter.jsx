import { useParams } from 'react-router';
import './PodcastChapter.scss';
import { useEffect, useState } from 'react';
import PodcastResume from '../../components/PodcastResume/PodcastResume';
  
function PodcastChapter() {
    const { podcastId, episodeId } = useParams(null);

    const [ podcastData, setPodcastData] = useState(null);
    const [ episodeData, setEpisodeData] = useState(null);

    useEffect(()=> {
        const detailPodcastData = JSON.parse(localStorage.getItem('detailData'))?.find(elem=> elem.id === podcastId);
        setPodcastData(detailPodcastData)
        setEpisodeData(detailPodcastData.episodes.find(episode=> episode.id === episodeId))
    }, [episodeId, podcastId])
    
    return (
        <div className="podcast-chapter">
            <PodcastResume podcastDetail={podcastData} podcastId={podcastId}></PodcastResume>
            <div className="episode-description main-shadow">
                <h2>{episodeData?.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: episodeData?.description?.replace('<![CDATA[', '').replace(']]>', '') }}></div>
                <audio controls src={episodeData?.audio} type="audio/mpeg"></audio>
            </div>
        </div>
    )

}

export default PodcastChapter;
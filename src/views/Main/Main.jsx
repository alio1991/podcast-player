import { useEffect, useState } from 'react';
import './Main.scss';
import { getPodcastsData, podcastsData } from '../../services/podcasts-data';
import PodcastCard from '../../components/PodcastCard/PodcastCard';

function Main() {

    const [podcastEntries, setPodcastEntries] = useState([])
    const [filteredEntries, setfilteredEntries] = useState([])

    useEffect(() => {
        podcastsData.subscribe(podcastsValue => {
            if(podcastsValue){
                setPodcastEntries(podcastsValue.entry)
                setfilteredEntries(podcastsValue.entry)
            }
        })
    }, []);
    
    return (
        <div className="main">
            <div className="filter-section">
                <h1>{filteredEntries.length}</h1>
                <input onKeyUp={(ev)=> onFilterContentChanges(ev)} type="text" />
            </div>
            <div className="podcast-cards">
                {filteredEntries.map((entry, i)=> <PodcastCard key={i} title={entry.title.label} image={entry["im:image"][0].label} author={entry["im:artist"].label}></PodcastCard>)}
            </div>
        </div>
    )

    async function onFilterContentChanges(ev){
        const filterText = ev.target.value;
        setfilteredEntries(filterText==="" ? podcastEntries : podcastEntries.filter(entrie => entrie.title.label.includes(filterText)))
    }

}

export default Main;
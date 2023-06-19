import {getPodcastsData} from './podcasts-data'

export async function dataSubscriber(){
    setInterval(checkDataValidity, 30 * 60 * 1000);
}

function checkDataValidity(){
    const savedTime = localStorage.getItem('savedTime')
    const timeDifference = new Date().getTime() - savedTime || 0;
    if (timeDifference > 24 * 60 * 60 * 1000) {
        getPodcastsData(); 
    }
}
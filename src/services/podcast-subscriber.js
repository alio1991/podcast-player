import {getPodcastDetail, getPodcastsData} from './podcasts-data'

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

export function checkDetailDataValidity(detailId){
    const objectDetailById = JSON.parse(localStorage.getItem('detailData'))?.find(elem=> elem.id === detailId)
    const savedTime = objectDetailById?.savedTime
    const timeDifference = new Date().getTime() - savedTime;
    if (!savedTime || timeDifference > 24 * 60 * 60 * 1000) {
        return getPodcastDetail(detailId); 
    }else{
        return objectDetailById;
    }
}
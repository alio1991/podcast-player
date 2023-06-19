import {getPodcastsData} from './podcasts-data'

export async function dataSubscriber(){
    const now = new Date();
    const nextExecutionTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const timeRemaining = nextExecutionTime - now;
    setInterval(getPodcastsData, timeRemaining);
}
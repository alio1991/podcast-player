import { BehaviorSubject } from "rxjs"
import { dataSubscriber } from "./podcast-subscriber";

export const podcastsData = new BehaviorSubject(null)

export function managePodcastData(){
    dataSubscriber()
    const savedData = JSON.parse(localStorage.getItem('podcastInfo'))
    const savedTime = localStorage.getItem('savedTime')
    const timeDifference = new Date().getTime() - savedTime || 0;

    if(!savedData || timeDifference > 24 * 60 * 60 * 1000){
        getPodcastsData()
    }else{
        podcastsData.next(savedData)
    }
}

export async function getPodcastsData(limit=100, genre=1310){
    const url = new URL(`https://itunes.apple.com/us/rss/toppodcasts/limit=${limit}/genre=${genre}/json`)
    const response = await fetch(url).then((res) => res.json())
    podcastsData.next(response)
    localStorage.setItem('podcastInfo', JSON.stringify(response.feed))
    localStorage.setItem('savedTime', new Date().getTime())
}

export async function getPodcastDetail(podcastId){
    return await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcastId}`)}`)
    .then(response => {
      if (response.ok) return response.json()
      throw new Error('Network response was not ok.')
    }).then(res => res?.contents)
}

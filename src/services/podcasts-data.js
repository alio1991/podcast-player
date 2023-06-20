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
    }).then(async res => {
        const parsedData = JSON.parse(res?.contents)
        const wholeData =  {id: podcastId, ...parsedData.results[0], ...await getPodcastFeed(parsedData.results[0].feedUrl)}
        const userStoredDetailData = JSON.parse(localStorage.getItem("detailData")) || [];
        const newData = [...userStoredDetailData.filter(podcast => podcast.id !== podcastId), wholeData]
        localStorage.setItem("detailData", JSON.stringify(newData))
        return wholeData;
    })
}

async function getPodcastFeed(feed){
    return await fetch(`https://api.allorigins.win/get?charset=ISO-8859-1&url=${feed}`)
        .then((response) => response.json())
        .then((rawData) => new window.DOMParser().parseFromString(rawData.contents,'text/xml'))
        .then((data) => {
            if (!data) {
                throw new Error('Data could not be retrieved from the API')
            }
            return getEpisodes(data)
        })
}

function getEpisodes(data){
    const episodesData = {
        description: '',
        savedTime: new Date().getTime(),
        episodes: [],
    }
    const description = data.getElementsByTagName('itunes:summary').length > 0
    ? data.getElementsByTagName('itunes:summary')
    : data.getElementsByTagName('description')
    const items = data.querySelectorAll('item')

    episodesData.description = description[0]?.innerHTML

    items.forEach((element) => {
        const id =
            element.getElementsByTagName('omny:clipId')[0]?.innerHTML ||
            element.getElementsByTagName('guid')[0].innerHTML
        const episode = {
            id: id.replace('<![CDATA[', '').replace(']]>', ''),
            title:
            element.getElementsByTagName('itunes:title')[0]?.innerHTML.replace('<![CDATA[', '').replace(']]>', '') ||
            element.getElementsByTagName('title')[0].innerHTML.replace('<![CDATA[', '').replace(']]>', ''),
            date: element.getElementsByTagName('pubDate')[0].innerHTML,
            duration: element.getElementsByTagName('itunes:duration')[0].innerHTML,
            description: element.getElementsByTagName('description')[0].innerHTML,
            audio: element.getElementsByTagName('enclosure')[0].getAttribute('url'),
        }

        episodesData.episodes.push(episode)
    })
    return episodesData
}
export const getPodcastsData = (limit=100, genre=1310)=>{
    const url = new URL(`https://itunes.apple.com/us/rss/toppodcasts/limit=${limit}/genre=${genre}/json`),
    return fetch(url).then((res) => res.json());
}

export const getPodcastDetail = (podcastId)=>{
    const url = new URL(`https://itunes.apple.com/lookup?id=${podcastId}`),
    return fetch(url).then((res) => res.json());
}
const videoContainer = document.querySelector(".video-container");

let api_key = "AIzaSyCyoDyI7cwQOFgNRZBC_sGOPxUXACV2Onc"; //later i get it
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";


fetch(video_http + new URLSearchParams({
  key: api_key,
  part: 'snippet',
  chart: 'mostPopular',
  maxResults: 50,
  regionCode: 'IN'
})).then(res => res.json())
  .then(data =>{
    data.items.forEach(item =>{
      getChannelIcon(item)
    })
  })
  .catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
      key: api_key,
      part: 'snippet',
      id: video_data.snippet.channelId
    })).then(res => res.json())
    .then(data =>{
      video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
      makeVideoCard(video_data);
    })
}

//make video card function, 
//videoContainer.innerHTML += ...: This line directly modifies the HTML by adding a new video card element to the container.
//This function is responsible for dynamically adding video elements to the videoContainer. Here’s the DOM manipulation in action
const makeVideoCard = (data) => {
  videoContainer.innerHTML += `
  <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}' ">

    <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">

      <div class="content">
       <img src="${data.channelThumbnail}" class="channel-icon" alt="">
       <div class="info">
        <h4 class="title"> ${data.snippet.title} </h4>
        <p class="channel-name"> ${data.snippet.channelTitle} </p>
       </div>
      </div>
  </div>    
  `
}

//search logic search input handling 
const searchInut = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");

let searchLink = "https://www.youtube.com/results?search_query=";
searchBtn.addEventListener("click", () => {
  if(searchInut.value.length) {
    location.href = searchLink + searchInut.value;
  }
})


//link i got api 
//https://console.cloud.google.com/projectselector2/apis/dashboard?supportedpurview=project

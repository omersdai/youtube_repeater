// console.log(window.location.host);
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const restartButton = document.getElementById('restartButton');
// const stopButton = document.getElementById('stopButton');
// const loadButton = document.getElementById('loadButton');

const url = document.getElementById('url');
const form = document.getElementById('form');

playButton.addEventListener('click', playVideo);
pauseButton.addEventListener('click', pauseVideo);
restartButton.addEventListener('click', restartVideo);
// stopButton.addEventListener('click', stopVideo);
// loadButton.addEventListener('click', loadVideo);

form.addEventListener('submit', loadVideo);

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var videoId = 'IdyXKJ8NcNI';
localStorage.setItem(videoId, 0);
var count = localStorage.getItem(videoId); // number of times video was played

function onYouTubeIframeAPIReady() {
  // takes in DOM element or id of the HTML element. Replaces the the element with the iframe where the player is
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    startSeconds: '0',
    videoId: videoId,
    playerVars: {
      playsinline: 1,
      origin: `${window.location.host}`,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(e) {
  player.loadVideoById({
    videoId: videoId,
    startSeconds: 0,
  });
  //player.cueVideoById('M7lc1UVf-VE', 31, 35);
  //playVideo();
  setTimeout(playVideo, 2000);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

function onPlayerStateChange(event) {
  //console.log(event.data);
  if (event.data == 0) {
    // video ended
    restartVideo();
    localStorage.setItem(videoId, ++count);
    console.log(count);
  } else if (![-1, 2, 3].includes(event.data)) {
    playVideo();
  }
}

function playVideo() {
  player.playVideo();
  // player.setPlaybackRate(1.5);
  // player.mute();
}

function pauseVideo() {
  player.pauseVideo();
}

function restartVideo() {
  player.seekTo(0, true);
}

function stopVideo() {
  player.stopVideo();
}

function loadVideo(e) {
  e.preventDefault();
  var link = new URL(url.value);
  videoId = link.searchParams.get('v');
  player.loadVideoById({
    videoId: videoId,
    startSeconds: 0,
  });
  url.value = '';

  count = localStorage.getItem(videoId);
  if (count) {
    count = 0;
    localStorage.setItem(videoId, count);
  }
}

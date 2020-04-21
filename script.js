const song = document.querySelector('#song');

const songArtist = document.querySelector('.song-artist');
const songTitle = document.querySelector('.song-title');
const progressBar = document.querySelector('#progress-bar');
let pPause = document.querySelector('#play-pause');

songIndex = 0;
songs = ['A Boogie Wit Da Hoodie - Look Back At It.mp3', 'Eastside.mp3', 'Familia_(Spider-Man__Into_the_Spider-Verse)_[feat._Bantu].mp3', 'Jidenna_-_Little_Bit_More_NaijaExtra_Com.mp3'];
localStorage.setItem("songs", JSON.stringify(songs));

songArtists = ['A BOOGIE WITH DA HOODIE', 'BENNY BLANCO', 'ANUEL AA', 'JIDENNA'];
songTitles = ['LOOK BACK AT IT', 'EASTSIDE', 'FAMILIA', 'A LITTLE BIT MORE'];


let playing = true;

function playPause() {
    if (playing) {
        const song = document.querySelector('#song');


        pPause.src = "pause_media_multimedia_icon_video_blue_flat-512.png";

        song.play();
        playing = false;
    } else {
        pPause.src = "115-1156160_circled-play-icon-blue-circle-hd-png-download.png";

        song.pause();
        playing = true;
    }
}


song.addEventListener('ended', function() {
    nextSong();
});


function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    };
    song.src = songs[songIndex];
    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}


function previousSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = 1;
    };
    song.src = songs[songIndex];

    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();

}


function updateProgressValue() {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
    document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(song.currentTime)));
    if (document.querySelector('.durationTime').innerHTML === "00:00") {
        document.querySelector('.durationTime').innerHTML = "0:00";
    } else {
        document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(song.duration)));
    }
};


function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10) {
        sec = `0${sec}`;
    };
    return `${min}:${sec}`;
};


setInterval(updateProgressValue, 500);


function changeProgressBar() {
    song.currentTime = progressBar.value;
};

function addSong() {
    var newSongName = document.getElementById("newSongName").value;
    songTitles.push(newSongName);
    document.getElementById("newSongName").value = "";

    console.log(newSongName);

    var newArtist = document.getElementById("newArtist").value;
    songArtists.push(newArtist);
    document.getElementById("newArtist").value = "";
    console.log(newArtist);

    var newSong = document.getElementById("newSong").value;
    songs.push(newSong);
    document.getElementById("newSong").value = "";
    localStorage.setItem("newSong", JSON.stringify(newSong));
    localStorage.setItem("newArtist", JSON.stringify(newArtist));
    localStorage.setItem("newSongName", JSON.stringify(newSongName));


    console.log(newSong);

    alert(newSongName + " " + "added successfully");





}
var modal = document.getElementById('id01');


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
if (window.matchMedia('(prefers-color-scheme)').media === 'not all') {
    console.log('BROWSER DOES NOT SUPPORT DARK MODE');
}

function RetrieveSongs() {
    var storedName = JSON.parse(localStorage.getItem("newSongName"));
    songTitles.push(storedName);
    var storedArtist = JSON.parse(localStorage.getItem("newArtist"));
    songArtists.push(storedArtist);
    var storedSongs = JSON.parse(localStorage.getItem("newSong"));
    songs.push(storedSongs);


    console.log(storedSongs)
    console.log(storedArtist)
    console.log(storedName);
}
navigator.getBattery().then(function(battery) {
    var level = battery.level;

    console.log(level);
    var percentage = level * 100;
    document.querySelector('.percent').innerHTML = percentage + "%";
    if (percentage < 20) {
        alert("Battery level is low");
    }
})
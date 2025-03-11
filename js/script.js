let audio = new Audio();
let currentSong = null;
let songs = [];

async function getSongs() {
    try {
        let response = await fetch("./songs.json"); 
        if (!response.ok) throw new Error("Failed to fetch songs.json");
        songs = await response.json();
        console.log("Fetched songs:", songs); 
        return songs;
    } catch (error) {
        console.error("Error fetching songs:", error);
        return [];
    }
}



document.addEventListener("DOMContentLoaded", () => {
    const loginModal = document.getElementById("loginModal");
    const loginButton = document.querySelector(".btn2");
    const closeButton = document.querySelector(".close-button");
    
    loginModal.style.display = "none"; 
    
    loginButton.addEventListener("click", (event) => {
        event.preventDefault(); 
        loginModal.style.display = "flex";
    });
    
    closeButton.addEventListener("click", () => {
        loginModal.style.display = "none";
    });
    
    window.addEventListener("click", (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = "none";
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const library = document.querySelector(".library");
    const libraryToggle = document.getElementById("libraryToggle");

    library.style.display = "none"; // Hide by default

    libraryToggle.addEventListener("click", () => {
        if (library.style.display === "none") {
            library.style.display = "block";
        } else {
            library.style.display = "none";
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const library = document.querySelector(".library");
    const libraryToggle = document.getElementById("libraryToggle");

    libraryToggle.addEventListener("click", () => {
        library.classList.toggle("show"); // Toggle visibility
    });
});

const playMusic = (track) => {
    if (!track) return;

    let songPath = track.url; 
    console.log("Playing song:", songPath);

    if (currentSong === songPath) {
        if (audio.paused) {
            audio.play();
            document.getElementById("play").src = "img/pause.svg";
        } else {
            audio.pause();
            document.getElementById("play").src = "img/play.svg";
        }
        return;
    }

    audio.src = songPath;
    audio.load();
    audio.play().then(() => {
        console.log("Audio playing successfully");
    }).catch(error => {
        console.error("Audio play error:", error);
        alert("Autoplay blocked! Click Play manually.");
    });

    document.getElementById("play").src = "img/pause.svg";
    currentSong = songPath;
    document.querySelector(".songInfo").innerHTML = track.title;

    audio.onerror = function () {
        console.error("Audio failed to load:", audio.src);
    };
};


async function main() {
    songs = await getSongs();
    let songUL = document.querySelector(".songList ul");
    songUL.innerHTML = "";

    songs.forEach(song => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `
            <img class="invert" src="img/music.svg" alt="Music Icon">
            <div class="info">
                <div>${song.title}</div>
                <div>Artist</div>
            </div>
            <div class="playNow">
                <span>Play Now</span>
                <img class="invert play-btn" src="img/play.svg" alt="Play Now">
            </div>`;

        console.log("Adding click event for:", song.title); 
        listItem.addEventListener("click", () => playMusic(song));
        songUL.appendChild(listItem);
    });
}

main();

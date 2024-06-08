function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

let closeModal = () => {
    document.querySelector('.modal-overlay').style.display = 'none';
}

let openModal = (playlist) => {
    //

    const modalOverlay = document.querySelector('.modal-overlay');
    const modalBody = document.querySelector('.modal-body');
    
    // Clear existing content in the modal body
    modalBody.innerHTML = '';

    // Create a container for the playlist cover and details
    const playlistHeader = document.createElement('div');
    playlistHeader.className = 'playlist-header';

    // Create and append the playlist cover image
    const playlistCover = document.createElement('img');
    playlistCover.src = playlist.playlist_art;
    playlistCover.alt = `Cover of ${playlist.playlist_name}`;
    playlistCover.className = 'modal-playlist-cover';
    playlistHeader.appendChild(playlistCover);

    // Container for the text details
    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'playlist-details';

    // Create and append the playlist title and creator
    const title = document.createElement('h2');
    title.textContent = playlist.playlist_name;
    detailsContainer.appendChild(title);
    const creator = document.createElement('p');
    creator.textContent = `Created by: ${playlist.playlist_creator}`;
    detailsContainer.appendChild(creator);
    playlistHeader.appendChild(detailsContainer);
    modalBody.appendChild(playlistHeader);

    // Create and append the shuffle button
    const shuffleButton = document.createElement('button');
    shuffleButton.textContent = 'Shuffle';
    shuffleButton.className = 'shuffle-button';
    detailsContainer.appendChild(shuffleButton); // Append the button to the modal body

    let updateSongList = () => {
        const songList = document.createElement('ul');
        
        playlist.songs.forEach(song => {
            const li = document.createElement('li');
            li.className = 'song-item';

            // Song cover image
            const songCover = document.createElement('img');
            songCover.src = song.cover_art;
            songCover.alt = `Cover of ${song.title}`;
            songCover.className = 'song-cover-art';
            li.appendChild(songCover);

            // Song details
            const songDetails = document.createElement('div');
            songDetails.className = 'song-details';
            songDetails.innerHTML = `<span>${song.title}</span>
                                    <p>${song.artist}</p>
                                    <p>${song.album}</p>`;
            li.appendChild(songDetails);
            
            // Song duration
            const duration = document.createElement('p');
            duration.className = 'song-duration';
            duration.textContent = song.duration;
            li.appendChild(duration);
            songList.appendChild(li);
        });
        return songList;
    };
    let songList = updateSongList()
    modalBody.appendChild(songList);

    // event listener for shuffle
    shuffleButton.addEventListener('click', () => {
        shuffleArray(playlist.songs);
        modalBody.removeChild(songList);
        songList = updateSongList();
        modalBody.appendChild(songList);
    })
    
    // show modal
    modalOverlay.style.display = 'flex';
}

const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', closeModal);


function displayPlaylists() {
    const container = document.querySelector('.playlist-cards'); // Select the container where cards will be appended
    data.playlists.forEach(playlist => {
        // Create the card element
        const card = document.createElement('div');
        card.className = 'playlist-card';

        // Add the playlist cover image
        const image = document.createElement('img');
        image.src = playlist.playlist_art;
        image.alt = `Cover image of playlist ${playlist.playlist_name}`;
        card.appendChild(image);

        // Add the playlist info section
        const info = document.createElement('div');
        info.className = 'playlist-info';

        // Add the playlist title
        const title = document.createElement('h2');
        title.textContent = playlist.playlist_name;
        info.appendChild(title);

        // Add the creator name
        const creator = document.createElement('p');
        creator.textContent = playlist.playlist_creator;
        info.appendChild(creator);

        // Add the like icon
        const likeButton = document.createElement('span');
        likeButton.className = 'heart';
        likeButton.textContent = '♥';

        // add the like number
        const likeNum = document.createElement('span');
        likeNum.textContent = playlist.likeCount;

        likeButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Stop the click event from bubbling up to the card
            playlist.likeCount++;
            likeNum.textContent = playlist.likeCount; // Update the displayed like count
        });
        info.appendChild(likeButton);
    
        info.appendChild(likeNum);


        // Append the info section to the card
        card.appendChild(info);

        // Append the card to the container
        container.appendChild(card);

        // Add event listener for clicking
        card.addEventListener('click', () => openModal(playlist));
    });
}

// Call the function to display playlists
document.addEventListener('DOMContentLoaded', () => {
    displayPlaylists();
});



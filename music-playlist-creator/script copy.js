function displayFeaturedPlaylist() {
    const playlists = data.playlists; // Assuming 'data' is your global object containing playlists
    const randomIndex = Math.floor(Math.random() * playlists.length);
    const featuredPlaylist = playlists[randomIndex];
    // Update the playlist image
    const playlistImage = document.querySelector('.featured-playlist-image');
    playlistImage.src = featuredPlaylist.playlist_art;
    playlistImage.alt = `Cover of ${featuredPlaylist.playlist_name}`;
    // Update the playlist title
    const playlistTitle = document.querySelector('.featured-playlist-title');
    playlistTitle.textContent = featuredPlaylist.playlist_name;
    // Update the song list
    const songListContainer = document.querySelector('.featured-song-list');
    songListContainer.innerHTML = ''; // Clear existing songs
    featuredPlaylist.songs.forEach(song => {
        const songItem = document.createElement('div');
        songItem.className = 'featured-song-item';
        const songCover = document.createElement('img');
        songCover.src = song.cover_art;
        songCover.alt = `Cover of ${song.title}`;
        songCover.className = 'featured-song-cover-art';
        songItem.appendChild(songCover);
        const songDetails = document.createElement('div');
        songDetails.className = 'featured-song-details';
        songDetails.innerHTML = `<span>${song.title}</span><p>${song.artist}</p><p>${song.album}</p>`;
        songItem.appendChild(songDetails);
        const duration = document.createElement('p');
        duration.className = 'featured-song-duration';
        duration.textContent = song.duration;
        songItem.appendChild(duration);
        songListContainer.appendChild(songItem);
    });
}

// Call the function to display the featured playlist when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedPlaylist();
});



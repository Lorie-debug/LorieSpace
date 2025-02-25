       // Create floating hearts dynamically
        const heartContainer = document.getElementById('heartContainer');
        const numberOfHearts = 15;
        
        for (let i = 0; i < numberOfHearts; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            
            // Random position
            const leftPos = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 50 + 15;
            
            // Random speed
            const duration = Math.random() * 50 + 10;
            
            // Random starting point
            const startPosition = Math.random() * 10;
            
            heart.style.left = leftPos + '%';
            heart.style.bottom = -startPosition + 'px';
            heart.style.width = size + 'px';
            heart.style.height = size + 'px';
            heart.style.animationDuration = duration + 's';
            
            // Set the same size for the pseudo-elements
            const styleElement = document.createElement('style');
            styleElement.textContent = `
                .heart:nth-child(${i+1}):before,
                .heart:nth-child(${i+1}):after {
                    width: ${size}px;
                    height: ${size}px;
                }
                .heart:nth-child(${i+1}):before {
                    top: -${size/2}px;
                }
                .heart:nth-child(${i+1}):after {
                    left: -${size/2}px;
                }
            `;
            document.head.appendChild(styleElement);
            
            heartContainer.appendChild(heart);
        }

        // Music player functionality
        const musicControls = document.getElementById('musicControls');
        const expandBtn = document.getElementById('expandBtn');
        const minimizeBtn = document.getElementById('minimizeBtn');
        const restoreBtn = document.getElementById('restoreBtn');
        const playlist = document.getElementById('playlist');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const volumeSlider = document.getElementById('volumeSlider');
        const currentSongTitle = document.getElementById('currentSongTitle');
        
        // Get all audio elements
        const musicTracks = [
            document.getElementById('music1'),
            document.getElementById('music2'),
            document.getElementById('music3'),
            document.getElementById('music4'),
            document.getElementById('music5')
        ];
        
        // Track names (matching the playlist items)
        const trackNames = [
            "Mundo",
            "About you",
            "Sanctuary - Joji",
            "Pluto Projector",
            "I Love You So"
        ];
        
        let currentTrackIndex = 0;
        let isPlaying = false;
        
        // Initialize volume
        musicTracks.forEach(track => {
            track.volume = volumeSlider.value;
        });
        
        // Toggle expand/collapse
        expandBtn.addEventListener('click', function() {
            musicControls.classList.toggle('expanded');
            musicControls.classList.toggle('collapsed');
            playlist.classList.toggle('visible');
            expandBtn.textContent = playlist.classList.contains('visible') ? '↕' : '↕';
        });
        
        // Minimize player
        minimizeBtn.addEventListener('click', function() {
            musicControls.style.display = 'none';
            restoreBtn.style.display = 'flex';
        });
        
        // Restore player
        restoreBtn.addEventListener('click', function() {
            musicControls.style.display = 'flex';
            restoreBtn.style.display = 'none';
        });
        
        // Play the current track
        function playCurrentTrack() {
            // Stop all tracks first
            musicTracks.forEach(track => {
                track.pause();
                track.currentTime = 0;
            });
            
            // Play the current track
            musicTracks[currentTrackIndex].play()
                .then(() => {
                    isPlaying = true;
                    updatePlayButton();
                })
                .catch(error => {
                    console.log("Playback prevented: ", error);
                    isPlaying = false;
                    updatePlayButton();
                });
            
            // Update UI
            currentSongTitle.textContent = trackNames[currentTrackIndex];
            updatePlaylistActiveItem();
        }
        
        // Update playlist active item
        function updatePlaylistActiveItem() {
            const playlistItems = document.querySelectorAll('.playlist-item');
            playlistItems.forEach((item, index) => {
                if (index === currentTrackIndex) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
        
        // Update play/pause button
        function updatePlayButton() {
            playPauseBtn.textContent = isPlaying ? '❚❚' : '▶';
        }
        
        // Play/Pause button click
        playPauseBtn.addEventListener('click', function() {
            if (isPlaying) {
                musicTracks[currentTrackIndex].pause();
                isPlaying = false;
            } else {
                musicTracks[currentTrackIndex].play()
                    .catch(error => console.log("Playback prevented: ", error));
                isPlaying = true;
            }
            updatePlayButton();
        });
        
        // Previous button click
        prevBtn.addEventListener('click', function() {
            currentTrackIndex = (currentTrackIndex - 1 + musicTracks.length) % musicTracks.length;
            if (isPlaying) {
                playCurrentTrack();
            } else {
                currentSongTitle.textContent = trackNames[currentTrackIndex];
                updatePlaylistActiveItem();
            }
        });
        
        // Next button click
        nextBtn.addEventListener('click', function() {
            currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length;
            if (isPlaying) {
                playCurrentTrack();
            } else {
                currentSongTitle.textContent = trackNames[currentTrackIndex];
                updatePlaylistActiveItem();
            }
        });
        
        // Volume change
        volumeSlider.addEventListener('input', function() {
            musicTracks.forEach(track => {
                track.volume = volumeSlider.value;
            });
        });
        
        // Playlist item click
        const playlistItems = document.querySelectorAll('.playlist-item');
        playlistItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                currentTrackIndex = index;
                if (isPlaying) {
                    playCurrentTrack();
                } else {
                    currentSongTitle.textContent = trackNames[currentTrackIndex];
                    updatePlaylistActiveItem();
                }
            });
        });
        
        // Auto-play on page load with lower volume
        window.addEventListener('load', function() {
            // Set lower initial volume
            volumeSlider.value = 0.3;
            musicTracks.forEach(track => {
                track.volume = volumeSlider.value;
            });
            
            // Try to play music on load
            playCurrentTrack();
            
            // Also play on first user interaction as fallback for browsers that block autoplay
            document.body.addEventListener('click', function() {
                if (!isPlaying) {
                    playCurrentTrack();
                }
            }, { once: true });
        });
        
        // Handle track end - play next track
        musicTracks.forEach((track, index) => {
            track.addEventListener('ended', function() {
                if (index === currentTrackIndex) {
                    currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length;
                    playCurrentTrack();
                }
            });
        });

        // Scroll animation for sections
  const sections = document.querySelectorAll('.section');
  
  function checkVisibility() {
      const windowHeight = window.innerHeight;
      
      sections.forEach(section => {
          const rect = section.getBoundingClientRect();
          const visible = rect.top < windowHeight * 0.8;
          
          if (visible) {
              section.classList.add('visible');
          }
      });
  }
  
  // Initial check
  checkVisibility();
  
  // Check on scroll
  window.addEventListener('scroll', checkVisibility);
  
  // 3D tilt effect for message
  const messageContainer = document.getElementById('message-container');
  
  messageContainer.addEventListener('mousemove', (e) => {
      const rect = messageContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xRotation = ((y - rect.height / 2) / rect.height) * 10;
      const yRotation = ((x - rect.width / 2) / rect.width) * -10;
      
      messageContainer.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
  });
  
  messageContainer.addEventListener('mouseleave', () => {
      messageContainer.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });

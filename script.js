document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('playButton');
    const bgMusic = document.getElementById('bgMusic');
    const playIcon = playButton.querySelector('i');
    const playText = playButton.querySelector('span');

    const playMusic = () => {
        bgMusic.play().catch(error => {
            console.log('Auto-play was prevented:', error);
            playButton.style.display = 'flex';
        });
    };

    playButton.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            playIcon.className = 'fas fa-pause';
            playText.textContent = 'Pause';
        } else {
            bgMusic.pause();
            playIcon.className = 'fas fa-play';
            playText.textContent = 'Play';
        }
    });

    const videoElement = document.getElementById('memoryVideo');
    const videoSources = [
        'videos/1000256901.mp4',
        'videos/1000257115.mp4',
        'videos/1000257116.mp4',
        'videos/1000257117.mp4',
        'videos/cafe.mp4',
        'videos/cute.mp4'
    ];
    
    let currentVideoIndex = 0;

    const playNextVideo = () => {
        currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
        videoElement.src = videoSources[currentVideoIndex];
        videoElement.play().catch(error => console.log('Video play error:', error));
    };

    videoElement.addEventListener('ended', playNextVideo);
    
    if (videoSources.length > 0) {
        videoElement.src = videoSources[0];
        videoElement.load();
        videoElement.play().catch(error => console.log('Initial video play error:', error));
    }

    const slideshow = document.querySelector('.slideshow');
    const images = [
        'images/1000229895.jpg',
        'images/1000256836.jpg',
        'images/1000256837.jpg',
        'images/1000256902.jpg',
        'images/1000256905.jpg',
        'images/1000256907.jpg',
        'images/1000256929.jpg',
        'images/1000256930.jpg',
        'images/1000257105.jpg',
        'images/1000257113.jpg',
        'images/new.jpg',
        'images/try.jpg'
    ];

    let currentSlide = 0;
    const slideInterval = 5000; 

    // Create slides
    images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = `slide ${index === 0 ? 'active' : ''}`;
        slide.style.backgroundImage = `url('${image}')`;
        slideshow.appendChild(slide);
    });

    const slides = document.querySelectorAll('.slide');

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };

    // Start slideshow
    let slideIntervalId = setInterval(nextSlide, slideInterval);

    // Pause slideshow on hover
    slideshow.addEventListener('mouseenter', () => {
        clearInterval(slideIntervalId);
    });

    slideshow.addEventListener('mouseleave', () => {
        slideIntervalId = setInterval(nextSlide, slideInterval);
    });

    // Navigation buttons
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    prevBtn.addEventListener('click', () => {
        clearInterval(slideIntervalId);
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
        slideIntervalId = setInterval(nextSlide, slideInterval);
    });

    nextBtn.addEventListener('click', () => {
        clearInterval(slideIntervalId);
        nextSlide();
        slideIntervalId = setInterval(nextSlide, slideInterval);
    });

    // Initial setup
    playMusic();
    showSlide(0);

});



// Shared Slideshow Functionality for All Pages
// This script handles the rotating background images on every page

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSlideshow();
    initCountdown();
});

function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const indicatorsContainer = document.getElementById('slideshowIndicators');
    
    if (!slides.length || !indicatorsContainer) return;
    
    let currentSlide = 0;
    let slideInterval;
    
    // Clear existing indicators
    indicatorsContainer.innerHTML = '';
    
    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    
    const indicators = document.querySelectorAll('.indicator');
    
    function goToSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) next = 0;
        goToSlide(next);
    }
    
    function startSlideshow() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopSlideshow() {
        if (slideInterval) clearInterval(slideInterval);
    }
    
    // Start slideshow
    startSlideshow();
    
    // Pause on hover
    const slideshowContainer = document.getElementById('slideshowContainer');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', stopSlideshow);
        slideshowContainer.addEventListener('mouseleave', startSlideshow);
    }
}

function initCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    const target = new Date("June 11, 2026 00:00:00").getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const diff = target - now;
        if (diff <= 0) {
            countdownElement.innerText = "⚽ WORLD CUP STARTED!";
            return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);
        countdownElement.innerText = `${days}d ${hours}h ${mins}m ${secs}s`;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

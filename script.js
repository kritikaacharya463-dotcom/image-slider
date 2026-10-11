class ImageSlider {
    constructor(selector) {
        this.slider = document.querySelector(selector);
        this.track = this.slider.querySelector(".slider-track");
        this.slides = Array.from(this.track.children);

        this.prevBtn = this.slider.querySelector(".prev");
        this.nextBtn = this.slider.querySelector(".next");

        this.dotsContainer = this.slider.querySelector(".slider-dots");
        this.dots = [];

        this.currentIndex = 0;
        this.autoSlideInterval = null;

        this.init();
    }

    init() {
        this.createDots();
        this.bindEvents();
        this.updateSlidePosition();
        this.startAutoSlide();
    }

    updateSlidePosition() {
        const offset = -this.currentIndex * this.slider.offsetWidth;

        this.track.style.transform = `translateX(${offset}px)`;

        this.updateDots();
    }

    nextSlide() {
        this.currentIndex =
            (this.currentIndex + 1) % this.slides.length;

        this.updateSlidePosition();
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.slides.length - 1;
        }

        this.updateSlidePosition();
    }

    createDots() {
        this.dotsContainer.innerHTML = "";
        this.dots = [];

        this.slides.forEach((_, index) => {
            const dot = document.createElement("span");

            dot.classList.add("dot");

            dot.addEventListener("click", () => {
                this.currentIndex = index;
                this.updateSlidePosition();
                this.resetAutoSlide();
            });

            this.dotsContainer.appendChild(dot);
            this.dots.push(dot);
        });

        this.updateDots();
    }

    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle(
                "active",
                index === this.currentIndex
            );
        });
    }

    startAutoSlide() {
        this.stopAutoSlide();

        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }

    resetAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }

    bindEvents() {

        
        this.nextBtn.addEventListener("click", () => {
            this.nextSlide();
            this.resetAutoSlide();
        });

        
        this.prevBtn.addEventListener("click", () => {
            this.prevSlide();
            this.resetAutoSlide();
        });

        
        this.slider.addEventListener("mouseenter", () => {
            this.stopAutoSlide();
        });

        
        this.slider.addEventListener("mouseleave", () => {
            this.startAutoSlide();
        });

        
        window.addEventListener("resize", () => {
            this.updateSlidePosition();
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new ImageSlider(".slider");
});
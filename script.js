document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for nav links
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                // Close offcanvas menu after clicking a link on mobile
                const offcanvas = document.getElementById('mobileSidebar');
                const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas); // Get Bootstrap Offcanvas instance
                if (bsOffcanvas) {
                    bsOffcanvas.hide();
                }
            }
        });
    });

    // Gallery images array
    const galleryImages = [
        'images/1.png',
        'images/2.png',
        'images/3.png',
        'images/4.png',
        'images/6.png',
        'images/7.png',
        'images/9.png',
        'images/10.png',
        'images/11.png',
        'images/shivam.png',
        'images/natu.png',
        'images/dipesh.png'
    ];

    const sliderContainer = document.querySelector('#gallery-slider'); // Get the direct slider container
    const slideLeftBtn = document.getElementById('slide-left');
    const slideRightBtn = document.getElementById('slide-right');

    // Function to populate and update the gallery
    function updateGallery() {
        if (!sliderContainer) return;

        sliderContainer.innerHTML = ''; // Clear existing images

        galleryImages.forEach((imageSrc, index) => {
            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'gallery-item'; // Custom class for styling flex items

            const anchor = document.createElement('a');
            anchor.href = imageSrc;
            anchor.className = 'glightbox';
            anchor.setAttribute('data-gallery', 'gallery1'); // Group images for lightbox

            const img = document.createElement('img');
            img.src = imageSrc;
            img.className = 'img-fluid rounded shadow-sm';
            img.alt = `Gallery Image ${index + 1}`;

            anchor.appendChild(img);
            imgWrapper.appendChild(anchor);
            sliderContainer.appendChild(imgWrapper);
        });

        // Reinitialize lightbox after images are added
        GLightbox({ selector: '.glightbox' });
    }

    // Initial gallery load
    updateGallery();

    // Event listeners for gallery arrow buttons
    if (slideLeftBtn && slideRightBtn && sliderContainer) {
        slideLeftBtn.addEventListener('click', () => {
            // Calculate scroll amount based on the width of one image plus gap
            const firstImage = sliderContainer.querySelector('.gallery-item');
            if (firstImage) {
                const imageWidth = firstImage.offsetWidth;
                const gap = parseFloat(getComputedStyle(sliderContainer).gap); // Get gap value
                const scrollAmount = imageWidth + gap;
                sliderContainer.scrollLeft -= scrollAmount;
            }
        });

        slideRightBtn.addEventListener('click', () => {
            // Calculate scroll amount based on the width of one image plus gap
            const firstImage = sliderContainer.querySelector('.gallery-item');
            if (firstImage) {
                const imageWidth = firstImage.offsetWidth;
                const gap = parseFloat(getComputedStyle(sliderContainer).gap); // Get gap value
                const scrollAmount = imageWidth + gap;
                sliderContainer.scrollLeft += scrollAmount;
            }
        });
    }

    // Contact Form Submission (Client-side handling)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;

            // Log the form data to the console (you would send this to a backend/service)
            console.log('Form Submitted!');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Subject:', subject);
            console.log('Message:', message);

            // Here you would typically send this data to a server using fetch() or XMLHttpRequest
            // For now, we'll just show an alert and clear the form
            alert('Your message has been sent successfully! We will get back to you soon.');

            // Clear the form fields
            contactForm.reset();
        });
    }

    // Optional: Reattach like button toggles if you dynamically add cards with like buttons
    // Note: The current HTML structure for gallery doesn't include cards with like buttons.
    // If you reintroduce them, ensure this part of the code is relevant.
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('btn-outline-danger');
            btn.classList.toggle('btn-danger');
        });
    });
});
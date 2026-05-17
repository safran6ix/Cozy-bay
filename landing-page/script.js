// Room Data
const roomsData = [
    {
        id: 1,
        name: 'Cozy Standard Room',
        type: 'Standard',
        price: 120,
        discount: 0,
        description: 'Perfect for solo travelers or couples, this cozy room offers comfort and simplicity with modern amenities.',
        capacity: 2,
        size: 25,
        beds: '1 Queen Bed',
        images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800'],
        amenities: ['Free WiFi', 'Flat-screen TV', 'Air conditioning', 'Mini fridge']
    },
    {
        id: 2,
        name: 'Deluxe Ocean View',
        type: 'Deluxe',
        price: 199,
        discount: 10,
        description: 'Enjoy breathtaking ocean views from your private balcony. Spacious room with premium furnishings.',
        capacity: 3,
        size: 35,
        beds: '1 King Bed + Sofa',
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'],
        amenities: ['Free WiFi', '55" Smart TV', 'Air conditioning', 'Mini bar', 'Balcony']
    },
    {
        id: 3,
        name: 'Bay Suite',
        type: 'Suite',
        price: 350,
        discount: 0,
        description: 'Luxurious suite with separate living area and panoramic bay views. Ultimate comfort and elegance.',
        capacity: 4,
        size: 55,
        beds: '1 King Bed + Pull-out',
        images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'],
        amenities: ['Free WiFi', '65" Smart TV', 'Jacuzzi', 'Separate living room', 'Butler service']
    },
    {
        id: 4,
        name: 'Presidential Penthouse',
        type: 'Presidential',
        price: 599,
        discount: 15,
        description: 'Our most exclusive accommodation featuring a private terrace, dining area, and personalized butler service.',
        capacity: 6,
        size: 85,
        beds: '2 King Beds + Sofa',
        images: ['https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800'],
        amenities: ['Free WiFi', '75" OLED TV', 'Private terrace', 'Butler service', 'Jacuzzi tub']
    },
    {
        id: 5,
        name: 'Family Suite',
        type: 'Suite',
        price: 280,
        discount: 0,
        description: 'Spacious suite designed for families, featuring two bedrooms and a common living area.',
        capacity: 5,
        size: 65,
        beds: '1 Queen + 2 Twins',
        images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800'],
        amenities: ['Free WiFi', '55" Smart TV', 'Kitchenette', 'Two bathrooms']
    },
    {
        id: 6,
        name: 'Honeymoon Suite',
        type: 'Deluxe',
        price: 299,
        discount: 5,
        description: 'Romantic suite specially designed for couples. Features a king-size bed and stunning sunset views.',
        capacity: 2,
        size: 40,
        beds: '1 King Bed',
        images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'],
        amenities: ['Free WiFi', '60" Smart TV', 'Jacuzzi', 'Balcony', 'Romantic dinner setup']
    }
];

// Load rooms when page loads
document.addEventListener('DOMContentLoaded', function () {
    loadRooms();
    setupEventListeners();
    setupScrollAnimation();
    setupCounters();
    setupBackToTop();
    setupActiveNav();
});

// Load rooms into grid
function loadRooms() {
    const roomsGrid = document.getElementById('roomsGrid');
    if (!roomsGrid) return;

    roomsGrid.innerHTML = roomsData.map(room => `
        <div class="room-card" data-aos="fade-up">
            <div class="room-image">
                <img src="${room.images[0]}" alt="${room.name}">
                ${room.discount > 0 ? `<span class="discount-badge">-${room.discount}%</span>` : ''}
                <span class="room-type">${room.type}</span>
            </div>
            <div class="room-info">
                <h3>${room.name}</h3>
                <p>${room.description.substring(0, 100)}...</p>
                <div class="room-features">
                    <span>👥 ${room.capacity} Guests</span>
                    <span>📏 ${room.size} m²</span>
                </div>
                <div class="room-price">
                    ${room.discount > 0 ? `
                        <span class="original">$${room.price}</span>
                        <span class="discounted">$${Math.round(room.price * (1 - room.discount / 100))}</span>
                    ` : `<span>$${room.price}</span>`}
                    <span class="per-night">/ night</span>
                </div>
                <button class="btn-book" onclick="openBookingModal(${room.id})">Book Now →</button>
            </div>
        </div>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Booking form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }

    // Close modal
    const modal = document.getElementById('bookingModal');
    const closeBtn = document.querySelector('.close');

    if (closeBtn) {
        closeBtn.onclick = () => closeModal();
    }

    window.onclick = (event) => {
        if (event.target === modal) {
            closeModal();
        }
    };

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

// Handle contact form submission
async function handleContactSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simulate API call
    showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
    e.target.reset();
}

// Handle newsletter submission
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    showToast('Subscribed successfully! Check your email for updates.', 'success');
    e.target.reset();
}

// Handle booking submission
function handleBookingSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('bookingName').value;
    const email = document.getElementById('bookingEmail').value;
    const phone = document.getElementById('bookingPhone').value;

    showToast(`Booking confirmed! Check your email for details.`, 'success');
    closeModal();
    e.target.reset();
}

// Open booking modal
let selectedRoomForBooking = null;

function openBookingModal(roomId) {
    selectedRoomForBooking = roomsData.find(room => room.id === roomId);
    if (!selectedRoomForBooking) return;

    const modal = document.getElementById('bookingModal');
    const modalTitle = document.getElementById('modalRoomTitle');
    const modalPrice = document.getElementById('modalRoomPrice');

    const finalPrice = selectedRoomForBooking.discount > 0
        ? Math.round(selectedRoomForBooking.price * (1 - selectedRoomForBooking.discount / 100))
        : selectedRoomForBooking.price;

    modalTitle.textContent = `Book ${selectedRoomForBooking.name}`;
    modalPrice.innerHTML = `$${finalPrice} <span>/ night</span>`;

    // Setup date inputs
    const checkIn = document.getElementById('checkIn');
    const checkOut = document.getElementById('checkOut');

    const today = new Date().toISOString().split('T')[0];
    checkIn.min = today;
    checkOut.min = today;

    checkIn.onchange = updateTotalPrice;
    checkOut.onchange = updateTotalPrice;

    modal.style.display = 'block';
    updateTotalPrice();
}

function updateTotalPrice() {
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;

    if (checkIn && checkOut && selectedRoomForBooking) {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));

        const finalPrice = selectedRoomForBooking.discount > 0
            ? Math.round(selectedRoomForBooking.price * (1 - selectedRoomForBooking.discount / 100))
            : selectedRoomForBooking.price;

        const total = finalPrice * nights;
        const modalTotal = document.getElementById('modalTotal');
        if (modalTotal) {
            modalTotal.innerHTML = `
                <span>Total: $${total}</span>
                <span>${nights} night(s)</span>
            `;
        }
    }
}

function closeModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.background = type === 'success' ? '#28a745' : '#dc3545';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });

        // Close mobile menu if open
        const navMenu = document.getElementById('navMenu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }
}

// Setup scroll animations
function setupScrollAnimation() {
    const elements = document.querySelectorAll('.room-card, .amenity-card, .gallery-item, .testimonial-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Setup counter animation
function setupCounters() {
    const counters = document.querySelectorAll('.counter');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let count = 0;
                const increment = target / 50;

                const updateCounter = () => {
                    count += increment;
                    if (count < target) {
                        counter.textContent = Math.ceil(count);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Setup back to top button
function setupBackToTop() {
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Setup active navigation based on scroll
function setupActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Add AOS-like animations
const style = document.createElement('style');
style.textContent = `
    [data-aos] {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    [data-aos].aos-animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Make functions global for onclick handlers
window.openBookingModal = openBookingModal;
window.scrollToSection = scrollToSection;
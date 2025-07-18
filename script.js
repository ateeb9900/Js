// script.js

// Product data
const products = [
    {
        id: 1,
        name: "Eternal Love",
        price: 89,
        category: "romantic",
        image: "https://images.unsplash.com/photo-1522057384400-681b421cfebc?w=400",
        description: "A stunning arrangement of red roses and baby's breath"
    },
    {
        id: 2,
        name: "Spring Joy",
        price: 65,
        category: "festive",
        image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400",
        description: "Bright and cheerful mix of seasonal flowers"
    },
    {
        id: 3,
        name: "Peaceful White",
        price: 75,
        category: "sympathy",
        image: "https://images.unsplash.com/photo-1578836537282-3171d77f8632?w=400",
        description: "Elegant white lilies and roses for remembrance"
    },
    {
        id: 4,
        name: "Garden Romance",
        price: 95,
        category: "romantic",
        image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400",
        description: "Mixed garden flowers with roses and peonies"
    },
    {
        id: 5,
        name: "Birthday Blast",
        price: 70,
        category: "festive",
        image: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=400",
        description: "Colorful gerberas and sunflowers"
    },
    {
        id: 6,
        name: "Gentle Comfort",
        price: 80,
        category: "sympathy",
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400",
        description: "Soft pastels with white and cream flowers"
    },
    {
        id: 7,
        name: "Love Letter",
        price: 120,
        category: "romantic",
        image: "https://images.unsplash.com/photo-1469259943454-aa100abba749?w=400",
        description: "Premium red and pink roses with eucalyptus"
    },
    {
        id: 8,
        name: "Celebration Time",
        price: 85,
        category: "festive",
        image: "https://images.unsplash.com/photo-1502977249166-824b3a8a4d6d?w=400",
        description: "Vibrant mixed bouquet for special occasions"
    }
];

// Cart functionality
let cart = [];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const productsGrid = document.getElementById('productsGrid');

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Load products
function loadProducts(category = 'all') {
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-overlay">
                    <button class="quick-view" onclick="viewProduct(${product.id})">
                        <i class="fas fa-eye"></i> Quick View
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="price">$${product.price}</span>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter products
function filterBouquets(category) {
    // Update active filter button
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Load filtered products
    loadProducts(category);
    
    // Scroll to shop section
    scrollToSection('shop');
}

// View product details
function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'product-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal" onclick="closeModal()">&times;</span>
                <div class="modal-body">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="modal-info">
                        <h2>${product.name}</h2>
                        <p class="modal-description">${product.description}</p>
                        <p class="modal-price">$${product.price}</p>
                        <div class="modal-actions">
                            <button class="cta-button" onclick="addToCart(${product.id}); closeModal();">
                                Add to Cart
                            </button>
                            <button class="cta-button secondary" onclick="customizeProduct(${product.id})">
                                Customize
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Animate modal
        setTimeout(() => modal.classList.add('active'), 10);
    }
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.product-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        showNotification(`${product.name} added to cart!`);
    }
}

// Update cart count
function updateCartCount() {
    const cartCount = cart.length;
    // Update cart badge if exists
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Customize product
function customizeProduct(productId) {
    closeModal();
    scrollToSection('order');
    const select = document.getElementById('bouquetSelect');
    select.value = 'custom';
}

// Handle contact form submission
function handleContactSubmit(event) {
    event.preventDefault();
    showNotification('Thank you for your message! We\'ll get back to you soon.');
    event.target.reset();
}

// Handle order form submission
function handleOrderSubmit(event) {
    event.preventDefault();
    showNotification('Order submitted! Redirecting to payment...');
    
    // Simulate payment redirect
    setTimeout(() => {
        alert('Payment gateway integration would go here. Thank you for your order!');
        event.target.reset();
    }, 2000);
}

// Set minimum date for delivery (tomorrow)
document.addEventListener('DOMContentLoaded', () => {
    const deliveryDate = document.getElementById('deliveryDate');
    if (deliveryDate) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        deliveryDate.min = tomorrow.toISOString().split('T')[0];
    }
    
    // Load initial products
    loadProducts();
    
    // Animate elements on scroll
    observeElements();
});

// Intersection Observer for animations
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const elements = document.querySelectorAll('.category-card, .product-card, .about-content, .contact-content');
    elements.forEach(el => observer.observe(el));
}

// Instagram feed click handler
document.querySelectorAll('.instagram-post').forEach(post => {
    post.addEventListener('click', () => {
        window.open('https://instagram.com', '_blank');
    });
});

// Parallax effect for hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Form validation enhancement
document.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => {
        if (field.hasAttribute('required') && !field.value.trim()) {
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });
});

// Add smooth hover effects
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const x = e.pageX - this.offsetLeft;
        const y = e.pageY - this.offsetTop;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

// Apply lazy loading to all images
document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// Add to favorites functionality
function addToFavorites(productId) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.includes(productId)) {
        favorites.push(productId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        showNotification('Added to favorites!');
    } else {
        showNotification('Already in favorites!');
    }
}

// Search functionality
function searchProducts(query) {
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    
    productsGrid.innerHTML = filtered.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-overlay">
                    <button class="quick-view" onclick="viewProduct(${product.id})">
                        <i class="fas fa-eye"></i> Quick View
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="price">$${product.price}</span>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize AOS-like animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

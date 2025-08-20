// Sky Makeup Website JavaScript

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to header
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(74, 144, 226, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(74, 144, 226, 0.1)';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe product cards and feature items
    const animatedElements = document.querySelectorAll('.product-card, .feature-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Product navigation functions
function openProduct(productId) {
    // Store product ID in localStorage for the detail page
    localStorage.setItem('selectedProduct', productId);
    
    // Navigate to product detail page
    window.location.href = 'product-detail.html';
}

// Product detail page functions
function changeMainImage(thumbnail) {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Remove active class from all thumbnails
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    // Add active class to clicked thumbnail
    thumbnail.classList.add('active');
    
    // Change main image source
    mainImage.src = thumbnail.src;
    
    // Add fade effect
    mainImage.style.opacity = '0';
    setTimeout(() => {
        mainImage.style.opacity = '1';
    }, 150);
}

function selectColor(colorElement, colorName) {
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const selectedColorText = document.getElementById('selectedColor');
    
    // Remove active class from all swatches
    colorSwatches.forEach(swatch => swatch.classList.remove('active'));
    
    // Add active class to selected swatch
    colorElement.classList.add('active');
    
    // Update selected color text
    if (selectedColorText) {
        selectedColorText.textContent = `Cor selecionada: ${colorName}`;
    }
    
    // Add animation effect
    colorElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
        colorElement.style.transform = 'scale(1)';
    }, 200);
}

function addToCart() {
    const selectedColor = document.querySelector('.color-swatch.active');
    const productTitle = document.getElementById('productTitle').textContent;
    const productPrice = document.getElementById('productPrice').textContent;
    
    // Get selected color name
    let colorName = 'Brick-o-la'; // default
    if (selectedColor) {
        colorName = selectedColor.getAttribute('title');
    }
    
    // Create cart item object
    const cartItem = {
        name: productTitle,
        price: productPrice,
        color: colorName,
        quantity: 1,
        timestamp: new Date().getTime()
    };
    
    // Get existing cart or create new one
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => 
        item.name === cartItem.name && item.color === cartItem.color
    );
    
    if (existingItemIndex > -1) {
        // Increase quantity if item exists
        cart[existingItemIndex].quantity += 1;
    } else {
        // Add new item to cart
        cart.push(cartItem);
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show success message
    showNotification('Produto adicionado ao carrinho!', 'success');
    
    // Update cart counter if exists
    updateCartCounter();
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: bold;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update cart counter if element exists
    const cartCounter = document.getElementById('cartCounter');
    if (cartCounter) {
        cartCounter.textContent = totalItems;
        cartCounter.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

// Load product data on detail page
function loadProductData() {
    const selectedProduct = localStorage.getItem('selectedProduct');
    
    if (!selectedProduct) return;
    
    const productData = {
        'gloss-matte': {
            title: 'Gloss Matte Sky Makeup',
            price: 'R$ 29,90',
            description: `
                <p>A Sky Makeup estreia o novo produto da linha GlossGlow - A primeira linha de gloss matte nacional. A linha foi pensada para exatamente o que você e seus lábios precisam!</p>
                
                <p>Nosso gloss matte oferece:</p>
                <ul>
                    <li>Cobertura intensa e duradoura</li>
                    <li>Fórmula hidratante que não resseca os lábios</li>
                    <li>Acabamento matte sofisticado</li>
                    <li>Fácil aplicação</li>
                    <li>Não testado em animais</li>
                </ul>
            `
        },
        'tons-collection': {
            title: 'Coleção Tons Sky Makeup',
            price: 'R$ 99,90',
            description: `
                <p>Além do tom neutro casual, temos 4 tons para decorar seus lábios: Brick-o-la, Myth, Costa Chic e Angel.</p>
                
                <p>A coleção inclui:</p>
                <ul>
                    <li>4 glosses matte em tons únicos</li>
                    <li>Embalagem especial para presente</li>
                    <li>Guia de aplicação</li>
                    <li>Fórmula de longa duração</li>
                    <li>Cruelty free e vegano</li>
                </ul>
            `
        },
        'kit-completo': {
            title: 'Kit Completo Sky Makeup',
            price: 'R$ 149,90',
            description: `
                <p>Kit completo com todos os produtos da linha GlossGlow em embalagem especial para presente.</p>
                
                <p>O kit inclui:</p>
                <ul>
                    <li>Todos os 4 tons da coleção</li>
                    <li>Gloss matte neutro</li>
                    <li>Embalagem premium</li>
                    <li>Espelho compacto</li>
                    <li>Guia completo de aplicação</li>
                </ul>
            `
        }
    };
    
    const product = productData[selectedProduct];
    if (product) {
        document.getElementById('productTitle').textContent = product.title;
        document.getElementById('productPrice').textContent = product.price;
        document.getElementById('productDescription').innerHTML = product.description;
    }
}

// Initialize page-specific functions
document.addEventListener('DOMContentLoaded', function() {
    // Load product data if on detail page
    if (window.location.pathname.includes('product-detail.html')) {
        loadProductData();
    }
    
    // Update cart counter
    updateCartCounter();
    
    // Add mobile menu toggle functionality
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
});

// Product card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Form validation and submission (if forms are added later)
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ff4444';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}

// Newsletter subscription (placeholder)
function subscribeNewsletter(email) {
    if (!email || !email.includes('@')) {
        showNotification('Por favor, insira um email válido.', 'error');
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Obrigado por se inscrever em nossa newsletter!', 'success');
    }, 1000);
}

// Search functionality (placeholder)
function searchProducts(query) {
    if (!query.trim()) return;
    
    // Simulate search
    console.log('Searching for:', query);
    showNotification(`Buscando por "${query}"...`, 'info');
}

// Wishlist functionality (placeholder)
function toggleWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
        showNotification('Produto removido da lista de desejos', 'info');
    } else {
        wishlist.push(productId);
        showNotification('Produto adicionado à lista de desejos', 'success');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Performance optimization: Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});


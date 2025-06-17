// app.js - Основная логика сайта

// База данных товаров (имитация)
const products = {
    skates: [
        { id: 1, name: "Neon Phantom Deck", price: 4500, img: "images/skate1.jpg", description: "Прочная дека из 7 слоев канадского клена. Идеально подходит для стрита и парка. Неоновый дизайн светится в темноте.", sizes: ["8.0\"", "8.25\"", "8.5\""], reviews: [{author: "StreetRider", rating: "★★★★★", text: "Лучшая доска, что у меня была!"}, {author: "TonyH", rating: "★★★★☆", text: "Хороший щелчок, но графика могла быть ярче."}] },
        { id: 2, name: "Cyber Rider Complete", price: 8900, img: "images/skate2.jpg", description: "Готовый комплит для тех, кто хочет все и сразу. Легкие подвески, быстрые подшипники и цепкая шкурка.", sizes: ["7.75\"", "8.0\""], reviews: [{author: "Новичок", rating: "★★★★★", text: "Мой первый скейт, очень доволен!"}] },
        { id: 3, name: "Galaxy Cruiser", price: 7200, img: "images/skate3.jpg", description: "Круизер для комфортного перемещения по городу. Мягкие колеса и уникальный дизайн 'космос'.", sizes: ["28\""], reviews: [{author: "Городской", rating: "★★★★★", text: "Ездить на нем одно удовольствие."}] },
        { id: 4, name: "Pro Series 'Redline'", price: 5100, img: "images/skate4.jpg", description: "Про-модель с глубоким конкейвом для идеального контроля флипов.", sizes: ["8.125\"", "8.375\""], reviews: [{author: "Профи", rating: "★★★★★", text: "Контроль на высоте."}, {author: "Аноним", rating: "★★★★☆", text: "Отличная доска."}] },
    ],
    clothing: [
        { id: 5, name: "Neon Logo Hoodie", price: 3800, img: "images/clothes1.jpg", description: "Теплое худи с вышитым неоновым логотипом. 80% хлопок, 20% полиэстер.", sizes: ["S", "M", "L", "XL"], reviews: [{author: "Модник", rating: "★★★★★", text: "Очень стильно смотрится."}] },
        { id: 6, name: "Skate or Die T-Shirt", price: 1900, img: "images/clothes2.jpg", description: "Классическая футболка из плотного хлопка с дерзким принтом.", sizes: ["S", "M", "L"], reviews: [{author: "Олдскул", rating: "★★★★★", text: "Качество супер!"}] },
        { id: 7, name: "Rider Beanie", price: 1200, img: "images/clothes3.jpg", description: "Акриловая шапка-бини, которая согреет в прохладную погоду.", sizes: ["One Size"], reviews: [] },
        { id: 8, name: "Reflective Windbreaker", price: 5500, img: "images/clothes4.jpg", description: "Легкая ветровка со светоотражающими элементами для ночных катаний.", sizes: ["M", "L", "XL"], reviews: [{author: "NightCat", rating: "★★★★★", text: "Теперь меня видно издалека, безопасность превыше всего!"}] },
    ],
    parts: [
        { id: 9, name: "Glow Wheels (Set of 4)", price: 2500, img: "images/det1.jpg", description: "Колеса, светящиеся в темноте. Жесткость 99A, идеальны для гладких поверхностей.", sizes: ["52mm", "54mm"], reviews: [{author: "Тестер", rating: "★★★★★", text: "Светятся очень ярко, круто!"}] },
        { id: 10, name: "Titanium Trucks", price: 4800, img: "images/det2.jpg", description: "Сверхлегкие и прочные подвески из титанового сплава.", sizes: ["139mm", "149mm"], reviews: [{author: "Light-Man", rating: "★★★★★", text: "Скейт стал заметно легче."}] },
        { id: 11, name: "Ceramic Bearings", price: 3200, img: "images/det3.jpg", description: "Керамические подшипники для максимальной скорости и долговечности.", sizes: ["ABEC-9"], reviews: [] },
        { id: 12, name: "Neon Griptape", price: 900, img: "images/det4.jpg", description: "Цепкая шкурка с неоновым узором. Легко клеится и не рвется.", sizes: ["9\"x33\""], reviews: [{author: "Скейтер", rating: "★★★★★", text: "Держит ноги отлично."}] },
    ]
};

// Функция для поиска товара по ID
function findProductById(productId) {
    for (const category in products) {
        const product = products[category].find(p => p.id == productId);
        if (product) return product;
    }
    return null;
}


// --- Логика для страницы Каталога ---

function renderCatalog() {
    const skatesGrid = document.getElementById('skates-grid');
    const clothingGrid = document.getElementById('clothing-grid');
    const partsGrid = document.getElementById('parts-grid');
    
    if (!skatesGrid) return; // Выходим, если мы не на странице каталога

    const createProductCard = (product) => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="product-price">${product.price} руб.</p>
            <div class="product-hover-overlay">
                <a href="product.html?id=${product.id}" class="btn btn-secondary">Осмотреть товар</a>
                <button class="btn add-to-cart-btn" data-id="${product.id}">Добавить в корзину</button>
            </div>
        </div>
    `;

    skatesGrid.innerHTML = products.skates.map(createProductCard).join('');
    clothingGrid.innerHTML = products.clothing.map(createProductCard).join('');
    partsGrid.innerHTML = products.parts.map(createProductCard).join('');
    
    addEventListenersToButtons();
}


// --- Логика для страницы Товара ---

function renderProductDetails() {
    const container = document.getElementById('product-details-container');
    if (!container) return; // Выходим, если не на странице товара

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const product = findProductById(productId);

    if (!product) {
        container.innerHTML = "<p>Товар не найден.</p>";
        return;
    }

    const sizeOptions = product.sizes.map(size => `<option value="${size}">${size}</option>`).join('');

    container.innerHTML = `
        <div class="product-image-gallery">
            <img src="${product.img}" alt="${product.name}">
        </div>
        <div class="product-details">
            <h1>${product.name}</h1>
            <p class="product-price">${product.price} руб.</p>
            <p class="product-description">${product.description}</p>
            <div class="form-group">
                <label for="size-select">Выберите размер:</label>
                <select id="size-select">${sizeOptions}</select>
            </div>
            <button class="btn add-to-cart-btn" data-id="${product.id}">Добавить в корзину</button>
        </div>
    `;
    
    // Рендер отзывов
    const reviewsList = document.getElementById('reviews-list');
    if (product.reviews && product.reviews.length > 0) {
        reviewsList.innerHTML = product.reviews.map(review => `
            <div class="review">
                <div class="review-header">
                    <span class="review-author">${review.author}</span>
                    <span class="review-rating">${review.rating}</span>
                </div>
                <p class="review-text">${review.text}</p>
            </div>
        `).join('');
    } else {
        reviewsList.innerHTML = "<p>Отзывов пока нет. Станьте первым!</p>";
    }
    
    addEventListenersToButtons();
}


// --- Логика для Корзины ---

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = findProductById(productId);
    
    // Определяем выбранный размер
    const sizeSelect = document.getElementById('size-select');
    const size = sizeSelect ? sizeSelect.value : product.sizes[0]; // Если размера нет, берем первый

    const existingProductIndex = cart.findIndex(item => item.id == productId && item.size == size);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            quantity: 1,
            size: size
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
    showCartNotification(product.name);
}

function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const counter = document.getElementById('cart-counter');
    if (counter) {
        counter.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}

function showCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = `Товар "${productName}" добавлен в корзину!`;
    document.body.appendChild(notification);
    
    // Добавим стили для уведомления
    const style = document.createElement('style');
    style.innerHTML = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--neon-red);
            color: #fff;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 1001;
            box-shadow: 0 0 15px var(--neon-red);
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease-out;
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function renderCart() {
    const cartContainer = document.getElementById('cart-container');
    if (!cartContainer) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Ваша корзина пуста</h2>
                <a href="catalog.html" class="btn">Перейти в каталог</a>
            </div>
        `;
        return;
    }

    let total = 0;
    const cartItemsHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="cart-item" data-id="${item.id}" data-size="${item.size}">
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>Размер: ${item.size}</p>
                    <p>Цена: ${item.price} руб.</p>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn decrease-btn">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn increase-btn">+</button>
                </div>
                <p class="cart-item-price">${item.price * item.quantity} руб.</p>
                <button class="remove-btn">✖</button>
            </div>
        `;
    }).join('');

    cartContainer.innerHTML = `
        <div class="cart-items">
            ${cartItemsHTML}
        </div>
        <div class="cart-summary">
            <h2>Итого: ${total} руб.</h2>
            <div class="cart-actions">
                <a href="catalog.html" class="btn btn-secondary">Посмотреть еще что-нибудь</a>
                <a href="checkout.html" class="btn">Оформить заказ</a>
            </div>
        </div>
    `;

    addCartEventListeners();
}

function addCartEventListeners() {
    document.querySelectorAll('.increase-btn').forEach(button => {
        button.addEventListener('click', (e) => updateQuantity(e, 1));
    });
    document.querySelectorAll('.decrease-btn').forEach(button => {
        button.addEventListener('click', (e) => updateQuantity(e, -1));
    });
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

function updateQuantity(event, change) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    const itemElement = event.target.closest('.cart-item');
    const productId = itemElement.dataset.id;
    const productSize = itemElement.dataset.size;
    
    const itemIndex = cart.findIndex(item => item.id == productId && item.size == productSize);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCounter();
    }
}

function removeItem(event) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    const itemElement = event.target.closest('.cart-item');
    const productId = itemElement.dataset.id;
    const productSize = itemElement.dataset.size;

    const updatedCart = cart.filter(item => !(item.id == productId && item.size == productSize));
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    renderCart();
    updateCartCounter();
}


// --- Общие функции и слушатели ---

function addEventListenersToButtons() {
    // Слушатели для кнопок "Добавить в корзину"
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        // Удаляем старый слушатель, чтобы избежать дублирования
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            addToCart(productId);
        });
    });
}

// Глобальный слушатель загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Вызов нужных функций в зависимости от страницы произойдет
    // в инлайн-скриптах на самих HTML-страницах
});

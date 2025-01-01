let cart = [];
let total = 0;
let filteredProducts = [];  // 用于存储根据分类过滤后的商品

// 商品数据
const products = [

    { id: 1, name: "生存·Kit", price: 16, category: "kits", img: "images/sc_kit.png" },
    { id: 2, name: "不死图腾", price: 1, category: "combat", img: "images/totem.png" },
    { id: 3, name: "火箭（1级）", price: 6, category: "travel", img: "images/firework_1.png" },
    { id: 4, name: "火箭（3级）", price: 12, category: "travel", img: "images/firework_3.png" },
    { id: 5, name: "金苹果", price: 30, category: "combat", img: "images/golden_apple.png" },
    { id: 6, name: "黑曜石", price: 2, category: "building", img: "images/obsidian.png" },
    { id: 7, name: "紫颂果", price: 10, category: "combat", img: "images/chorus_fruit.png" },
    { id: 8, name: "火药", price: 8, category: "materials", img: "images/gunpowder.png" },
    { id: 9, name: "甘蔗", price: 5, category: "materials", img: "images/sugar_cane.png" },
    { id: 10, name: "大佬护送带出出生点（护送员：666666）", price: 20, category: "00", img: "images/fish.jpg" },
    { id: 11, name: "大佬护送带出出生点（护送员：1q1q1q1qzs）", price: 10, category: "00", img: "images/1q1q1q1qzs.jpg" },
    { id: 12, name: "大佬护送带出出生点（护送员：weishenxv）", price: 50, category: "00", img: "images/91.jpg" },
    { id: 13, name: "大佬护送带出出生点（护送员：YangPai_MC）", price: 200, category: "00", img: "images/yangpai.jpg" },
    { id: 14, name: "大佬护送带出出生点（护送员：yyoyyo）", price: 5, category: "00", img: "images/yo.jpg" },
    { id: 15, name: "大佬护送带出出生点（护送员：JIANGDAOJIE）", price: 8, category: "00", img: "images/jiang.jpg" },
    { id: 16, name: "大佬护送带出出生点（护送员：hahahahai）", price: 12, category: "00", img: "images/ha.jpg" }
];

// 渲染商品
function renderProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';  // 清空现有商品内容

    // 使用过滤后的商品数组，或者使用所有商品
    const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;

    displayProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        
        // 判断是否是需要禁用并修改按钮文字的商品
        let addToCartBtnText = "加入购物车";  // 默认按钮文字
        let isButtonDisabled = false;  // 默认按钮不禁用

        // 举例：让 id 为 1 的商品禁用按钮，并修改按钮文字
        if (product.id === 1) {
            addToCartBtnText = "已售罄";  // 修改按钮文字
            isButtonDisabled = true;  // 禁用按钮
        }

        productDiv.innerHTML = 
            `<img src="${product.img}" alt="${product.name}">
            <div class="product-name">${product.name}</div>
            <div class="product-price">${product.price}￥</div>
            <button class="add-to-cart" ${isButtonDisabled ? 'disabled' : ''} onclick="addToCart(${product.id})">${addToCartBtnText}</button>`;
        productsContainer.appendChild(productDiv);
    });
}

// 添加商品到购物车
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    total += product.price;
    updateCart();
}

// 更新购物车显示
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} X ${item.quantity} ${item.price * item.quantity}￥`;
        cartItemsContainer.appendChild(listItem);
    });

    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (total < 10) {
        cartTotal.textContent = '起送价10￥';
        checkoutBtn.textContent = '起送价10￥';
        checkoutBtn.disabled = true;
        checkoutBtn.style.backgroundColor = '#d3d3d3';
    } else {
        cartTotal.textContent = `共计：${total}￥`;
        checkoutBtn.textContent = '下单';
        checkoutBtn.disabled = false;
        checkoutBtn.style.backgroundColor = '#28a745';
    }
}

// 切换购物车面板显示
function toggleCart() {
    const cartPanel = document.getElementById('cart-panel');
    cartPanel.classList.toggle('open');
}

// 结算订单
function checkout() {
    const orderSummary = cart.map(item => `${item.name} X ${item.quantity} ${item.price * item.quantity}￥`).join('\n');
    const orderText = `===3c3u.xin===\n${orderSummary}\n共计：${total}￥`;

    // 将订单复制到剪切板
    navigator.clipboard.writeText(orderText).then(() => {
        alert("已将订单复制到剪切板，请与QQ群1016886258管理员或群主私信并发送订单");
        cart = [];
        total = 0;
        updateCart();
        toggleCart();
    });
}

// 分类选择功能
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const category = e.target.getAttribute('data-category');
        if (category === 'all') {
            filteredProducts = [];
        } else {
            filteredProducts = products.filter(p => p.category === category);
        }

        renderProducts();
    });
});

// 初始化商品展示
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCart();  // 确保下单按钮初始为禁用状态
});

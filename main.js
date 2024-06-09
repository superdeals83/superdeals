// Custom JavaScript for the e-commerce site
// Array to store product data
let search_data = [];

// Function to toggle visibility of floating buttons
function toggleFloatingButtons() {
    var floatingButtons = document.querySelector('.floating-buttons');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        floatingButtons.style.display = 'block';
    } else {
        floatingButtons.style.display = 'none';
    }
}

// Event listener for dropdown selection
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        const selectedValue = this.getAttribute('data-value');
        const selectedText = this.textContent;
        document.getElementById("dropdownMenuButton").textContent = selectedText;

        // Update products based on the selected sorting order
        if (selectedValue === 'low-to-high') {
            updateProductsByPriceOrder('low-to-high');
        } else if (selectedValue === 'high-to-low') {
            updateProductsByPriceOrder('high-to-low');
        }
    });
});

// Function to update the displayed products based on the selected price order
function updateProductsByPriceOrder(order) {
    var productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = ''; // Clear existing products

    // Sort the products based on the selected order
    if (order === 'low-to-high') {
        search_data.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    } else if (order === 'high-to-low') {
        search_data.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    }

    // Display sorted products
    search_data.forEach(function(product) {
        const productCard = createProductCard(product.name, product.image, product.logo, product.price, product.discount, product.link);
        productContainer.appendChild(productCard);
    });
}

// Event listener for scroll event to toggle floating buttons visibility
window.addEventListener('scroll', function() {
    toggleFloatingButtons();
});

// Function to fetch and load product data from file
function load_products() {
    var productContainer = document.getElementById('productContainer');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'assets/index.txt', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const lines = xhr.responseText.split('\n');
            lines.forEach(function (line) {
                if (line.trim() !== '') {
                    const parts = line.split('|'); // Split by a delimiter, e.g., '|'
                    const name = parts[0];
                    const image = parts[1];
                    const logo = parts[2];
                    const price = parts[3];
                    const discount = parts[4];
                    const link = parts[5];
                    const product = {
                        name: name,
                        image: image,
                        logo: logo,
                        price: price,
                        discount: discount,
                        link: link
                    };
                    search_data.push(product);
                }
            });
            // Initial load of products
            updateProductsByPriceOrder('low-to-high'); // Default initial order
            document.getElementById("counter").textContent = search_data.length;
        }
    };
    xhr.send();
}

function createProductCard(name, image, logo, price, discount, link) {
    // Create product card element
    var card = document.createElement('div');
    card.classList.add('col');

    // Construct HTML for product card
    var cardHTML = `
        <div class="card text-center">
            <div><span class="discount-badge">${discount}%</span>
            <img src="assets/img/${image}" class="card-img-top" alt="Product Image">
            <img src="assets/${logo}" class="card-img px-3 " alt="Affiliate Company Logo"></div>
            <div class="card-body">
                <h6 class="card-title text-sm">${name}</h6>
                <p class="card-text">Price: ₹${price}</p>
                <a href="${link}" class="btn btn-primary">Buy Now</a>
            </div>
        </div>
    `;

    // Set HTML content of card
    card.innerHTML = cardHTML;

    // Return created product card
    return card;
}

// Toggle between grid and list view
document.getElementById('toggleViewBtn').addEventListener('click', function() {
    var productContainer = document.getElementById('productContainer');
    if (productContainer.classList.contains('row-cols-2')) {
        productContainer.classList.remove('row-cols-2');
        productContainer.classList.add('list-view');
        this.innerHTML = '<i class="bi bi-list"></i> list View';
    } else {
        productContainer.classList.remove('list-view');
        productContainer.classList.add('row-cols-2');
        this.innerHTML = '<i class="bi bi-grid"></i> grid View';
    }
});


// Function to initialize the page
function init() {
    load_products(); // Load products initially
}

// Call the init function when the page is loaded
window.onload = init;

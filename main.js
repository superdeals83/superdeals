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

// Function to update the displayed products based on the current price range
function updateProductsByPriceRange(maxPrice) {
    var productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = ''; // Clear existing products
    
    search_data.forEach(function(product) {
        var price = parseInt(product.price);
        if (price <= maxPrice) {
            const productCard = createProductCard(product.name, product.image, product.logo, product.price, product.discount, product.link);
            productContainer.appendChild(productCard);
        }
    });
}

// Event listener for scroll event to toggle floating buttons visibility
window.addEventListener('scroll', function() {
    toggleFloatingButtons();
});

function updateSliderValue(value) {
    document.getElementById('sliderValue').textContent ="₹"+ value;
}


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
            updateProductsByPriceRange(50000); // Assuming initial range is from ₹100 to ₹100000
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
            <img src="assets/img/${logo}" class="card-img px-3 " alt="Affiliate Company Logo"></div>
            <div class="card-body">
                <h6 class="card-title text-sm">${name}</h6>
                <p class="card-text">Price:  ₹${price}</p>
                <a href="${link}" class="btn btn-primary">Buy Now</a>
            </div>
        </div>
    `;

    // Set HTML content of card
    card.innerHTML = cardHTML;

    // Return created product card
    return card;
}


// Function to initialize the page
function init() {
    load_products(); // Load products initially
    var customRange1 = document.getElementById('customRange1');
    customRange1.addEventListener('input', function() {
        var value = parseInt(this.value);
        updateSliderValue(value); // Update the slider value display
    });
    // Initialize slider value
    updateSliderValue(customRange1.value);
    
    // Update products when slider value changes
    customRange1.addEventListener('change', function() {
        var maxPrice = parseInt(this.value); // Assuming max price is the upper bound of the slider
        updateProductsByPriceRange(maxPrice);
    });
}
// Call the init function when the page is loaded
window.onload = init;

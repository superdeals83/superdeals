// Custom JavaScript for the e-commerce site

// Function to toggle visibility of floating buttons
function toggleFloatingButtons() {
    var floatingButtons = document.querySelector('.floating-buttons');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        floatingButtons.style.display = 'block';
    } else {
        floatingButtons.style.display = 'none';
    }
}

// Event listener for scroll event to toggle floating buttons visibility
window.addEventListener('scroll', function() {
    toggleFloatingButtons();
});

function updateSliderValue(value) {
    document.getElementById('sliderValue').textContent ="₹"+ value;
}


function load_products(){
    // AJAX request to fetch product data
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
    
                    const productCard = createProductCard(name, image, logo, price, discount, link);
                    productContainer.appendChild(productCard);
                }
            });
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
        <div class="card text-center mx-5">
            <div><span class="discount-badge">${discount}%</span>
            <img src="assets/img/${image}" class="card-img-top" alt="Product Image">
            <img src="assets/img/${logo}" class="card-img px-3 " alt="Affiliate Company Logo"></div>
            <div class="card-body">
                <h5 class="card-title text-sm">${name}</h5>
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
    load_products();
}

// Call the init function when the page is loaded
window.onload = init;

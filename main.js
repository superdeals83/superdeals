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
            // updateProductsByPriceOrder('low-to-high'); // Default initial order
            search_data.reverse();
            // Display products
            search_data.forEach(function(product) {
                const productCard = createProductCard(product.name, product.image, product.logo, product.price, product.discount, product.link);
                productContainer.appendChild(productCard);
            });
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
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <span class="discount-badge">${discount}%</span>
                                <img src="assets/img/${image}" class="card-img-top img-fluid" alt="Product Image">
                            </div>
                        </div>
                        <div class="row justify-center mt-2">
                            <div class="col-12 text-center">
                                <img src="assets/${logo}" class="card-img px-3 img-fluid" alt="Company Logo">
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="container">
                            <div class="row mb-2">
                                <div class="col-12 text-center">
                                    <h6 class="card-title text-sm small text-wrap">${name}</h6>
                                    <p class="card-text small">Price:  ₹${price}</p>
                                </div>
                            </div> 
                        </div>
                        <a href="${link}" class="btn btn-primary">View Details</a>
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

document.addEventListener("DOMContentLoaded", function() {
    if(window.innerWidth >= 1024){
        function applyLargeScreenStyles() {
            const productContainer = document.querySelector('#productContainer');
    
            if (productContainer) {
                // Remove old classes
                productContainer.classList.remove('row-cols-1', 'row-cols-md-2');
                // Add new classes
                productContainer.classList.add('row-cols-4', 'row-cols-md-4');
    
            } 
            document.querySelector('#superdealslogo').classList.replace('col-2','col-1');
            var logo = document.querySelector('#superdeals_logo');
            logo.style.width='80px';
            logo.style.height = '80px';
            document.querySelector('#superdealstitle').classList.replace('col-9','col-11');
            document.querySelector('#toggleViewBtn').style.display='none';
            document.querySelector('#banner').style.height='220px';

        }
    
        // Apply styles initially
        applyLargeScreenStyles();
    
        // Reapply styles on window resize
        window.addEventListener('resize', function() {
            applyLargeScreenStyles();
        });
        const style = document.createElement('style');
        style.innerHTML = `
            .card {
                position: relative;
                overflow: hidden; /* Ensures the enlarged image does not overflow the card */
            }
            
            .card-img-top {
                transition: transform 0.3s ease; /* Smooth transition for the transform property */
            }
            
            .card-img-top:hover {
                transform: scale(1.2); /* Scale the image to 120% of its original size */
            }
        `;
        document.head.appendChild(style);
    
        const cardImgTop = document.querySelector('.card-img-top');
    
        cardImgTop.addEventListener('mouseover', function() {
            cardImgTop.style.transform = 'scale(1.2)';
        });
    
        cardImgTop.addEventListener('mouseout', function() {
            cardImgTop.style.transform = 'scale(1)';
        });
    }
});




// Function to initialize the page
function init() {
    load_products(); // Load products initially
}

// Call the init function when the page is loaded
window.onload = init;

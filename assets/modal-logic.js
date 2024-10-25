// Modal logic

function openModal(productId, productTitle, productImageSrc, productPrice) {
    const modal = document.getElementById('productModal');
    const product = productCollection.find(product => product.id.toString() === productId.toString());

    if (modal && product.variants !== null) {
        const modalImage = document.getElementById('modal-product-image');
        const modalTitle = document.getElementById('modal-product-title');
        const modalPrice = document.getElementById('modal-product-price');
        const modalButton = document.getElementById('modal-product-button');
        const modalVariants = document.getElementById('modal-product-variants');
        
        modalImage.src = productImageSrc;
        modalTitle.textContent = productTitle;
        modalPrice.textContent = productPrice;
        modalButton.textContent = productPrice + ' - ADD TO CART';

        createVariants(product.variants, productId, modalVariants);

        getFullDate();

        modal.classList.remove('hidden');
    } else{
        console.log('Product add to cart ');
    }
}
// Modal logic

// Slider logic
let slideCounter = 1; 

function createSliderProducts(url) {
    let slider = '';
    slider += `
        <img id="modal-product-delete-${slideCounter}" class="swiper-slide w-full h-full object-cover rounded-lg" alt="Photo of product" width="340" height="340" src="${url}">   
    `;
    swiper2.appendSlide(slider);

    slideCounter++; 
}
function clearSliderProducts() {
    slideCounter = 1;
    swiper2.removeAllSlides();
    let newSlide = `
        <img id="modal-product-image" class="swiper-slide w-full h-full object-cover rounded-lg" alt="Photo of product" width="340" height="340" src="">   
    `;
    swiper2.appendSlide(newSlide);
}
// Slider logic

// Radio button logic
function selectVariantModal(radioBtn) {
    
    const siblings = radioBtn.closest('.product-variants').querySelectorAll('.variant-label span');
    siblings.forEach(sibling => {
        sibling.classList.remove('ring-2', 'ring-[#CB8A3D]');
    });
    
    radioBtn.nextElementSibling.classList.add('ring-2', 'ring-black');

    const slideIndex = radioBtn.dataset.slideIndex;

    if (slideIndex !== undefined && swiper2) {
        swiper2.slideTo(slideIndex);
    }
}
function createVariants(variants, productId, modalVariants, defaultImage) { 
    let variantsHTML = '';
    let slideIndex = 1; 

    variants.forEach(variant => {
        const variantImageUrl = variant.featured_image ? variant.featured_image.src : defaultImage;
        createSliderProducts(variantImageUrl);

        variantsHTML += `
            <label class="variant-label cursor-pointer">
                <input type="radio" name="product_${productId}_variant" class="hidden variant-radio" data-slide-index="${slideIndex}" data-variant-id="${variant.id}" onclick="selectVariantModal(this)" />
                <span class="h-6 w-6 inline-block rounded-full border border-gray-200" style="background-color: ${variant.option1}" title="${variant.title}"></span>
            </label>`;
        
        slideIndex++; 
    });

    modalVariants.innerHTML = variantsHTML;  
}
// Radio button logic

// Date logic
function getFullDate() {
    let data = new Date();
    data.setDate(data.getDate() + 2); 

    const modalData = document.getElementById('modal-product-date');  
    let dayOfWeek = data.getDay();  
    let dayOfMonth = data.getDate();  
    let month = data.getMonth();  

    let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    modalData.innerHTML = `Order now to receive as soon as <span style="color: black;">${dayNames[dayOfWeek]} ${dayOfMonth} ${monthNames[month]}</span>`;
}
// Date logic

// Modal logic
function closeModal(boolean) {
    clearSliderProducts();
    document.getElementById('productModal').classList.add('hidden');
    if (boolean) {
        console.log('Product add to cart');
    }
}

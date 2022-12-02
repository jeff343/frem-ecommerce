//////////////
// Mobile Menu
//////////////

const toggleMenu = () => {
    const cover = document.querySelector(".cover")
    const navItems = document.querySelector(".nav-items")
    const navClose = document.querySelector(".nav-close")

    navItems.classList.toggle("visible")
    cover.classList.toggle("visible")
    navClose.classList.toggle("dnone")
}

document.querySelector(".nav-menu").addEventListener("click",toggleMenu)
document.querySelector(".nav-close").addEventListener("click",toggleMenu)


////////////////////////
// Select Display Image
////////////////////////

const imgThumb = document.querySelectorAll(".img-thumb")

const toggleActiveThumb = (e) => {
    for (let i = 0; i < imgThumb.length; i++) {
        imgThumb[i].classList.remove("active-thumb")
    }
    e.currentTarget.classList.add("active-thumb")
}

const changeDisplayImage = (e) => {
    const prodImgArr = document.querySelectorAll(".prod-img")
    for (let i = 0; i < prodImgArr.length; i++) {
        prodImgArr[i].classList.remove("carousel")
        prodImgArr[i].classList.add("dnone")
    }

    prodImgArr[e.currentTarget.dataset.key].classList.add("carousel")
    prodImgArr[e.currentTarget.dataset.key].classList.remove("dnone")
    
}

for (let i = 0; i < imgThumb.length; i++) {
    imgThumb[i].addEventListener("click", (e) => {
        toggleActiveThumb(e)
        changeDisplayImage(e)
    })
}

/////////////////////
// Cart Item Quantity
/////////////////////

const amtToAdd = document.querySelector(".to-add")
const increaseBtn = document.querySelector("#increase")
const decreaseBtn = document.querySelector("#decrease")

const increaseTotal = () => {
    let count = amtToAdd.innerHTML
    count++
    amtToAdd.innerHTML = count
}

const decreaseTotal = () => {
    let count = amtToAdd.innerHTML
    if (count > 0) {
        count--
        amtToAdd.innerHTML = count
    }
}

increaseBtn.addEventListener("click", increaseTotal)
decreaseBtn.addEventListener("click", decreaseTotal)

//////////////
// Add To Cart
//////////////

const addToCartBtn = document.querySelector(".cart-add-btn")

const addToCart = () => {
    const prodTotal = amtToAdd.innerHTML
    const prodName = document.querySelector("#prod-name").innerHTML
    const prodPrice = document.querySelector(".disc-price").innerHTML.match(/[0-9\.]/g).join('')
    const totalPrice = parseInt(prodPrice) * parseInt(prodTotal)

    document.querySelector(".cart-prod-img").src = document.querySelector(".prod-img").src
    document.querySelector(".cart-prod-img").classList.remove("dnone")
    document.querySelector(".item-remove").classList.remove("dnone")

    document.querySelector(".cart-total").innerHTML = 
    `${prodName} <br /> ${prodPrice} x ${prodTotal}<span class="cart-price">${totalPrice}</span>`

    document.querySelector(".cart-notif").style.display = "block"
    document.querySelector(".cart-notif").innerHTML = `${prodTotal}`

    amtToAdd.innerHTML = 0

}

addToCartBtn.addEventListener("click", addToCart)

////////////////////
// Remove Cart Items
////////////////////

const removeCartItems = () => {
    document.querySelector(".cart-total").innerHTML = `Your cart is currently empty!`
    document.querySelector(".cart-prod-img").classList.add("dnone")
    document.querySelector(".item-remove").classList.add("dnone")
    document.querySelector(".cart-notif").style.display = "none"
}

document.querySelector(".item-remove").addEventListener("click", removeCartItems)

//////////////
// Cart Toggle
//////////////

const toggleCartDisplay = () => {
    document.querySelector(".cart-display").classList.toggle("dnone")
}

document.querySelector(".cart").addEventListener("click",toggleCartDisplay)

////////////////////
// Cart Notification
////////////////////



//////////////////////////
// Lightbox Open and Close
//////////////////////////


// opens lightbox
const openLightbox = (e) => {
    document.querySelector(".lightbox-modal").style.display = "block"
}

// closes lightbox and removes active thumbnail
const closeLightbox = () => {
    document.querySelector(".lightbox-modal").style.display = "none"
    document.querySelector(".active-modal").classList.remove("active-modal")
}

// sets active lightbox picture
const lightboxPicture = (e) => {
    document.querySelector(".slide-img").src = e.currentTarget.src
}

// assigns active lightbox thumb based on active thumbnail
const lightBoxThumb = (e) => {
    const activeThumb = document.querySelector(".active-thumb")
    const modalThumbs = document.querySelectorAll(".modal-thumb")
    modalThumbs[activeThumb.dataset.key].classList.add("active-modal")
}

for (let i = 0; i < document.querySelectorAll(".prod-img").length; i++ ) {
    document.querySelectorAll(".prod-img")[i].addEventListener("click", (e) => {
        if (screen.width > 880) {
        openLightbox(e)
        lightboxPicture(e)
        lightBoxThumb(e)
        }
    })
}

document.querySelector(".lightbox-close").addEventListener("click", closeLightbox)

//////////////////////////
// Lightbox modal controls
//////////////////////////


const modalThumb = document.querySelectorAll(".modal-thumb")
const slideImg = document.querySelector(".slide-img")

const selectModalImage = (e) => {
    slideImg.src=(e.currentTarget.firstElementChild.src.replace("-thumbnail",""))
}

const selectActiveModalThumb = (e) => {
    document.querySelector(".active-modal").classList.remove("active-modal")
    e.currentTarget.classList.add("active-modal")
}

const nextImage = () => {
    let count = parseInt(document.querySelector(".active-modal").dataset.modal)
    count === 3 ? count = 0 : count++
    document.querySelector(".active-modal").classList.remove("active-modal")
    modalThumb[count].classList.add("active-modal")
    slideImg.src=(modalThumb[count].firstElementChild.src.replace("-thumbnail",""))
}

const prevImage = () => {
    let count = parseInt(document.querySelector(".active-modal").dataset.modal)
    count === 0 ? count = 3 : count--
    document.querySelector(".active-modal").classList.remove("active-modal")
    modalThumb[count].classList.add("active-modal")
    slideImg.src=(modalThumb[count].firstElementChild.src.replace("-thumbnail",""))
}

for (let i = 0; i < modalThumb.length; i++) {
    modalThumb[i].addEventListener("click", (e) => {
        selectModalImage(e)
        selectActiveModalThumb(e)
    })
}

document.querySelector(".next").addEventListener("click", nextImage)
document.querySelector(".prev").addEventListener("click", prevImage)

////////////////////////
// Mobile Image Carousel
////////////////////////

const nextMobileImage = () => {
    const prodImg = document.querySelector(".carousel")
    const prodImgArr = document.querySelectorAll(".prod-img")
    let count = parseInt(prodImg.dataset.key)
    prodImg.classList.remove("carousel")
    prodImg.classList.add("dnone")
    count === 3 ? count=0 : count++
    prodImgArr[count].classList.remove("dnone")
    prodImgArr[count].classList.add("carousel")
}

const prevMobileImage = () => {
    const prodImg = document.querySelector(".carousel")
    const prodImgArr = document.querySelectorAll(".prod-img")
    let count = parseInt(prodImg.dataset.key)
    prodImg.classList.remove("carousel")
    prodImg.classList.add("dnone")
    count === 0 ? count=3 : count--
    prodImgArr[count].classList.remove("dnone")
    prodImgArr[count].classList.add("carousel")
}

document.querySelector(".next-mobile").addEventListener("click", nextMobileImage)
document.querySelector(".prev-mobile").addEventListener("click", prevMobileImage)
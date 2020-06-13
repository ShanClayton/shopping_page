var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        image: './assets/Greensocks.jpg',
        altText: 'green socks',
        inStock: false,
        onSale: true,
        details: ["75% bamboo", "22% polyamide", "3% spandex", "Gender-neutral"],
        variants: [{
                variantId: 1234,
                variantColor: 'green',
                variantImage: './assets/Greensocks.jpg'
            },
            {
                varidantId: 4321,
                variantColor: 'blue',
                variantImage: './assets/bluesocks.jpg'
            }
        ],
        cart: 0
    },
    methods: {
        // increment
        addToCart() {
            this.cart += 1
        },
        //decrement
        removeFromCart() {
            this.cart -= 1
        },
        //mouseover
        updateProduct(variantImage) {
            this.image = variantImage
        }
    }
})

//NOTES AND CODE DUMP
//not all browsers will support es6 version of function addToCart: function ()
// sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL']
// link: 'https://www.amazon.com/Rambutan-Leaves-Bamboo-Seamless-8-5-12-5/dp/B00KAHGDA4/ref=sr_1_6?dchild=1&keywords=green+socks&qid=1591942969&sr=8-6'
//< span v-if= "onSale" > Sale!</span > 
//< p v -if= "inventory > 10" > In Stock</p >
// <p v-else-if="inventory <=10 && inventory > 0">Almost sold out! Hurry!</p>
//<p v-else="OutStock">Out of Stock</p>
//<button v-on: click='removeFromCart'>Remove</button>
// <a : href="link" target="_blank">See more products like this</a> 
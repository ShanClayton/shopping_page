//created component from details in data
Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
    <ul>
    <li v-for="detail in details">{{ detail }}</li>
    </ul>`
})

//product info goes here
Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },

    template: `<div class="product">

            <div class="product-image">
                <!-- v-bind binds an attribute to an expression -->
                <img v-bind:src="image" v-bind:alt="altText">

            </div>

            <div class="product-info">
                <h1>{{product }}</h1>
                <!-- conditional rendering -->
                <p v-if="inStock">In Stock</p>
                <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
                <!-- <p>{{ sale }}</p> -->
                <p> Shipping: {{ shipping}}</p>
                 <product-details :details="details"></product-details>
                <!-- binding a style with mouseover -->
                <div v-for="(variant,index) in variants" :key="variant.variantId" class="color-box"
                    :style="{backgroundColor: variant.variantColor}" @mouseover="updateProduct(index)">
                </div>

                <!-- increase cart number when clicked and class binding instock button turns grey with item is not in stock
                <button v-on:click='addToCart' :disabled='!inStock' :class="{disabledButton: !inStock}">Add to
                    Cart</button>
                <div class="cart">
                    <p>Cart ({{cart}})</p>
                </div>
            </div>
        </div>`,


    //data goes here 
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            selectedVariant: 0,
            altText: 'green socks',
            onSale: true,
            details: ["75% bamboo", "22% polyamide", "3% spandex", "Gender-neutral"],
            variants: [{
                    variantId: 1234,
                    variantColor: 'green',
                    variantImage: './assets/Greensocks.jpg',
                    variantQuanity: 20
                },
                {
                    varidantId: 4321,
                    variantColor: 'blue',
                    variantImage: './assets/bluesocks.jpg',
                    variantQuanity: 0
                }
            ],
            cart: 0,
            onSale: true
        }
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
        updateProduct(index) {
            this.selectedVariant = index
        }
    },
    //computed properties are best used when you have expensive operation when you don't want to rerun it when you access it
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        //do this on multiple  mouseover images
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuanity
        },
        //create boolean to show if brand and product are on sale
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' are on sale! '
            }
            return this.brand + ' ' + this.product + ' are not on sale, sorry '
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 5.99
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        //for prime members 
        premium: true
    }
})

//NOTES AND CODE DUMP
// image: './assets/nameofimage.jpg'
//not all browsers will support es6 version of function addToCart: function ()
// sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL']
// link: 'https://www.amazon.com/Rambutan-Leaves-Bamboo-Seamless-8-5-12-5/dp/B00KAHGDA4/ref=sr_1_6?dchild=1&keywords=green+socks&qid=1591942969&sr=8-6'
//< span v-if= "onSale" > Sale!</span > 
//< p v -if= "inventory > 10" > In Stock</p >
// <p v-else-if="inventory <=10 && inventory > 0">Almost sold out! Hurry!</p>
//<p v-else="OutStock">Out of Stock</p>
//<button v-on: click='removeFromCart'>Remove</button>
// <a : href="link" target="_blank">See more products like this</a> 
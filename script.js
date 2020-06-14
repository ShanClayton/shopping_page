//forms
Vue.component("product-review", {
  template: `
      <form class="review-form" @submit.prevent="onSubmit">
      
        <p class="error" v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
        </p>

        <p>
          <label for="name">Name:</label>
          <input id="name" v-model="name">
        </p>
        
        <p>
          <label for="review">Review:</label>      
          <textarea id="review" v-model="review"></textarea>
        </p>
        
        <p>
          <label for="rating">Rating:</label>
          <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </p>

        <p>Would you recommend this product?</p>
        <label>
          Yes
          <input type="radio" value="Yes" v-model="recommend"/>
        </label>
        <label>
          No
          <input type="radio" value="No" v-model="recommend"/>
        </label>
            
        <p>
          <input type="submit" value="Submit">  
        </p>    
      
    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      this.errors = [];
      if (this.name && this.review && this.rating && this.recommend) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend,
        };
        this.$emit("review-submitted", productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommend = null;
      } else {
        if (!this.name) this.errors.push("Name required.");
        if (!this.review) this.errors.push("Review required.");
        if (!this.rating) this.errors.push("Rating required.");
        if (!this.recommend) this.errors.push("Recommendation required.");
      }
    },
  },
});

//product details
Vue.component("product-details", {
  props: {
    details: {
      type: Array,
      required: true,
    },
  },
  template: `
    <ul>
    <li v-for="detail in details">{{ detail }}</li>
    </ul>`,
});

//product info
Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
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

                <!-- increase cart number when clicked and class binding instock button turns grey with item is not in stock -->
                <button v-on:click='addToCart' :disabled='!inStock' :class="{disabledButton: !inStock}">Add to
                    Cart</button>
                <button v-on:click='removeFromCart'>Remove Item</button>

                
            </div>
              <div>
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
          <li v-for="review in reviews">
          <p>{{ review.name }}</p>
          <p>Rating: {{ review.rating }}</p>
          <p>{{ review.review }}</p>
          </li>
        </ul>
       </div>
  
        
             <product-review @review-submitted="addReview"></product-review>    
        </div>`,

  //data goes here
  data() {
    return {
      brand: "Vue Mastery",
      product: "Socks",
      selectedVariant: 0,
      altText: "green socks",
      details: ["75% bamboo", "22% polyamide", "3% spandex", "Gender-neutral"],
      variants: [
        {
          variantId: 1234,
          variantColor: "green",
          variantImage: "./assets/Greensocks.jpg",
          variantQuanity: 20,
        },
        {
          varidantId: 4321,
          variantColor: "blue",
          variantImage: "./assets/bluesocks.jpg",
          variantQuanity: 0,
        },
      ],
      onSale: false,
      reviews: [],
    };
  },
  methods: {
    // increment
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
    },
    //decrement
    removeFromCart() {
      this.$emit(
        "remove-from-cart",
        this.variants[this.selectedVariant].variantId
      );
    },
    //mouseover
    updateProduct(index) {
      this.selectedVariant = index;
    },
    //add review
    addReview(productReview) {
      this.reviews.push(productReview);
    },
  },
  //computed properties are best used when you have expensive operation when you don't want to rerun it when you access it
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    //do this on multiple  mouseover images
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuanity;
    },
    //create boolean to show if brand and product are on sale
    sale() {
      if (this.onSale) {
        return this.brand + " " + this.product + " are on sale! ";
      }
      return this.brand + " " + this.product + " are not on sale, sorry ";
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 5.99;
    },
  },
});

var app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: [],
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeItem(id) {
      for (var i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === id) {
          this.cart.splice(i, 1);
        }
      }
    },
  },
});

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

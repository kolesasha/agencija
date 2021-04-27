// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCtNkfNjmvSjke078kcqO-LuimrPxDa9M8",
    authDomain: "bazagencija.firebaseapp.com",
    projectId: "bazagencija",
    storageBucket: "bazagencija.appspot.com",
    messagingSenderId: "42306090048",
    appId: "1:42306090048:web:57419eefdecbe329fd1ba5",
    measurementId: "G-Y0BZ58BNFT"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


//buy

function buy(){
    var productsFirebase=[];
    for(let index = 0; index < products.length; index++){
        if (products[index].cart){
            var product={
                name: products[index].name,
                price: products[index].price,
                quantity: products[index].quantity,
                total: products[index].total,
                
            }
            productsFirebase.push(product);
        }
    }
    firebase.database().ref('cart').push({
        total:total(),
        product: productsFirebase
    });
    Swal.fire({
        type:'success',
        title: 'Success',
        text: 'Vasa porudzbina je primljena',
    })
    clean();
}

var products =[
    {
        id:1,
        img:'images/maldivess.jpg',
        name:'Maldivi',
        price:65,
        cart: false,
        quantity:1,
        total:0,
        
    },
    {
        id:2,
        img:'images/barsa.jpg',
        name:'Barselona',
        price:40,
        cart: false,
        quantity:1,
        total:0
    },
    {
        id:3,
        img:'images/atina.jpg',
        name:'Atina',
        price:30,
        cart: false,
        quantity:1,
        total:0
    },
    {
        id:4,
        img:'images/tim-trad-CLm3pWXrS9Q-unsplash.jpg',
        name:'Jahorina',
        price:18,
        cart: false,
        quantity:1,
        total:0,
    },
    {
        id:5,
        img:'images/ober.jpg',
        name:'Oberstdorf',
        price:25,
        cart: false,
        quantity:1,
        total:0
    },
    {
        id:6,
        img:'images/taraa.jpg',
        name:'Tara',
        price:15,
        cart: false,
        quantity:1,
        total:0
    },
    {
        id:7,
        img:'images/srebrno.jpg',
        name:'Srebrno jezero',
        price:10,
        cart: false,
        quantity:1,
        total:0
    },
    {
        id:8,
        img:'images/krit.jpg',
        name:'Krit',
        price:42,
        cart: false,
        quantity:1,
        total:0
    },
    {
        id:9,
        img:'images/nica.jpg',
        name:'Nica',
        price:70,
        cart: false,
        quantity:1,
        total:0
    },
    {
        id:10,
        img:'images/lido.jpg',
        name:'Lido di jesolo',
        price:55,
        cart: false,
        quantity:1,
        total:0
    },
];

function total(){
    let total=0;
    for(let index=0; index < products.length; index++){
        if(products[index].cart){
            total+= products[index].total;
        }
    }
    return total
}

var con=0;
var con2=[]; //position at table

function clean(){
    for (let index = 0; index < products.length; index++){
        products[index].cart=false;
        products[index].quantity=1;
        products[index].total=0;
        con2=[];
        updateCart();      
    }
}

function add(id){
    for(let index = 0; index < products.length; index++){
        if(products[index].id !=id || products[index].cart==true){

        }
        else{
            products[index].cart=true;
            con2.push(products[index].id);
            document.getElementById('tableProducts').innerHTML+=`
            <tr>
            <th scope="row">${con+1}</th>
            <td><button class="btn btn-danger" onclick="remove(${products[index].id})
            ">X</button></td>
            <td><img style="width: 5rem;" src="${products[index].img}"></td>
            <td>${products[index].name}</td>
            <td>
            <button class="btn btn-primary" onclick="reduceAmount(${products[index].id})
            ">-</button>
            <input style="width: 2rem;" id="${products[index].id}" value="${products
            [index].quantity}" disabled>
            <button class="btn btn-primary" onclick="addAmount(${products[index].id})
            ">+</button>
            </td>
            <td>$ ${products[index].price*products[index].quantity}</td>
            </tr>
            `

            con++;
            products[index].total=products[index].price*products[index].quantity
        }
    }
    document.getElementById('total').innerHTML=`
    <tr>
    <th scope="row"></th>
    <td></td>
    <td></td>
    <td></td>
    <td>
        <h4>Total: </h4>    
    </td>
    <td>
        $ ${total()}.00
    </td>
    </tr>
    <tr>
    <th scope="row"></th>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td>
    <button onclick="buy()" class="btn btn-success">Buy</button>
    </td>
    </tr>
    `
}

function remove(id){
    for(let index = 0; index < products.length; index++){
        if(products[index].id == id){
            products[index].cart=false;
            products[index].total = 0;
            products[index].quantity = 1;
            total();
            for (let index2 = 0; index2 < con2.length; index2++){
                if (products[index].id == con2[index2]){
                    con2.splice(index2,1);
                }else{
                    
                }
            }
            updateCart();
        }else{
            updateCart();
        }
    }
}


function updateCart(){
    con=0;
    document.getElementById('tableProducts').innerHTML=``;
    for (let index = 0; index < con2.length; index++){
        var position = con2[index];
        for (let index3 = 0; index3 < products.length; index3++) {
            if (position == products[index3].id){
            document.getElementById('tableProducts').innerHTML+=`
            <tr>
            <th scope="row">${con+1}</th>
            <td><button class="btn btn-danger" onclick="remove(${products[index3].id})
            ">X</button></td>
            <td><img style="width: 5rem;" src="${products[index3].img}"></td>
            <td>${products[index3].name}</td>
            <td>
            <button class="btn btn-primary" onclick="reduceAmount(${products[index3].id})
            ">-</button>
            <input style="width: 2rem;" id="${products[index3].id}" value="${products
            [index3].quantity}" disabled>
            <button class="btn btn-primary" onclick="addAmount(${products[index3].id})
            ">+</button>
            </td>
            <td>$ ${products[index3].price*products[index3].quantity}</td>
            </tr>
            `

            products[index3].total= products[index3].price*products[index3].quantity
            }else{

            }
            
        }
        con=con+1;
    }
    if (total()==0) {
        document.getElementById('total').innerHTML=``;
    } else {
        document.getElementById('total').innerHTML=`
    <tr>
    <th scope="row"></th>
    <td></td>
    <td></td>
    <td></td>
    <td>
        <h4>Total: </h4>    
    </td>
    <td>
        $ ${total()}.00
    </td>
    </tr>
    <tr>
    <th scope="row"></th>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td>
    <button onclick="buy()" class="btn btn-success">Buy</button>
    </td>
    </tr>
    `
    }
}

function reduceAmount(id){
    for(let index = 0; index < products.length; index++){
        if(products[index].id ==id){
            if (products[index].quantity >1) {
                products[index].quantity = products[index].quantity-1;
                updateCart();
            }else{

            }
        }else{

        }
    }
}

function addAmount(id){
    for(let index = 0; index < products.length; index++){
        if(products[index].id ==id){
            if (products[index].quantity >0) {
                products[index].quantity = products[index].quantity+1;
                updateCart();
            }else{

            }
        }else{

        }
    }
}

//Render
(()=>{
    for (let index = 0; index < products.length; index++){
        document.getElementById('row1').innerHTML+=`
        <div class="card m-2" style="width:12em;">
        <img src="${products[index].img}"class="card-img-top">
        <div class="card-body">
        <h5 class="card-title" style:"font-size: 27px;  font-family: 'Ubuntu', sans-serif;">${products[index].name}</h5>
        <p class="card-text">$ ${products[index].price}.00</p>
        <p style=" color: crimson;  font-family: 'Ubuntu', sans-serif;">
        </p>
        </p>
        <button class="btn btn-primary" onclick="add('${products[index].id}')">Add</button>
        </div>
        </div>
        `
    }
})();


//scirpt.js

$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navba').addClass("sticky");
        }else{
            $('.navba').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navba .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navba .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Letovanje", "Zimovanja", "Ekskurzije", "Vikendi"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Letovanje", "Zimovanja", "Ekskurzije", "Vikendi"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});

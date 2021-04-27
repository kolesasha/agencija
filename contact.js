  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA2DWnDOuynBCLQBPYg5StkWbfJLa_N2a0",
    authDomain: "form-19072.firebaseapp.com",
    projectId: "form-19072",
    storageBucket: "form-19072.appspot.com",
    messagingSenderId: "218741242306",
    appId: "1:218741242306:web:ca92ee769ae5a8011fbe5b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  firebase.analytics();


// reference collections
let contactInfo = firebase.database().ref("infos");

//Listen for a submit
document.querySelector(".contact-form").addEventListener("submit", submitForm);

function submitForm(e){
    e.preventDefault();

    //Get input Values
    let name = document.querySelector(".name").value;
    let email = document.querySelector(".email").value;
    let message = document.querySelector(".message").value;

    saveContactInfo(name, email, message);

    document.querySelector(".contact-form").reset();

    sendEmail(name, email, message);
}
//save infos to Firebase
function saveContactInfo(name, email, message){
    let newContactInfo = contactInfo.push();

    newContactInfo.set({
        name: name,
        email: email,
        message: message,
    });
    retrieveInfos();
}

//retrive infos
function retrieveInfos(){
    let ref = firebase.database().ref("infos");
    ref.on("value", gotData);
}

function gotData(data){
    let info = data.val();
    let keys = Object.key(info);

    for(let i = 0; i < keys.length; i++){
        let infoData = keys[i];
        let name = info[infoData].name;
        let email = info[infoData].email;
        let message = info[infoData].message;
        console.log(name, email, message);

        let infosResults = document.querySelector(".infosResults");

        infosResults.innerHTML +=`<div>
        <p><strong>Name: <strong/>${name} <br/>
        <a><strong>Email: <strong/>${email}<br/>
        <a><strong>Message: <strong/>${message}</a>
        </p>
        </div>`;
    }
}

retrieveInfos();

//send email info
function sendEmail(name, email, message){
    Email.send({
        Host: "smtp.gmail.com",
        Username: 'kostic.aco7@gmail.com',
        Password: "",
        To: '',
        From: 'kostic.aco7@gmail.com',
        Subject: `${name} sent you a message`,
        Body: `Name:${name} <br/> Email: ${email}<br/> Message: ${message}`,
    }).then((message) => alert("mail sent successful."));
}

//scirpt.js

$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
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

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
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

	
	

const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

burger.addEventListener("click", function (e) {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.classList.toggle('active');
})
"use strict";

var burger = document.querySelector('.burger');
var nav = document.querySelector('.nav');
burger.addEventListener("click", function (e) {
  burger.classList.toggle('active');
  nav.classList.toggle('active');
  document.body.classList.toggle('active');
});
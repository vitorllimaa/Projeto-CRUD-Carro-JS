const navigation = document.querySelector('.navigation');
const list = document.querySelectorAll('.navigation li');
const main = document.querySelector('.main');
const toggle = document.querySelector('.toggle');


toggle.onclick = function() {
    navigation.classList.toggle('active');
    main.classList.toggle('active');
}


function allList() {
    list.forEach((item) => item.classList.remove('hovered'));

        this.classList.add('hovered');
    };


list.forEach((item) => {
    item.addEventListener('mouseover', allList)
});
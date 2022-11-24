const open = document.getElementById('open');
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');
const take_cambridge = document.getElementById('take_cambridge');


open.addEventListener('click', () => {
    modal_container.classList.add('show');
});

close.addEventListener('click', () => {
    modal_container.classList.remove('show');
});


document.getElementById('take_cambridge').onclick = function() {
    window.location.href = "ctest.html";
};
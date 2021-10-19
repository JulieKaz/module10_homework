const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
    window.alert(`Ширина экрана: ${window.screen.width} px
Высота экрана: ${window.screen.height} px`);
});
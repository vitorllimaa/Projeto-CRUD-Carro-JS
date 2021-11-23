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



const editCotainer = document.querySelector('.edit-cotainer');
const deleteCotainer = document.querySelector('.edit-coitainer_header > ion-icon')
const iconEdit = document.querySelectorAll('td > ion-icon');
const registerBtn = document.querySelector('.btn');

iconEdit.forEach(e => {
    e.addEventListener('click', value => {
        if(value.target.name === 'create-outline') {
            document.querySelector('.edit-coitainer_header > h2').textContent = 'Editar Cadastro';
    document.querySelector('form > button').textContent = 'Editar';
            editCotainer.classList.add('show');
        } else{
            confirm('Tem certeza que deseja Excluir o pedido?');
        }
    })
})


deleteCotainer.addEventListener('click', e => {
    editCotainer.classList.remove('show');
})

registerBtn.addEventListener('click', e => {
    document.querySelector('.edit-coitainer_header > h2').textContent = 'Cadastrar';
    document.querySelector('form > button').textContent = 'Cadastrar';
    editCotainer.classList.add('show');
})

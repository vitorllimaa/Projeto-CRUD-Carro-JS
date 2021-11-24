
const popupContainer = document.querySelector('[data-js="popup-container"]');
const deleteContainer = document.querySelector('[data-js="popup-icon"]');
const listIcon = document.querySelectorAll('td > ion-icon');
const btnRegister = document.querySelector('[data-js="btn-register"]');
const list = document.querySelectorAll('[data-js="list-nav"]');
const toggle = document.querySelector('[data-js="toggle"]');

/* Interação do Menu lateral */
function allList() {
    list.forEach((item) => item.classList.remove('hovered'));
    this.classList.add('hovered'); 
};

toggle.addEventListener('click', e => {
    const main = document.querySelector('[data-js="main"]');
    const navigation = document.querySelector('[data-js="navigation"]');
    navigation.classList.toggle('active');
    main.classList.toggle('active');
});

list.forEach((item) => {
    item.addEventListener('mouseover', allList)
});

/* Interação no Popup de cadastro e Edição da lista */
function validateIcon(value) {
    if(value.target.name === 'create-outline') {
        addTextPopup('Editar Cadastro', 'Editar');
        addPopup();
    } 
    else{
        confirm('Tem certeza que deseja Excluir o pedido?');
    }
}

function addTextPopup(h2, btn) {
    const h2Form = document.querySelector('.popup-container-header > h2');
    const btnForm = document.querySelector('form > button');

    h2Form.textContent  = h2;
    btnForm.textContent = btn;
}

function addPopup() {
    popupContainer.classList.add('show');
}

function removePopup() {
    popupContainer.classList.remove('show');
}

listIcon.forEach(value => {
    value.addEventListener('click', e => {
        validateIcon(e);
    });
});

deleteContainer.addEventListener('click', removePopup);

btnRegister.addEventListener('click', e => {
    addTextPopup('Cadastrar', 'Cadastrar');
    addPopup();
    createRegister();
});



function createRegister() {
    console.log('ok')
}
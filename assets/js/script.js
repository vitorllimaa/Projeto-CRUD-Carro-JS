
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
    const idCar = value.target.parentNode.parentNode.firstChild.innerText;
    if(value.target.name === 'create-outline') {
        popupDiv('Editar Cadastro', 'Editar');
        addValuesPopupEdit(idCar);
        change(idCar);
    } 
    else{
        deleteArrayCar(idCar);
    }
}

function addValuesPopupEdit(idCar) {
    JSON.parse(localStorage.listCar).forEach(value => {
        if(value.id == idCar){
            clearPopup(value.brand, value.model, value.price, value.year);
        }
    });

}

function clearPopup(brand, model, price, year) {

    document.querySelector('#brand').value = brand;
    document.querySelector('#model').value = model;
    document.querySelector('#price').value = price;
    document.querySelector('#year').value  = year;
}


/* deleteContainer.addEventListener('click', removePopup); */

btnRegister.addEventListener('click', register);

function popupDiv(h2, btn) {
    const div = document.createElement('div');
    div.className = "popup";

    div.innerHTML = `<section class="popup-container show" data-js="popup-container">
                    <div class="popup-container-form">
                        <div class="popup-container-header">
                            <h2>${h2}</h2>
                            <ion-icon data-js="popup-icon" name="close-outline"></ion-icon> 
                        </div>            
                        <form data-js="form">
                            <label for="brand"> Marca</label>
                                <input type="text" name="brand" id="brand">
                            <label for="model"> Modelo</label>
                                <input type="text" name="model" id="model"> 
                            <label for="price"> Preço</label>
                                <input type="text" name="price" id="price">
                            <label for="year"> Ano</label>
                                <input type="text" name="year" id="year">   
                            <button type="submit" id="btn">${btn}</button>
                        </form>
                    </div>
                </section>`;

    document.querySelector('main').append(div);
    return div;
}

/* Método para listar todos os carros */

function create() {

    if(localStorage.length == 0 && !localStorage.listCar) {
        localStorage.setItem('listCar', '');
    }

    if (localStorage.listCar.length > 0){

            let listAll = JSON.parse(localStorage.listCar);
            let bodyTable = document.querySelector('tbody');
            bodyTable.innerHTML = '';
            

            listAll.forEach(value => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${value.id}</td>
                                <td>${value.brand}</td>
                                <td>${value.model}</td>
                                <td>${value.price}</td>
                                <td>${value.year}</td>
                                <td><ion-icon name="create-outline"></ion-icon></td>
                                <td><ion-icon name="trash-outline"></ion-icon></td>
                `
                bodyTable.appendChild(tr);

                icon = tr.querySelectorAll('td ion-icon');
                
                    icon.forEach( eventIcon => {
                        eventIcon.addEventListener('click', e => {
                        validateIcon(e);
                    });
                });
            });

            listAll = '';
            bodyTable = '';
           
            

    }
    
}

create();


/* Método para Cadastrar os carros */

function register() {
    
    const div = popupDiv('Cadastrar', 'Cadastrar');
    const close = document.querySelector('[data-js="popup-icon"]');

    close.addEventListener('click', e => {
        div.remove();
    });

    
    document.querySelector('#btn').addEventListener('click', e => {
        
        e.preventDefault();
        
            let list = localStorage.listCar ? JSON.parse(localStorage.getItem('listCar')) : [];

            let id = localStorage.listCar ? JSON.parse(localStorage.listCar).length + 1 : 1;

            let brand = document.querySelector('#brand').value;
            let model = document.querySelector('#model').value;
            let price = document.querySelector('#price').value;
            let year = document.querySelector('#year').value;

            list.push({id: id, brand: brand, model: model, price: price, year: year});

            localStorage.setItem('listCar', JSON.stringify(list));
            
            document.querySelector('.popup').remove();
        create();
    });
           
}

/* Método para Editar Cadastro */ 

function change(idCar) {

    let values = [];
    const form = document.querySelector('[data-js="form"]');
    const close = document.querySelector('[data-js="popup-icon"]');

    close.addEventListener('click', e => {
        document.querySelector('.popup').remove();
    });

    form.addEventListener('submit', e => {
        
        e.preventDefault();
        JSON.parse(localStorage.listCar).forEach(value => {
            if(value.id == idCar){
                value.brand = e.target.parentNode.querySelector('#brand').value;
                value.model = e.target.parentNode.querySelector('#model').value
                value.price = e.target.parentNode.querySelector('#price').value
                value.year  = e.target.parentNode.querySelector('#year').value
            }

            values.push(value);
            
    });

    localStorage.setItem('listCar', JSON.stringify(values));

    values = [];
    idCar = '';

    document.querySelector('.popup').remove();

    create();

    });
}

function deleteArrayCar(idCard) {
    if(confirm('Tem certeza que deseja Excluir o pedido?')){
        const json = JSON.parse(localStorage.listCar);
        const result = json.filter(e => e.id != idCard);
        localStorage.setItem('listCar', JSON.stringify(result));
        create();
    }
    
    
}



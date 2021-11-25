const btnRegister = document.querySelector('[data-js="btn-register"]');
const listNav = document.querySelectorAll('[data-js="list-nav"]');
const toggle = document.querySelector('[data-js="toggle"]');


/* Interação do Menu lateral */
function allList() {
    listNav.forEach((item) => item.classList.remove('hovered'));
    this.classList.add('hovered'); 
};

toggle.addEventListener('click', e => {
    const main = document.querySelector('[data-js="main"]');
    const navigation = document.querySelector('[data-js="navigation"]');
    navigation.classList.toggle('active');
    main.classList.toggle('active');
});

listNav.forEach((item) => {
    item.addEventListener('mouseover', allList)
});

/* caixa de diálogo */
function alertText(text) {
    setTimeout(() => {
        window.alert(text+"!");   
    }, 200);
    
}

/* Interação com o Popup de cadastro ou edição*/
function validateIcon(iconEl) {
    const idCar = iconEl.target.parentNode.parentNode.firstChild.innerText;
    if(iconEl.target.name === 'create-outline') {
        popupEl();
        validatePopupEdit(idCar);
        update(idCar);
    } 
    else{
        deleteCar(idCar);
    }
}

/* validação dos dados para adicionar nos inputs do popup */
function validatePopupEdit(idCar) {
    JSON.parse(localStorage.listCar).forEach(value => {
        if(value.id == idCar){
            addValuesPopup(value.brand, value.model, value.price, value.year);
        }
    });
}

function addValuesPopup(brand, model, price, year) {

    document.querySelector('#brand').value = brand;
    document.querySelector('#model').value = model;
    document.querySelector('#price').value = price;
    document.querySelector('#year').value  = year;
}

/* Método para fechar o popup depois de cadastrar ou editar */
function closePopup() {
    document.querySelector('.popup').remove();
}

/* Método para fechar o popup pelo icon X*/ 
function closeIconPopup() {
    const close = document.querySelector('[data-js="popup-icon"]');

    close.addEventListener('click', e => {
        document.querySelector('.popup').remove();
    });
}

/* Método para adicionar o popup na tela */ 
function popupEl(h2 = 'Editar Cadastro', btn = 'Editar') {
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
                                    <input type="text" name="brand" id="brand"
                                    onkeypress="return maxCharacterBrand(event)" required placeholder="Digite a Marca">
                                <label for="model"> Modelo</label>
                                    <input type="text" name="model" id="model"
                                    onkeypress="return maxCharacterModel(event)" required placeholder="Digite o modelo"> 
                                <label for="price"> Preço</label>
                                    <input type="number" name="price" id="price"
                                    onkeypress="return maxCharacterPrice(event)" required placeholder="Digite o preço">
                                <label for="year"> Ano</label>
                                    <input type="number" name="year" id="year"
                                    onkeypress="return maxCharacterYear(event)" required placeholder="Digite o ano">   
                                <button type="submit" id="btn">${btn}</button>
                            </form>
                        </div>
                    </section>`;

    document.querySelector('main').append(div);
    return div;
}

/* Método para listar todos os carros na tela */
function read() {

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
                            <td>R$ ${value.price},00</td>
                            <td>${value.year}</td>
                            <td><ion-icon name="create-outline"></ion-icon></td>
                            <td><ion-icon name="trash-outline"></ion-icon></td>
            `
            bodyTable.appendChild(tr);

            icons = tr.querySelectorAll('td ion-icon');
            
            icons.forEach( eventIcon => {
                    eventIcon.addEventListener('click', e => validateIcon(e));     
            });
        });

        listAll = '';
        bodyTable = '';
    }
    
}
read();

/* Evento para chamar o Método de cadastro */
btnRegister.addEventListener('click', create);

/* Método para Cadastrar os carros */
function create() {
    
    const div = popupEl('Cadastrar', 'Cadastrar');

    closeIconPopup();
    
    document.querySelector('[data-js="form"]').addEventListener('submit', e => {
        
        e.preventDefault();
        
        let listCar = localStorage.listCar ? JSON.parse(localStorage.getItem('listCar')) : [];
        /* let id = localStorage.listCar ? JSON.parse(localStorage.listCar).length + 1 : 1; */

        if(localStorage.listCar.length > 0 && JSON.parse(localStorage.listCar).length > 0) {
            let idArray = []
            JSON.parse(localStorage.listCar).forEach(e => {
            idArray.push(e.id);
            });
            var id = idArray.reduce(function(a, b) {
                return Math.max(a, b);
              });
            
            
        } else {
            var id = 0;
        }
  
            let brand = document.querySelector('#brand').value;
            let model = document.querySelector('#model').value;
            let price = document.querySelector('#price').value;
            let year = document.querySelector('#year').value;
    
            listCar.push({id: id+1, brand: brand, model: model, price: price, year: year});
    
            localStorage.setItem('listCar', JSON.stringify(listCar));
            
            closePopup();
            read();
            alertText('Cadastrado com sucesso');
       
    });
           
}

/* Método para Editar Cadastro */ 
function update(idCar) {

    let values = [];
    
    closeIconPopup();

    document.querySelector('[data-js="form"]').addEventListener('submit', e => {
        
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

    closePopup();
    read();
    alertText('Cadastro alterado com sucesso');

    });
}

/* Método para deletar um cadastro */ 
function deleteCar(idCard) {
    if(confirm('Tem certeza que deseja excluir o cadastro?')){
        const json = JSON.parse(localStorage.listCar);
        const result = json.filter(e => e.id != idCard);
        localStorage.setItem('listCar', JSON.stringify(result));
        read();
    }

    alertText('Cadastro deletado com sucesso');
    
}

/* Métodos para limitar valores nos inputs */
function maxCharacterBrand(e) {
       var max = 100;
       var brand = document.getElementById('brand');           
            
       if ((brand.value.length >= max)) {
          return false;
       }
}

function maxCharacterModel(e) {
       var max = 100;
       var model = document.getElementById('model');                        
       if ((model.value.length >= max)) {
          return false;
       }
}

function maxCharacterPrice(e) {
    var charCode = e.charCode ? e.charCode : e.keyCode;
    // charCode 8 = backspace   
    // charCode 9 = tab
   if (charCode != 8 && charCode != 9) {
       // charCode 48 equivale a 0   
       // charCode 57 equivale a 9
       var max = 10;           
       var price = document.getElementById('price');           
            
       if ((price.value.length >= max)) {
          return false;
       }
    }
}

function maxCharacterYear(e) {
    var charCode = e.charCode ? e.charCode : e.keyCode;
    // charCode 8 = backspace   
    // charCode 9 = tab
   if (charCode != 8 && charCode != 9) {
       // charCode 48 equivale a 0   
       // charCode 57 equivale a 9
       var max = 4;          
       var year = document.getElementById('year');           

       if ((year.value.length >= max)) {
          return false;
       }
    }
}


const form = document.getElementById('form');
const select = form.category;

const jeweleryInput = document.getElementById('jewelery-input');
const gemsInput = document.getElementById('gems-input');
const fursInput = document.getElementById('furs-input');


const output = document.getElementById('output');


select.addEventListener("change", function() {
    if (this.value == 'jewelery') {
        showEl(jeweleryInput);
        hideEl(gemsInput);
        hideEl(fursInput);
    }
    else if (this.value == 'furs'){
        showEl(fursInput);
        hideEl(jeweleryInput);
        hideEl(gemsInput);
    }
    else if (this.value == 'gems') {
        showEl(gemsInput);
        hideEl(jeweleryInput);
        hideEl(fursInput);
    } 
});

// при сабмите получаем значения всех полей в форме и выводим их в консоль
form.addEventListener("submit", function() {

    event.preventDefault();
    console.log(form.elements);
    [...form.elements].forEach((item) => {
        if (item.value){
            console.log(item.id +': ' , item.value);
            output.innerHTML += item.value +"<br/>";
        }
        else{
        }
    });
});

function showEl(el){
    el.style.display = "block";
    el.querySelectorAll('input').required = true;
}

function hideEl(el){
    el.style.display = "none";
    el.querySelectorAll('input').required = false;

    let elCount = el.querySelectorAll('input');
    for (let i = 0; i < elCount.length; i++) {
        elCount[i].value = '';
    }
}


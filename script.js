const form = document.getElementById('form');
const select = form.category;

const jeweleryInput = document.getElementById('jewelery-input');
const gemsInput = document.getElementById('gems-input');
const fursInput = document.getElementById('furs-input');
const appleInput = document.getElementById('apple-input');

const fileInput = document.getElementById('file-input');
const fileListDisplay = document.getElementById('file-preview');
const fileCount = document.getElementById('file-count');

const output = document.getElementById('output');

const reqInputs = Array.from(document.querySelectorAll('input[name=phone], input[name=email]'));
const inputListener = e => reqInputs.filter(i => i !== e.target).forEach(i => i.required = !e.target.value.length);

reqInputs.forEach(i => i.addEventListener('input', inputListener));


function showEl(el) {
    el.style.display = "block";
    // el.querySelectorAll('input').required = true;
}

function hideEl(el) {
    el.style.display = "none";
    // el.querySelectorAll('input').required = false;

    let elCount = el.querySelectorAll('input');
    for (let i = 0; i < elCount.length; i++) {
        elCount[i].value = '';
    }
}

select.addEventListener("change", function () {

    if (this.value == 'jewelery') {
        showEl(jeweleryInput);
        hideEl(gemsInput);
        hideEl(fursInput);
        hideEl(appleInput);
    } else if (this.value == 'furs') {
        showEl(fursInput);
        hideEl(jeweleryInput);
        hideEl(gemsInput);
        hideEl(appleInput);

    } else if (this.value == 'gems') {
        showEl(gemsInput);
        hideEl(jeweleryInput);
        hideEl(fursInput);
        hideEl(appleInput);

    } else if (this.value == 'apple') {
        showEl(appleInput);
        hideEl(gemsInput);
        hideEl(jeweleryInput);
        hideEl(fursInput);
    } else if (this.value == 'antiqua') {
        hideEl(appleInput);
        hideEl(gemsInput);
        hideEl(jeweleryInput);
        hideEl(fursInput);
    } else if (this.value == 'other') {
        hideEl(appleInput);
        hideEl(gemsInput);
        hideEl(jeweleryInput);
        hideEl(fursInput);
    }

});






// phone mask
let phoneInputs = document.querySelectorAll('input[data-tel-input]');
let getInputNumbersValue = function (input) {
    // Return stripped input value — just numbers
    return input.value.replace(/\D/g, '');
}
let onPhonePaste = function (e) {
    let input = e.target,
        inputNumbersValue = getInputNumbersValue(input);
    let pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
        let pastedText = pasted.getData('Text');
        if (/\D/g.test(pastedText)) {
            // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
            // formatting will be in onPhoneInput handler
            input.value = inputNumbersValue;
            return;
        }
    }
}

let onPhoneInput = function (e) {
    let input = e.target,
        inputNumbersValue = getInputNumbersValue(input),
        selectionStart = input.selectionStart,
        formattedInputValue = "";

    if (!inputNumbersValue) {
        return input.value = "";
    }

    if (input.value.length != selectionStart) {
        // Editing in the middle of input, not last symbol
        if (e.data && /\D/g.test(e.data)) {
            // Attempt to input non-numeric symbol
            input.value = inputNumbersValue;
        }
        return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
        if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
        let firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
        formattedInputValue = input.value = firstSymbols + " ";
        if (inputNumbersValue.length > 1) {
            formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
        }
        if (inputNumbersValue.length >= 5) {
            formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
        }
        if (inputNumbersValue.length >= 8) {
            formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
        }
        if (inputNumbersValue.length >= 10) {
            formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
        }
    } else {
        formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
    }
    input.value = formattedInputValue;
}
let onPhoneKeyDown = function (e) {
    // Clear input after remove last symbol
    let inputValue = e.target.value.replace(/\D/g, '');
    if (e.keyCode == 8 && inputValue.length == 1) {
        e.target.value = "";
    }
}
for (let phoneInput of phoneInputs) {
    phoneInput.addEventListener('keydown', onPhoneKeyDown);
    phoneInput.addEventListener('input', onPhoneInput, false);
    phoneInput.addEventListener('paste', onPhonePaste, false);
}




/* file uploader input + preview */

function previewImages() {
    let preview = document.querySelector('#file-preview');
    if (this.files) {
        [].forEach.call(this.files, readAndPreview);
    }
}

function readAndPreview(file) {
    // check extension
    if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
        return alert(file.name + " не подходит. Только картинки *.jpg *.png *.gif");
    }

    let reader = new FileReader();
    reader.addEventListener("load", function () {
        let image = new Image();
        // image.height = 100;
        image.title = file.name;
        image.src = this.result;
        fileListDisplay.appendChild(image);
    });
    reader.readAsDataURL(file);
}



let fileList = [];

fileInput.addEventListener('change', function (evnt) {
    fileList = [];
    for (let i = 0; i < fileInput.files.length; i++) {
        fileList.push(fileInput.files[i]);
    }
    if (this.files) {
        [].forEach.call(this.files, readAndPreview);
    }
    fileCount.innerHTML = fileList.length;
});


// при сабмите получаем значения всех полей в форме и выводим их в консоль
form.onsubmit = async (e) => {

    event.preventDefault();
    console.log('***');
    // console.log(form.elements);
    [...form.elements].forEach((item) => {
        if (item.value) {
            console.log(item.id + ': ', item.value);
            output.innerHTML += item.value + "<br/>";
        }
    });
    console.log(fileList);

    /*  post data */
    // let response = await fetch('/article/formdata/post/user-avatar', {
    //   method: 'POST',
    //   body: new FormData(form)
    // });
    // let result = await response.json();
    // console.log(result.message);

};
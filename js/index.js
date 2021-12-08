'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const buttonAdd = document.querySelector('#button-add'),
          buttonSortName = document.querySelector('#button-sort-name'),
          buttonSortValue = document.querySelector('#button-sort-value'),
          buttonDelete = document.querySelector('#button-delete'),
          buttonShowXml = document.querySelector('#button-show-xml'),

          inputMain = document.querySelector('#input-main'),
          valuesList = document.querySelector('#app__values');

    let userValues = {},
        isShownXml = false;

    // 'Add' button controls
    buttonAdd.addEventListener('click', () => {
        if (inputMain.value.length > 0 && inputMain.value.includes('=') && inputMain.value.match(/^[a-z0-9= ]+$/i)) {
            let values = inputMain.value.split(' ').join('').split('=');
            userValues[values[0]] = values[1];
            updateValues(userValues);

            // Clear the input
            inputMain.value = null;
        }
    })

    // 'Sort by Name' button controller
    buttonSortName.addEventListener('click', () => {
        sortValues('name');
    });

    // 'Sort by Value' button controller
    buttonSortValue.addEventListener('click', () => {
        sortValues('value');
    });

    // 'Delete' button controller
    buttonDelete.addEventListener('click', () => {
        document.querySelectorAll('.item__selected').forEach(item => {
            delete userValues[item.innerText.split('=')[0]];
            updateValues(userValues);
        })
    });

    // 'Show XML' button controller
    buttonShowXml.addEventListener('click', () => {
        isShownXml = !isShownXml;

        if (isShownXml) {
            buttonShowXml.innerText = 'Show Text';

            let xml = [];
            for (let item in userValues) {
                xml.push(`<${item}>${userValues[item]}</${item}>`);
            }

            valuesList.innerHTML = '';
            xml.forEach(item => {
                valuesList.insertAdjacentText('beforeend', item);
                valuesList.insertAdjacentHTML('beforeend', '<br>');
            });
        } else {
            buttonShowXml.innerText = 'Show XML';
            updateValues(userValues);
        }

    });

    function updateValues(obj) {
        valuesList.innerHTML = '';

        for (let key in obj) {
            valuesList.insertAdjacentHTML('beforeend', `<li class="list__item">${key}&#61;${obj[key]}</li>`);
        }

        // Select items in values list
        document.querySelectorAll('.list__item').forEach(value => {
            value.addEventListener('click', e => {
                e.target.classList.toggle('item__selected');
            })
        });
    }

    function sortValues(target) {
        // Create array from object with element [key, value]
        let sortableArr = [];
        for (let item in userValues) {
            sortableArr.push([item, userValues[item]]);
        }

        // Choose the way of sorting due to target value
        if (target === 'name') {
            sortableArr.sort((a, b) => a[0].localeCompare(b[0]));
        }
        if (target === 'value') {
            sortableArr.sort((a, b) => a[1].localeCompare(b[1]));
        }

        // Create object from sorted array
        let obj = {};
        for (let item of sortableArr) {
            obj[item[0]] = item[1];
        }

        updateValues(obj);
    }
});
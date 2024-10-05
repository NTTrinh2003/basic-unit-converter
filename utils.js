// Input and Select events Handler

function selectChange(name) {
    var inp = document.querySelector(`.conv-unit#from[name="${name}"]`);
    var out = document.querySelector(`.conv-unit#to[name="${name}"]`);

    switch (inp.value) {
        case '': break;
        default:
            const optionOut = out.querySelectorAll('option');
            optionOut.forEach(option => {
                if  (option.value === inp.value) {
                    option.disabled = true;
                } else {
                    option.disabled = false;
                }
            });
    }

    switch (out.value) {
        case '': break;
        default:
            const optionIn = inp.querySelectorAll('option');
            optionIn.forEach(option => {
                if  (option.value === out.value) {
                    option.disabled = true;
                } else {
                    option.disabled = false;
                }
            });
    }
}

function inputHandle(charCode, name) {
    var input = document.querySelector(`.inp-val[name="${name}"]`);

    if (charCode >= 48 && charCode <= 57) {
        return true;
    } else if (charCode == 46 || charCode == 44) {
        if (input.value.indexOf('.')!== -1 || input.value.indexOf(',')!== -1) {
            return false;
        } else {
            return true;
        }
    }

    return false;
}

// Convert Functions

function convertLength() {
    // Meter based
    const exchangeValue = {
        "m": 1,
        "cm": 0.01,
        "mm": 0.001,
        "km": 1000,
        "in": 0.0254,
        "ft": 0.3048,
        "yd": 0.9144,
        "mi": 1609.344
    };

    const input = document.querySelector(`.inp-val[name="leng"]`).value;

    if (input === "") {
        showError('leng', 'val');
        return;
    }

    const value = parseFloat(input);
    const unitFrom = document.querySelector(`.conv-unit#from[name="leng"]`).value;
    const unitTo = document.querySelector(`.conv-unit#to[name="leng"]`).value;

    if (unitFrom === "" || unitTo === "") {
        showError('leng', 'sel');
        return;
    }

    const convertedValue = Math.round(
        value * exchangeValue[unitFrom] / exchangeValue[unitTo] * 10000000000
    ) / 10000000000;

    showResult(value, unitFrom, convertedValue, unitTo, 'leng');
}

function convertWeight() {
    // Kilogram Based
    const exchangeValue = {
        "mg": 0.000001,
        "g": 0.001,
        "kg": 1,
        "t": 1000,
        "lb": 0.453592,
        "oz": 0.035274,
    };

    const input = document.querySelector(`.inp-val[name="weig"]`).value;
    
    if (input === "") {
        showError('weig', 'val');
        return;
    }

    const value = parseFloat(input);
    const unitFrom = document.querySelector(`.conv-unit#from[name="weig"]`).value;
    const unitTo = document.querySelector(`.conv-unit#to[name="weig"]`).value;

    if (unitFrom === "" || unitTo === "") {
        showError('weig', 'sel');
        return;
    }

    const convertedValue = Math.round(
        value * exchangeValue[unitFrom] / exchangeValue[unitTo] * 10000000000
    ) / 10000000000;

    showResult(value, unitFrom, convertedValue, unitTo, 'weig');
}

function convertTemperature() {
    const input = document.querySelector(`.inp-val[name="temp"]`).value;
    
    if (input === "") {
        showError('temp', 'val');
        return;
    }

    const value = parseFloat(input);
    const unitFrom = document.querySelector(`.conv-unit#from[name="temp"]`).value;
    const unitTo = document.querySelector(`.conv-unit#to[name="temp"]`).value;
    var result = value;

    switch(unitFrom) {
        case "f":
            result = (result - 32) / 1.8;
            break;
        case "k":
            result -= 273.15;
            break;
        case "":
            showError('temp', 'sel');
            return;
    }

    switch(unitTo) {
        case "f":
            result = result * 1.8 + 32;
            break;
        case "k":
            result += 273.15;
            break;
        case "":
            showError('temp', 'sel');
            return;
    }

    result = Math.round(result * 10000000000) / 10000000000;
    showResult(value, unitFrom, result, unitTo, 'temp');

}


// Tabs Showing Functions

function showTab(name) {
    var allTabs = document.getElementsByClassName('tab');

    for (var i = 0; i < allTabs.length; i++) {
        allTabs[i].style.display = 'none';
    }

    var show = document.querySelector(`.tab#${name}`);
    show.style.display = "block";
    
    var navsToTab = document.getElementsByClassName('switch-tab');
    for (var i = 0; i < navsToTab.length; i++) {
        navsToTab[i].classList.remove('current');
    }

    var navToTab = document.querySelector(`.switch-tab[name="${name}"]`);
    navToTab.classList.add('current');
}

function showResult(val, from, res, to, name) {

    var nameConv = {
        "leng": "length",
        "weig": "weight",
        "temp": "temperature"
    };

    var resultTab = document.querySelector(`.tab#result`);
    var allTabs = document.getElementsByClassName('tab');

    for (var i = 0; i < allTabs.length; i++) {
        allTabs[i].style.display = 'none';
    }

    resultTab.innerHTML = `
        <div class="result-container">
            <h2>Result of your ${nameConv[name]} conversion</h2>
            <h1>${val} ${from} = ${res} ${to}</h1>
            <button onclick="showTab('${name}')" id="return">Return</button>
        </div>
    `;

    resultTab.style.display = "block";
}

function showError(name, errTag) {
    var allTabs = document.getElementsByClassName('tab');

    for (var i = 0; i < allTabs.length; i++) {
        allTabs[i].style.display = 'none';
    }

    var errorTab = document.querySelector(`.tab#error`);

    if (errTag === 'val') {
        errorTab.innerHTML = `
            <div class="error-container">
                <h2>Please input the value you want to convert</h2>
                <button onclick="showTab('${name}')" id="retry">Try Again</button>
            </div>
        `;
    } else {
        errorTab.innerHTML = `
            <div class="error-container">
                <h2>Please select both input and output units</h2>
                <button onclick="showTab('${name}')" id="retry">Try Again</button>
            </div>
        `;
    }

    errorTab.style.display = "block";
}
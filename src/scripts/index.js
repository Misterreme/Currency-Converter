const fromSelect = document.getElementById("from-currency");
const toSelect = document.getElementById("to-currency");
const amountInput = document.getElementById("amount-input");
const convertButton = document.getElementById("convert-button");
const convertForm = document.getElementById("convert-form");
const totalInput = document.getElementById("total-input");
const totalText = document.getElementById("total-text");
const changeCurrencyButton = document.getElementById("change-currency");
const toggleThemeButton = document.getElementById("theme-button");
const html = document.querySelector("html");
const closeModal = document.getElementById("close-modal-button");
const updateMessage = document.getElementById("update-message");

const API = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'd23e0d6053msha5781ab07a8be5ap1752f8jsn84b8caaeaf87',
		'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
	}
};

const currentVersion = "v1.03";

window.onload = function() {
    
    if (localStorage.getItem("updateVersion") !== currentVersion) {
        updateMessage.showModal();
    };
    
    closeModal.addEventListener("click", (event) => {
        updateMessage.close();
        localStorage.setItem("updateVersion", currentVersion);
    });
};

changeCurrencyButton.addEventListener("click", (changeCurrency));
convertButton.addEventListener("click", app);
toggleThemeButton.addEventListener("click", toggleTheme);

const currentTheme = localStorage.getItem("theme");
function toggleTheme() {
    const isDark = html.classList.toggle("dark");
    
    if (isDark) {
        html.classList.remove("light");
        html.style.colorScheme = "dark";
    } else {
        html.classList.add("light");
        html.style.colorScheme = "light";
    };
    
    const theme = html.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", theme);
};

if (currentTheme === "dark") {
    html.classList.add("dark");
    html.style.colorScheme = "dark"
};

async function changeCurrency() {
    let fromCurrency = fromSelect.value;
    let toCurrency = toSelect.value;

    fromSelect.value = toCurrency;
    toSelect.value = fromCurrency;

    const data = await consumeApi();
    if (data !== undefined) {
        totalInput.value = data.result;
        console.log("working!");
    };

    return data;
}

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
};

async function app(event) {
    event.preventDefault();

    const data = await consumeApi();

    if (data === undefined) {
        showError("¡Completa este campo!");
        return;
    }
    
    totalText.style.display = "block";
    totalInput.style.display = "block";
    totalInput.value = data.result;
    hiddeError();

    return data;
};

async function consumeApi() {
    const from = fromSelect.value;
    const to = toSelect.value;
    const amount = amountInput.value;

    if (!from || !to || !amount) {
        showError("¡Completa este campo!");
        return;
    };

    try {

        const data = await fetchData(`${API}from=${from}&to=${to}&amount=${amount}`);
        console.log(data.result);
        hiddeError();
        return data;

    } catch (error) {
        console.error(error);

    };
};

function showError(message) {
    amountInput.classList.add("error")
    amountInput.placeholder = message;
    totalInput.placeholder = message;
    return;
};

function hiddeError() {
    amountInput.classList.remove("error")
    amountInput.placeholder = "";
    totalInput.placeholder = "";
    return; 
};



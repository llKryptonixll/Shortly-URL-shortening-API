// mobile navbar logic
const toggle = document.querySelector(".mobile-nav-toggle-container");

toggle.addEventListener("click", () => {
    const sidebar = document.querySelector(".mobile-sidebar");
    sidebar.classList.toggle("open-close-sidebar");
});


// short links logic
let items = JSON.parse(localStorage.getItem('storedLinks')) || [];

const form = document.getElementById("form");
form.addEventListener("submit", async (e) => {
    const inputValue = document.getElementById("input").value;

    e.preventDefault();
    if(inputValue == ""){
        visualFeedback();
    }
    else{
        const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${inputValue}`);
        const data = await response.json();

        const dataInformation = [data.result.original_link, data.result.short_link2]
        const [originalLink, shortLink] = dataInformation;

        items.push({
            originalLink: originalLink,
            shortLink: shortLink
        });

        localStorage.setItem('storedLinks', JSON.stringify(items));

        listItems();
    }
});

function listItems() {
    let list = "";
    items.forEach((element) => {
        list += 
        `
        <li>
            <p>${element.originalLink}</p>
            <hr>
            <div>
                <p>${element.shortLink}</p>
                <button class="copy-button">Copy</button>
            </div>
        </li>
        `
        const linksList = document.querySelector(".short-links-list");
        linksList.innerHTML = list;
    });
    
    const copyButtons = document.querySelectorAll(".copy-button");
    copyButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const shortLink = button.parentElement.children[0].innerText;
            navigator.clipboard.writeText(shortLink);
        });
    });
}


function visualFeedback(){
    const input = document.getElementById("input");
    input.style.border = "3px solid hsl(0, 87%, 67%)";

    const errorMessage = document.querySelector(".error-message");
    errorMessage.style.display = "block";

    // to remove error message if user clicks input
    input.addEventListener("click", () => {
        input.style.border = "none";
        errorMessage.style.display = "none";
    });
}

window.addEventListener("load", listItems);
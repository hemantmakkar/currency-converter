const getButton = document.querySelector(".exchange-btn");
const entryBlock = document.querySelector(".entries");
const emailField = document.querySelector(".email-input");
const emailBtn = document.querySelector(".email-submit");

const entries = [];
const emails = [];

function updateEntries() {
    var max = Math.max(0, entries.length-10);
    var str = '<h1>Entries</h1>';
    for(var i=max ; i<entries.length ; i++) {
        str += `<span class='entry'>${entries[i]}</span>`;
    }
    entryBlock.innerHTML = str;
}

window.addEventListener("load", ()=>{
    getExchangeRate();
});

getButton.addEventListener("click", e =>{
    e.preventDefault();
    getExchangeRate();
});

emailBtn.addEventListener("click", e=> {
    e.preventDefault();
    let val = emailField.value;
    emailField.value = "";
    emails.push(val);
    console.log(emails)
    // sendMail();
})

setInterval(getExchangeRate, 5*60*1000);
setInterval(sendMail, 60*60*1000);

function getExchangeRate(){
    const amount = document.querySelector(".form input");
    const exchangeRateTxt = document.querySelector(".form .exchange-rate p");
    let amountVal = amount.value;

    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }

    exchangeRateTxt.innerText = "Getting exchange rate...";

    let url = `https://v6.exchangerate-api.com/v6/352346e921aabdbb3811d657/latest/USD`;

    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates['INR'];
        let totalExRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} USD = ${totalExRate} INR`;
        entries.push(`${amountVal} USD = ${totalExRate} INR`);
        updateEntries();
        // console.log(entries)
    }).catch((err) =>{
        console.log(err);
        exchangeRateTxt.innerText = "Something went wrong";
    });
}

var element = document.querySelector("body");

function sendMail() {
    var str = "";
    for(var i in emails) str += emails[i] + " ";

    var dataURL;

    html2canvas(element, {
        onrendered: function(canvas) {
           dataURL = canvas.toDataURL("image/png");
           //generated dataURL is now placed as src of a img tag
           console.log(dataURL);
        }
    });

    console.log(str);

    Email.send({ 
        Host: "smtp.gmail.com",
        Username: "hemantmakk@gmail.com",
        Password: "Sctivbrmn1234",
        To: str,
        From: "hemantmakk@gmail.com",
        Subject: "Sending Email using javascript",
        Body: "Testing",
        Attachments: [
            {
              name: "Photo.png",
              path: dataURL
            }
        ]
    }).then(function (message) { 
        console.log(message);
        // console.log("mail sent successfully");
    }); 
}






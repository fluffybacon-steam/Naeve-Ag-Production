var form = document.getElementById("my-form");
var statusBox = document.querySelector("#my-form-status");

async function handleSubmit(event) {
    event.preventDefault();
    var data = new FormData(event.target);
    var statusText = statusBox.querySelector('div');
    fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        console.log('res',response);
        if (response.ok) {
            statusText.innerHTML = "Thanks for your submission!";
            form.reset()
        } else {
            response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
                statusText.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
                statusText.innerHTML = "Oops! There was a problem submitting your form"
            }
            })
        }
    }).catch(error => {
        statusText.innerHTML = "Oops! There was a problem submitting your form"
        console.log('error',error);
    });
}
function hideStatus(event){
    if (event.target.querySelector('div')){
        event.target.querySelector('div').innerHTML = '';
    } else {
        event.target.innerHTML = '';
    }
}

form.addEventListener("submit", handleSubmit);
statusBox.addEventListener("click", hideStatus);
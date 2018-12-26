// var nome = document.querySelector("#exampleInputName");
// var sexo = document.querySelector("#form-user-create [name=gender]:checked");
// var nascimento = document.querySelector("#exampleInputBirth");
// var pais = document.querySelector("#exampleInputCountry");
// var email = document.querySelector("#exampleInputEmail");
// var senha = document.querySelector("#exampleInputPassword");
// var foto = document.querySelector("#exampleInputFile");
// var admin = document.querySelector("#exampleInputAdmin");



// -------------Usando forEch -


var fields = document.querySelectorAll("#form-user-create [name]");

var user = {};

document.getElementById("form-user-create").addEventListener("submit", function(event){
        event.preventDefault();

        fields.forEach((dados) => {
            if (dados.name == "gender") {
                
                if (dados.checked){
                    user[dados.name] = dados.value;
                }
        
            }
            else{
                user[dados.name] = dados.value;
            }
        
        });

        console.log(user);
});
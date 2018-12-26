// var nome = document.querySelector("#exampleInputName");
// var sexo = document.querySelector("#form-user-create [name=gender]:checked");
// var nascimento = document.querySelector("#exampleInputBirth");
// var pais = document.querySelector("#exampleInputCountry");
// var email = document.querySelector("#exampleInputEmail");
// var senha = document.querySelector("#exampleInputPassword");
// var foto = document.querySelector("#exampleInputFile");
// var admin = document.querySelector("#exampleInputAdmin");



// -------------Menu

var menu = document.querySelector("#body").addEventListener("click", function(event){
    // menu.classList.value = "hold-transition skin-blue sidebar-mini sidebar-collapse";
    var classe = event.path[4].className;
    
    if(classe == "hold-transition skin-blue sidebar-mini"){
        document.querySelector("body").classList = "hold-transition skin-blue sidebar-mini sidebar-collapse";
    }else{
        document.querySelector("body").classList = "hold-transition skin-blue sidebar-mini";
    }
});

// Pegando dados do formUser

var fields = document.querySelectorAll("#form-user-create [name]");
var user = {};

function addLine(dataUser){
    console.log("Dados do usuario", dataUser);
    
    var tr = document.createElement('tr');
    
    tr.innerHTML = `
    <tr>
        <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.admin}</td>
        <td>${user.birth}</td>
        <td>
        <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
    </tr>
    
    `;
    document.getElementById('tableUsers').appendChild(tr);
    
}

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
    
    addLine(user);
});
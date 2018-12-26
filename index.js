
// -------------Menu

var menu = document.querySelector("#body").addEventListener("click", function(event){
    // menu.classList.value = "hold-transition skin-blue sidebar-mini sidebar-collapse";
    var classe = event.path[4].className;
    
    if(classe == "hold-transition skin-blue sidebar-mini"){
        document.querySelector("#body").classList = "hold-transition skin-blue sidebar-mini sidebar-collapse";
    }else{
        document.querySelector("#body").classList = "hold-transition skin-blue sidebar-mini";
    }
});

// Pegando dados do formUser

let userController = new UserController('form-user-create', 'table-users');

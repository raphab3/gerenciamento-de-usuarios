class UserController{
    
    constructor(formId, tableId){
        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);
        
        this.onSubmit();
    }
    
    onSubmit() {
        
        this.formEl.addEventListener('submit', event => {
            event.preventDefault(); //Desativa funções padrão do navegador

            let btn = this.formEl.querySelector("[type=submit]");

            btn.disabled = true;

            let values = this.getValues();

            if(!values){
                return false;
            }
            
            this.getPhoto().then((content)=>{
                values.photo = content;
                this.addLine(values);
                this.formEl.reset();
                btn.disabled = false;
            }), (e) => {
                console.error(e);
            }
        });

        this.countUserAdmin = 0;
    }
    
    // funcao para pegar foto do formulario ultilizando promisse
    getPhoto(){
        
        return new Promise((resolve, reject)=>{
            
            let fileReader = new FileReader();
            
            let elements = [...this.formEl.elements].filter(item=>{
                
                if (item.name === 'photo') {
                    return item;
                }
            });
            
            let file = elements[0].files[0];
            
            fileReader.onload = ()=>{
                
                resolve(fileReader.result);
            };
            
            fileReader.onerror = (e)=>{
                reject(e);
            };
            
            if (file) {
                fileReader.readAsDataURL(file);
            }else{
                resolve('dist/img/boxed-bg.jpg');
            }
            
        });
        
    }
    
    getValues() {
        
        let user = {};

        let isValid = true;

        [...this.formEl.elements].forEach((dados) => {

            if (['name', 'email', 'password'].indexOf(dados.name) > -1 && !dados.value){

                dados.parentElement.classList.add('has-error');
                isValid = false;

            }

            if (dados.name == "gender") {
                
                if (dados.checked){
                    user[dados.name] = dados.value;
                }
                
            }
            else if(dados.name == "admin"){
                user[dados.name] = dados.checked;
            }
            else{
                user[dados.name] = dados.value;
            }
            
        });

        if(!isValid){
            return false;
        }
        
        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
            );
            
        }
        
        addLine(dataUser){
            
            let tr = document.createElement('tr');

            tr.dataset.user = JSON.stringify(dataUser);
            
            tr.innerHTML = `
                <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
                <td>${Utils.dateFormat(dataUser.register)}</td>
                <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
                
            `;
            
            this.tableEl.appendChild(tr);

            this.updateCount();

        };

        updateCount(){

            let countUsers = 0;
            let countUserAdmin = 0;

            let values = this.getValues();

           [...this.tableEl.children].forEach(tr=>{
                countUsers++;

                // if (values.admin) {
                //     countUserAdmin++

                // }

                let user = JSON.parse(tr.dataset.user);

                console.log(user);

                if(user._admin) countUserAdmin++;

           });

           document.querySelector("#number-users-admin").innerHTML = countUserAdmin;
           document.querySelector("#number-users").innerHTML = countUsers;
           
        }
        
        
    }
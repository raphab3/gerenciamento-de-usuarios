class UserController{
    
    constructor(formId, tableId){
        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);
        
        this.onSubmit();
    }
    
    onSubmit() {
        
        this.formEl.addEventListener('submit', event => {
            event.preventDefault(); //Desativa funções padrão do navegador
            
            let values = this.getValues()
            
            this.getPhoto().then((content)=>{
                values.photo = content;
                this.addLine(values);
            }), (e) => {
                console.error(e);
            }
        });
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
        
        [...this.formEl.elements].forEach((dados) => {
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
            
            tr.innerHTML = `
                <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
                <td>${dataUser.birth}</td>
                <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
                
            `;
            
            
            this.tableEl.appendChild(tr);
        }
        
        
    }
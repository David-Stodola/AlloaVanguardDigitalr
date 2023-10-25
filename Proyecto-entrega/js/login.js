const userInicio = [
    {
        fullname: 'Daniel Lee',
        email: 'admin@admin.com',
        id: '6',
        password: 'admin',
        role: "ROLE_ADMIN"
    },
    {
        fullname: 'Samantha Davis',
        email: 'samantha.davis@example.com',
        id: '7',
        password: 'alfabeta',
        role: "ROLE_CLIENT"
    },
    {
        fullname: 'James Moore',
        email: 'james.moore@example.com',
        id: '8',
        password: 'alfabeta',
        role: "ROLE_CLIENT"
    },
    {
        fullname: 'Isabella Taylor',
        email: 'isabella.taylor@example.com',
        id: '9',
        password: 'alfabeta',
        role: "ROLE_CLIENT"
    },
]


// null no es verdadero
// if( !localStorage.getItem("users")  ) {
if( localStorage.getItem("users") === null  ) {

    localStorage.setItem("users", JSON.stringify(userInicio))

}

const users = JSON.parse(localStorage.getItem("users"))


const loginForm = document.getElementById("login")
    loginForm.addEventListener("submit", (event) => {
        //Evitar el comportamiento por defecto del evento submit
        event.preventDefault()
        //2- Obtener los datos ingresados por el usuario
        
        const emailInput = event.target.elements.email.value;
        const passwordInput = event.target.elements.password.value;
    
        //3- Primero buscar si tengo un usuario con ese email
        //Guardo ese usuario en una variable
        const userExist = users.find(usr => {
    
            if(usr.email === emailInput) {
                return true
            }
    
            return false;
        })
    
        if(!userExist || userExist.password !== passwordInput) {
        // if(!userExist) {
            Swal.fire("No encontramos tu cuenta", "Vuelve a intentarlo por favor. <br> (Sino tenés podés crearte una)", "error");
            return;
        }
        
    
        //HACER EL LOGIN
        Swal.fire("Bienvenido", "¡Entremos!", "success")
    
        // userExist.password = undefined
        delete userExist.password
    
        localStorage.setItem( "currentUser", JSON.stringify(userExist)   )
    
        setTimeout(function() {
            window.location.href = '/index.html'
        }, 2000)
    
        //Preguntar si ese usuario que yo encuentro tiene un password exactamente igual que persona ingreso
        
        // #Guardar ese usuario en localStorage 
        // !Mostramos un alert del usuario
    
    })



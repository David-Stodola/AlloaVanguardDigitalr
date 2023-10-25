localStorage.setItem("nombre", 200);
localStorage.setItem("currentUser", "Pedro Talio");

const nombreGuardado = localStorage.getItem("nombre");

console.log(JSON.parse(nombreGuardado));

Swal.fire("Bienvenido", `Que bueno verte de nuevo ${nombreGuardado}`);

// localStorage.removeItem("currentUser")

// localStorage.clear()

const users = {
  fullname: "James Moore",
  email: "james.moore@example.com",
  id: "8",
};

//Cuando voy a guardar un objeto o array tengo que si o si convertirlo a una string
localStorage.setItem("usuariosGuardados", JSON.stringify(users));

// Cuando obtengo el dato lo tranformo a un objeto JS para poder trabajarlo como tal
const temp = JSON.parse(localStorage.getItem("usuariosGuardados"));

console.log(temp);

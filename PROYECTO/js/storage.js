localStorage.setItem("nombre", 200);
localStorage.setItem("currentUser", "Pedro Talio");

const nombreGuardado = localStorage.getItem("nombre");

console.log(JSON.parse(nombreGuardado));

Swal.fire("Bienvenido", `Que bueno verte de nuevo ${nombreGuardado}`);



const users = {
  fullname: "James Moore",
  email: "james.moore@example.com",
  id: "8",
};


localStorage.setItem("usuariosGuardados", JSON.stringify(users));


const temp = JSON.parse(localStorage.getItem("usuariosGuardados"));

console.log(temp);

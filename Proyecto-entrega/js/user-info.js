const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//Obtenemos elementos HTML
const headerUserInfo = document.getElementById("user-header-name");
const headerUserAction = document.getElementById("user-action");
const navbarLink = document.querySelector("ul.navbar-nav#nav-list");

headerUserInfo.innerText = currentUser ? currentUser.fullname : "";

if (currentUser) {
  headerUserAction.innerHTML = `<button class="btn btn-danger" onclick="logout()">Logout</button>`;
  //Checkear si el user logueado es ADMIN
  if (currentUser.role === "ROLE_ADMIN") {
    //Deberíamos pintar dichos botones

    const adminProductLink = document.createElement("li");
    adminProductLink.classList.add("nav-item");
    adminProductLink.id = "nav-admin-product";
    // Si necesito agregarle la clase  active al botón
    const url = window.location.pathname;
    if (url.includes("admin.html")) {
      adminProductLink.classList.add("active");
    }

    const link = document.createElement("a");
    link.classList.add("nav-link", "bg-dark");
    link.href = "/pages/admin/admin.html";
    link.innerText = "Product Admin";

    adminProductLink.appendChild(link);

    navbarLink.appendChild(adminProductLink);
  }
} else {
  headerUserAction.innerHTML = `<a class="btn btn-dark" href="/pages/login/login.html">Login</a>`;
}

function logout() {
  localStorage.removeItem("currentUser");
  setTimeout(function () {
    window.location.href = "/index.html";
  }, 500);
}

const user = JSON.parse(localStorage.getItem("currentUser"))

if(!user || user.role !== 'ROLE_ADMIN') {

    window.location.href = "html/pages/admin/admin.html";
}
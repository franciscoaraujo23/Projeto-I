export function getLoggedInUser() {
  const userData = localStorage.getItem("utilizador_atual");
  return userData ? JSON.parse(userData) : null;
}

import { getLoggedInUser } from "../../models/userModel.js";

export function renderNavbarUser() {
  const user = getLoggedInUser();
  if (!user) return;

  const authLink = document.querySelector(".auth-link");

  if (authLink) {
    const avatar = user.avatarUrl || user.avatar || "./assets/avatar-default.png";
    const nome = user.nome || "Utilizador";

    authLink.innerHTML = `
      <img src="${avatar}" alt="" class="avatar-navbar" 
          style="width:32px; height:32px; border-radius:50%; margin-right:8px;">
      <span style="font-size: 1rem;">${nome}</span>
    `;
    authLink.href = "profile.html";
  }
}

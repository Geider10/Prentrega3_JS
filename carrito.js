const d = document;
const btnModalOpen = d.getElementById("btnModalO");
const btnModalClose  = d.getElementById("btnModalC");
const modal = d.getElementById("conteinerModal");
btnModalOpen.addEventListener("click",()=>{modal.classList.remove("off")})
btnModalClose.addEventListener("click",()=>{modal.classList.add("off")})
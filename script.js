function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const contato = getParam("contato") || "Reijane";
const loadingDiv = document.getElementById("loading");
const contentDiv = document.getElementById("content");

fetch("./postcards.json")
  .then(response => response.json())
  .then(data => {
    const info = data[contato];
    if (info) {
      document.getElementById("nome").innerText = info.nome;
      document.getElementById("cargo").innerText = info.cargo;
      document.getElementById("whatsapp").innerHTML = `<a href="https://wa.me/55${info.whatsapp}" target="_blank">(11) ${info.whatsapp_number}</a>`;
      document.getElementById("email").innerHTML = `<a href="mailto:${info.email}">${info.email}</a>`;
      
      loadingDiv.style.display = "none";
      contentDiv.classList.remove("hidden");
    } else {
      loadingDiv.innerText = "Contato não encontrado.";
    }
  })
  .catch(error => {
    console.error("Erro ao carregar JSON:", error);
    loadingDiv.innerText = "Erro ao carregar os dados.";
  });

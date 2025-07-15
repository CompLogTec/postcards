document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const contato = params.get('contato') || 'Reijane';

  fetch('./postcards.json')
    .then(response => response.json())
    .then(data => {
      const person = data[contato];
      if (!person) {
        document.getElementById('loading').innerText = 'Contato não encontrado.';
        return;
      }

      console.log(person)

      // Atualiza DOM com dados do JSON
      document.getElementById('nome').innerText = person.nome;
      document.getElementById('cargo').innerText = person.cargo;

      // Usa o ddd do JSON diretamente
      document.getElementById('whatsapp').innerText = `(${person.ddd}) ${person.whatsapp_number}`;
      document.getElementById('email').innerText = person.email;

      document.getElementById('loading').style.display = 'none';
      document.getElementById('content').classList.remove('hidden');
    })
    .catch(err => {
      console.error(err);
      document.getElementById('loading').innerText = 'Erro ao carregar.';
    });
});

document.getElementById('importar').addEventListener('click', function (e) {
  e.preventDefault();

  // Simulação: pegue os dados do seu JSON carregado
  const nome = document.getElementById('nome').innerText;
  const cargo = document.getElementById('cargo').innerText;
  const whatsapp = document.getElementById('whatsapp').innerText;
  const email = document.getElementById('email').innerText;

  const vcf = `
BEGIN:VCARD
VERSION:3.0
N:${nome};;;;
FN:${nome}
ORG:Complog Tecnologia E-commerce
TITLE:${cargo}
TEL;TYPE=CELL:${whatsapp}
EMAIL;TYPE=INTERNET:${email}
END:VCARD
  `.trim();

  const blob = new Blob([vcf], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${nome}.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

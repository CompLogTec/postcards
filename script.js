document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const contato = params.get('contato') || 'Reijane';

  fetch('postcards.json')
    .then(response => response.json())
    .then(data => {
      const person = data[contato];
      if (!person) {
        document.getElementById('loading').innerText = 'Contato não encontrado.';
        return;
      }

      // Atualiza DOM com dados do JSON
      document.getElementById('nome').innerText = person.nome;
      document.getElementById('cargo').innerText = person.cargo;

      // Usa o ddd do JSON diretamente
      document.getElementById('whatsapp').innerText = `(${person.ddd}) ${person.whatsapp_number}`;
      document.getElementById('email').innerText = person.email;

      // Atualiza botão de importar
      const importLink = document.getElementById('importar');
      importLink.href = `/api/gerar-vcf?nome=${encodeURIComponent(person.nome)}&telefone=${encodeURIComponent(person.whatsapp)}&email=${encodeURIComponent(person.email)}&cargo=${encodeURIComponent(person.cargo)}`;

      document.getElementById('loading').style.display = 'none';
      document.getElementById('content').classList.remove('hidden');
    })
    .catch(err => {
      console.error(err);
      document.getElementById('loading').innerText = 'Erro ao carregar.';
    });
});

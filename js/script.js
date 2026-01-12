const btn = document.getElementById("btn");
const resultado = document.getElementById("resultado");

btn.addEventListener("click", carregarProvas);

async function carregarProvas() {
  try {
    const response = await fetch("https://api.enem.dev/v1/exams");

    if (!response.ok) {
      throw new Error("Erro HTTP: " + response.status);
    }

    const provas = await response.json();
    console.log(provas); // DEBUG

    resultado.innerHTML = "";

    provas.forEach(prova => {
      const div = document.createElement("div");

      div.innerHTML = `
        <button onclick="carregarProva('${prova.year}')">
          ${prova.year}
        </button>
      `;

      resultado.appendChild(div);
    });

  } catch (error) {
    console.error(error);
    resultado.innerHTML = "Erro ao carregar provas.";
  }
}

async function carregarProva(year) {
  try {
    const response = await fetch(
      `https://api.enem.dev/v1/exams/${year}`
    );

    const prova = await response.json();
    console.log(prova); // DEBUG

    resultado.innerHTML = `<h2>${prova.title}</h2>`;

    prova.questions.forEach(q => {
      const div = document.createElement("div");

      div.innerHTML = `
        <p><strong>${q.statement}</strong></p>
        <ul>
          ${q.alternatives.map(a =>
            `<li>${a.letter}) ${a.text}</li>`
          ).join("")}
        </ul>
      `;

      resultado.appendChild(div);
    });

  } catch (error) {
    console.error(error);
    resultado.innerHTML = "Erro ao carregar prova.";
  }
}

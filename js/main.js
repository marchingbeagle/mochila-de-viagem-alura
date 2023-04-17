const formulario = document.getElementById("novoItem");
const lista = document.querySelector("#lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((element) => {
  criaElemento(element.nome, element.quantidade);
});

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  const nome = event.target.elements["nome"].value;
  const quantidade = event.target.elements["quantidade"].value;

  armazenaDados(nome, quantidade);
  criaElemento(nome, quantidade);
  limpaFormulario(nome, quantidade, event);
  document.location.reload(true);
});

const apagar = document.querySelectorAll(".botaoApagar");
console.log(apagar);
apagar.forEach((Element, id) => {
  Element.addEventListener("click", (event) => {
    console.log(apagar[id]);
    console.log(itens);
    itens.splice(id, 1);
    localStorage.setItem("itens", JSON.stringify(itens));
    document.location.reload(true);
  });
});

function criaElemento(nome, quantidade) {
  const liItem = document.createElement("li");
  const divItem = document.createElement("div");
  const numeroItem = document.createElement("strong");
  const botaoApagar = document.createElement("button");

  liItem.appendChild(divItem);
  divItem.appendChild(numeroItem);
  liItem.appendChild(botaoApagar);

  liItem.classList.add("item");
  botaoApagar.classList.add("botaoApagar");
  divItem.classList.add("divItens");

  numeroItem.innerHTML = quantidade;
  divItem.innerHTML += nome;

  lista.appendChild(liItem);
}

function limpaFormulario(nome, quantidade, event) {
  const elementos = event.target.elements;
  for (i = 0; i < elementos.length; i++) {
    elementos[i].value = "";
  }
  elementos["adicionar"].value = "Adicionar";
}

function armazenaDados(nome, quantidade) {
  const itensObjeto = {
    nome: nome,
    quantidade: quantidade,
  };

  itens.push(itensObjeto);

  localStorage.setItem("itens", JSON.stringify(itens));
}

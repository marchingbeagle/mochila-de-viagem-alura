const formulario = document.getElementById("novoItem");
const lista = document.querySelector("#lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((element) => {
  criaElemento(element);
});

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  const nome = event.target.elements["nome"].value;
  const quantidade = event.target.elements["quantidade"].value;

  const elementoExiste = itens.find((element) => element.nome === nome);

  const itensObjeto = {
    nome: nome,
    quantidade: quantidade,
  };

  if (elementoExiste) {
    itensObjeto.id = elementoExiste.id;
    itens[elementoExiste.id] = itensObjeto;
    atualizaElemento(itensObjeto);
  } else {
    itensObjeto.id = itens.length;
    criaElemento(itensObjeto);
    itens.push(itensObjeto);
  }

  localStorage.setItem("itens", JSON.stringify(itens));
  limpaFormulario(event);
  document.location.reload(true);
});

const apagar = document.querySelectorAll(".botaoApagar");
apagar.forEach((Element, id) => {
  Element.addEventListener("click", (event) => {
    itens.splice(id, 1);
    localStorage.setItem("itens", JSON.stringify(itens));
    document.location.reload(true);
  });
});

function criaElemento(item) {
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
  numeroItem.dataset.id = item.id;

  numeroItem.innerHTML = item.quantidade;
  divItem.innerHTML += item.nome;

  lista.appendChild(liItem);
}

function limpaFormulario(formulario) {
  const elementos = formulario.target.elements;
  for (i = 0; i < elementos.length; i++) {
    elementos[i].value = "";
  }
  elementos["adicionar"].value = "Adicionar";
}

function atualizaElemento(item) {
  console.log(item.id);
  document.querySelector("[data-id=" + '"' + item.id + '"]').innerHTML =
    item.quantidade;
}

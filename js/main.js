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
    itens[itens.findIndex((element) => element.id === elementoExiste.id)] =
      itensObjeto;
    atualizaElemento(itensObjeto);
  } else {
    itensObjeto.id = itens[itens.length - 1]
      ? itens[itens.length - 1].id + 1
      : 0;
    criaElemento(itensObjeto);
    itens.push(itensObjeto);
  }

  localStorage.setItem("itens", JSON.stringify(itens));
  limpaFormulario(event);
});

function botaoApagar(id) {
  const botaoApagarElement = document.createElement("button");
  botaoApagarElement.classList.add("botaoApagar");
  botaoApagarElement.addEventListener("click", function () {
    deletaElemento(this, id);
  });
  return botaoApagarElement;
}

function criaElemento(item) {
  const liItem = document.createElement("li");
  const divItem = document.createElement("div");
  const numeroItem = document.createElement("strong");

  liItem.appendChild(divItem);
  divItem.appendChild(numeroItem);
  liItem.appendChild(botaoApagar(item.id));

  liItem.classList.add("item");
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

function deletaElemento(tag, id) {
  console.log(itens);
  itens.splice(
    itens.findIndex((element) => element.id === id),
    1
  );
  localStorage.setItem("itens", JSON.stringify(itens));
  tag.parentNode.remove();
}

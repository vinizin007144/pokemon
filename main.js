const formulario = document.getElementById("formPoke");
const msg = document.getElementById("msg");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault(); // evita que a página recarregue

    const id = document.getElementById("idPoke").value;

    msg.textContent = "Buscando...";
    resultado.hidden = true;

    try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

        if (!resposta.ok) {
            msg.textContent = "Pokémon não encontrado.";
            return;
        }

        const pokemon = await resposta.json();

        document.getElementById("nomePokemon").textContent = pokemon.name;
        document.getElementById("imgPoke").src = pokemon.sprites.front_default;
        document.getElementById("basePoke").textContent =
            "Experiência base: " + pokemon.base_experience;

        // a API entrega altura em decímetros e peso em hectogramas
        document.getElementById("alturaPoke").textContent =
            "Altura: " + pokemon.height / 10 + " m";
        document.getElementById("pesoPoke").textContent =
            "Peso: " + pokemon.weight / 10 + " kg";

        msg.textContent = "";
        resultado.hidden = false;
    } catch (erro) {
        msg.textContent = "Erro ao buscar. Verifique sua conexão.";
    }
});
function getQueryParam(){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("pokeId") | 10;
}

async function fetchPokemon() {
    try {
        // Obtém o pokeId da URL e busca os dados do Pokémon correspondente
        const pokeId = getQueryParam();
        console.log(pokeId);
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokeId}`
        );
        if (!response.ok) {
            throw new Error(
            `Erro ao buscar dados do Pokémon: ${response.status}`
            );
        }
        const data = await response.json();
        console.log("Dados do Pokémon:", data);

        // Atualizar a página com os dados
        document.querySelector(".pokemon-header h2").textContent =
            data.name.toUpperCase();
        document.querySelector(".pokemon-header img").src =
            data.sprites.other["official-artwork"].front_default;

        document.querySelector(".pokemon-body").innerHTML = `
            <h5>About</h5>
            <p><strong>Species:</strong> ${data.species.name}</p>
            <p><strong>Height:</strong> ${data.height / 10} m</p>
            <p><strong>Weight:</strong> ${data.weight / 10} kg</p>
            <p><strong>Abilities:</strong> ${data.abilities
            .map((a) => a.ability.name)
            .join(", ")}</p>
            <hr>
            <h5>Types</h5>
            ${data.types
            .map(
                (t) => `<span class="badge bg-primary">${t.type.name}</span>`
            )
            .join(" ")}
        `;
        } catch (error) {
            console.error(error);
        }
  }

fetchPokemon();
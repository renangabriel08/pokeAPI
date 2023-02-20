// Const de limite de Pokemon
let cont = 1;
const limite = 151;

//Const de elementos que saem do HTML
const colocarCard = document.getElementById('cards-pokemon')
const iconFechar = document.getElementById('iconFechar')
const iconPesquisa = document.getElementById('iconPesquisa')
const inputPesquisa = document.getElementById('pesquisa')
const inputFiltro = document.getElementById('selecionarTipo')

// Listas para barra de pesquisa e filtro por tipo
let divsPokemon = []
let tiposPokemon = []
let listaTipos = [
    'normal', 'fire', 'water', 'grass', 'flying', 'fighting', 'poison', 'electric',
    'ground', 'rock', 'psychic', 'ice', 'bug', 'ghost', 'steel', 'dragon', 'dark', 'fairy'
]
// Segunda função para chamar link dos Pokemons
async function chamarPokemon(pokemon) {
    const APIresults = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const dadosPokemon = await APIresults.json();
    return dadosPokemon;
}

// Terceira função para coletar dados da API e colocar no HTML
async function cardsPoke(cont) {

    while (cont<=limite) {
        const dadosPokemon = await chamarPokemon(cont)

        // Variáveis dos dados dos Pokemons
        let idPokemon = dadosPokemon.id;
        const namePokemon = dadosPokemon.name;
        const typePokemon = dadosPokemon.types;
        const gifPokemon = dadosPokemon['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        const alturaPokemon = dadosPokemon.height;
        const pesoPokemon = dadosPokemon.weight;
        const basePokemon = dadosPokemon.base_experience;
        const vidaPokemon = dadosPokemon.stats[0].base_stat;
        const ataquePokemon = dadosPokemon.stats[1].base_stat;
        const defesaPokemon = dadosPokemon.stats[2].base_stat;

        // Formatação de id do pokemon(formato #000)
        if (idPokemon < 10) {
            idPokemon = '00'+idPokemon
        } else if (idPokemon >= 10 && idPokemon < 100) {
            idPokemon = '0'+idPokemon 
        }

        //Insirir card de cada Pokemon no HTML
        const card = document.createElement('div')
        card.className = 'card-pokemon-'+namePokemon;
        card.innerHTML =
        `
        <div class="top">
                <img src="${gifPokemon}" alt="Gif ${namePokemon}">
                <p class="idPokemon">#${idPokemon}</p>
            </div>
            <div class="bottom">
                <h2 class="nomePokemon">${namePokemon}</h2>
                <div class="divTipos" id="tipos${cont}"></div>
                <div class="skills">
                    <div class="skill">
                        <span>BC</span>
                        <p>${basePokemon}</p>
                    </div>
                    <div class="skill">
                        <span>HP</span>
                        <p>${vidaPokemon}</p>
                    </div>
                    <div class="skill">
                        <span>H</span>
                        <p>${alturaPokemon/10}m</p>
                    </div>
                    <div class="skill">
                        <span>KG</span>
                        <p>${pesoPokemon/10}</p>
                    </div>
                    <div class="skill">
                        <span>ATK</span>
                        <p>${ataquePokemon}</p>
                    </div>
                    <div class="skill">
                        <span>DEF</span>
                        <p>${defesaPokemon}</p>
                    </div>
                </div>
            </div>
        `
        colocarCard.appendChild(card)

        // Lógica para coletar todos os tipos de cada Pokemon
        let divTipos = document.getElementById('tipos'+cont);
        for(let i in typePokemon) {
            const criarTexto = document.createElement('p');
            criarTexto.className = 'tipo-pokemon'
            criarTexto.innerHTML =  typePokemon[i].type.name
            divTipos.appendChild(criarTexto)

            // Adiciona o tipo do pokemon no id do card, permitindo filtrar
            card.id += typePokemon[i].type.name
        }

        // Barra de Pesquisa
        divsPokemon.push(document.getElementsByClassName('card-pokemon-'+namePokemon))

        iconPesquisa.onclick=function() {
            if(inputPesquisa.value != '') {
                iconPesquisa.style.display = 'none'
                iconFechar.style.display = 'block'
                for(i in divsPokemon) {
                    let diferencaTextos = divsPokemon[i][0].className.length - `card-pokemon-${inputPesquisa.value.toLowerCase()}`.length
                    
                    if(divsPokemon[i][0].className == 'card-pokemon-'+inputPesquisa.value.toLowerCase() || 'card-pokemon-'+inputPesquisa.value.toLowerCase() == divsPokemon[i][0].className.substring(0, divsPokemon[i][0].className.length - diferencaTextos) || inputPesquisa.value == '') {
                        divsPokemon[i][0].style.display = 'block'
                    } else {
                        divsPokemon[i][0].style.display = 'none'
                    }
                }
            }
        }

        iconFechar.onclick=function() {
            iconPesquisa.style.display = 'block'
            iconFechar.style.display = 'none'
            inputPesquisa.value = ''
            for(i in divsPokemon) {
                divsPokemon[i][0].style.display = 'block'
            }
        }

        // Funções para filtrar por tipo
        tiposPokemon.push(card)
        botaoFiltar.onclick=function() {
            for (let contFiltro = 0; contFiltro<limite; contFiltro++) {
                for(i in listaTipos) {
                    if(tiposPokemon[contFiltro].id == inputFiltro.value.toLowerCase() + listaTipos[i] || tiposPokemon[contFiltro].id == listaTipos[i] + inputFiltro.value.toLowerCase() || tiposPokemon[contFiltro].id == inputFiltro.value.toLowerCase() || inputFiltro.value.toLowerCase() == 'none') {
                        tiposPokemon[contFiltro].style.display = 'block'
                        break
                    } else {
                        tiposPokemon[contFiltro].style.display = 'none'
                    }
                }
            }
        }
        cont++
    }
}

cardsPoke(cont)
//atribuo a "variável" html à todo documento html
const html = document.querySelector('html')

//atribuo a "variável" focoBt ao botão de foco
const focoBt = document.querySelector('.app__card-button--foco')
//atribuo a "variável" curtoBt ao botão de descanso curto
const curtoBt = document.querySelector('.app__card-button--curto')
//atribuo a "variável" longoBt ao botão de descanso longo
const longoBt = document.querySelector('.app__card-button--longo')

//atribuo a "variável" banner à imagem selecionada no html
const banner = document.querySelector('.app__image')

//atribuo a "variável" titulo ao texto exibido na página
const titulo = document.querySelector('.app__title')

//atribuo a "variável" botoes todos os botoes de seleção (foco, descanso curto e descanso longo)
const botoes = document.querySelectorAll('.app__card-button')

const startPauseBt = document.querySelector('#start-pause')

//atribuo a "variável" musicaFocoInput ao botão que liga e desliga a música
const musicaFocoInput = document.querySelector('#alternar-musica')

//atribuo a "variável" música ao audio da múscia
const musica = new Audio('/sons/luna-rise-part-one.mp3')
//faço com que a música permaneça em loop
musica.loop = true
const audioPlay = new Audio('/sons/play.wav')
const audioPausa = new Audio('/sons/pause.mp3')
const audioTempoFinalizado = new Audio('/sons/beep.mp3')

let tempoDecorridoEmSegundos = 5

let intervaloId = null

//Quando ocorre uma mudança (change) no botão que liga e desliga a música, uma função é chamada
musicaFocoInput.addEventListener('change', () => {
    //Se a música estiver pausada (musica.paused retorna true), então o método play() é chamado para começar a reprodução da música
    if(musica.paused) {
        musica.play()
      //Se a música estiver tocando (não pausada), o método pause() é chamado para pausar a reprodução da música.  
    } else {
        musica.pause()
    }
})

//seleciono o botão de foco e determino que ao clicá-lo a seguint função vai rodar
focoBt.addEventListener('click', () => {
    //chamo a função alterarContexto com parâmetro foco
    alterarContexto('foco')
    focoBt.classList.add('active')
})
//seleciono o botão de descanso curto e determino que ao clicá-lo a seguinte função vai rodar
curtoBt.addEventListener('click', () =>{
    //chamo a função alterarContexto com parâmetro descanso-curto
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})
//seleciono o botão de descanso longo e determino que ao clicá-lo a seguinte função vai rodar
longoBt.addEventListener('click', () => {
    //chamo a função alterarContexto com parâmetro descanso-longo
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

//explicando o funcionamento da função alterarContexto
function alterarContexto(contexto) {
    //remove o estado de ativo para os botoes que não foram clicados
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    //muda a cor do plano de fundo de acordo com o modo atual
    html.setAttribute('data-contexto', contexto)
    //muda a foto de acordo com o modo atual
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    //muda o texto de acordo com o contexto atual 
    //obs. a estrutura switch é uma alternativa para blocos if  
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <br>
                <strong class="app__title-strong">Faça uma pausa curta</strong>
            `
            break;
        case "descanso-longo" :
            titulo.innerHTML = `
            Hora de voltar à superfície. <br>
                <strong class="app__title-strong">Faça uma pausa longa</strong>
            `    
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play()
        zerar()
        alert('tempo finalizado')
        return
    }
    tempoDecorridoEmSegundos -= 1
    console.log('Temporizador: ' + tempoDecorridoEmSegundos)
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId){
        audioPausa.play()
        zerar()
        return
    }
    //obs valor em milissegundos
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
}
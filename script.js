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

//atribuo a "variável" startPauseBt ao botão que dá play ou pause no temporizador
const startPauseBt = document.querySelector('#start-pause')

//atribuo a "variável" icon à imagem mostrada dentro do botão de play ou pause
const icon = document.querySelector('.app__card-primary-butto-icon')

//atribuo a "variável" musicaFocoInput ao botão que liga e desliga a música
const musicaFocoInput = document.querySelector('#alternar-musica')

//atribuo a "variável" iniciarOuPausarBt ao texto exibidoo botão de dar play ou pausar
const iniciarOuPausarBt = document.querySelector('#start-pause span')

//atribuo à "variável" tempoNaTela ao temporizador exibido
const tempoNaTela = document.querySelector('#timer')

//atribuo a "variável" música ao audio da múscia
const musica = new Audio('/sons/luna-rise-part-one.mp3')
//faço com que a música permaneça em loop
musica.loop = true
//som ao dar play
const audioPlay = new Audio('/sons/play.wav')
//som ao dar pause
const audioPausa = new Audio('/sons/pause.mp3')
//som ao terminar o tempo
const audioTempoFinalizado = new Audio('/sons/beep.mp3')

//atribuo a varíavel tempoDecorrido em segundos o valor de 1500 segundos (25min) inicialmente
let tempoDecorridoEmSegundos = 1500 

//coloco o intervaloId como nulo inicialmente
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
    //determino que para o foco, o tempo é de 1500s (25min)
    tempoDecorridoEmSegundos = 1500
    //chamo a função alterarContexto com parâmetro foco
    alterarContexto('foco')
    focoBt.classList.add('active')
})
//seleciono o botão de descanso curto e determino que ao clicá-lo a seguinte função vai rodar
curtoBt.addEventListener('click', () =>{
    //determino que para o descanso curto o tempo é de 300s (5min)
    tempoDecorridoEmSegundos = 300
    //chamo a função alterarContexto com parâmetro descanso-curto
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})
//seleciono o botão de descanso longo e determino que ao clicá-lo a seguinte função vai rodar
longoBt.addEventListener('click', () => {
    //determino que para o descanso longo é o tempo de 900s (15min)
    tempoDecorridoEmSegundos = 900
    //chamo a função alterarContexto com parâmetro descanso-longo
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

//explicando o funcionamento da função alterarContexto
function alterarContexto(contexto) {
    mostrarTempo()
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

//é criada uma função com um sistema de contagem regressiva 
const contagemRegressiva = () => {
    //A função começa verificando se o tempoDecorridoEmSegundos é menor ou igual a zero. Se for, isso indica que o tempo acabou
    if(tempoDecorridoEmSegundos <= 0){
        //o audio que indica qie o tempo foi finalizado toca
        audioTempoFinalizado.play()
        //a função de zerar o temporizador é chamada
        zerar()
        //É exibido uma alert na página indicando que o tempo acabou 
        alert('Tempo finalizado')
        //Retorna, encerrando a execução da função.
        return
    }
    //caso a função não tenha acabado ainda, o tempo decorrido em segundos diminui em um segundo a cada segundo passado
    tempoDecorridoEmSegundos -= 1
    //a função mostrar tempo é chamada
    mostrarTempo()
}

//Ao botão de iniciar ou pausar ser clicado, a função de iniciar ou pausar será chamada
startPauseBt.addEventListener('click', iniciarOuPausar)

// é criada uma função que é parte de uma aplicação de contagem regressiva com a capacidade de iniciar e pausar
function iniciarOuPausar() {
    //Se intervaloId estiver definido (ou seja, se já houver um intervalo em execução), isso significa que o botão foi clicado para pausar a contagem regressiva.
    if(intervaloId){
        //o audio de pausa é tocado
        audioPausa.play()
        //A função zerar é chamada para reiniciar a contagem regressiva.
        zerar()
        //A execução da função é encerrada.
        return
    }
    //Se intervaloId não estiver definido (ou seja, se não houver um intervalo em execução), isso significa que o botão foi clicado para iniciar a contagem regressiva ou retomá-la após uma pausa.
    //o áudio de play é tocado
    audioPlay.play()
    //Um novo intervalo é iniciado usando setInterval, onde a função contagemRegressiva é chamada a cada 1000 milissegundos (ou seja, a cada segundo).
    intervaloId = setInterval(contagemRegressiva, 1000)
    //O texto do botão que controla a função iniciarOuPausar é alterado para "Pausar".
    iniciarOuPausarBt.textContent = "Pausar"
    //O atributo src de um elemento icon é atualizado para a imagem de pausa, indicando visualmente que o botão agora pausará a contagem regressiva se clicado novamente.
    icon.setAttribute('src', '/imagens/pause.png')
}

//É criada uma função relacionada à reinicialização do estado do contador regressivo
function zerar() {
    //A função inicia chamando clearInterval(intervaloId). Isso interrompe o intervalo de tempo definido anteriormente pela função setInterval, usando o ID do intervalo armazenado na variável intervaloId. Isso significa que o contador regressivo será interrompido.
    clearInterval(intervaloId)
    //O texto do botão que controla a função iniciarOuPausar é alterado para "Começar".
    iniciarOuPausarBt.textContent = "Começar"
    //O atributo src de um elemento icon é atualizado para a imagem de play, indicando visualmente que o botão agora dará play a contagem regressiva se clicado novamente.
    icon.setAttribute('src', '/imagens/play_arrow.png')
    //Por fim, a variável intervaloId é definida como null, indicando que não há mais nenhum intervalo em execução.
    intervaloId = null
}

//É criada uma função para exibir um temporizador ao usuário
function mostrarTempo() {
    //A função começa criando um novo objeto Date usando o valor de tempoDecorridoEmSegundos * 1000. Isso é feito porque o construtor Date espera um valor de milissegundos, enquanto tempoDecorridoEmSegundos parece estar em segundos.
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    //Em seguida, o tempo é formatado usando o método .toLocaleTimeString(). Isso formata o tempo de acordo com as configurações de localização específicas do Brasil ('pt-br') e especifica que apenas os minutos e segundos devem ser exibidos, com dois dígitos para cada um.
    tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    //O conteúdo do elemento HTML com o ID tempoNaTela é atualizado para mostrar o tempo formatado
    tempoNaTela.innerHTML = `${tempoFormatado}`
    //Essa função é útil para atualizar dinamicamente a exibição do tempo em uma aplicação, garantindo que ele seja formatado corretamente de acordo com as preferências de idioma e mostrando apenas minutos e segundos.
}

//Para mostrar o temporizador o tempo todo
mostrarTempo()
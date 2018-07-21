//MENU RESPONSIVO
var contador = 1;
function main() {
  $('.fa-align-justify').click(function () {
    if (contador == 1) {

      $('.MenuLoja').animate({
        left: '0'
      });
      contador = 0;
    }
    else {
      contador = 1;
      $('.MenuLoja').animate({
        left: '-100%'
      });
    }
  })
}
main();


/*SLIDER DA PAGINA*/
$('.slide').each(function () {
  let $this = $(this);
  let grupoSlide = $this.find('.slide-Grupo');
  let slide = $this.find('.slide-Imagem');
  let botaoArray = [];
  let indiceAtual = 0;
  let contarTempo;

  function moverSlide(newIndex) {
    let animacaoEsquerda;
    let slideEsquerda;

    avancar();
    //Se o ususario clicar no botao da mesma imagem apresentada na tela, nada acontece.
    if (grupoSlide.is(':animated') || indiceAtual === newIndex) {
      return;
    }
      botaoArray[indiceAtual].removeClass('active');
      botaoArray[newIndex].addClass('active');

    //aqui defini para onde o slide vai o slide
    if (newIndex > indiceAtual) {
      //direita para esquerda
      slideEsquerda = '100%';
      animacaoEsquerda = '-100%';

    } else {
      //esquerda para direita
      slideEsquerda = '-100%';
      animacaoEsquerda = '100%';
    }

    slide.eq(newIndex).css({ left: slideEsquerda, display: 'block' }); //sempre o slide mostrado na tela vai ser display block

    grupoSlide.animate({ left: animacaoEsquerda }, function () {
      slide.eq(indiceAtual).css({ display: 'none' }); //O slide que não são mostrado na tela acultamos eles
      slide.eq(newIndex).css({ left: 0 }); //saber o valor atual do newIndex, e passar left 0
      grupoSlide.css({ left: 0 });
      indiceAtual = newIndex;
    });
  }
  function avancar() {
    clearTimeout(contarTempo); //limpa o tempo atual
    contarTempo = setTimeout(function () {

      //Se não for o ultimo slide, vai fazer a contagem do tempo para passar o proximo slide
      if (indiceAtual < (slide.length - 1)) {
        moverSlide(indiceAtual + 1);
      }
      else {
        //voltando ao primeiro slide
        moverSlide(0);
      }
    }, 4000); //4 segundos
  }
  $.each(slide, function (index) {
    let botao = $('<button type="button" class="slide-btn">&bull;</button>');
    if (index === indiceAtual) {//&bull;
      botao.addClass('active');
    }

    botao.on('click', function () {
      moverSlide(index);
    }).appendTo('.slide-Botao');
    botaoArray.push(botao); //adiciona o botao ao  um array
  });
  avancar();
});

/*FILTRO DOS QUADRIHNOS*/
(function () {

  let quadrinhos = $('.ContainerFlex .produtos-Quadrinho'); //pegando cada div com os quadrinhos
  let botao = $('.flitro-Botao'); //onde vou armazenar os botoes
  armazenaTags = {}; //Criando o objeto para adicionar o array

  //vai contar quantos produtos existem e adicionar em um array
  quadrinhos.each(function () {
    let $Hqs = this;
    let tags = $(this).data('tags');

    if (tags) {
      tags.split(',').forEach(nomeTag => {

        if (armazenaTags[nomeTag] == null) {
          armazenaTags[nomeTag] = [];
        }
        armazenaTags[nomeTag].push($Hqs); //Armazenas os produtos em um array
      });
    }
  });

  //Neste botão vai mostrar todos os produtos da loja
  $('<a/>', {
    text: "MOSTRAR TUDO", 
    class: 'itemFiltro',
    click: function () {
      $(this).addClass('itemFiltro')
        .siblings()
        .removeClass('active');
      quadrinhos.show();
    }
  }).appendTo(botao);
  

  /*Para cada tag criada que esteja com o nome diferente vamos criar um botao*/
  $.each(armazenaTags, function (nomeTag) {
    $('<a/>', {
      text: nomeTag + '(' + armazenaTags[nomeTag].length + ')',
      style: 'color: black',
      class: 'itemFiltro',
      click: function () {
        $(this)
          .addClass('active')
          .siblings()
          .removeClass('active');

          quadrinhos
          .hide()
          .filter(armazenaTags[nomeTag])
          .show();
      }
    }).appendTo(botao);
  });
}()); //Fecha função anonima

//Criando o accordion do menu filtro
$('.Filtro').on('click', '.Series', function(e){
  e.preventDefault();
  $(this)
  .next('.filtro-Series')
  .not(':animated')
  .slideToggle();
});

let num = 0;
/*Ocultar as imagens que ficam superior ao decima imagem*/
function ocultarImagens() {
    let contar = 20;
    for (let i = 0; i < contar; i++) {
        if (i > 10 || i == 10) {
            $('.produtos-Quadrinho').eq(i).css({
                display: 'none'
            });
        }
    }
}
ocultarImagens();

/*Criei um media query, para que ao diminuir a tela do navagador (com as outras imagens ocultas),
o total de imagens que o usario vai ver serão 8, e não 10 imagens, 
porque com 10 imagens a ultima fileira de imagens vai ficar incompleta*/
function mediaSize() {
    let contarImg = 10;
    if (window.matchMedia('(max-width: 960px)').matches) {
        for (let a = 0; a < contarImg; a++) {
            if ((a > 8 || a == 8) && num == 0) {    //Para saber se o botao esta ativo ou não
                /*Oculta as duas iamgens que ficam sobrando em uma fileira de 4 imagens cada*/
                $('.produtos-Quadrinho').eq(a).css({
                    display: 'none'
                });
            }
        }   
    }
    else{
        /*Caso a tela for mais que 960px, as imagens voltam a aparecer*/
        for (let a = 0; a < contarImg; a++) {       
          $('.produtos-Quadrinho').eq(a).css({
              display: 'block'
          });
        }
    }
}
mediaSize();
window.addEventListener('resize', mediaSize, false);

/*carregar mais imagens*/
$('.Ativar').on('click', function() {
    $('.produtos-Quadrinho').fadeIn('slow');
    num++;
    console.log(num);
});




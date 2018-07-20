$('.listaAbas').each(function(){
    let $this = $(this);
    let $tab = $this.find('.active');

    let $link = $tab.find('a');
    let $panel = $($link.attr('href'));

    $this.on('click', '.AbaControle', function(e){
        e.preventDefault();
        var $link = $(this);
        var id = this.hash;

        if(id && !$link.is('.active')){
            $panel.removeClass('active');
            $tab.removeClass('active');

            $panel = $(id).addClass('active');
            $tab = $link.parent().addClass('active');
        }
    });
});

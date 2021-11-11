$('#post-comment').hide();

$('#btn-toggle-comment').click(e => {
    e.preventDefault();
    $('#post-comment').slideToggle();
});

$('#btn-like').click(function (e) {
    e.preventDefault();
    let imgId = $(this).data('id');

    $.post('/images/' + imgId + '/like')
        .done(data => {
            console.log(data);
            $('.likes-count').text(data.likes);
        });
});

$('#redirecion').click(function(e){
    e.preventDefault();
    document.location.href='/users/administrador';
});

$('#btn-delete').click(function (e) {
    e.preventDefault();
    let $this = $(this);
    const response = confirm('¿Estas Seguro de querer eliminar esta imagen?');
    if (response) {
        let imgId = $this.data('id');
        $.ajax({
            url: '/images/' + imgId,
            type: 'DELETE'
        })
            .done(function (result) {
                $this.removeClass('btn-danger').addClass('btn-success');
                $this.find('i').removeClass('fa-times').addClass('fa-check');
                $this.append('<span></span>');
                document.location.href = "/vista";
            });
    }
});

function eliminar(){
 document.getElementById('chat').innerHTML='';
}
function soloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = [8, 37, 39, 46];

    tecla_especial = false
    for(var i in especiales) {
        if(key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if(letras.indexOf(tecla) == -1 && !tecla_especial)
        return false;
}

function soloNumeros(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    numeros = "0123456789";
    especiales = [8, 37, 39, 46];

    tecla_especial = false
    for(var i in especiales) {
        if(key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if(numeros.indexOf(tecla) == -1 && !tecla_especial)
        return false;
}

function pruebaemail(valor){
    re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    if(!re.exec(valor)){
        alert('El email no es valido')
    }
    else 
    alert('El email es valido')
}


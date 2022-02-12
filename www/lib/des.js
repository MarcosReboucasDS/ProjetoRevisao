window.onload = function(){
    const envia = document.querySelector("#enviar");
    const cep = document.querySelector('#cep');
    const buscar = document.querySelector("#butau");
    const opcoes = {
    methos: 'GET',
    mode: 'cors',
    cache: 'default'
    }
    //Mensagem    
    envia.addEventListener("click", function(){
        navigator.vibrate(100);
      navigator.notification.beep(1);
        function onConfirm(buttonIndex) {
            if(buttonIndex == 2){
         alert('Tudo bem!');
            }
            if(buttonIndex == 1){
         alert('Cadastro Realizado!!');
            }
        }
        navigator.notification.confirm(
            'Deseja mesmo enviar seu cadastro?', // message
            onConfirm,            // callback to invoke with index of button pressed
            'Mensagem',           // title
            ['Sim','Não']     // buttonLabels
        );
    })  //Código de barras
    document.querySelector("#mostrar").addEventListener('click', function (){
      cordova.plugins.barcodeScanner.scan(
      function (result){
          navigator.vibrate(100);
      navigator.notification.beep(1);
        if(result.text == '280720550'){
          document.querySelector('#i1').innerHTML = "<h2>Lápis de Cor<h2/>";
          document.querySelector('#img').src = "lib/fotos/Imgem1.jpg";
          document.querySelector('#i2').innerHTML = "<br>Lápis de cor nas cores pásteis</br><br>R$12,15</br>";
        }
        if(result.text == '989895555'){
          document.querySelector('#i1').innerHTML = "<h2>Post-It<h2/>";
          document.querySelector('#img').src = "lib/fotos/Imagem2.jpg";
          document.querySelector('#i2').innerHTML = "<br>Post-its nas cores pásteis</br><br>R$8,99</br>";
        }
        if (result.text == '85236987'){
            document.querySelector('#i1').innerHTML = "<br>Cadernos Pastéis</br>";
            document.querySelector('#img').src = 'lib/fotos/Imagem3.jpg';
            document.querySelector('#i2').innerHTML = "<br>R$16,99</br>";
          }
          if(result.cancelled){
            navigator.notification.alert("Cancelado");
          }else{
            navigator.notification.alert("Deu certo");
          }
      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Place a barcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417,CODE_39", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS and Android
      });
    });
    //CEP
    butau.addEventListener('click', function(){
    fetch(`https://viacep.com.br/ws/${cep.value}/json/`, opcoes)
    .then(response => {response.json()
        .then(data => {
            document.querySelector('#estado').value = data['uf'];
            document.querySelector('#cidade').value = data['localidade'];
            document.querySelector('#bairro').value = data['bairro'];
            document.querySelector('#rua').value = data['logradouro'];
        })
    })
  });
 buscar.addEventListener("click", function(){
          fetch(`https://viacep.com.br/ws/${cep.text}/json/`, opcoes)
    .then(response => {response.json()
        .then(data => {         
            document.querySelector('#cep').value = result.value;
            document.querySelector('#estado').value = data['uf'];
            document.querySelector('#cidade').value = data['localidade'];
            document.querySelector('#bairro').value = data['bairro'];
            document.querySelector('#rua').value = data['logradouro'];
        })
    });
})
//Internet
function checkConnection() {
    let networkState = navigator.connection.type;

    let states = {};

    states[Connection.NONE] = 0;

    if(states[networkState] == 0){
      return false;
    }else{
      return true;
    }
}
document.querySelector("#rede").addEventListener("click", function(){
        function checkConnection() {
          var networkState = navigator.connection.type;

          var states = {};
          states[Connection.UNKNOWN]  = 'Unknown connection';
          states[Connection.ETHERNET] = 'Ethernet connection';
          states[Connection.WIFI]     = 'WiFi connection';
          states[Connection.CELL_2G]  = 'Cell 2G connection';
          states[Connection.CELL_3G]  = 'Cell 3G connection';
          states[Connection.CELL_4G]  = 'Cell 4G connection';
          states[Connection.CELL]     = 'Cell generic connection';
          states[Connection.NONE]     = 'No network connection';

          alert('Connection type: ' + states[networkState]);
      }

          checkConnection();

      });
}
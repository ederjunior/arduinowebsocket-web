angular.module("arduinowebsocket-web").controller("testewsController", function ($scope, $location, $websocket, $interval, $timeout) {


    var dataStream = $websocket('ws://arduinowebsocket-ws.herokuapp.com/projetoiot/websocket');
    //var dataStream = $websocket('ws://localhost:3000/projetoiot/websocket');

    $scope.contadorStyleControllers = 0;
    $scope.styleControllers = {
        "background-color" : "grey",
        "color" : "white"
    };

    $scope.disabledControllers = true;
    $scope.clickControllers = function(){
        if($scope.contadorStyleControllers == 0){
            $scope.styleControllers = {
                "background-color" : "green",
                "color" : "white"
            };
            $scope.contadorStyleControllers = 1;

            $scope.disabledControllers = false;
        }else{
            $scope.styleControllers = {
                "background-color" : "grey",
                "color" : "white"
            };
            $scope.contadorStyleControllers = 0;

            $scope.disabledControllers = true;
        }
    };

    dataStream.onMessage(function (message) {
        $scope.mensagemRecebida = JSON.parse(message.data);
        if ($scope.mensagemRecebida.imagem) {
            $scope.imagem = $scope.mensagemRecebida.imagem;
        }

        if ($scope.mensagemRecebida.dataServidor) {
            $scope.dataServidor = $scope.mensagemRecebida.dataServidor;
        }

        if ($scope.mensagemRecebida.dataCliente) {
            $scope.dataCliente = $scope.mensagemRecebida.dataCliente;
        }

        //console.log(message.data)

    });

    $scope.enviar = function (text) {
        if($scope.disabledControllers == false){
            var mensagem = {
                comando: text
            };
            mensagem = JSON.stringify(mensagem);
            dataStream.send(mensagem);
            console.log(text);
        }
    };

    $scope.botaoPressionado = 0;
    $scope.valorTeclado = 0;
    $scope.keyCode;

    // $interval(function(){
    //     if($scope.botaoPressionado == 1 && $scope.disabledControllers == false){
    //         $scope.valorTeclado = $scope.valorTeclado+1;
    //         $scope.enviar($scope.keyCode);
    //     }
    // },500);
    $scope.keyCode = 0;
    $scope.comandoKeyDownTeclado = function (event) {
        if($scope.disabledControllers == false){
            $scope.botaoPressionado = 1;
            if(event.keyCode != $scope.keyCode){
                $scope.enviar(JSON.stringify(event.keyCode));
            }
            $scope.keyCode = event.keyCode;
        }
    };

    $scope.comandoKeyUpTeclado = function () {
        if($scope.disabledControllers == false){
            $scope.botaoPressionado = 0;
            $scope.keyCode = 0;
            $scope.enviar("0");
        }
    }

    $scope.comandoClickPressionado = function (valorClick) {
        if($scope.disabledControllers == false){
            $scope.botaoPressionado = 1;
            $scope.enviar(valorClick);
            $scope.keyCode = valorClick;
        }
    };

});
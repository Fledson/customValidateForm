// PEGANDO TODAS AS TAGS COM O ATRIBUTO REQUIRED
const fields = document.querySelectorAll("[required]")
    // console.log(fields)


function validateField(field) {
    //logica para verificar se existem erros
    function verifyErrors() {
        let foundError = false

        // for of -> interagir com os valores de objetos iteráveis
        //for in -> interage sobre as propriedades de objetos
        for (let error in field.validity) {
            // se não for customError
            // então verifica se tem erro 
            // if (error != "customError" && field.validity[error]) { => CODIGO ANTIGO (QUANDO TEM UM ERRO PERSONALIZADO)


            // agora o campo & !field.validity.valid confirma se o valor não é valido, pois se ele for valido(true) ele não é um error ou seja retirar o spanError
            if (field.validity[error] & !field.validity.valid) {
                foundError = error
            }
        }

        // console.log(foundError)

        return foundError;
    }

    // função para devinir o tipo de erro que estou tendo e passar a mensagem correta
    function customMessage(typeError){
        const messages = {
            text: {
                valueMissing: "Porfavor, preencha este champo"
            },
            email: {
                valueMissing: "Campo Obrigatório",
                typeMismatch: "Por favor, preencha um email válido"
            }
        }

        // pegando o objeto "messages" e pegando chave do campo que tem a mesma propriedade do field (input) 
        // se for eu passo o tipo do erro[typeError] para ele reconhecermessages[field.type] qual mensagem mandarmessages[field.type][typeError]
        return messages[field.type][typeError]
    }

    function setCustomMessage(message) {
          // abaxo, pego meu input "field" e uso o parentNode para acessar o nó pai "a div.input" e detro procuro o span.error
        const spanError = field.parentNode.querySelector("span.error")

        if (message) {
            // se tiver erro ele adiciona ao spanErro e adiciona a classe active e escreve no html o texto "Campo Obrigatório"
            spanError.classList.add("active")
            spanError.innerHTML = message
    
        } else {
            // se tiver erro ele adiciona ao spanErro a Remove a classe active e define no html o texto vazio
            spanError.classList.remove("active")
            spanError.innerHTML = ""
    
        }

    }

    // VENDO SE O ERRO EXISTE E ACIONANDO O MEU SPAN DO HTML PARA MANIPULAÇÃO
    return function() {
        // armazenando erro (se houver) na constante
        const error = verifyErrors()
        // se tiver erro 
        if (error) {
            // passar a mensagem de erro pra dentro de customMessage
            const message = customMessage(error)
            // se estiver errado, adionando uma borda vermelha ao input para sinalizar
            field.style.borderColor = "red"
            // se tiver erro ele adiciona ao spanErro e adiciona a classe active e escreve no html o texto "Campo Obrigatório"
            // passando a mensagem correta aqui dentro da função setCustomMessage
            setCustomMessage(message)

        } else {
            // se estiver tudo certo, adionando uma borda verde ao input para sinalizar
            field.style.borderColor = "green"
            // se tiver erro ele adiciona ao spanErro a Remove a classe active e define no html o texto vazio
            setCustomMessage()
        }
    }
}

//função que vai validar os erros
function customValidation(event) {

    // pegando o evento target (alvo que disparou o evento)
    const field = event.target

    // instanciando minha função => pegando ela do return
    const validation = validateField(field)

    // chamando a função
    validation()

    /*
    COMO DESATIVEI O BUBBLE LÁ EM CIMA, ESSA MENSAGEM PERSONALIZADA NÃO IRÁ MAIS APARECE, ESSE BLOCO DE CODIGO PERDE O SENTIDO
    MAS VOU DEIXAR COMENTADO PARA FINS DIDATICOS

    //verificando se tem erros
    if (error) {
        //trocando mensagem de required
        field.setCustomValidity("Esse campo é obrigatorio meu fi")
    } else {
        //reiniciando o erro customizado
        field.setCustomValidity("")
    }
    */
}

//para cada um será feita uma verificação
for (let field of fields) {

    // adicionando uma ação para o envento "invalid"
    field.addEventListener("invalid", event => {
        // eliminando o evento do bubble -> balão de alerta
        event.preventDefault()
        customValidation(event)
    })

    // tratando evento individual
    field.addEventListener("blur", customValidation)
}


































document.querySelector("form")
    .addEventListener("submit", event => {
        console.log("enviar o formulario")

        // não enviar formulario
        event.preventDefault()
    })
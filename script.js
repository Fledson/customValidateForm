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

    function setCustomMessage(message = "Campo Obrigatório") {

    }

    return verifyErrors()
}

//função que vai validar os erros
function customValidation(event) {



    // pegando o evento target (alvo que disparou o evento)
    const field = event.target

    // pegando o erro e armazenando na variavel
    const error = validateField(field)

    // abaxo, pego meu input "field" e uso o parentNode para acessar o nó pai "a div.input" e detro procuro o span.error
    const spanError = field.parentNode.querySelector("span.error")

    // VENDO SE O ERRO EXISTE E ACIONANDO O MEU SPAN DO HTML PARA MANIPULAÇÃO
    if (error) {
        // se tiver erro ele adiciona ao spanErro e adiciona a classe active e escreve no html o texto "Campo Obrigatório"
        spanError.classList.add("active")
        spanError.innerHTML = "Campo Obrigatório"

    } else {
        // se tiver erro ele adiciona ao spanErro a Remove a classe active e define no html o texto vazio
        spanError.classList.remove("active")
        spanError.innerHTML = ""

    }

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
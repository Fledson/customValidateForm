// PEGANDO TODAS AS TAGS COM O ATRIBUTO REQUIRED
const fields = document.querySelectorAll("[required]")
    // console.log(fields)

//função que vai validar os erros
function customValidation(event) {
    // pegando o evento target (alvo que disparou o evento)
    const field = event.target

    //logica para verificar se existem erros
    function verifyErrors() {
        let foundError = false

        // for of -> interagir com os valores de objetos iteráveis
        //for in -> interage sobre as propriedades de objetos
        for (let error in field.validity) {
            // se não for customError
            // então verifica se tem erro
            if (error != "customError" && field.validity[error]) {
                foundError = error
            }
        }

        return foundError;
    }

    // pegando o erro e armazenando na variavel
    const error = verifyErrors()
    console.log("Error Exists: ", error)


    //verificando se tem erros
    if (error) {
        //trocando mensagem de required
        field.setCustomValidity("Esse campo é obrigatorio meu fi")
    } else {
        //reiniciando o erro customizado
        field.setCustomValidity("")
    }
}

//para cada um será feita uma verificação
for (let field of fields) {
    // adicionando uma ação para o envento "invalid"
    field.addEventListener("invalid", customValidation)
}


































document.querySelector("form")
    .addEventListener("submit", event => {
        console.log("enviar o formulario")

        // não enviar formulario
        event.preventDefault()
    })
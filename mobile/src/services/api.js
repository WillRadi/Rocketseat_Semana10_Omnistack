import axios from 'axios'

const api = axios.create({
    // base URL varia de acordo com modelo usado p desenvolvimento.
    // Se usado o expo e testando no celular, deve-se colocar o mesmo IP que aparce na UI do expo no PC: 'http://192....:<porta do node>'
    // com emulador do IOS: localhost:3333
    // emulador do android: igual o primeiro caso se n funcioanr, pricurar na internet
    baseURL: ''
})

export default api
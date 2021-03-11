const parser = new DOMParser();
const serial = new XMLSerializer();


const checkAvailable = document.querySelector("#isAvailaible") ;
const btnIncrease = document.querySelector("#increase-filter") ;
const btnDecrease = document.querySelector("#decrease-filter") ;

const list = document.querySelector(".create_list_form")
console.log(list)

btnIncrease.onclick = async (evt) => {
    let HTMLrender ;
    if(checkAvailable.checked) {
        HTMLrender = await axios.get(window.location.href + "?isAvailable=true&price=1") ;
        list.innerHTML = serial.serializeToString(parser.parseFromString(HTMLrender.data, 'text/html').querySelector(".create_list_form"))
    } else {
        HTMLrender = await axios.get(window.location.href + "?price=1") ;
        list.innerHTML = serial.serializeToString(parser.parseFromString(HTMLrender.data, 'text/html').querySelector(".create_list_form"))
    }}

btnDecrease.onclick = async (evt) => {
    let HTMLrender ;
    if(checkAvailable.checked) {
        HTMLrender = await axios.get(window.location.href + "?isAvailable=true&price=-1") ;
        list.innerHTML = serial.serializeToString(parser.parseFromString(HTMLrender.data, 'text/html').querySelector(".create_list_form"))
    } else {
        HTMLrender = await axios.get(window.location.href + "?price=-1") ;
        list.innerHTML = serial.serializeToString(parser.parseFromString(HTMLrender.data, 'text/html').querySelector(".create_list_form"))
    }}

checkAvailable.addEventListener("change", async (evt) => {
    let HTMLrender ;
    if(evt.target.checked) {
        HTMLrender = await axios.get(window.location.href + "?isAvailable=true") ;
        list.innerHTML = serial.serializeToString(parser.parseFromString(HTMLrender.data, 'text/html').querySelector(".create_list_form"))
    } else {
        HTMLrender = await axios.get(window.location.href) ;
        list.innerHTML = serial.serializeToString(parser.parseFromString(HTMLrender.data, 'text/html').querySelector(".create_list_form"))
    }
});



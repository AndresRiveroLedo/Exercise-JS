//Primera Parte. Parseamos un objeto a json con JSON.stringify()
const person = {
    name : "Andres",
    lastname: "Rivero",
    age: 22,
    nickname: "andres1985",
    hobbies: ["read", "sport", "sign"],
    address:{
        street: "liberty avenue",
        city: "London"
    },
    married: false,
};

console.log(person.name);
console.log(person.address.city);
console.log(person.married);

// Convert Object literal to String and parse it to JSON
console.log(JSON.stringify(person));

//Segunda Parte: Convertimos Objeto literal a string y lo parseamos a JSON. 
fetch("../json/users.json")
    .then((data) =>{ 
        return data.json();     
    })
    .then((data1) => {
        let output = "";

        for(let i = 0; i < data1.users.length; i++){
            output += `<li>Nombre: ${data1.users[i].name} - nickname: ${data1.users[i].nickname}</li>` 
        }

        document.getElementById("users").innerHTML = output;
    })
   

//Tercera Parte: desde una URI
fetch("https://jsonplaceholder.typicode.com/photos")
    .then((data) => {
        return data.json();
    })
    .then((photos) =>{
        console.log(photos);
        let output = "";

        for(let i = 0; i < photos.length; i++){{
            output += `<li>Titulo: ${photos[i].title} <br> URL: ${photos[i].url}</li>`
        }}

        document.getElementById("photos").innerHTML = output;
    })
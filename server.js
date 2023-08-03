const express = require("express");

const app = express();
const PORT = 4000
let visits = 0

app.use(express.urlencoded({ extended: true }))

app.listen(PORT, function(){
    console.log("BITCHIN!", PORT)
});

app.get("/", function home(request, response) {
    visits = visits + 1;
    response.send(`
    <h1>This is the Homepage</h1>
    <ul>
        <li><a href="/food-recomendation-form">Get a recomendation on what to eat tonight</a></li>
        <li><a href="/about">Go to the about page</a></li>
    </ul>
    `); 
});

app.post("/get-recomendation", function giveRecomendation(request, response){
    console.log("FORM", request.body)
    console.log("NAAM", request.body.naam)
    console.log("DIEET", request.body.dieet)
   
    const dieet = request.body.dieet
    let dish
    let reason
    console.log("input:", dieet, "vergelijk met:", "vegan", "is dit hetzelfde?", dieet === "vegan")
    if (dieet === "vegan"){
        dish = "vegan curry"
        reason = "coconut cream is magic"
    } else if (dieet === "vegetarian"){
        dish = "pizza margarita"
        reason = "can't go wrong with pizza"
    } else if (dieet === "omnivore"){
        dish = "cote de boeuf"
        reason = "don't overcook it!"
    }

    response.send(`
    <h1>Get yourself some ${dish}</h1>
    <p>Because: ${reason}</p>
    `)
})

app.get("/food-recomendation-form", function foodRecomendationForm(request, response){
    response.send(`
    <h1>Food Recomendation Form</h1>

    <form method="POST" action="/get-recomendation">
    <div>
        <label for="naam">
            Naam
        </label>
            <input type="text" id="naam" name="naam"/>
    </div>
    <div>
        <label for="dieet">
         What kind of dietary preference do you have?
        </label>
            <select id="dieet" name="dieet">
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="omnivore">I eat everything</option>
            </select>
    </div>
    <input type="submit"/>
    </form>
    `)
})

app.get("/about", function about(request, response){
    visits = visits + 1
    response.send(`
    <h1>About</h1>
    <p>Rein taught me how to make this cool server in order to make an app</p>
    <p>this app has been visited ${visits} times! </p>
    <marquee>F*ck Yeah!, Awesome</marquee>
    <a href="/">Go Home</a>
    `)
})
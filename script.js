let schaschlikIngredients = ['Bund Petersilie', 'Bund Basilikum', 'ml Kefir', 'm.-große Zwiebel(n), in halbe Ringe geschnitten', 'Lorbeerblätter', 'Wacholderbeere(n)', 'TL Meersalz', 'TL Pfeffer, frisch gemahlen', 'TL Chilipulver (z. B. Cayennepfeffer)', 'Knoblauchzehe(n), klein geschnitten', 'g Schweinenacken (nicht zu mager)', 'Bund Thymian'];
let schaschlikQuantities = [0.25, 0.25, 150, 0.5, 1, 1, 0.5, 0.25, 0.25, 0.5, 250, 0.25];

let grillhaehnchenIngredients = ['Brathähnchen', 'EL Meersalz', 'EL Paprikapulver', 'TL Zwiebelpulver', 'TL Oregano', 'TL Knoblauchpulver', 'TL Chiliflocken', 'TL Majoran', 'TL Liebstöckel', 'TL Thymian'];
let grillhaehnchenQuantities = [1, 2, 3, 2, 2, 2, 1, 1, 1, 2];

let tagliatelleIngredients = ['g Parmesan', 'g Tagliatelle', 'Zweige Rosmarin', 'g Butter', 'Konblauchzehe', 'geh. TL Gewürzpaste'];
let tagliatelleQuantities = [20, 125, 3, 60, 1, 1];

let flammkuchenIngredients = ['EL	Öl', 'ml	Wasser', 'Prise(n)	Salz', 'g	Mehl', 'Zwiebel(n), in halbe Ringe dünn geschnitten', 'Becher	Schmand, 24 % Fett', 'Becher	Crème double', 'Speckwürfel'];
let flammkuchenQuantities = [2, 125, 1, 250, 2, 1, 1, 100];

let currentIngredients = [];
let currentQuantities = [];

// Render mit Filterfunktion
function renderFiltered(index) {
  if (index == 1) {
    currentIngredients = schaschlikIngredients;
    currentQuantities = schaschlikQuantities;
    render();
  }

  if (index == 2) {
    currentIngredients = grillhaehnchenIngredients;
    currentQuantities = grillhaehnchenQuantities;
    render();
  }

  if (index == 3) {
    currentIngredients = tagliatelleIngredients;
    currentQuantities = tagliatelleQuantities;
    render();
  }

  if (index == 4) {
    currentIngredients = flammkuchenIngredients;
    currentQuantities = flammkuchenQuantities;
    render();
  }

}

// Renderfunktion für Tabelleninhalt
function render() {
  let contentRef = document.getElementById('content');
  contentRef.innerHTML = '';

  for (let index = 0; index < currentIngredients.length; index++) {
    let ingredient = currentIngredients[index];
    let quantitie = currentQuantities[index];

    contentRef.innerHTML += `
        <tr>
          <td>${quantitie} ${ingredient}</td>
        </tr>`;
  }
}

// Rezeptrechner & Update Tabelle
function calculateAndUpdateQuantitie() {
  let inputValue = document.getElementById("quantity");
  inputValue = inputValue.value;
  let contentRef = document.getElementById('content');
  contentRef.innerHTML = '';

  for (let index = 0; index < currentIngredients.length; index++) {
    let ingredient = currentIngredients[index];
    let quantitie = currentQuantities[index];
    let newQuantitie = (quantitie / quantitie) * quantitie * inputValue;
    contentRef.innerHTML += `
        <tr>
          <td>${newQuantitie} ${ingredient}</td>
        </tr>`;
  }
}

// Mobile Menu
function toggleMenu() {
  document.getElementById("menu-mobile").classList.toggle("d-none");
  document.getElementById("index-html").classList.toggle("overflow-y-hidden");
}

// E-Mail-Versand mit Formspree
function sendMail(event) {
  event.preventDefault();
  const data = new FormData(event.target);

  fetch("https://formspree.io/f/mvgkwkdv", {
    method: "POST",
    body: new FormData(event.target),
    headers: {
      Accept: "application/json",
    },
  })
    .then(() => {
      window.location.href = "./send_mail.html";
    })
    .catch((error) => {
      console.log(error);
    });
}

// Header & Footer auslagern
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

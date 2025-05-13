import { prewiew } from "./preview.js";

export const homepage = (parentElement) => {
  let callback;
  let dati = [];

  const filterSerach = (searchTerm, modello) => {
    return dati.filter(car => {
      if (searchTerm !== null) {
        // Aggiungi il controllo per il filtro del modello
        const matchesModello = modello === "Scegli il modello" || car.modello.toLowerCase().includes(modello.toLowerCase());
        return (car.marca.toLowerCase().includes(searchTerm) || car.modello.toLowerCase().includes(searchTerm) || car.luogoVendita.toLowerCase().includes(searchTerm)) && matchesModello;
      }
    });
  };

  const filterCars = (prezzoMax, marca, provincia, kmMax, modello) => {
    return dati.filter(car => {
      const carPrezzo = car.prezzo; // Converte il prezzo in numero
      const carKm = car.km; // Converte il chilometraggio in numero
      const matchesPrezzo = carPrezzo <= prezzoMax;
      const matchesMarca = marca === "Scegli la marca" || car.marca === marca;
      const matchesProvincia = provincia === "Seleziona una provincia" || car.luogoVendita === provincia;
      const matchesKm = carKm <= kmMax;
      const matchesModello = modello === "Scegli il modello" || car.modello === modello; // Aggiungi controllo per il modello
      return matchesPrezzo && matchesMarca && matchesProvincia && matchesKm && matchesModello;
    });
  };

  return {
    build: (diz) => {
      dati = diz;
    },
    setCallBack: (cb) => {
      callback = cb;
    },
    render: async () => {
      let html = `
        <div class="row">
          <div class="col">
            <div class="input-group mb-3">
              <button class="input-group-text" id="ricercaButton">Cerca</button>
              <input type="text" id="searchInput" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <select id="marcaFilter">
              <option selected>Scegli la marca</option>
            </select><br>
            
            <!-- Aggiungi la select per il modello che inizialmente è disabilitata -->
            <select id="modelloFilter" disabled>
              <option selected>Scegli il modello</option>
            </select><br>
            
            <p class="testoBianco">Prezzo massimo</p>
            <input type="range" id="prezzo" min="0" max="100000" value="50000" step="1000" onchange="document.getElementById('value').textContent = this.value + ' €'" class="testoBianco">
            <p class="testoBianco">Value: <span id="value">50000 €</span></p>
            <p class="testoBianco">Chilometraggio massimo</p>
            <input type="range" id="chilometraggio" min="0" max="500000" value="100000" step="1000" onchange="document.getElementById('kmValue').textContent = this.value + ' km'">
            <p class="testoBianco">Value: <span id="kmValue">100000 km</span></p>
            <br>
            
            <!-- La select per la provincia -->
            <select id="provinciaFilter">
              <option selected>Seleziona una provincia</option>
            </select><br> 
            
            <button id="filtraButton">Vai</button>
          </div>
          <div class="col">
            <table id="carList" class=""></table>
          </div>
        </div>`;

      parentElement.innerHTML = html;

      // Carica le marche tramite fetch
      fetch("/car/getMarche")
        .then(response => response.json())
        .then(json => {
          const marche = json.responce; // Supponiamo che le marche siano nella proprietà "responce"
          const marcaSelect = document.getElementById("marcaFilter");

          // Crea l'HTML delle opzioni per le marche
          let marcaOptions = '<option selected>Scegli la marca</option>';
          marche.forEach(marca => {
            marcaOptions += `<option value="${marca.Nome}">${marca.Nome}</option>`;
          });
          // Imposta l'HTML per la select delle marche
          marcaSelect.innerHTML = marcaOptions;
        })
        .catch(error => {
          console.error("Errore nel caricare le marche:", error);
        });

      // Carica le province tramite fetch
      fetch("/car/getProvince")
        .then(response => response.json())
        .then(json => {
          const province = json.responce; // Supponiamo che le province siano nella proprietà "responce"
          const provinciaSelect = document.getElementById("provinciaFilter");

          // Crea l'HTML delle opzioni per le province
          let provinciaOptions = '<option selected>Seleziona una provincia</option>';
          province.forEach(provincia => {
            provinciaOptions += `<option value="${provincia.Provincia}">${provincia.Provincia}</option>`;
          });

          // Imposta l'HTML per la select delle province
          provinciaSelect.innerHTML = provinciaOptions;
        })
        .catch(error => {
          console.error("Errore nel caricare le province:", error);
        });

      // Aggiungi event listener per la selezione della marca
      document.getElementById("marcaFilter").onchange = () => {
        const marcaSelezionata = document.getElementById("marcaFilter").value;
        const modelloSelect = document.getElementById("modelloFilter");

        // Svuota i modelli precedenti e disabilita la select dei modelli se nessuna marca è selezionata
        modelloSelect.innerHTML = '<option selected>Scegli il modello</option>';
        modelloSelect.disabled = marcaSelezionata === "Scegli la marca";

        // Non fare la richiesta se non è stata selezionata una marca
        if (marcaSelezionata !== "Scegli la marca") {
          fetch("/car/getModello", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ marca: marcaSelezionata })
          })
            .then(response => response.json())
            .then(json => {
              const modelli = json.responce; // Supponiamo che i modelli siano nella proprietà "responce"
              
              // Crea l'HTML delle opzioni per i modelli
              let modelloOptions = '<option selected>Scegli il modello</option>';
              modelli.forEach(modello => {
                modelloOptions += `<option value="${modello.nome_Modello}">${modello.nome_Modello}</option>`;
              });
              // Imposta l'HTML per la select dei modelli
              modelloSelect.innerHTML = modelloOptions;
              // Abilita la select del modello
              modelloSelect.disabled = false;
            })
            .catch(error => {
              console.error("Errore nel caricare i modelli:", error);
            });
        }
      };

      const renderCars = (cars) => {
        const carList = document.getElementById("carList");
        if (!carList) {
          alert("Car list element not found!");
          return;
        }

        let carHtml = `<table class="table table-borderless">`;

        for (let i = 0; i < cars.length; i += 3) {
          carHtml += `<tr>
              <td><div id="n${i}"></div></td>
              <td><div id="n${i + 1}"></div></td>
              <td><div id="n${i + 2}"></div></td>
          </tr>`;
        }

        carHtml += `</table>`;
        carList.innerHTML = carHtml;

        for (let i = 0; i < cars.length; i++) {
          const prewiewer = prewiew(document.getElementById("n" + i));
          prewiewer.build(cars[i], i);
          prewiewer.setCallBack(callback);
          prewiewer.render();
        }
      };

      renderCars(dati);

      // Filtro di ricerca
      document.getElementById("ricercaButton").onclick = () => {
        const searchTerm = document.getElementById("searchInput").value;
        const modello = document.getElementById("modelloFilter").value;
        const filteredCars = filterSerach(searchTerm, modello);
        renderCars(filteredCars);
      };

      // Filtro per i parametri
      document.getElementById("filtraButton").onclick = () => {
        const prezzoMax = parseInt(document.getElementById("prezzo").value, 10);
        const marca = document.getElementById("marcaFilter").value;
        const provincia = document.getElementById("provinciaFilter").value;
        const kmMax = parseInt(document.getElementById("chilometraggio").value, 10);
        const modello = document.getElementById("modelloFilter").value;
        const filteredCars = filterCars(prezzoMax, marca, provincia, kmMax, modello);
        renderCars(filteredCars);
      };
    }
  };
};

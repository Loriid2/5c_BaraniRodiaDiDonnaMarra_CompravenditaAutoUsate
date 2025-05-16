import { prewiew } from "./preview.js";
import { login } from "./login.js";
import{createform}from "./formIns.js";

export const homepage = (parentElement) => {
  let callback;
  let dati = [];
  let CaB2;
  let CaB3;

  const filterSerach = (searchTerm, modello) => {
    return dati.filter(car => {
      if (searchTerm !== null) {
        
        const matchesModello = modello === "Scegli il modello" || car.modello.toLowerCase().includes(modello.toLowerCase());
        return (car.marca.toLowerCase().includes(searchTerm) || car.modello.toLowerCase().includes(searchTerm) || car.luogoVendita.toLowerCase().includes(searchTerm)) && matchesModello;
      }
    });
  };

  const filterCars = (prezzoMax, marca, provincia, kmMax, modello) => {
    return dati.filter(car => {
      const carPrezzo = car.prezzo; 
      const carKm = car.km; 
      const matchesPrezzo = carPrezzo <= prezzoMax;
      const matchesMarca = marca === "Scegli la marca" || car.marca === marca;
      const matchesProvincia = provincia === "Seleziona una provincia" || car.luogoVendita === provincia;
      const matchesKm = carKm <= kmMax;
      const matchesModello = modello === "Scegli il modello" || car.modello === modello; 
      return matchesPrezzo && matchesMarca && matchesProvincia && matchesKm && matchesModello;
    });
  };

  return {
    build: (diz) => {
      dati = diz;
    },
    setSecondCallBack:(cb2)=>{
      CaB2=cb2
    },
    setThirdCallBack:(cb3)=>{
      CaB3=cb3
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
        <div class="d" style="width: 18rem;">
  <div class="card-body">
          <div class="col">
            <select id="marcaFilter" class="form-select" aria-label="Default select example">
              <option selected>Scegli la marca</option>
            </select><br>
            
            <!-- Aggiungi la select per il modello che inizialmente è disabilitata -->
            <select id="modelloFilter" class="form-select" aria-label="Default select example" disabled>
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
            <select id="provinciaFilter" class="form-select" aria-label="Default select example">
              <option selected>Seleziona una provincia</option>
            </select><br> 
            
            <button id="filtraButton" class="btn btn-light">Vai</button>
          </div>
          </div>
         </div>
          <div class="col">
            <table id="carList" class=""></table>
          </div>
        </div>
         

         `;

      parentElement.innerHTML = html;
      let elemento=document.getElementById("paginaLogin");
     // console.log(elemento);
      const loginT=login(elemento);
      loginT.setCallBack(CaB3)
      loginT.render();
      const openFormButton = document.querySelector("#aggiungiMacchina");
      const form=createform(document.querySelector("#formInserimento"));
      openFormButton.onclick=()=>{
        form.build();
        form.setCallBack(CaB2);
        form.render();
    
    }

      
      fetch("/car/getMarche")
        .then(response => response.json())
        .then(json => {
          const marche = json.responce; 
          const marcaSelect = document.getElementById("marcaFilter");

       
          let marcaOptions = '<option selected>Scegli la marca</option>';
          marche.forEach(marca => {
            marcaOptions += `<option value="${marca.Nome}">${marca.Nome}</option>`;
          });
         
          marcaSelect.innerHTML = marcaOptions;
        })
        .catch(error => {
          console.error("Errore nel caricare le marche:", error);
        });


      fetch("/car/getProvince")
        .then(response => response.json())
        .then(json => {
          const province = json.responce;  
          const provinciaSelect = document.getElementById("provinciaFilter");

          
          let provinciaOptions = '<option selected>Seleziona una provincia</option>';
          province.forEach(provincia => {
            provinciaOptions += `<option value="${provincia.Provincia}">${provincia.Provincia}</option>`;
          });

          provinciaSelect.innerHTML = provinciaOptions;
        })
        .catch(error => {
          console.error("Errore nel caricare le province:", error);
        });

     
      document.getElementById("marcaFilter").onchange = () => {
        const marcaSelezionata = document.getElementById("marcaFilter").value;
        const modelloSelect = document.getElementById("modelloFilter");

       
        modelloSelect.innerHTML = '<option selected>Scegli il modello</option>';
        modelloSelect.disabled = marcaSelezionata === "Scegli la marca";

        
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
              const modelli = json.responce; 
              
            
              let modelloOptions = '<option selected>Scegli il modello</option>';
              modelli.forEach(modello => {
                modelloOptions += `<option value="${modello.nome_Modello}">${modello.nome_Modello}</option>`;
              });
              modelloSelect.innerHTML = modelloOptions;
             
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

     
      document.getElementById("ricercaButton").onclick = () => {
        const searchTerm = document.getElementById("searchInput").value;
        const modello = document.getElementById("modelloFilter").value;
        const filteredCars = filterSerach(searchTerm, modello);
        renderCars(filteredCars);
      };

     
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

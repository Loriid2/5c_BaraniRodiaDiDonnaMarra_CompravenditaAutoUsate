import { prewiew } from "./preview.js";

export const homepage = (parentElement) => {
    
    let dati=[];
    const filterCars = (searchTerm) => {
      return dati.filter(car => car.titolo.toLowerCase().includes(searchTerm.toLowerCase()));
  };

    return {
      build:(diz)=>{
       
        dati=diz;
      },
      render:()=>{
        let html=`
        <div class="row">
        <div class="col">
                <a href="doc/indexDocum.html"><button>DOCUMENTATION</button></a>
        </div>
         <div class="col">
                    <div class="input-group mb-3">
                        <button class="input-group-text" id="ricercaButton">Cerca</button>
                        <input type="text" id="searchInput" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    </div>
                </div>
         <div class="col">
                  <button id="carrello"><a href="#pagina3">CARRELLO</a></button>
        </div>
         <div class="col">
                <button id="registrati"><a href="#paginaRegister">Sign</a></button>
        </div>
        <div class="col">
                    <button id="login"><a href="#paginaLogin">Log-In</a></button>
        </div>
        </div>
        <div class="row">
          <div class="col">
                  <select>
    <option selected>Scegli la marca</option>
    <option value="FIAT">FIAT</option>
    <option value="VOLKSWAGEN">VOLKSWAGEN</option>
    <option value="ALFA ROMEO">ALFA ROMEO</option>
    <option value="AUDI">AUDI</option>
    <option value="BMW">BMW</option>
    <option value="CITROËN">CITROËN</option>
    <option value="DACIA">DACIA</option>
    <option value="FORD">FORD</option>
    <option value="HYUNDAI">HYUNDAI</option>
    <option value="KIA">KIA</option>
    <option value="LANCIA">LANCIA</option>
    <option value="MERCEDES-BENZ">MERCEDES-BENZ</option>
    <option value="NISSAN">NISSAN</option>
    <option value="OPEL">OPEL</option>
    <option value="PEUGEOT">PEUGEOT</option>
    <option value="RENAULT">RENAULT</option>
    <option value="SEAT">SEAT</option>
    <option value="SKODA">SKODA</option>
    <option value="TOYOTA">TOYOTA</option>
    <option value="VOLVO">VOLVO</option>
    <option value="ABARTH">ABARTH</option>
    <option value="ACURA">ACURA</option>
    <option value="AIXAM">AIXAM</option>
    <option value="ALPINE">ALPINE</option>
    <option value="ASTON MARTIN">ASTON MARTIN</option>
    <option value="AUSTIN">AUSTIN</option>
    <option value="BENTLEY">BENTLEY</option>
    <option value="BUICK">BUICK</option>
    <option value="CADILLAC">CADILLAC</option>
    <option value="CHEVROLET">CHEVROLET</option>
    <option value="CHRYSLER">CHRYSLER</option>
    <option value="CUPRA">CUPRA</option>
    <option value="DAEWOO">DAEWOO</option>
    <option value="DAIHATSU">DAIHATSU</option>
    <option value="DODGE">DODGE</option>
    <option value="DS">DS</option>
    <option value="FERRARI">FERRARI</option>
    <option value="FISKER">FISKER</option>
    <option value="FORD USA">FORD USA</option>
    <option value="GENESIS">GENESIS</option>
    <option value="HONDA">HONDA</option>
    <option value="HUMMER">HUMMER</option>
    <option value="INFINITI">INFINITI</option>
    <option value="ISUZU">ISUZU</option>
    <option value="JAGUAR">JAGUAR</option>
    <option value="JEEP">JEEP</option>
    <option value="LAMBORGHINI">LAMBORGHINI</option>
    <option value="LAND ROVER">LAND ROVER</option>
    <option value="LEXUS">LEXUS</option>
    <option value="MASERATI">MASERATI</option>
    <option value="MAZDA">MAZDA</option>
    <option value="MG">MG</option>
    <option value="MINI">MINI</option>
    <option value="MITSUBISHI">MITSUBISHI</option>
    <option value="PORSCHE">PORSCHE</option>
    <option value="ROLLS-ROYCE">ROLLS-ROYCE</option>
    <option value="SAAB">SAAB</option>
    <option value="SMART">SMART</option>
    <option value="SSANGYONG">SSANGYONG</option>
    <option value="SUBARU">SUBARU</option>
    <option value="SUZUKI">SUZUKI</option>
    <option value="TESLA">TESLA</option>
    <option value="TVR">TVR</option>
    <option value="VAUXHALL">VAUXHALL</option>
</select><br>
<p>Prezzo</p>
<input type="range" id="prezzo" min="0" max="100000" value="50000" step="1000" oninput="this.nextElementSibling.value = this.value">
        <p>Value: <output id="value"></output></p>
                  <br> <select>
    <option selected>Seleziona una provincia</option>
    <option value="Agrigento">Agrigento</option>
    <option value="Alessandria">Alessandria</option>
    <option value="Ancona">Ancona</option>
    <option value="Aosta">Aosta</option>
    <option value="Arezzo">Arezzo</option>
    <option value="Ascoli Piceno">Ascoli Piceno</option>
    <option value="Asti">Asti</option>
    <option value="Avellino">Avellino</option>
    <option value="Bari">Bari</option>
    <option value="Barletta-Andria-Trani">Barletta-Andria-Trani</option>
    <option value="Belluno">Belluno</option>
    <option value="Benevento">Benevento</option>
    <option value="Bergamo">Bergamo</option>
    <option value="Biella">Biella</option>
    <option value="Bologna">Bologna</option>
    <option value="Bolzano">Bolzano</option>
    <option value="Brescia">Brescia</option>
    <option value="Brindisi">Brindisi</option>
    <option value="Cagliari">Cagliari</option>
    <option value="Caltanissetta">Caltanissetta</option>
    <option value="Campobasso">Campobasso</option>
    <option value="Carbonia-Iglesias">Carbonia-Iglesias</option>
    <option value="Caserta">Caserta</option>
    <option value="Catania">Catania</option>
    <option value="Catanzaro">Catanzaro</option>
    <option value="Chieti">Chieti</option>
    <option value="Como">Como</option>
    <option value="Cosenza">Cosenza</option>
    <option value="Cremona">Cremona</option>
    <option value="Crotone">Crotone</option>
    <option value="Cuneo">Cuneo</option>
    <option value="Enna">Enna</option>
    <option value="Fermo">Fermo</option>
    <option value="Ferrara">Ferrara</option>
    <option value="Firenze">Firenze</option>
    <option value="Foggia">Foggia</option>
    <option value="Forlì-Cesena">Forlì-Cesena</option>
    <option value="Frosinone">Frosinone</option>
    <option value="Genova">Genova</option>
    <option value="Gorizia">Gorizia</option>
    <option value="Grosseto">Grosseto</option>
    <option value="Imperia">Imperia</option>
    <option value="Isernia">Isernia</option>
    <option value="L'Aquila">L'Aquila</option>
    <option value="La Spezia">La Spezia</option>
    <option value="Latina">Latina</option>
    <option value="Lecce">Lecce</option>
    <option value="Lecco">Lecco</option>
    <option value="Livorno">Livorno</option>
    <option value="Lodi">Lodi</option>
    <option value="Lucca">Lucca</option>
    <option value="Macerata">Macerata</option>
    <option value="Mantova">Mantova</option>
    <option value="Massa-Carrara">Massa-Carrara</option>
    <option value="Matera">Matera</option>
    <option value="Messina">Messina</option>
    <option value="Milano">Milano</option>
    <option value="Modena">Modena</option>
    <option value="Monza e della Brianza">Monza e della Brianza</option>
    <option value="Napoli">Napoli</option>
    <option value="Novara">Novara</option>
    <option value="Nuoro">Nuoro</option>
    <option value="Oristano">Oristano</option>
    <option value="Padova">Padova</option>
    <option value="Palermo">Palermo</option>
    <option value="Parma">Parma</option>
    <option value="Pavia">Pavia</option>
    <option value="Perugia">Perugia</option>
    <option value="Pesaro e Urbino">Pesaro e Urbino</option>
    <option value="Pescara">Pescara</option>
    <option value="Piacenza">Piacenza</option>
    <option value="Pisa">Pisa</option>
    <option value="Pistoia">Pistoia</option>
    <option value="Pordenone">Pordenone</option>
    <option value="Potenza">Potenza</option>
    <option value="Prato">Prato</option>
    <option value="Ragusa">Ragusa</option>
    <option value="Ravenna">Ravenna</option>
    <option value="Reggio Calabria">Reggio Calabria</option>
    <option value="Reggio Emilia">Reggio Emilia</option>
    <option value="Rieti">Rieti</option>
    <option value="Rimini">Rimini</option>
    <option value="Roma">Roma</option>
    <option value="Rovigo">Rovigo</option>
    <option value="Salerno">Salerno</option>
    <option value="Sassari">Sassari</option>
    <option value="Savona">Savona</option>
    <option value="Siena">Siena</option>
    <option value="Siracusa">Siracusa</option>
    <option value="Sondrio">Sondrio</option>
    <option value="Sud Sardegna">Sud Sardegna</option>
    <option value="Taranto">Taranto</option>
    <option value="Teramo">Teramo</option>
    <option value="Terni">Terni</option>
    <option value="Torino">Torino</option>
    <option value="Trapani">Trapani</option>
    <option value="Trento">Trento</option>
    <option value="Treviso">Treviso</option>
    <option value="Trieste">Trieste</option>
    <option value="Udine">Udine</option>
    <option value="Varese">Varese</option>
    <option value="Venezia">Venezia</option>
    <option value="Verbano-Cusio-Ossola">Verbano-Cusio-Ossola</option>
    <option value="Vercelli">Vercelli</option>
    <option value="Verona">Verona</option>
    <option value="Vibo Valentia">Vibo Valentia</option>
    <option value="Vicenza">Vicenza</option>
    <option value="Viterbo">Viterbo</option>
</select>
<br> <button id="filtraButton">vai</button> 
        </div>
        <div class="col">
                   
                   <table id="carList" class="table table-borderless">`;

                  
        for( let i=0;i<dati.length;i+=3){
    
html+=`  <tr>
  <td >
  <div id="n`+ i+ `"></div>
 </td>
 <td >
  <div id="n`+ (i+1)+ `"></div>
 </td>
 <td >
  <div id="n`+ (i+2) +`"></div>
 </td>
  </tr>`;
        }
    
           html+= `</table>

        </div>
        </div>`;

   // console.info(html);
    parentElement.innerHTML=html;
    const value = document.querySelector("#value");
    const input = document.querySelector("#prezzo");
    value.textContent = input.value;

//-------------------------------------------
input.addEventListener("input", (event) => {
  value.textContent = event.target.value+"€";
});
//-----------------------------------------------
    const renderCars = (cars) => {
      const carList = document.getElementById("carList");
      let carHtml = `<table class="table table-borderless">`;

      for (let i = 0; i < cars.length; i += 3) {
          carHtml += `<tr>
              <td><div id="n${i}"></div></td>
              <td><div id="n${i + 1}"></div></td>
              <td><div id="n${i + 2}"></div></td>
          </tr>`;
      }

      carHtml += `</table>`;
      carList.innerHTML =carHtml;

      for (let i = 0; i < cars.length; i++) {
          const prewiewer = prewiew(document.getElementById("n" + i));
          prewiewer.build(cars[i],i);
          prewiewer.render();
      }
  };

  renderCars(dati);

  document.getElementById("ricercaButton").addEventListener("click", () => {
      const searchTerm = document.getElementById("searchInput").value;
      const filteredCars = filterCars(searchTerm);
      renderCars(filteredCars);
});
}
}
}
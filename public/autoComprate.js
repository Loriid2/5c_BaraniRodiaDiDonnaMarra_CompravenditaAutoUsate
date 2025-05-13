import { prewiew } from "./previewComprate.js";
export const autocomprate = (parentElement) => {
    let utente ;
    let callback;
  
    return {
      build:(ut)=>{
        
        utente=ut.contatto;
        
        
      },
      setCallBack: (cb) => {
        callback = cb;
      },
      render:()=>{
        console.log("sono dentro con l'utente: "+utente);
        fetch("/car/sel", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({ utente: utente })
          })
          .then(response => response.json())
          .then(dati => {
        console.log(dati.dati);
        dati=dati.dati;
        let  html=`<a href="#pagina1"><button type="button" class="btn btn-primary" id="tornaHome">HOME</button></a>
                    <table id="carListPagate" class="">`;

//console.log(dati.length);
      for (let i = 0; i < dati.length; i += 3) {
//console.log(dati[i].id_auto);
        html += `  <tr>
  <td >
  <div id="r`+ (dati[i].id_auto) + `"></div>
 </td>`;
  if(dati[i+2]==undefined||dati[i+2]==null){continue;}
 html+=`<td >
  <div id="r`+ (dati[i+1].id_auto) + `"></div>
 </td>`;
 if(dati[i+2]==undefined||dati[i+2]==null){continue;}
 html+=`
 <td >
  <div id="r`+ (dati[i+2].id_auto) + `"></div>
 </td>
  </tr>`;
      }

      html += `</table>
`;
    parentElement.innerHTML=html;
   // console.log(html);

const renderCars = (cars) => {
  const carList = document.getElementById("carListPagate");
  if(!carList) {
    alert("Car list element not found!");
    return;
  }

  let carHtml = `<table class="table table-borderless">`;

  for (let i = 0; i < cars.length; i += 3) {
    if(cars[i]==undefined||cars[i]==null){continue;}
    carHtml += `<tr>
              <td><div id="r${cars[i].id_auto}"></div></td>`;
               if(cars[i+1]==undefined||cars[i+1]==null){continue;}
              carHtml +=`<td><div id="r${cars[i+1].id_auto}"></div></td>`;
               if(cars[i+2]==undefined||cars[i+2]==null){continue;}
             carHtml += `<td><div id="r${cars[i+2].id_auto}"></div></td>
          </tr>`;
  }

  carHtml += `</table>`;
  //console.log(carHtml);
  carList.innerHTML = carHtml;

  for (let i = 0; i < cars.length; i++) {
    const prewiewer = prewiew(document.getElementById("r" + (cars[i].id_auto)));
    //console.log(cars[i]); - ok
    prewiewer.build(cars[i], i,utente);
    prewiewer.setCallBack(callback);
    prewiewer.render();
  }

};

renderCars(dati);

    });
    
}
    }
}
//1,golf7_1.png,golf7_2.png,golf7_3.png,Golf 7 Volkswagen,Volkswagen Golf 7, versione business, tenuta in modo maniacale.,13200.00,6,115,92000,Roma,Disel	11.7,Volkswagen,Golf 7,rodiathomas@itis-molinari.eu,Golf 7 business in ottimo stato, 92.000 km e potente motore diesel.
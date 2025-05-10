import { prewiew } from "./preview.js";
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
       // console.log(dati.dati);
        dati=dati.dati;
        let  html=`<a href="#pagina1"><button type="button" class="btn btn-primary" id="tornaHome">HOME</button></a>
                    <table id="carListPagate" class="table table-borderless">`;

//console.log(dati.length);
      for (let i = 0; i < dati.length; i += 3) {

        html += `  <tr>
  <td >
  <div id="r`+ i + `"></div>
 </td>
 <td >
  <div id="r`+ (i + 1) + `"></div>
 </td>
 <td >
  <div id="r`+ (i + 2) + `"></div>
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
    carHtml += `<tr>
              <td><div id="r${i}"></div></td>
              <td><div id="r${i + 1}"></div></td>
              <td><div id="r${i + 2}"></div></td>
          </tr>`;
  }

  carHtml += `</table>`;
  //console.log(carHtml);
  carList.innerHTML = carHtml;

  for (let i = 0; i < cars.length; i++) {
    const prewiewer = prewiew(document.getElementById("r" + i));
    //console.log(cars[i]); - ok
    prewiewer.build(cars[i], i);
    prewiewer.setCallBack(callback);
    prewiewer.render();
  }
};

renderCars(dati);

    });
    
}
    }
}

import { prewiew } from "./preview.js";

export const homepage = (parentElement) => {
  const bottoneInvioRegister = document.querySelector("#invio");

  let dati = [];

  return {
    build: (diz) => {

      dati = [diz];
    },
    render: () => {
      let html = `
        <div class="row">
        <div class="col">
                <a href="doc/indexDocum.html"><button>DOCUMENTATION</button></a>
        </div>
         <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Cerca</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
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
                    inserimento filtro 
        </div>
        <div class="col">
                   
                   <table class="table table-borderless">`;

      for (let i = 0; i < dati.length; i++) {
        html += `  <tr>
        <td>
        <div id="n`+ i + `"></div>
      </td>
        </tr>`;
      }

      html += `</table>

        </div>
        </div>`;


      parentElement.innerHTML = html;

      for (let i = 0; i < dati.length; i++) {
        const prewiewer = prewiew(document.getElementById("n" + i));
        prewiewer.build(dati[i]);
        prewiewer.render();
      }
      

      
      
      

    }
  }
}
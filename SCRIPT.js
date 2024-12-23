
  var slidervermelho = document.getElementById("vermelho");
  var outputvermelho = document.getElementById("Rvermelho");
  outputvermelho.innerHTML = slidervermelho.value;
  var mudarfundo = document.getElementById("fundo");

  var sliderverde = document.getElementById("verde");
  var outputverde = document.getElementById("Rverde");
  outputverde.innerHTML = sliderverde.value;

  var sliderazul = document.getElementById("azul");
  var outputazul = document.getElementById("Razul");
  outputazul.innerHTML = sliderazul.value;

  slidervermelho.oninput = function() {
    outputvermelho.innerHTML = this.value;
    const cor_atual = document.getElementById('cor-nova');
    cor_atual.style.backgroundColor = `rgb(${this.value*2.55}, ${sliderverde.value*2.55}, ${sliderazul.value*2.55})`;
    dechecked();
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "vermelho_update?vermelho="+this.value, false);
    xhttp.send();  
  }

  sliderverde.oninput = function() {
    outputverde.innerHTML = this.value;
    const cor_atual = document.getElementById('cor-nova');
    cor_atual.style.backgroundColor = `rgb(${slidervermelho.value*2.55}, ${this.value*2.55}, ${sliderazul.value*2.55})`;
    dechecked();
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "verde_update?verde="+this.value, false);
    xhttp.send();
  }

  sliderazul.oninput = function() {
    outputazul.innerHTML = this.value;
    const cor_atual = document.getElementById('cor-nova ');
    cor_atual.style.backgroundColor = `rgb(${slidervermelho.value*2.55}, ${sliderverde.value*2.55}, ${this.value*2.55})`;
    dechecked();
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "azul_update?azul="+this.value, false);
    xhttp.send();
  }

  const colorWheel = document.getElementById('colorWheel');

  colorWheel.addEventListener('click', (event) => {
    const color = getColorFromEvent(event);
    console.log(`Cor selecionada: ${color}`);
    const colorWheel = document.getElementById('cor-atual');
    colorWheel.style.backgroundColor = color;
  });

  colorWheel.addEventListener('mousemove', (event) => {
    const color = getColorFromEvent(event);
    console.log(`Cor sob o mouse: ${color}`);
    const colorWheel = document.getElementById('cor-nova');
    colorWheel.style.backgroundColor = color;
  });

  function getColorFromEvent(event) {
    const { offsetX, offsetY } = event;
    const rect = colorWheel.getBoundingClientRect();
    const x = 1 + offsetX - rect.width / 2;
    const y = 2 + offsetY - rect.height / 2;
    console.log(`x: ${Math.round(x)} + y: ${Math.round(y)}`);
    var angleRad = -Math.atan2(y, x);
    var angle = 180*angleRad/Math.PI;
    if(angle < 0){
      angle = 360+angle;
      angleRad = 2*Math.PI+angleRad;
    }
    let raio = Math.sqrt(x*x + y*y);
    console.log(`raio: ${Math.round(raio)}`);

    console.log(`ANGULO: ${angle.toFixed(2)}, RAD: ${angleRad.toFixed(2)}`);
    let red = getValueForAngle(angle);
    console.log(`red: ${red}`);
    let blue = getValueForAngle(angle-120);
    console.log(`blue: ${blue}`);
    let green;
    if(angle>=240) green = getValueForAngle(angle-240);
    if(angle<240) green = getValueForAngle(angle+120);
    console.log(`green: ${green}`);
    /*let red = Math.max(Math.round(255*Math.sin(angleRad)),0);
    console.log(`red: ${red}`);
    let blue = Math.max(Math.round(255*Math.sin(angleRad - (Math.PI*2)/3)),0);
    console.log(`blue: ${blue}`);
    let  green = Math.max(Math.round(255*Math.sin(angleRad - (Math.PI*4)/3)),0);
    console.log(`green: ${green}`);*/

    const hue = Math.round((angle + Math.PI) * (180 / Math.PI)) % 360;
    // Converter HSL para RGB
    const rgb = {red, green, blue};
    return `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
  }

  function getValueForAngle(angle) {
    if (angle < 0 || angle > 180) {
        return 0;
  }

  const region1Start = 0;      // Início da região 1
  const region1End = 30;       // Fim da região 1 (25% de 180)
  const region2Start = 30;     // Início da região 2
  const region2End = 150;      // Fim da região 2 (50% de 180)
  const region3Start = 150;    // Início da região 3
  const region3End = 180;      // Fim da região 3 (25% de 180)
  let value;

  // Região 1 (0 a 45 graus)
  if (angle >= region1Start && angle <= region1End) {
      const normalizedAngle = (angle - region1Start) / (region1End - region1Start); // Normaliza para [0, 1]
      value = 255 * Math.sin(normalizedAngle * Math.PI / 2); // Senoide decrescente
  }
  // Região 2 (45 a 135 graus)
  else if (angle > region1End && angle <= region2End) {
      value = 255; // Valor constante na região do meio
  }
  // Região 3 (135 a 180 graus)
  else if (angle > region2End && angle <= region3End) {
      const normalizedAngle = (angle - region2End) / (region3End - region2End); // Normaliza para [0, 1]
      value = 255 * Math.sin((1 - normalizedAngle) * Math.PI / 2); // Senoide crescente
  }

  return Math.round(value);
}
    /*colorWheel.addEventListener('click', (event) => {
        const { offsetX, offsetY } = event;
        const rect = colorWheel.getBoundingClientRect();
        const x = offsetX - rect.width / 2;
        const y = offsetY - rect.height / 2;
        const angle = Math.atan2(y, x);
        const hue = Math.round((angle + Math.PI) * (180 / Math.PI)) % 360;

        const rgb = hslToRgb(hue, 100, 50);
        const color = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        console.log(color);
        //alert(`Cor selecionada: ${color}`);
    });*/

    function hslToRgb(h, s, l) {
        let r, g, b;

        h /= 360;
        s /= 100;
        l /= 100;

        const q = l < 0.5 ? l * (1 + s) : l + s - (l * s);
        const p = 2 * l - q;

        const hk = h < 1 / 3 ? h * 3 : h < 2 / 3 ? (h - 1 / 3) * 3 : (h - 2 / 3) * 3;

        const t = [hk + 1 / 3, hk, hk - 1 / 3].map(c => {
            if (c < 0) c += 1;
            if (c > 1) c -= 1;
            if (c < 1 / 6) return p + (q - p) * 6 * c;
            if (c < 1 / 2) return q;
            if (c < 2 / 3) return p + (q - p) * (2 / 3 - c) * 6;
            return p;
        });

        r = Math.round(t[0] * 255);
        g = Math.round(t[1] * 255);
        b = Math.round(t[2] * 255);

        return { r, g, b };
    }

  const radios = document.querySelectorAll('input[name="color"]');
  
  function displayMessage() {
    const selectedOption = document.querySelector('input[name="color"]:checked').value;
    const colorWheel = document.getElementById('cor-nova');
    console.log(selectedOption);
    switch(selectedOption){
      case("color-1"):
        colorWheel.style.backgroundColor = 'green';
      break;
      case("color-2"):
        colorWheel.style.backgroundColor = 'blue';
      break;
      case("color-3"):
        colorWheel.style.backgroundColor = 'yellow';
      break;
      case("color-4"):
        colorWheel.style.backgroundColor = 'red';
      break;
      case("color-5"):
        colorWheel.style.backgroundColor = 'cyan';
      break;
      case("color-6"):
        colorWheel.style.backgroundColor = 'pink';
      break;
      case("color-7"):
        colorWheel.style.backgroundColor = 'white';
      break;
      case("color-8"):
        colorWheel.style.backgroundColor = 'black';
      break;
    }
  }

  radios.forEach(radio => {
            radio.addEventListener('change', displayMessage);
  });   
  
  function dechecked(){
    radios.forEach(radio => {
        radio.checked = false
    })
  };
  
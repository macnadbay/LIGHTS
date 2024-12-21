geraRadios();

const slidervermelho = document.getElementById("vermelho");
const outputvermelho = document.getElementById("Rvermelho");
outputvermelho.innerHTML = slidervermelho.value;

const sliderverde = document.getElementById("verde");
const outputverde = document.getElementById("Rverde");
outputverde.innerHTML = sliderverde.value;

const sliderazul = document.getElementById("azul");
const outputazul = document.getElementById("Razul");
outputazul.innerHTML = sliderazul.value;

const sliderIntensidade = document.getElementById("slider_v");
const outputIntensidade = document.getElementById("label_slider_v");
outputIntensidade.innerHTML = sliderIntensidade.value;

sliderIntensidade.oninput = function(){
  outputIntensidade.innerHTML = sliderIntensidade.value;
}

const cor_nova = document.getElementById('cor-nova');
const cor_atual = document.getElementById('cor-atual');
let cor;
let red, green, blue;

const checkbox = document.getElementById('real_time');

checkbox.checked = true;
checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      console.log('Checkbox marcado!');
    } else {
      console.log('Checkbox desmarcado!');
    }
});

function handleRadioClick(event) {
  let rgb = event.target.value;
  const regex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
  // Executa a regex na string fornecida
  const resultado = rgb.match(regex);
  red = parseInt(resultado[1]);
  green = parseInt(resultado[2]);
  blue = parseInt(resultado[3]);
  if(red == 230 && blue == 230 && green == 230){
    red = 255;
    green = 255;
    blue = 255;
  }

  slidervermelho.value = 100*red/255;
  outputvermelho.textContent = Math.round(100*red/255);
  sliderverde.value = 100*green/255;
  outputverde.textContent = Math.round(100*green/255);
  sliderazul.value = 100*blue/255;
  outputazul.textContent = Math.round(100*blue/255);
  muda_cor_nova();
  //console.log(`Você selecionou: ${red},${green},${blue}`);
  //cor = `rgb(${r}, ${g}, ${b})`;
  //console.log(`cor = ${cor}`)
}

function geraRadios(){
  const levels= [255,127,0];
  const div_radios = document.getElementById("fundo_botoes");
  const div_grid_unit = document.createElement("div");

  levels.forEach(red => {
    levels.forEach(green => {
      levels.forEach(blue => {
        let color = `rgb(${red}, ${green}, ${blue})`;
        if(red == 255 && blue == 255 && green == 255)return; //color = `rgb(230,230,230)`;
        if(red == 0 && blue == 0 && green == 0)return; //color = `rgb(230,230,230)`;
        if(red == 127 && blue == 127 && green == 127)color = `rgb(230, 230, 230)`
        // Criar input de tipo rádio
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "color";
        radio.value = color;
        radio.id = color;
        //radio.style.backgroundColor = "";
        //radio.addEventListener("change", () => updateColorPreview(color));
        radio.style.backgroundColor = color;
        radio.addEventListener('click', handleRadioClick);

        // Criar o label para o botão
        const label = document.createElement("label");
        label.htmlFor = color;
        //label.textContent = color;
        //label.style.backgroundColor = color;

        const span = document.createElement("span");
        const img = document.createElement("img");
        img.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg";
        img.alt = "selecionado";
        
        span.appendChild(img);
        span.style.backgroundColor = color;
        span.style.display = "flex";
        label.appendChild(span);

          // Adicionar os elementos ao container
        div_grid_unit.appendChild(radio);
        div_grid_unit.appendChild(label);
        div_radios.appendChild(div_grid_unit);
        });
      });
    });
}
  

slidervermelho.oninput = function() {
  outputvermelho.innerHTML = this.value;
  //if(checkbox.checked)cor_atual.style.backgroundColor = `rgb(${this.value*2.55}, ${sliderverde.value*2.55}, ${sliderazul.value*2.55})`;
  dechecked();
  muda_cor_nova();
  //var xhttp = new XMLHttpRequest();
  //xhttp.open("GET", "vermelho_update?vermelho="+this.value, false);
  //xhttp.send();  
}

sliderverde.oninput = function() {
  outputverde.innerHTML = this.value;
  //const cor_atual = document.getElementById('cor-nova');
  //cor_atual.style.backgroundColor = `rgb(${slidervermelho.value*2.55}, ${this.value*2.55}, ${sliderazul.value*2.55})`;
  dechecked();
  muda_cor_nova();
  //var xhttp = new XMLHttpRequest();
  //xhttp.open("GET", "verde_update?verde="+this.value, false);
  //xhttp.send();
}

sliderazul.oninput = function() {
  outputazul.innerHTML = this.value;
  //const cor_atual = document.getElementById('cor-nova ');
  //cor_atual.style.backgroundColor = `rgb(${slidervermelho.value*2.55}, ${sliderverde.value*2.55}, ${this.value*2.55})`;
  dechecked();
  muda_cor_nova();
  //var xhttp = new XMLHttpRequest();
  //xhttp.open("GET", "azul_update?azul="+this.value, false);
  //xhttp.send();
}

const radios = document.querySelectorAll('input[name="color"]');
  
function displayMessage() {
  const selectedOption = document.querySelector('input[name="color"]:checked').value;
  //const colorWheel = document.getElementById('cor-nova');
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
      radio.checked = false;
  })
};

function muda_cor_nova(){
  red = Math.round(slidervermelho.value*2.55);
  green = Math.round(sliderverde.value*2.55);
  blue = Math.round(sliderazul.value*2.55);
  if(red == 230 && green == 230 && blue == 230){
    red = 255;
    green = 255;
    blue = 255;
  }
  cor = `rgb(${red}, ${green}, ${blue})`;
  console.log(`cor = ${cor}`)
  //cor_nova.style.backgroundColor = cor;
}

function atualiza_cor(){
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "vermelho_update?vermelho="+this.value, false);
  xhttp.send(); 
}

geraRadios();

var intensidade;

const slidervermelho = document.getElementById("vermelho");
const outputvermelho = document.getElementById("Rvermelho");
outputvermelho.innerHTML = slidervermelho.value+"%";
vermelho = slidervermelho.value*2.55;

const sliderverde = document.getElementById("verde");
const outputverde = document.getElementById("Rverde");
outputverde.innerHTML = sliderverde.value+"%";
verde = sliderverde.value*2.55;

const sliderazul = document.getElementById("azul");
const outputazul = document.getElementById("Razul");
outputazul.innerHTML = sliderazul.value+"%";
azul = sliderazul.value*2.55;

const sliderIntensidade = document.getElementById("slider_v");
const outputIntensidade = document.getElementById("label_slider_v");
outputIntensidade.innerHTML = sliderIntensidade.value+"%";
intensidade = sliderIntensidade.value;

sliderIntensidade.oninput = function(){
  outputIntensidade.innerHTML = sliderIntensidade.value+"%";
  intensidade = sliderIntensidade.value;
  muda_cor_nova();
}

slidervermelho.oninput = function() {
  outputvermelho.innerHTML = this.value+"%";
  //if(checkbox.checked)cor_atual.style.backgroundColor = `rgb(${this.value*2.55}, ${sliderverde.value*2.55}, ${sliderazul.value*2.55})`;
  //vermelho = Math.round(2.55*this.value*intensidade/100);
  dechecked();
  muda_cor_nova();
  //var xhttp = new XMLHttpRequest();
  //xhttp.open("GET", "vermelho_update?vermelho="+this.value, false);
  //xhttp.send();  
}

sliderverde.oninput = function() {
  outputverde.innerHTML = this.value+"%";
  //const cor_atual = document.getElementById('cor-nova');
  //cor_atual.style.backgroundColor = `rgb(${slidervermelho.value*2.55}, ${this.value*2.55}, ${sliderazul.value*2.55})`;
  //verde = Math.round(2.55*this.value*intensidade/100);
  dechecked();
  muda_cor_nova();
  //var xhttp = new XMLHttpRequest();
  //xhttp.open("GET", "verde_update?verde="+this.value, false);
  //xhttp.send();
}

sliderazul.oninput = function() {
  outputazul.innerHTML = this.value+"%";
  //const cor_atual = document.getElementById('cor-nova ');
  //cor_atual.style.backgroundColor = `rgb(${slidervermelho.value*2.55}, ${sliderverde.value*2.55}, ${this.value*2.55})`;
  //azul = Math.round(2.55*this.value*intensidade/100);
  dechecked();
  muda_cor_nova();
  //var xhttp = new XMLHttpRequest();
  //xhttp.open("GET", "azul_update?azul="+this.value, false);
  //xhttp.send();
}

//let cor;
//let red, green, blue;

const checkbox = document.getElementById('real_time');
const botao_atualizar = document.getElementById('botao_atualizar');


checkbox.checked = true;
checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      console.log('Checkbox marcado!');
      botao_atualizar.classList.add("disabled");
      botao_atualizar.setAttribute("aria-disabled","true");
      botao_atualizar.disabled = true;
      botao_atualizar.classList.add("btn-secondary");
      botao_atualizar.classList.remove("bnt-primary")
      
    } else {
      console.log('Checkbox desmarcado!');
      botao_atualizar.classList.remove("disabled");
      botao_atualizar.classList.remove("btn-secondary");
      botao_atualizar.classList.add("btn-primary");
      botao_atualizar.disabled = false;
      botao_atualizar.removeAttribute("aria-disabled"); 


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
        //img.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg";
        img.src = "check-icn.svg";
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
  const regex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
  let result; 
  radios.forEach(radio => {
      radio.checked = false;
      cor = radio.value;
      result = cor.match(regex);
      red = parseInt(result[1]);
      green = parseInt(result[2]);
      blue = parseInt(result[3])
      if(red == 230)red = 255;
      if(green == 230)green = 255;
      if(blue == 230)blue = 255;
      red = Math.round(red/2.55);
      green = Math.round(green/2.55);
      blue = Math.round(blue/2.55);
      if(slidervermelho.value == red && sliderverde.value == green && sliderazul.value == blue){ // && (sliderverde.value*2.55) == green && (sliderazul.value*2.55) == blue){
        radio.checked = true;
        console.log(`%cRadio.value = ${cor}`, "font-family: monospace");
        console.log(`%cred = ${slidervermelho.value}, green = ${sliderverde.value}, blue = ${sliderazul.value}`, "font-family: monospace");
      }       
      //console.log(`%cred = ${red}, green = ${green}, blue = ${blue}`, "font-family: monospace");
      
  })
};

function muda_cor_nova(){
  red = Math.round(slidervermelho.value*2.55);
  green = Math.round(sliderverde.value*2.55);
  blue = Math.round(sliderazul.value*2.55);
  //red=Math.round(red*intensidade/100);
  //green=Math.round(green*intensidade/100);
  //blue=Math.round(blue*intensidade/100);
  cor = `rgb(${red}, ${green}, ${blue})`;
  //testar resposta dentro de curva logaritmia
  //console.log(`%ccor = ${cor}`.padEnd(30) + `intensidade = ${intensidade}`, "font-family: monospace");
  //cor_nova.style.backgroundColor = cor;
  if(checkbox.checked)atualizar();
}

function atualizar(){
  var xhttp = new XMLHttpRequest();
  const params = new URLSearchParams;
  params.append("vermelho",slidervermelho.value);
  params.append("verde",sliderverde.value);
  params.append("azul",sliderazul.value);
  params.append("intensidade",sliderIntensidade.value);
  //console.log(params);

  const url = `update?${params}`;
  xhttp.open("GET", url, true);
  xhttp.onload = function() {
    if (xhttp.status >= 200 && xhttp.status < 300) {
      console.log("Resposta recebida:", xhttp.responseText);
    } else {
      console.error("Erro na requisição:", xhttp.status, xhttp.statusText);
    }
  };
  xhttp.send(); 
}

function botao_on(){
  sliderIntensidade.value = intensidade;
  outputIntensidade.innerHTML = intensidade;
}

function botao_off(){
  sliderIntensidade.value = 0;
  outputIntensidade.innerHTML = 0;
}

dechecked();
console.log('Script INICIADO!');
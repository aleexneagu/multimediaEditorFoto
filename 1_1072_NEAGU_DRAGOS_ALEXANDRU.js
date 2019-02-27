
///////////////////////////////////////////////////////////////////// drag and drop - upload imagine

		var canvas = document.getElementById("canvas"),
			context = canvas.getContext("2d"),
			img = document.createElement("img"),
			mouseDown = false,
			brushColor = 
			hasText = true,
			clearCanvas = function () {
				if (hasText) {
					context.clearRect(0, 0, canvas.width, canvas.height);
					hasText = false;
				}
			};

		context.fillText("Folositi drag and drop pentru a incarca o imagine (600x600).", 170, 270);
    context.fillText("Se gasesc 3 imagini de aceasta dimensiune in folderul media.", 170, 300);

		img.addEventListener("load", function () 
		{
			clearCanvas();
			context.drawImage(img, 0, 0);
		}, false);
		
		
    canvas.addEventListener("dragover", function (evt) 
		{
      clearCanvas();
			evt.preventDefault();
		}, false);

		
    canvas.addEventListener("drop", function (evt) 
		{
			var fisiere = evt.dataTransfer.files;
			if (fisiere.length > 0) {
				var fisier = fisiere[0];
				if (typeof FileReader !== "undefined" && fisier.type.indexOf("image") != -1) {
					var fr = new FileReader();
					fr.onload = function (evt) {
						img.src = evt.target.result;
					};
					fr.readAsDataURL(fisier);
				}
			}
			evt.preventDefault();
		}, false);


///////////////////////////////////////////////////////////////////// desene figuri geometrice

var miscare = false,
    pctDesen,
    print;


function xyCanvas(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

function salvareInceput() {
    print = context.getImageData(0, 0, canvas.width, canvas.height);
}

function modificareInceput() {
    context.putImageData(print, 0, 0);
}

function deseneazaLinie(pozitie) {
  
    context.beginPath();
    context.moveTo(pctDesen.x, pctDesen.y);
    context.lineTo(pozitie.x, pozitie.y);
    context.stroke();
}

function deseneazaCerc(pozitie) {
    var rc = Math.sqrt(Math.pow((pctDesen.x - pozitie.x), 2) + Math.pow((pctDesen.y - pozitie.y), 2));
    context.beginPath();
    context.arc(pctDesen.x, pctDesen.y, rc, 0, 2 * Math.PI, false);
}

function deseneazaDreptunghi(pozitie, sides=4, angle) {
    var coordonate = [],
        rc = Math.sqrt(Math.pow((pctDesen.x - pozitie.x), 2) + Math.pow((pctDesen.y - pozitie.y), 2)),
        index = 0;

    for (index = 0; index < sides; index++) {
        coordonate.push({x: pctDesen.x + rc * Math.cos(angle), y: pctDesen.y - rc * Math.sin(angle)});
        angle += (2 * Math.PI) / 4;
    }

    context.beginPath();
    context.moveTo(coordonate[0].x, coordonate[0].y);
    for (index = 1; index < sides; index++) {
        context.lineTo(coordonate[index].x, coordonate[index].y);
    }
    context.closePath();
}

function draw(pozitie) {

    var rb = document.getElementById("fillBox"),
        forma = document.querySelector('input[type="radio"][name="forma"]:checked').value,
        laturi = 4;
    if (forma === "cerc") {
        deseneazaCerc(pozitie);
    }
    if (forma === "linie") {
        deseneazaLinie(pozitie);
    }

    if (forma === "dreptunghi") {
        deseneazaDreptunghi(pozitie, laturi, Math.PI / 4);
    }
    if (rb.checked) {
        context.fill();
    } else {
        context.stroke();
    }
}

function punctInceput(event) {
    miscare = true;
    pctDesen = xyCanvas(event);
    salvareInceput();
}

function trage(event) {
    var pozitie;
    if (miscare === true) {
        modificareInceput();
        pozitie = xyCanvas(event);
        draw(pozitie, "polygon");
    }
}

function punctFinal(event) {
    miscare = false;
    modificareInceput();
    var pozitie = xyCanvas(event);
    draw(pozitie, "polygon");
}

function principala() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');
    context.strokeStyle = 'yellow';
    context.fillStyle = 'yellow';
    context.lineWidth = 4;
    context.lineCap = 'round';

    canvas.addEventListener('mousedown', punctInceput, false);
    canvas.addEventListener('mousemove', trage, false);
    canvas.addEventListener('mouseup', punctFinal, false);
}


window.addEventListener('load', principala, false);

 $(document).ready(function(){
            $('#lum_minus').click(function()
            {
               Caman("#canvas",img,function () 
               {
                var sunet_click = document.getElementById("sunet_click");
                sunet_click.play();
                this.brightness(-5).render();
               });
            });
          });

          $(document).ready(function(){
            $('#lum_plus').click(function()
            {   
               var sunet_click = document.getElementById("sunet_click");
               sunet_click.play();
               Caman("#canvas",img,function () 
               {
                this.brightness(5).render();
               });
            });
          });

          $(document).ready(function(){
            $('#contrast_minus').click(function()
            {  
               var sunet_click = document.getElementById("sunet_click");
               sunet_click.play();
               Caman("#canvas",img,function () 
               {
                this.contrast(-5).render();
               });
            });
          });

          $(document).ready(function(){
            $('#contrast_plus').click(function()
            {  
               var sunet_click = document.getElementById("sunet_click");
               sunet_click.play();
               Caman("#canvas",img,function () 
               {
                this.contrast(5).render();
               });
            });
          });

          $(document).ready(function(){
            $('#intensitate_minus').click(function()
            {   
               var sunet_click = document.getElementById("sunet_click");
               sunet_click.play();
               Caman("#canvas",img,function () 
               {
               this.exposure(5).render();
               });
            });
          });

          $(document).ready(function(){
            $('#intensitate_plus').click(function()
            { 
               var sunet_click = document.getElementById("sunet_click");
               sunet_click.play();
               Caman("#canvas",img,function () 
               {
                this.exposure(-5).render();
               });
            });
          });

          $(document).ready(function(){
            $('#zgomot_plus').click(function()
            {  
               var sunet_click = document.getElementById("sunet_click");
               sunet_click.play();
               Caman("#canvas",img,function () 
               {
                this.noise(5).render();
               });
            });
          });

          $(document).ready(function(){
            $('#saturatie_minus').click(function()
            {  
               var sunet_click = document.getElementById("sunet_click");
               sunet_click.play();
               Caman("#canvas",img,function () 
               {
               this.saturation(-5).render();
               });
            });
          });

          $(document).ready(function(){
            $('#saturatie_plus').click(function()
            {   
               var sunet_click = document.getElementById("sunet_click");
               sunet_click.play();
               Caman("#canvas",img,function () 
               {
               this.saturation(5).render();
               });
            });
          });


        $(document).ready(function(){
            $('#gri').click(function()
            {   
               var sunet_click = document.getElementById("sunet_click");
               sunet_click.play();
               Caman("#canvas",img, function ()
                {
               this.greyscale().render();
                });
            });
          });

        $(document).ready(function(){
            $('#aleator').click(function()
            {
               var sunet_click = document.getElementById("sunet_click");
               sunet_click.play();
               Caman("#canvas",img, function ()
                {
               this.hue(10).render();
                });
            });
          });


        $(document).ready(function(){
            $('#sepia').click(function()
            {
              var sunet_click = document.getElementById("sunet_click");
              sunet_click.play();
              Caman("#canvas",img, function ()
                {
                  this.sepia(50).render();
                });
            });
          });


        $(document).ready(function(){
            $('#salveaza').click(function()
            {
                var sunet_salvare = document.getElementById("sunet_salvare");
                sunet_salvare.play();
                var urlS = document.getElementById('urlSalvare');
                urlS.setAttribute('download', 'pozaCanvasMultimedia.png');
                urlS.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
                urlS.click();  
              });
          });

        $(document).ready(function(){
            $('#btn_sterge').click(function()
            {
              context.clearRect(0,0,canvas.width,canvas.height);
              var sunet_stergere = document.getElementById("sunet_stergere");
              sunet_stergere.play();
              setTimeout(pauza(),5000);  
              });
          });

        function pauza()
        {
          alert('Canvas-ul se va sterge iar pagina va fi reincarcata.');
          window.location.reload();
        }


        $(document).ready(function(){
            $('#btn_zoomin').click(function()
            {
                canvas.style.width = canvas.style.width+(canvas.width * 1.1) + "px";
                canvas.style.height = canvas.style.width+"px";
                document.getElementById("btn_zoomin").disabled = true;
                document.getElementById("btn_zoomout").disabled = true;
              });
          });


        $(document).ready(function(){
            $('#btn_zoomout').click(function()
            {
                canvas.style.width = canvas.style.width+(canvas.width/1.1) + "px";
                canvas.style.height = canvas.style.width+"px";
                document.getElementById("btn_zoomin").disabled = true;
                document.getElementById("btn_zoomout").disabled = true;
              });
          });


       


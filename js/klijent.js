var GsKlijentKey;


function IspisKlijenta() //Poziva se u upravljanje.html
{
	var klijenti =$("#tableData");
	oDbKlijent.on('value', function (oOdgovorPosluzitelja)
{
var count = 1;
klijenti.empty();
oOdgovorPosluzitelja.forEach(function (oKlijentSnapshot)
{
var sKlijentKey = oKlijentSnapshot.key; // ključ pojedine vijesti
var oKlijent = oKlijentSnapshot.val(); // svojstva vijesti Javascript objekt obliku
//klijenti.append("<a href='#' data-toggle='modal' data-target='#azuriraj-klijenta' data-dismiss='modal' onclick='AzurirajKlijent("+oKlijent.oib+")'><p class='AzurirajKlijent'>"+oKlijent.ime+" "+oKlijent.prezime +"</p></a>");
klijenti.append("<tr><th>"+count+"</th><td>"+oKlijent.ime+"</td><td>"+oKlijent.prezime+"</td><td>"+oKlijent.oib+"</td><td><i class='fas fa-user-edit CursorPointer' aria-hidden='true' data-toggle='modal' data-target='#azuriraj-klijenta' onclick='AzurirajKlijent(\""+sKlijentKey+"\")'></i></td><td><i class='fa fa-trash CursorPointer' aria-hidden='true' data-toggle='modal' data-target='#obrisi-klijenta' onclick='SendKey(\""+sKlijentKey+"\")'></i></td><td><a onclick='SendKey(\""+sKlijentKey+"\")' href='KlijentInfo.html'><i class='fas fa-info'></i></a></td></tr>");
count++;
});});};

function DodajKlijenta() //Poziva se u upravljanje.html
{
var kIme    = $('#inptIme').val();  //dohvaćanje podataka iz modala forme i spremanje u bazu
var kPrezime = $('#inptPrezime').val();
var kOib    = $('#inptOIB').val();
var kAdresa = $('#inptAdresa').val();
var kMjesto = $('#inptMjesto').val();
var kspol	= $("#spol").val();



const digits_only = string => [...string].every(c => '0123456789'.includes(c));
if(kIme != "" && kPrezime != "" && kOib != "" && kAdresa != "" && kMjesto != ""){
if(kOib.length == 11 && digits_only(kOib))
{
	if(kspol != "none")
	{
		var sKey = firebase.database().ref().child('klijent').push().key;
var oKlijent =
{
ime: kIme,
prezime:kPrezime,
oib:kOib,
adresa:kAdresa,
mjesto:kMjesto,
spol:kspol
};
// Zapiši u Firebase
var oZapis = {};
oZapis[sKey] = oKlijent;
oDbKlijent.update(oZapis);

 $('#dodaj-klijenta').modal('hide');
	}else{alert("Odaberite spol!");}
}
else{alert("Pogrešan unos oib-a!");}
}
else
{
	alert("Sva polja moraju bit popunjena!");
}
// Kreiranje novoga ključa u bazi

}; 

function AzurirajKlijent(sKlijentKey) //Poziva se u upravljanje.html
{
	//Funkcija popunjava modal forme s trenutnim informacijama o klijentu
   GsKlijentKey = sKlijentKey;
   var oKlijentRef = oDb.ref('klijent/' + sKlijentKey);  

oKlijentRef.once('value', function(oOdgovorPosluzitelja)
{
var oKlijent = oOdgovorPosluzitelja.val();
$("#AzurirajIme").val(oKlijent.ime);
$("#AzurirajPrezime").val(oKlijent.prezime);
$("#AzurirajOIB").val(oKlijent.oib);
$("#AzurirajAdresu").val(oKlijent.adresa);
$("#AzurirajMjesto").val(oKlijent.mjesto);
});
};

function SpremiAzuriranogKlijenta() // Poziva se u upravljanje.html
{	
var oKlijentRef = oDb.ref('klijent/' + GsKlijentKey); // Dohvaćanje podataka za pohranu
var kIme = $('#AzurirajIme').val();
var kPrezime = $('#AzurirajPrezime').val();
var kOib = $('#AzurirajOIB').val();
var kAdresa = $('#AzurirajAdresu').val();
var kMjesto = $('#AzurirajMjesto').val();

var oKlijent =
{
ime: kIme,
prezime:kPrezime,
oib:kOib,
adresa:kAdresa,
mjesto:kMjesto
};
oKlijentRef.update(oKlijent);

};

function SendKey(Key) //postavlja se ključ u globalnu varijablu i salje po sesiji
{
//sessionStorage.clear() 
GsKlijentKey = Key
sessionStorage.setItem("SendKey",Key);

};

function ObrisiKlijenta() //Poziva se u upravljanje.html
{
var oKlijentRef = oDb.ref('klijent/' + GsKlijentKey);
oKlijentRef.remove();
};

function clearModal() //Poziva se u upravljanje.html
{
$('#inptIme').val("");
$('#inptPrezime').val("");
$('#inptOIB').val("");
$('#inptAdresa').val("");
$('#inptMjesto').val("");
};

function PretraziKlijent() // Poziva se u upravljanje.html
{
	$("#searchBar").on("keyup",function(){

var pretraga = $("#searchBar").val().toLowerCase();
var klijenti =$("#tableData");

oDbKlijent.on('value', function (oOdgovorPosluzitelja){
var count = 1;
klijenti.empty();
oOdgovorPosluzitelja.forEach(function (oKlijentSnapshot){

				var sKlijentKey = oKlijentSnapshot.key;
				var oKlijent = oKlijentSnapshot.val();
				var imePrezime = oKlijent.ime+oKlijent.prezime; //spajanje imena i prezimena u jedan string radi lakše pretrage
			    var trim= pretraga.replace(/ /g,''); //uklanjanje razmaka u stringu
				//console.log(trim);
				if(imePrezime.toLowerCase().indexOf(trim) >= 0) //oKlijent.ime.toLowerCase().indexOf(pretraga) >=0 || oKlijent.prezime.toLowerCase().indexOf(pretraga) >= 0
				{
					klijenti.append("<tr href='#'><th>"+count+"</th><td>"+oKlijent.ime+"</td><td>"+oKlijent.prezime+"</td><td>"+oKlijent.oib+"</td><td><i  class='fas fa-user-edit' aria-hidden='true' data-toggle='modal' data-target='#azuriraj-klijenta' onclick='AzurirajKlijent(\""+sKlijentKey+"\")' ></i></td><td><i class='fa fa-trash' aria-hidden='true' data-toggle='modal' data-target='#obrisi-klijenta' onclick='SendKey(\""+sKlijentKey+"\")'></i></td><td><a href='KlijentInfo.html'><i class='fas fa-info'></i></a></td></tr>");
					count++;	
				}
				else if(oKlijent.oib.indexOf(pretraga) >= 0)
				{
					klijenti.append("<tr href='#'><th>"+count+"</th><td>"+oKlijent.ime+"</td><td>"+oKlijent.prezime+"</td><td>"+oKlijent.oib+"</td><td><i  class='fas fa-user-edit' aria-hidden='true' data-toggle='modal' data-target='#azuriraj-klijenta' onclick='AzurirajKlijent(\""+sKlijentKey+"\")' ></i></td><td><i class='fa fa-trash' aria-hidden='true' data-toggle='modal' data-target='#obrisi-klijenta' onclick='SendKey(\""+sKlijentKey+"\")'></i></td><td><a href='KlijentInfo.html'><i class='fas fa-info'></i></a></td></tr>");
					count++;
				};
			});});});};

function KlijentPrikaz() //Poziva se u klijentInfo
{
	var Key = sessionStorage.getItem('SendKey');
	var oKlijentRef = oDb.ref('klijent/' + Key);  
	var klijent = $("#KInfo");
	klijent.empty();
	oKlijentRef.once('value', function(oOdgovorPosluzitelja)
	{
	var oKlijent = oOdgovorPosluzitelja.val();
	//klijent.append("<h4>Klijent: "+oKlijent.ime +" "+oKlijent.prezime+"</h4>");
	//klijent.append("<h4>OIB: "+oKlijent.oib+"</h4>");
	//klijent.append("<table><tbody><tr><th scope='row'>Klijent:</th><td> "+(oKlijent.ime +" "+oKlijent.prezime)+"</td></tr><tr><th scope='row'>OIB:</th><td> "+oKlijent.oib+"</td></tr><tr><th scope='row'>Adresa:</th><td> "+oKlijent.adresa+"</td></tr><tr><th scope='row'>Mjesto:</th><td> "+oKlijent.mjesto+"</td></tr></tbody></table>");
	klijent.append("<table class='table table-bordered'><thead><tr><th scope='col'>Ime i Prezime</th><th scope='col'>OIB</th><th scope='col'>Adresa i mjesto stanovanja</th></tr></thead>"+ 
	"<tbody><tr><td>"+(oKlijent.ime+" "+oKlijent.prezime) +"</td><td>"+oKlijent.oib+"</td><td>"+(oKlijent.adresa+", "+oKlijent.mjesto)+"</td></tr></tbody> </table>")

	}); 

};


var Key = sessionStorage.getItem('SendOsigKey');
var Node = sessionStorage.getItem('SendOsigName');


function dateCheck(from,to,check) 
{

    if(check <= to && check >= from)
    {
        return true;
    }
    return false;
};

function IspisInfo()
{
	var tableHead = $("#tableDataHead");
    var tableBody = $("#tableDataBody");
    var ProduljiOsig =$("#ProduljiOsig");

if(Node == "Auto")
{
tableHead.append("<tr><th scope='col'>Tip vozila</th><th scope='col'>Proizvođać</th><th scope='col'>Model</th><th scope='col'>Godina proizvodnje</th><th scope='col'>Snaga motora</th><th scope='col'>Trajanje osiguranja</th><th scope='col'>Iznos</th><th scope='col'>Stanje</th> </tr>");
	
	var oAutoRef = oDb.ref('Auto_osiguranje/' + Key); 
	oAutoRef.on('value', function(oOdgovorPosluzitelja)
	{
		ProduljiOsig.empty();
		tableBody.empty();
		var oAuto = oOdgovorPosluzitelja.val();
		WriteKlijent(oAuto.klijentOib);
				const str = oAuto.period;
				const result = str.split('/').pop(); // rezultat perioda do kada traje
				const result2 = moment(str.split('/')[0],"DD-MM-YYYY");
				var date = moment(result,"DD-MM-YYYY"); //formatiranje datuma
				if(new Date(date) > Date.now()&& new Date(result2) < Date.now()) 
				{
					var datumOd = new Date(date);
                   var datumDo = new Date(date);
					 if(datumDo.getMonth() == 0)
                                { 
                               // datumOd = datumOd.setMonth(12);

                                datumOd.setFullYear(parseInt(datumOd.getFullYear()-1),11,parseInt(datumOd.getDate()));
                                }  
                            
                                else
                                {
                                 datumOd = datumOd.setMonth(datumDo.getMonth()-1);
                                }   

		tableBody.empty();
	if(!(dateCheck(datumOd,datumDo,Date.now())))
		{
			ProduljiOsig.empty();
			tableBody.append("<tr><td>"+oAuto.tip.charAt(0).toUpperCase()+oAuto.tip.slice(1)+"</td>"+
			"<td>"+oAuto.proizvodac+"</td>"+
			"<td>"+oAuto.model+"</td> "+
			"<td>"+oAuto.godina_proizvodnje+"</td> "+
			"<td>"+oAuto.snaga+"</td> "+
			"<td>"+oAuto.period+"</td> "+
			"<td>"+oAuto.cijena_osiguranja+" kn</td> "+
			"<td>Aktivno</td> "+
			"</tr>"); 
		}
		else
		{
			ProduljiOsig.empty();
			tableBody.append("<tr class='table-warning' data-bs-toggle='tooltip' data-bs-placement='top' title='Osiguranje će uskoro isteći!'><td>"+oAuto.tip.charAt(0).toUpperCase()+oAuto.tip.slice(1)+"</td>"+
			"<td>"+oAuto.proizvodac+"</td>"+
			"<td>"+oAuto.model+"</td> "+
			"<td>"+oAuto.godina_proizvodnje+"</td> "+
			"<td>"+oAuto.snaga+"</td> "+
			"<td>"+oAuto.period+"</td> "+
			"<td>"+oAuto.cijena_osiguranja+" kn</td> "+
			"<td>Osiguranje će uskoro isteći!</td> "+
			"</tr>"); 
		};

				}
				 else if(new Date(result2) > Date.now())
                {
                	ProduljiOsig.empty();
                	tableBody.append("<tr class='table-info' data-bs-toggle='tooltip' data-bs-placement='top' title='Osiguranje se još nije aktiviralo!'><td>"+oAuto.tip.charAt(0).toUpperCase()+oAuto.tip.slice(1)+"</td>"+
			"<td>"+oAuto.proizvodac+"</td>"+
			"<td>"+oAuto.model+"</td> "+
			"<td>"+oAuto.godina_proizvodnje+"</td> "+
			"<td>"+oAuto.snaga+"</td> "+
			"<td>"+oAuto.period+"</td> "+
			"<td>"+oAuto.cijena_osiguranja+" kn</td> "+
			"<td>Ponovno aktivno od: "+str.split('/')[0]+"</td> "+
			"</tr>"); 
                }
				else
				{

			ProduljiOsig.empty();
			tableBody.append("<tr class='table-danger' data-bs-toggle='tooltip' data-bs-placement='top' title='Osiguranje je isteklo!'><td>"+oAuto.tip.charAt(0).toUpperCase()+oAuto.tip.slice(1)+"</td>"+
			"<td>"+oAuto.proizvodac+"</td>"+
			"<td>"+oAuto.model+"</td> "+
			"<td>"+oAuto.godina_proizvodnje+"</td> "+
			"<td>"+oAuto.snaga+"</td> "+
			"<td>"+oAuto.period+"</td> "+
			"<td>"+oAuto.cijena_osiguranja+" kn</td> "+
			"<td>Neaktivno</td> "+
			"</tr>"); 
					
			ProduljiOsig.append("<button class='btn btn-primary mb-1' style='display: inline-flex;'' href='#'' data-toggle='modal' data-target='#produlji-auto'>Produlji osiguranje</button>")		
				};			
    });
}
else if(Node == "Stamb")
{
	tableHead.append("<tr><th scope='col'>Vrsta objekta</th><th scope='col'>Površina objekta</th><th scope='col'>Trajanje osiguranja</th><th scope='col'>Adresa</th><th scope='col'>Mjesto</th><th scope='col'>Iznos</th><th scope='col'>Stanje</th>  </tr>");
	
	var oStambRef = oDb.ref('Stambeno_osiguranje/' + Key); 
	oStambRef.on('value', function(oOdgovorPosluzitelja)
	{
		ProduljiOsig.empty();
		tableBody.empty();
		var oStamb = oOdgovorPosluzitelja.val();
		WriteKlijent(oStamb.klijentOib);
				const str = oStamb.period
				const result = str.split('/').pop(); // rezultat perioda do kada traje
				const result2 = moment(str.split('/')[0],"DD-MM-YYYY");
				var date = moment(result,"DD-MM-YYYY"); //formatiranje datuma
				if(new Date(date) > Date.now() && new Date(result2) < Date.now()) 
				{
					var datumOd = new Date(date);
                   var datumDo = new Date(date);
					 if(datumDo.getMonth() == 0)
                                { 
                               // datumOd = datumOd.setMonth(12);

                                datumOd.setFullYear(parseInt(datumOd.getFullYear()-1),11,parseInt(datumOd.getDate()));
                                }  
                            
                                else
                                {
                                 datumOd = datumOd.setMonth(datumDo.getMonth()-1);
                                }  


		tableBody.empty();
		if(!(dateCheck(datumOd,datumDo,Date.now())))
		{
			tableBody.append("<tr><td>"+oStamb.vrsta_objekta.charAt(0).toUpperCase()+oStamb.vrsta_objekta.slice(1)+"</td>"+
			"<td>"+oStamb.povrsina_objekta+" m2</td>"+
			"<td>"+oStamb.period+"</td> "+
			"<td>"+oStamb.adresa+"</td> "+
			"<td>"+oStamb.mjesto+"</td> "+
			"<td>"+oStamb.iznos+"</td> "+
			"<td>Aktivno</td> "+
			"</tr>"); 

		}
		else
		{
			tableBody.append("<tr class='table-warning' data-bs-toggle='tooltip' data-bs-placement='top' title='Osiguranje će uskoro isteći!'><td>"+oStamb.vrsta_objekta.charAt(0).toUpperCase()+oStamb.vrsta_objekta.slice(1)+"</td>"+
			"<td>"+oStamb.povrsina_objekta+" m2</td>"+
			"<td>"+oStamb.period+"</td> "+
			"<td>"+oStamb.adresa+"</td> "+
			"<td>"+oStamb.mjesto+"</td> "+
			"<td>"+oStamb.iznos+"</td> "+
			"<td>Osiguranje će uskoro isteći!</td> "+
			"</tr>"); 
		}
	}
	 else if(new Date(result2) > Date.now())
	 {
	 	ProduljiOsig.empty();
		tableBody.append("<tr class='table-info' data-bs-toggle='tooltip' data-bs-placement='top' title='Osiguranje se još nije aktiviralo!'><td>"+oStamb.vrsta_objekta.charAt(0).toUpperCase()+oStamb.vrsta_objekta.slice(1)+"</td>"+
			"<td>"+oStamb.povrsina_objekta+" m2</td>"+
			"<td>"+oStamb.period+"</td> "+
			"<td>"+oStamb.adresa+"</td> "+
			"<td>"+oStamb.mjesto+"</td> "+
			"<td>"+oStamb.iznos+"</td> "+
			"<td>Ponovno aktivno od: "+str.split('/')[0]+"</td> "+
			"</tr>");

	 }
	else
	{
		ProduljiOsig.empty();
		tableBody.append("<tr class='table-danger' data-bs-toggle='tooltip' data-bs-placement='top' title='Osiguranje je isteklo!'><td>"+oStamb.vrsta_objekta.charAt(0).toUpperCase()+oStamb.vrsta_objekta.slice(1)+"</td>"+
			"<td>"+oStamb.povrsina_objekta+" m2</td>"+
			"<td>"+oStamb.period+"</td> "+
			"<td>"+oStamb.adresa+"</td> "+
			"<td>"+oStamb.mjesto+"</td> "+
			"<td>"+oStamb.iznos+"</td> "+
			"<td>Neaktivno</td> "+
			"</tr>"); 
		ProduljiOsig.append("<button class='btn btn-primary mb-1' style='display: inline-flex;'' href='#'' data-toggle='modal' data-target='#produlji-stamb'>Produlji osiguranje</button>")		
	};	
   }); 

}
else if(Node == "Zivot")
{
tableHead.append("<tr><th scope='col'>Godine klijenta</th><th scope='col'>Konzumacija nikotina?</th><th scope='col'>Opasne aktivnosti?</th><th scope='col'>Teške bolesti kroz obitelj?</th><th scope='col'>Trajanje osiguranja</th><th scope='col'>Iznos</th><th scope='col'>Stanje</th> </tr>");
	
	var oZivotRef = oDb.ref('Zivotno_osiguranje/' + Key); 
	oZivotRef.on('value', function(oOdgovorPosluzitelja)
	{
		ProduljiOsig.empty();
		tableBody.empty();
		var oZivot = oOdgovorPosluzitelja.val();

				WriteKlijent(oZivot.klijentOib);
				

				const str = oZivot.period
				const result = str.split('/').pop(); // rezultat perioda do kada traje
				const result2 = moment(str.split('/')[0],"DD-MM-YYYY");
				var date = moment(result,"DD-MM-YYYY"); //formatiranje datuma
				if(new Date(date) > Date.now() && new Date(result2) < Date.now()) 
				{
					var datumOd = new Date(date);
                    var datumDo = new Date(date);
					 if(datumDo.getMonth() == 0) // Ako je datum do 1. mjesec onda se moram vratit u proslu godinu 12 mjesec
                                { 
                                datumOd.setFullYear(parseInt(datumOd.getFullYear()-1),11,parseInt(datumOd.getDate()));
                                }  
                            
                                else
                                {
                                 datumOd = datumOd.setMonth(datumDo.getMonth()-1);
                                }   

		tableBody.empty();
	if(!(dateCheck(datumOd,datumDo,Date.now())))
		{
			tableBody.append("<tr><td>"+oZivot.starost+"</td>"+
			"<td>"+oZivot.nikotin+"</td>"+
			"<td>"+oZivot.aktivnost+"</td> "+
			"<td>"+oZivot.teske_bolest+"</td> "+
			"<td>"+oZivot.period+"</td> "+
			"<td>"+oZivot.iznos+" kn</td> "+
			"<td>Aktivno</td> "+
			"</tr>"); 
		}
		else
		{
			tableBody.append("<tr class='table-warning' data-bs-toggle='tooltip' data-bs-placement='top' title='Osiguranje će uskoro isteći!'><td>"+oZivot.starost+"</td>"+
			"<td>"+oZivot.nikotin+"</td>"+
			"<td>"+oZivot.aktivnost+"</td> "+
			"<td>"+oZivot.teske_bolest+"</td> "+
			"<td>"+oZivot.period+"</td> "+
			"<td>"+oZivot.iznos+" kn</td> "+
			"<td>Osiguranje će uskoro isteći!</td> "+
			"</tr>"); 
		};

				}
				 else if(new Date(result2) > Date.now())
				 {
				 		ProduljiOsig.empty();
					tableBody.append("<tr class='table-info' data-bs-toggle='tooltip' data-bs-placement='top' title='Osiguranje se još nije aktiviralo!'><td>"+oZivot.starost+"</td>"+
			"<td>"+oZivot.nikotin+"</td>"+
			"<td>"+oZivot.aktivnost+"</td> "+
			"<td>"+oZivot.teske_bolest+"</td> "+
			"<td>"+oZivot.period+"</td> "+
			"<td>"+oZivot.iznos+" kn</td> "+
			"<td>Ponovno aktivno od: "+str.split('/')[0]+"</td> "+
			"</tr>"); 

				 }
				else
				{
					ProduljiOsig.empty();
					tableBody.append("<tr class='table-danger' data-bs-toggle='tooltip' data-bs-placement='top' title='Osiguranje je isteklo!'><td>"+oZivot.starost+"</td>"+
			"<td>"+oZivot.nikotin+"</td>"+
			"<td>"+oZivot.aktivnost+"</td> "+
			"<td>"+oZivot.teske_bolest+"</td> "+
			"<td>"+oZivot.period+"</td> "+
			"<td>"+oZivot.iznos+" kn</td> "+
			"<td>Neaktivno</td> "+
			"</tr>"); 
		    ProduljiOsig.append("<button class='btn btn-primary mb-1' style='display: inline-flex;'' href='#'' data-toggle='modal' data-target='#produlji-zivot'>Produlji osiguranje</button>")		
					
				};			
    });
}
};

function WriteKlijent(oib)
{

var tableKlijent = $("#GetKlijent");

var klijent;
oDbKlijent.on('value', function (oOdgovorPosluzitelja)
{
	tableKlijent.empty();
oOdgovorPosluzitelja.forEach(function (oKlijentSnapshot)
{
var sKlijentKey = oKlijentSnapshot.key; 
var oKlijent = oKlijentSnapshot.val(); 

if(oKlijent.oib == oib)
{
tableKlijent.append("<tr><th>"+oKlijent.ime+" "+oKlijent.prezime+"</th><th>"+oKlijent.oib +"</th></tr>");
};

})});


};

function FormatDate(trajanje,dns) // provjera perioda osiguranja i formatiranje u string
{
    var danas = new Date(dns);
    var month = parseInt(danas.getMonth())+1;
    var period = parseInt(trajanje);
    var datum = danas.getDate() + "." + parseInt(danas.getMonth()+1) + "."+ danas.getFullYear();
 
    if(parseInt(trajanje) == 3 && parseInt(danas.getMonth()+1) < 10) // provjera ako je potrebno zbrajati na novu godinu
    {
        datum +="/"+ danas.getDate() + "." + (parseInt(danas.getMonth()+1)+trajanje) + "."+ danas.getFullYear();
    }
    else if(parseInt(trajanje) == 3)
    {
        month += period - 12;
        datum +="/"+ danas.getDate() + "." + month + "."+ parseInt(danas.getFullYear()+1);
    }

    if(parseInt(trajanje) == 6 && parseInt(danas.getMonth()+1) < 7) // provjera ako je potrebno zbrajati na novu godinu
    {
        datum +="/"+ danas.getDate() + "." + (parseInt(danas.getMonth()+1)+trajanje) + "."+ danas.getFullYear();
    }
    else if(parseInt(trajanje) == 6)
    {
        month += period - 12;
        datum +="/"+ danas.getDate() + "." + month + "."+ parseInt(danas.getFullYear()+1);
    }

    if(parseInt(trajanje) == 12)
    {
        datum +="/"+ danas.getDate() + "." + parseInt(danas.getMonth()+1) + "."+ parseInt(danas.getFullYear()+1);
    }
    else if(parseInt(trajanje) >= 12)
    {
        datum +="/"+ danas.getDate() + "." + parseInt(danas.getMonth()+1) + "."+ parseInt(danas.getFullYear()+(parseInt(trajanje)/12));
    }

    return datum;
};


function dateCheck(from,to,check) 
{
    if(check <= to && check >= from)
    {
        return true;
    }
    return false;
};


function CheckDate(date)
{
	//provjera ako je datum isteka 12 mjesec, ako je onda se trebamo pomaknuti godinu unaprijed
	var datum = new Date();
	if(date.getMonth() == 11)
	{
		datum.setFullYear(parseInt(date.getFullYear()+1),0,parseInt(date.getDate()))
	}
	else
	{
		datum.setFullYear(parseInt(date.getFullYear()),parseInt(date.getMonth()+1),parseInt(date.getDate()))
	}
return datum;
}

function TwoWeekForward() 
{
	var date = new Date(Date.now());
	var povratak = new Date;
	var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0);
    povratak.setFullYear(parseInt(date.getFullYear()),parseInt(date.getMonth()),parseInt(date.getDate()+14));
	return povratak;
}


function ProduljiAutoOsig() //
{
	var tip ;
    var proizvodac;
    var model;
    var godina_proizvodnje;
    var snaga_motora;
    var koib;
    var oldperiod;
    var trajanje = $('#trajanjeOsigAuto').val();
    var oAutoRef = oDb.ref('Auto_osiguranje/' + Key);
       var iznos = 0;
    var snage = [33,44,55,66,84,110,150,200];

    oAutoRef.once("value",function(odgovor)
	{
                var osiguranje = odgovor.val();
                tip = osiguranje.tip;
                proizvodac = osiguranje.proizvodac;
                model = osiguranje.model;
                godina_proizvodnje = osiguranje.godina_proizvodnje;
                snaga_motora = osiguranje.snaga;
                koib = osiguranje.klijentOib;
                oldperiod = osiguranje.period;

                const result = oldperiod.split('/').pop();
                var temp = moment(result,"DD-MM-YYYY")
                var datumDo = CheckDate(new Date(temp)); 
                //console.log(datumDo);
                if(dateCheck(new Date(temp),datumDo,new Date(Date.now())))
                {
                	
                	var period =FormatDate(parseInt(trajanje),new Date(Date.now()));

                }
                else
                {

                	//Ako je proslo mjesec dana od isteka
                	var period=FormatDate(parseInt(trajanje),TwoWeekForward());
                }


			for(var i = 0; i<snage.length;i++)
			    {
			       if(parseInt(snaga_motora) <= snage[i])
			       {
			        iznos += 75*((i+1)*0.2);
			        break;
			       };
			    }

			    if(tip == "osobno vozilo")
			    {
			        iznos += 100;
			    }
			    else if (tip == "terensko vozilo")
			    {
			        iznos += 150;
			    }
			    else if(tip == "putnicko vozilo")
			    {
			        iznos += 250;
			    }

			    if(trajanje == 3)
			    {
			        iznos+= 100;
			    }
			    else if(trajanje == 6)
			    {
			        iznos += 250;
			    }
			    else if (trajanje == 12)
			    {
			        iznos += 370;
			    }



				var oAuto =
				{
				        cijena_osiguranja: iznos,
				        godina_proizvodnje: godina_proizvodnje,
				        klijentOib: koib,
				        proizvodac: proizvodac,
				        model: model,
				        period: period,
				        snaga: snaga_motora,
				        tip:tip
				};
				oAutoRef.update(oAuto);

   $('#produlji-auto').modal('hide');
	});

};

function ProduljiStambOsig() // 
{
	
    var trajanje = $('#trajanjeOsigStamb').val();
    var mjesto;
    var adresa;
    var vrstaObjekta;
    var povrsinaObjekta;
    var koib;
    var oldperiod
    var period = FormatDate(12*parseInt(trajanje))
    var iznos = 0;



    var oStambRef = oDb.ref('Stambeno_osiguranje/' + Key);
       
    

    oStambRef.once("value",function(odgovor)
	{	
                var osiguranje = odgovor.val();
                mjesto = osiguranje.mjesto;
                adresa = osiguranje.adresa;
                vrstaObjekta = osiguranje.vrsta_objekta;
                povrsinaObjekta = osiguranje.povrsina_objekta;
                koib = osiguranje.klijentOib;
                oldperiod = osiguranje.period;

                const result = oldperiod.split('/').pop();
                var temp = moment(result,"DD-MM-YYYY")
                var datumDo = CheckDate(new Date(temp)); 
                //console.log(datumDo);
                if(dateCheck(new Date(temp),datumDo,new Date(Date.now())))
                {
                	
                	var period =FormatDate(parseInt(trajanje*12),new Date(Date.now()));

                }
                else
                {

                	//Ako je proslo mjesec dana od isteka
                	var period=FormatDate(parseInt(trajanje*12),TwoWeekForward());
                }


				if(vrstaObjekta == "stan")
			    {
			        iznos += (150 * parseInt(trajanje)) + 75 + (parseInt(povrsinaObjekta)*1.2);
			    }
			    else if(vrstaObjekta == "kuca")
			    {
			        iznos += (150 * parseInt(trajanje)) + 100 + (parseInt(povrsinaObjekta)*1.2);
			    }
			    else if(vrstaObjekta == "apartman za iznajmljivanje")
			    {
			        iznos += (150 * parseInt(trajanje)) + 50 + (parseInt(povrsinaObjekta)*1.2);
			    }




				var oStamb =
				{
					klijentOib: koib,
			        mjesto:mjesto,
			        adresa:adresa,
			        vrsta_objekta:vrstaObjekta,
			        povrsina_objekta:povrsinaObjekta,
			        trajanje_osiguranja:trajanje,
			        iznos: iznos,
			        period: period
				        
				};
				oStambRef.update(oStamb);

    $('#produlji-stamb').modal('hide');
	});

};


function ProduljiZivotOsig() 
{
	var count = 0;
	//console.log(sessionStorage.getItem('SendOib'));
	 oDbZivotOsig.once('value', function(oOdgovorPosluzitelja)
    {
        oOdgovorPosluzitelja.forEach(function (odgovor) 
        {
            var zivot = odgovor.val();
            if(zivot.klijentOib == sessionStorage.getItem('SendOib'))
            {
            	var str = zivot.period;
            	var result = str.split('/').pop();
            
            	var date = moment(result,"DD-MM-YYYY");
            	//console.log(new Date(date) +" "+ new Date(Date.now()));
                if(new Date(date) >  new Date(Date.now()))
				{
					//console.log(true);
					count++;
				}                
            }
              
        });

//--------------------------------------------------------------------------------------
if(count == 0)
	{
   	   var trajanje = $('#trajanjeOsigZivot').val();
	   var period;
	   var starost;
	   var nikotin;
	   var aktivnost; 
	   var tbolest;
	   var spol;
	   var koib

    var oZivotRef = oDb.ref('Zivotno_osiguranje/' + Key);
    var oKlijentRef = oDb.ref('klijent/' + Key);   
    

    oZivotRef.once("value",function(odgovor)
	{	

                var osiguranje = odgovor.val();
                aktivnost = osiguranje.aktivnost;
                nikotin = osiguranje.nikotin;
                starost = osiguranje.starost;
                tbolest = osiguranje.teske_bolest;
                koib = osiguranje.klijentOib;
                oldperiod = osiguranje.period;

				oDbKlijent.on('value', function (oOdgovorPosluzitelja)
				{
				oOdgovorPosluzitelja.forEach(function (oKlijentSnapshot)
				{
				var sKlijentKey = oKlijentSnapshot.key; 
				var oKlijent = oKlijentSnapshot.val(); 
				if(oKlijent.oib == koib)
				{
					spol = oKlijent.spol;
				};

			});});

                const result = oldperiod.split('/').pop();
                var temp = moment(result,"DD-MM-YYYY")
                var datumDo = CheckDate(new Date(temp)); 
                //console.log(datumDo);
                if(dateCheck(new Date(temp),datumDo,new Date(Date.now())))
                {
                	
                	var period =FormatDate(parseInt(trajanje*12),new Date(Date.now()));

                }
                else
                {

                	//Ako je proslo mjesec dana od isteka
                	var period=FormatDate(parseInt(trajanje*12),TwoWeekForward());
                }


	var iznos = parseInt(trajanje)*20;

   if(parseInt(starost) >= 18 && parseInt(starost) <= 30)
   {
    iznos += 100;
   }
   else if(parseInt(starost) >= 31 && parseInt(starost) <= 45)
   {
    iznos += 135;
   }
   else
   {
    iznos += 165;
   }


   if(spol == "Muško")
   {
    iznos+=250;
   }
   else if(spol == "Žensko")
   {
    iznos += 150;
   }

     if(nikotin == "da")
       {
        iznos += 75;
       }
       else
       {
        iznos += 45;
       }
    if(aktivnost =="da")
    {
        iznos += 80;
    }   
    else
    {
        iznos += 40;
    }
     if(tbolest =="da")
    {
        iznos += 70;
    }   
    else
    {
        iznos += 35;
    }

				var oZivot =
				{
					klijentOib: koib,
			        trajanje_osiguranja:trajanje,
			        iznos: iznos,
			        period: period,
			        starost:starost,
			        nikotin:nikotin,
			        aktivnost:aktivnost,
			        teske_bolest:tbolest
				      
				};
				oZivotRef.update(oZivot);
				 $('#produlji-zivot').modal('hide');
	});

}
else
{
	alert("Osoba već ima aktivno životno osiguranje!");
}
});

	  
	

};
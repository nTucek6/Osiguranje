function GetOib()
{
var Key = sessionStorage.getItem('SendKey');
var oKlijentRef = oDb.ref('klijent/' + Key);  
oKlijentRef.on('value', function(oOdgovorPosluzitelja)
{
var oKlijent = oOdgovorPosluzitelja.val();

sessionStorage.setItem("SendOib",oKlijent.oib);
});
}





var GsOsigKey;

function SendOsigKey(KeyOsig,Osiguranje) //postavlja se ključ u globalnu varijablu i salje po sesiji
{
//sessionStorage.clear() 
GsOsigKey = KeyOsig
sessionStorage.setItem("SendOsigKey",KeyOsig);
sessionStorage.setItem("SendOsigName",Osiguranje);
};

function SendKey(key)
{
    sessionStorage.setItem("SendKey",key);
}


/*function OsiguranjeIspis() //Poziva se u index.html
{
    var tableData = $("#tableDataIndex");
    var c = 1;

oDbAutoOsig.on('value', function (oOdgovorPosluziteljaAuto)
{
   
oOdgovorPosluziteljaAuto.forEach(function (oAutoSnapshot)
{
 var sAutoKey = oAutoSnapshot.key; // ključ pojedine vijesti
 var oAuto = oAutoSnapshot.val();

    oDbKlijent.on('value', function (oOdgovorPosluzitelja)
{
   
oOdgovorPosluzitelja.forEach(function (oKlijentSnapshot)
{
 var sKlijentKey = oKlijentSnapshot.key; // ključ pojedine vijesti
 var oKlijent = oKlijentSnapshot.val();

 if(oKlijent.oib == oAuto.klijentOib)
 {
    var tip = "Auto";
    tableData.append("<tr><th>"+(c++)+"</th><td>Auto osiguranje</td><td>"+oKlijent.ime+"</td><td>"+oKlijent.prezime+"</td><td>"+oAuto.cijena_osiguranja+" kn</td> <td><a onclick='SendOsigKey(\""+sAutoKey+"\",\""+tip+"\")' href='OsigInfo.html'><i class='fas fa-info'></i></a></td></tr>")
 }

})}); 
})}); 


oDbStambOsig.on('value', function (oOdgovorPosluziteljaStamb)
{
   
oOdgovorPosluziteljaStamb.forEach(function (oStambSnapshot)
{
 var sStambKey = oStambSnapshot.key; // ključ pojedine vijesti
 var oStamb = oStambSnapshot.val();

    oDbKlijent.on('value', function (oOdgovorPosluzitelja)
{
   
oOdgovorPosluzitelja.forEach(function (oKlijentSnapshot)
{
 var sKlijentKey = oKlijentSnapshot.key; // ključ pojedine vijesti
 var oKlijent = oKlijentSnapshot.val();

 if(oKlijent.oib == oStamb.klijentOib)
 {
    var tip = "Stamb";
    tableData.append("<tr><th>"+(c++)+"</th><td>Stambeno osiguranje</td><td>"+oKlijent.ime+"</td><td>"+oKlijent.prezime+"</td><td>"+oStamb.iznos+" kn</td> <td><a onclick='SendOsigKey(\""+sStambKey+"\",\""+tip+"\")' href='OsigInfo.html'><i class='fas fa-info'></i></a></td></tr>")
 };

})}); 
})}); 



oDbZivotOsig.on('value', function (oOdgovorPosluziteljaZivot)
{
   
oOdgovorPosluziteljaZivot.forEach(function (oZivotSnapshot)
{
 var sZivotKey = oZivotSnapshot.key; // ključ pojedine vijesti
 var oZivot = oZivotSnapshot.val();

    oDbKlijent.on('value', function (oOdgovorPosluzitelja)
{
   
oOdgovorPosluzitelja.forEach(function (oKlijentSnapshot)
{
 var sKlijentKey = oKlijentSnapshot.key; // ključ pojedine vijesti
 var oKlijent = oKlijentSnapshot.val();

 if(oKlijent.oib == oZivot.klijentOib)
 {
    var tip = "Zivot";
    tableData.append("<tr><th>"+(c++)+"</th><td>Zivotno osiguranje</td><td>"+oKlijent.ime+"</td><td>"+oKlijent.prezime+"</td><td>"+oZivot.iznos+" kn</td> <td><a onclick='SendOsigKey(\""+sZivotKey+"\",\""+tip+"\")' href='OsigInfo.html'><i class='fas fa-info'></i></a></td></tr>")
 };

})}); 
})}); 




}; */



function AutoOsigKorisnici()
{
    
    var tableHead = $("#tableHeadData");
    var tableBody = $("#tableBodyData");
    var listaT = [];
    var temp;
    var c = 1;
    tableHead.append("<tr class='autoOsig'><th scope='col'>#</th><th scope='col'>Ime</th><th scope='col'>Prezime</th><th scope='col'>Info</th></tr>");
    oDbKlijent.once('value',function (odgovorSnapshot) {
       
       odgovorSnapshot.forEach(function(odgovor)
       {
        var korisnik = odgovor.val();
        var korisnikKey = odgovor.key;
       //  console.log(korisnik.ime);
       oDbAutoOsig.once('value',function (odgovorAutoSnapshot) {
        listaT = [];
       odgovorAutoSnapshot.forEach(function(odgovorAuto)
       {
        var auto = odgovorAuto.val();
        if(korisnik.oib == auto.klijentOib)
        {
          temp = ("<tr class='autoOsig'> <td>"+(c++)+"</td>"+
          "<td>"+korisnik.ime+"</td>"+
          "<td>"+korisnik.prezime+"</td>"+
          "<td><a onclick='SendKey(\""+korisnikKey+"\")' href='KlijentInfo.html'><i class='fas fa-info'></i></a></td>"+
          "</tr>"); 
       listaT.push(temp);
        }
        });
      if(listaT.length > 1)
      {
        c = c- (listaT.length-1);
      }
     tableBody.append(listaT[0]);

       //ovdjee

    }); 
       });
    });

   /* tableBody.append("<tr class='autoOsig'> <td>"+(c++)+"</td>"+
        "<td>"+korisnik.ime+"</td>"+
        "<td>"+korisnik.prezime+"</td>"+
        "<td><a onclick='SendKey(\""+korisnikKey+"\")' href='KlijentInfo.html'><i class='fas fa-info'></i></a></td>"+
       "</tr>"); */

} 

function ZivotOsigKorisnici()
{
 var tableHead = $("#tableHeadData");
 var tableBody = $("#tableBodyData");
 var c = 1;
 var listaT = [];
 var temp;
   tableHead.append("<tr class='zivotOsig'><th scope='col'>#</th><th scope='col'>Ime</th><th scope='col'>Prezime</th><th scope='col'>Info</th></tr>");
    
    oDbKlijent.once('value',function (odgovorSnapshot) {
        
       odgovorSnapshot.forEach(function(odgovor)
       {
        var korisnik = odgovor.val();
        var korisnikKey = odgovor.key;
       oDbZivotOsig.once('value',function (odgovorZivotSnapshot) {
        listaT = [];
       odgovorZivotSnapshot.forEach(function(odgovorZivot)
       {
        var zivot = odgovorZivot.val();
        if(korisnik.oib == zivot.klijentOib)
        {
             temp = ("<tr class='zivotOsig'> <td>"+(c++)+"</td>"+
        "<td>"+korisnik.ime+"</td>"+
        "<td>"+korisnik.prezime+"</td>"+
        "<td><a onclick='SendKey(\""+korisnikKey+"\")' href='KlijentInfo.html'><i class='fas fa-info'></i></a></td>"+
       "</tr>");
            listaT.push(temp)
        }
       });
         if(listaT.length > 1)
      {
        c = c- (listaT.length-1);
      }
      
       tableBody.append(listaT[0]);

    });
       }); 
      
    });
   

}

function StambOsigKorisnici()
{
    var tableHead = $("#tableHeadData");
    var tableBody = $("#tableBodyData");
    var c = 1;
    var temp;
    var listaT = [];
    tableHead.append("<tr class='stambOsig'><th scope='col'>#</th><th scope='col'>Ime</th><th scope='col'>Prezime</th><th scope='col'>Info</th></tr>");
    
    oDbKlijent.once('value',function (odgovorSnapshot) {
       
       odgovorSnapshot.forEach(function(odgovor)
       {
         
        var korisnik = odgovor.val();
        var korisnikKey = odgovor.key;
       oDbStambOsig.once('value',function (odgovorStambSnapshot) {
        listaT = [];
       odgovorStambSnapshot.forEach(function(odgovorStamb)
       {
        var stamb = odgovorStamb.val();
        if(korisnik.oib == stamb.klijentOib)
        {
            temp = ("<tr class='stambOsig'> <td>"+(c++)+"</td>"+
        "<td>"+korisnik.ime+"</td>"+
        "<td>"+korisnik.prezime+"</td>"+
        "<td><a onclick='SendKey(\""+korisnikKey+"\")' href='KlijentInfo.html'><i class='fas fa-info'></i></a></td>"+
       "</tr>");
           listaT.push(temp);
        }
       });
      
        if(listaT.length > 1)
      {
        c = c- (listaT.length-1);
      }
         tableBody.append(listaT[0]);
       
    });
     
       }); 
      
    });

     
}



 function ShowAuto()
    {
        document.getElementById("btnAuto").style.background = "DarkGreen";
        document.getElementById("btnStamb").style.background = "CadetBlue";
        document.getElementById("btnZivot").style.background = "CadetBlue";
        $("#tableHeadData").empty();
        $("#tableBodyData").empty();
        
        AutoOsigKorisnici();
       /*var a = $(".autoOsig");
       var z = $(".zivotOsig");
       var s = $(".stambOsig");
       a.show();
       z.hide();
       s.hide(); */
    }

function ShowZivot()
{
     document.getElementById("btnAuto").style.background = "CadetBlue";
     document.getElementById("btnStamb").style.background = "CadetBlue";
     document.getElementById("btnZivot").style.background = "DarkGreen";

     $("#tableHeadData").empty();
     $("#tableBodyData").empty();
     ZivotOsigKorisnici();

    /* var a = $(".autoOsig");
     var z = $(".zivotOsig");
     var s = $(".stambOsig");
     a.hide();
     s.hide();
     z.show(); */
}
function ShowStamb()
{
      document.getElementById("btnAuto").style.background = "CadetBlue";
     document.getElementById("btnStamb").style.background = "DarkGreen";
     document.getElementById("btnZivot").style.background = "CadetBlue";
       
     $("#tableHeadData").empty();
     $("#tableBodyData").empty();
     StambOsigKorisnici();
}



function dateCheck(from,to,check) 
{

    if(check <= to && check >= from)
    {
        return true;
    }
    return false;
};


     // if(!(vrijeme.getDate() == new Date(date).getDate() && vrijeme.getMonth() == new Date(date).getMonth()-1))  



function OsiguranjaInfo()  //Poziva se u klijentInfo / Ispis osiguranja
{
  var osiguranje = $("#OsigInfo");

  var Key = sessionStorage.getItem('SendKey');
  var oKlijentRef = oDb.ref('klijent/' + Key);  
	
	oKlijentRef.once('value', function(OdgovorKlijent)
	{
       
		var oKlijent = OdgovorKlijent.val();

		oDbAutoOsig.on('value', function (OdgovorAuto){
            $(".AutoOsig").empty();
            var tip = "Auto";
		OdgovorAuto.forEach(function (oAutoOsigSnapshot){
			var sAutoKey = oAutoOsigSnapshot.key;
			var oAuto = oAutoOsigSnapshot.val();

			if(oKlijent.oib == oAuto.klijentOib)
			{
				const str = oAuto.period
				const result = str.split('/').pop(); // rezultat perioda do kada traje
                const result2 = moment(str.split('/')[0],"DD-MM-YYYY");
				var date = moment(result,"DD-MM-YYYY"); //formatiranje datuma
				if(new Date(date) > Date.now()&& new Date(result2) < Date.now())  //ako je datum perioda veci od danasnjeg datuma onda je polica aktivna
				{
                   
                   var datumOd = new Date(date);//new Date(new Date(date).getDate(),new Date(date).getMonth()-1,new Date(date).getFullYear());
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

                  // datumOd = datumOd.setMonth(datumDo.getMonth()-1);
                   if(!(dateCheck(datumOd,datumDo,Date.now())))
                    {
                        //ProvjeraIsteka(date) 
                        osiguranje.append("<tr class='AutoOsig'><td>Auto osiguranje</td><td>"+oAuto.cijena_osiguranja+" kn</td><td>"+oAuto.period+"</td><td>Aktivno</td><td><a onclick='SendOsigKey(\""+sAutoKey+"\",\""+tip+"\")' href='OsigInfo.html'><i class='fas fa-info'></i></a></td></tr>");
                    }
                    else
                    {
                        osiguranje.append("<tr class='table-warning AutoOsig' data-bs-toggle='tooltip' data-bs-placement='top' title='Osiguranje će uskoro isteći!'><td>Auto osiguranje</td><td>"+oAuto.cijena_osiguranja+" kn</td><td>"+oAuto.period+"</td><td>Osiguranje će uskoro isteći!</td><td><a onclick='SendOsigKey(\""+sAutoKey+"\",\""+tip+"\")' href='OsigInfo.html'><i class='fas fa-info'></i></a></td></tr>");
                    }
                   
					//osiguranje.append("<tr class='AutoOsig'><td>Auto osiguranje</td><td>"+oAuto.cijena_osiguranja+" kn</td><td>"+oAuto.period+"</td><td>Aktivno</td><td><a onclick='SendOsigKey(\""+sAutoKey+"\",\""+tip+"\")' href='OsigInfo.html'><i class='fas fa-info'></i></a></td></tr>");
				}
                else if(new Date(result2) > Date.now())
                {
                osiguranje.append("<tr class='table-info AutoOsig' data-bs-toggle='tooltip' data-bs-placement='top' title='Osiguranje se još nije aktiviralo'><td>Auto osiguranje</td><td>"+oAuto.cijena_osiguranja+" kn</td><td>"+oAuto.period+"</td><td >Ponovno aktivno od: "+str.split('/')[0]+"</td><td><a onclick='SendOsigKey(\""+sAutoKey+"\",\""+tip+"\")' href='OsigInfo.html'><i class='fas fa-info'></i></a></td></tr>");

                }
				else
				{
					osiguranje.append("<tr class='table-danger AutoOsig' data-bs-toggle='tooltip' data-bs-placement='top' title='Osiguranje je isteklo!'><td>Auto osiguranje</td><td>"+oAuto.cijena_osiguranja+" kn</td><td>"+oAuto.period+"</td><td>Neaktivno</td><td><a onclick='SendOsigKey(\""+sAutoKey+"\",\""+tip+"\")' href='OsigInfo.html'><i class='fas fa-info'></i></a></td></tr>");
				}	
			};

		});
		});

        oDbStambOsig.on('value', function(OdgovorStamb) {
            $(".StambOsig").empty();
            var tip = "Stamb";
            OdgovorStamb.forEach(function(oStambOsigSnapshot)
            {
                var sStambKey = oStambOsigSnapshot.key;
                var oStamb = oStambOsigSnapshot.val()
                if(oKlijent.oib == oStamb.klijentOib)
                {
                    const str = oStamb.period
                    const result = str.split('/').pop();
                    const result1 = str.split('/')[0];  // rezultat perioda od kada traje
                    const result2 = moment(str.split('/')[0],"DD-MM-YYYY");
                   // alert(result1);
                    var date = moment(result,"DD-MM-YYYY");
                    var datumKreiranja = moment(result1,"DD-MM-YYYY");  //formatiranje datuma
                    if(new Date(date) > Date.now()&& new Date(result2) < Date.now())  //ako je datum perioda veci od danasnjeg datuma onda je polica aktivna
                    {
                            var datumOd = new Date(date);//new Date(new Date(date).getDate(),new Date(date).getMonth()-1,new Date(date).getFullYear());
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
                                                        
                         if(!(dateCheck(datumOd,datumDo,Date.now())))
                         {
                            osiguranje.append("<tr class='StambOsig'><td>Stambeno osiguranje</td><td>"+oStamb.iznos+" kn</td><td>"+oStamb.period+"</td><td>Aktivno</td><td><a onclick='SendOsigKey(\""+sStambKey+"\",\""+tip+"\")' href='OsigInfo.html'><i class='fas fa-info'></i></a></td></tr>");
                         }
                         else
                         {
                            osiguranje.append("<tr class='table-warning StambOsig'><td>Stambeno osiguranje</td><td>"+oStamb.iznos+" kn</td><td>"+oStamb.period+"</td><td>Osiguranje će uskoro isteći!</td><td><a onclick='SendOsigKey(\""+sStambKey+"\",\""+tip+"\")' href='OsigInfo.html'><i class='fas fa-info'></i></a></td></tr>");
                         }

                        
                    }
                    else if(new Date(result2) > Date.now())
                     {
                    osiguranje.append("<tr class='table-info StambOsig' data-bs-toggle='tooltip' data-bs-placement='top' title='Osiguranje se još nije aktiviralo'><td>Stambeno osiguranje</td><td>"+oStamb.iznos+" kn</td><td>"+oStamb.period+"</td><td>Ponovno aktivno od: "+str.split('/')[0]+"</td><td><a onclick='SendOsigKey(\""+sStambKey+"\",\""+tip+"\")' href='OsigInfo.html'><i class='fas fa-info'></i></a></td></tr>");
                     }
                    else
                    {
                        osiguranje.append("<tr class='table-danger StambOsig' data-bs-toggle='tooltip' data-bs-placement='top' title='Osiguranje je isteklo!'><td>Stambeno osiguranje</td><td>"+oStamb.iznos+" kn</td><td>"+oStamb.period+"</td><td>Neaktivno</td><td><a onclick='SendOsigKey(\""+sStambKey+"\",\""+tip+"\")' href='OsigInfo.html'><i class='fas fa-info'></i></a></td></tr>");
                    }	
                };

            })
        });


            oDbZivotOsig.on('value', function(OdgovorZivot) {
            $(".ZivotOsig").empty();
            var tip = "Zivot";
            OdgovorZivot.forEach(function(oZivotOsigSnapshot)
            {
                var sZivotKey = oZivotOsigSnapshot.key;
                var oZivot = oZivotOsigSnapshot.val()
                if(oKlijent.oib == oZivot.klijentOib)
                {
                    const str = oZivot.period
                    const result = str.split('/').pop();
                    const result1 = str.split('/')[0];  // rezultat perioda od kada traje
                    const result2 = moment(str.split('/')[0],"DD-MM-YYYY");
                   // alert(result1);
                    var date = moment(result,"DD-MM-YYYY");
                    var datumKreiranja = moment(result1,"DD-MM-YYYY");  //formatiranje datuma
                    if(new Date(date) > Date.now()&& new Date(result2) < Date.now())  //ako je datum perioda veci od danasnjeg datuma onda je polica aktivna
                    {
                            var datumOd = new Date(date);//new Date(new Date(date).getDate(),new Date(date).getMonth()-1,new Date(date).getFullYear());
                            var datumDo = new Date(date);
                            
                                if(datumDo.getMonth() == 0)
                                { 
                                datumOd.setFullYear(parseInt(datumOd.getFullYear()-1),11,parseInt(datumOd.getDate()));
                                }  
                            
                                else
                                {
                                 datumOd = datumOd.setMonth(datumDo.getMonth()-1);
                                }   
                                                        
                         if(!(dateCheck(datumOd,datumDo,Date.now())))
                         {
                            osiguranje.append("<tr class='ZivotOsig'><td>Zivotno osiguranje</td><td>"+oZivot.iznos+" kn</td><td>"+oZivot.period+"</td><td>Aktivno</td><td><a onclick='SendOsigKey(\""+sZivotKey+"\",\""+tip+"\")' href='OsigInfo.html'><i class='fas fa-info'></i></a></td></tr>");
                         }
                         else
                         {
                            osiguranje.append("<tr class='table-warning ZivotOsig'><td>Zivotno osiguranje</td><td>"+oZivot.iznos+" kn</td><td>"+oZivot.period+"</td><td>Osiguranje će uskoro isteći!</td><td><a onclick='SendOsigKey(\""+sZivotKey+"\",\""+tip+"\")' href='OsigInfo.html'><i class='fas fa-info'></i></a></td></tr>");
                         }

                        
                    }
                    else if(new Date(result2) > Date.now())
                    {
                         osiguranje.append("<tr class ='table-info ZivotOsig'><td>Zivotno osiguranje</td><td>"+oZivot.iznos+" kn</td><td>"+oZivot.period+"</td><td>Ponovno aktivno od: "+str.split('/')[0]+"</td><td><a onclick='SendOsigKey(\""+sZivotKey+"\",\""+tip+"\")' href='OsigInfo.html'><i class='fas fa-info'></i></a></td></tr>");
                    }
                    else
                    {
                        osiguranje.append("<tr class ='table-danger ZivotOsig' data-bs-toggle='tooltip' data-bs-placement='top' title='Osiguranje je isteklo!'><td>Zivotno osiguranje</td><td>"+oZivot.iznos+" kn</td><td>"+oZivot.period+"</td><td>Neaktivno</td><td><a onclick='SendOsigKey(\""+sZivotKey+"\",\""+tip+"\")' href='OsigInfo.html'><i class='fas fa-info'></i></a></td></tr>");
                    }   
                };

            })
        });
        

	});
};

function FormatDate(trajanje) // provjera perioda osiguranja i formatiranje u string
{
    var danas = new Date();
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
function DodajAutoOsiguranje()
{
    GetOib();
    console.log(sessionStorage.getItem('SendOib'));
    var trajanje = parseInt($("#period").val());
    var tip = $("#tipVozila").val();
    var proizvodac =$("#inptProizvodac").val();
    var model = $("#inptModel").val();
    var godina_proizvodnje = $("#inptGodProiz").val();
    var snaga_motora = $("#inptSnaga").val();
    //var oib;
    var datum = FormatDate(trajanje);
    var iznos = 0;

    var snage = [33,44,55,66,84,110,150,200];


   // oib = sessionStorage.getItem('SendOib');

   
  if(tip != "null" && proizvodac != "" && model != "" && godina_proizvodnje != ""&& snaga_motora != "" && trajanje != "null")
  {
    if(snaga_motora > 32 && snaga_motora < 201)
    {
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
            iznos += 400;
        }
         var sKey = firebase.database().ref().child('Auto_osiguranje').push().key;
    var oAuto =
    {
        cijena_osiguranja: iznos,
        godina_proizvodnje: godina_proizvodnje,
        klijentOib: sessionStorage.getItem('SendOib'),
        proizvodac: proizvodac,
        model: model,
        period: datum,
        snaga: snaga_motora + " kw",
        tip:tip
   
    };
    // Zapiši u Firebase
    var oZapis = {};
    oZapis[sKey] = oAuto;
    oDbAutoOsig.update(oZapis);
    $('#AutoOsig').modal('hide'); 
  }
  else{
    alert("Snaga motora mora biti između 33 - 200kw!");
  }

    }
    else{alert("Morate ispuniti cijelu formu!");}
   
    
};
function DodajStambenoOsiguranje()
{
    GetOib();
    var mjesto = $("#inptMjestoOsig").val();
    var adresa = $("#inptAdresaOsig").val();
    var vrstaObjekta = $("#vrstaObjekta").val();
    var povrsinaObjekta = $("#inptPovrsinaOsig").val();
    var trajajnjeOsig = $("#trajanjeOsig").val();
    var period = FormatDate(12*parseInt(trajajnjeOsig))
    var iznos = 0;

   const digits_only = string => [...string].every(c => '0123456789'.includes(c));
   if(mjesto != "" && adresa != "" && vrstaObjekta != "null" && povrsinaObjekta != "" && trajajnjeOsig != "null") //provjera da su polja popunjena
    {
        if(digits_only(povrsinaObjekta)) //provjera ako je broj
        {
              if(vrstaObjekta == "stan")
    {
        iznos += (150 * parseInt(trajajnjeOsig)) + 75 + (parseInt(povrsinaObjekta)*1.2);
    }
    else if(vrstaObjekta == "kuca")
    {
        iznos += (150 * parseInt(trajajnjeOsig)) + 100 + (parseInt(povrsinaObjekta)*1.2);
    }
    else if(vrstaObjekta == "apartman za iznajmljivanje")
    {
        iznos += (150 * parseInt(trajajnjeOsig)) + 50 + (parseInt(povrsinaObjekta)*1.2);
    }


    var sKey = firebase.database().ref().child('Stambeno_osiguranje').push().key;
    var oStamb =
    {
        klijentOib: sessionStorage.getItem('SendOib'),
        mjesto:mjesto,
        adresa:adresa,
        vrsta_objekta:vrstaObjekta,
        povrsina_objekta:povrsinaObjekta,
        trajanje_osiguranja:trajajnjeOsig,
        iznos: iznos,
        period: period
    };
    // Zapiši u Firebase
    var oZapis = {};
    oZapis[sKey] = oStamb;
    oDbStambOsig.update(oZapis);
    $('#StambOsig').modal('hide'); 
        }
        else
        {
            alert("Unesite broj za površinu!");
        }
    }
    else
    {
       alert("Morate ispuniti cijelu formu!");
    }
};

function getRadioButtonValue(name)
{
var povratnaVrijednost;
var result = document.getElementsByName(name);
              
for(i = 0; i < result.length; i++) {
if(result[i].checked)
{
povratnaVrijednost = result[i].value;
}
};
return povratnaVrijednost;
};


function DodajZivotOsiguranje() 
{
     GetOib();
   //var klijentO = sessionStorage.getItem('SendOib');
   var str; //= 
   var istek; //= str.split('/').pop(); 

   var c = 0;
    oDbZivotOsig.once('value', function(oOdgovorPosluzitelja)
    {
        oOdgovorPosluzitelja.forEach(function (odgovor) 
        {
            var zivot = odgovor.val();
            if(zivot.klijentOib == sessionStorage.getItem('SendOib'))
            {
                str = zivot.period;
                istek = str.split('/').pop();
                var date = moment(istek,"DD-MM-YYYY"); 
                //c++;
                if(new Date(date) > new Date(Date.now()))
                {
                    c++;
                }   
            }
                 
        });

//--------------------------------------------------------------------------------------
   
if(c == 0)
{
   var Key = sessionStorage.getItem('SendKey');
   var trajanjeOsig = $("#trajanjeOsigZivot").val();
   var period = FormatDate(12*parseInt(trajanjeOsig));
   var starost = $("#inptforStarost").val();
   var nikotin = getRadioButtonValue("nikotin");
   var aktivnost = getRadioButtonValue("aktivnost");
   var tbolest = getRadioButtonValue("tbolest");
   var spol;

   const digits_only = string => [...string].every(c => '0123456789'.includes(c));
   if(trajanjeOsig != "null" && starost != "" && nikotin != undefined && aktivnost != undefined && tbolest != undefined)
   {
    if(digits_only(starost))
    {

        var oKlijentRef = oDb.ref('klijent/' + Key);  
   oKlijentRef.once('value', function(oOdgovorPosluzitelja)
   {
   var oKlijent = oOdgovorPosluzitelja.val();
   spol = oKlijent.spol;
    });

   var iznos = parseInt(trajanjeOsig)*40;

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

    /*console.log(period);
    console.log(starost);
    console.log(nikotin);
    console.log(aktivnost);
    console.log(tbolest);
    console.log(iznos); */

    var sKey = firebase.database().ref().child('Zivotno_osiguranje').push().key;
    var oZivot =
    {
        klijentOib: sessionStorage.getItem('SendOib'),
        trajanje_osiguranja:trajanjeOsig,
        iznos: iznos,
        period: period,
        starost:starost,
        nikotin:nikotin,
        aktivnost:aktivnost,
        teske_bolest:tbolest
    };
    // Zapiši u Firebase
    var oZapis = {};
    oZapis[sKey] = oZivot;
    oDbZivotOsig.update(oZapis); 
$('#ZivotOsig').modal('hide'); 
    }
    else
    {
        alert("Morate upisati broj!");
    }
   }
   else
   {
    alert("Morate ispuniti cijelu formu!");
   }
}
else
{
    alert("Osoba može imati samo jedno aktivno životno osiguranje!");
    $('#ZivotOsig').modal('hide'); 
}


        });

 

};


function ActiveOsig()
{
  var osiguranje = $("#OsigInfo");

  var Key = sessionStorage.getItem('SendKey');
  var oKlijentRef = oDb.ref('klijent/' + Key);  
    
    oKlijentRef.once('value', function(OdgovorKlijent)
    {
        var oKlijent = OdgovorKlijent.val();
        oDbAutoOsig.once('value',function(OdgovorAuto)
        {
            OdgovorAuto.forEach(function(value)
            {
                var auto = value.val();
                var sAutoKey = value.key;
                var tip = "Auto";
                if(auto.klijentOib == oKlijent.oib)
                {
                const str = auto.period
                const result = str.split('/').pop(); // rezultat perioda do kada traje
                const result2 = str.split('/')[0];//Prvi dio datuma
                var date = moment(result,"DD-MM-YYYY"); //formatiranje datuma
                var date2 = moment(result2,"DD-MM-YYYY"); 
                if(new Date(date) > new Date(Date.now()) && new Date(date2) < new Date(Date.now()))
                {
                    osiguranje.append("<tr class='AutoOsig'><td>Auto osiguranje</td><td>"+auto.cijena_osiguranja+" kn</td><td>"+auto.period+"</td><td>Aktivno</td><td><a onclick='SendOsigKey(\""+sAutoKey+"\",\""+tip+"\")' href='OsigInfo.html'><i class='fas fa-info'></i></a></td></tr>");
                }
                }

            })
        });
        // -----------------------------------------------------
  oDbZivotOsig.once('value',function(OdgovorZivot)
        {
            OdgovorZivot.forEach(function(value)
            {
                var zivot = value.val();
                var sZivotKey = value.key;
                var tip = "Zivot";
                if(zivot.klijentOib == oKlijent.oib)
                {
                const str = zivot.period
                const result = str.split('/').pop();
                const result2 = str.split('/')[0];//Prvi dio datuma
                var date = moment(result,"DD-MM-YYYY"); //formatiranje datuma
                var date2 = moment(result2,"DD-MM-YYYY"); 
                if(new Date(date) > new Date(Date.now()) && new Date(date2) < new Date(Date.now()))
                {
                    osiguranje.append("<tr class='ZivotOsig'><td>Zivotno osiguranje</td><td>"+zivot.cijena_osiguranja+" kn</td><td>"+zivot.period+"</td><td>Aktivno</td><td><a onclick='SendOsigKey(\""+sZivotKey+"\",\""+tip+"\")' href='OsigInfo.html'><i class='fas fa-info'></i></a></td></tr>");
                }
                }

            })
        });
//------------------------------------------------------------
oDbStambOsig.once('value',function(OdgovorStamb)
        {
            OdgovorStamb.forEach(function(value)
            {
                var stamb = value.val();
                var sStambKey = value.key;
                var tip = "Stamb";
                if(stamb.klijentOib == oKlijent.oib)
                {
                const str = stamb.period
                const result = str.split('/').pop();
                const result2 = str.split('/')[0];//Prvi dio datuma
                var date = moment(result,"DD-MM-YYYY"); //formatiranje datuma
                var date2 = moment(result2,"DD-MM-YYYY"); 
                if(new Date(date) > new Date(Date.now()) && new Date(date2) < new Date(Date.now()))
                {
                    osiguranje.append("<tr class='ZivotOsig'><td>Stambeno osiguranje</td><td>"+zivot.cijena_osiguranja+" kn</td><td>"+zivot.period+"</td><td>Aktivno</td><td><a onclick='SendOsigKey(\""+sStambKey+"\",\""+tip+"\")' href='OsigInfo.html'><i class='fas fa-info'></i></a></td></tr>");
                }
                }

            })
        });


    });

}
function UntilActive()
{
var osiguranje = $("#OsigInfo");

  var Key = sessionStorage.getItem('SendKey');
  var oKlijentRef = oDb.ref('klijent/' + Key);  
    
    oKlijentRef.once('value', function(OdgovorKlijent)
    {
        var oKlijent = OdgovorKlijent.val();
        oDbAutoOsig.once('value',function(OdgovorAuto)
        {
            OdgovorAuto.forEach(function(value)
            {
                var auto = value.val();
                var sAutoKey = value.key;
                var tip = "Auto";
                if(auto.klijentOib == oKlijent.oib)
                {
                const str = auto.period
                const result = str.split('/').pop(); // rezultat perioda do kada traje
                const result2 = str.split('/')[0];//Prvi dio datuma
                var date = moment(result,"DD-MM-YYYY"); //formatiranje datuma
                var date2 = moment(result2,"DD-MM-YYYY"); 
                if(new Date(date2) > new Date(Date.now()))
                {
                     osiguranje.append("<tr class='table-info AutoOsig' data-bs-toggle='tooltip' data-bs-placement='top' title='Osiguranje se još nije aktiviralo'><td>Auto osiguranje</td><td>"+auto.cijena_osiguranja+" kn</td><td>"+auto.period+"</td><td >Ponovno aktivno od: "+str.split('/')[0]+"</td><td><a onclick='SendOsigKey(\""+sAutoKey+"\",\""+tip+"\")' href='OsigInfo.html'><i class='fas fa-info'></i></a></td></tr>");
                }
                }

            })
        });
        // -----------------------------------------------------
  oDbZivotOsig.once('value',function(OdgovorZivot)
        {
            OdgovorZivot.forEach(function(value)
            {
                var zivot = value.val();
                var sZivotKey = value.key;
                var tip = "Zivot";
                if(zivot.klijentOib == oKlijent.oib)
                {
                const str = zivot.period
                const result = str.split('/').pop();
                const result2 = str.split('/')[0];//Prvi dio datuma
                var date = moment(result,"DD-MM-YYYY"); //formatiranje datuma
                var date2 = moment(result2,"DD-MM-YYYY"); 
                if( new Date(date2) > new Date(Date.now()))
                {
                   osiguranje.append("<tr class ='table-info ZivotOsig'><td>Zivotno osiguranje</td><td>"+zivot.iznos+" kn</td><td>"+zivot.period+"</td><td>Ponovno aktivno od: "+str.split('/')[0]+"</td><td><a onclick='SendOsigKey(\""+sZivotKey+"\",\""+tip+"\")' href='OsigInfo.html'><i class='fas fa-info'></i></a></td></tr>");
                }
                }

            })
        });
//------------------------------------------------------------
oDbStambOsig.once('value',function(OdgovorStamb)
        {
            OdgovorStamb.forEach(function(value)
            {
                var stamb = value.val();
                var sStambKey = value.key;
                var tip = "Stamb";
                if(stamb.klijentOib == oKlijent.oib)
                {
                const str = stamb.period
                const result = str.split('/').pop();
                const result2 = str.split('/')[0];//Prvi dio datuma
                var date = moment(result,"DD-MM-YYYY"); //formatiranje datuma
                var date2 = moment(result2,"DD-MM-YYYY"); 
                if(new Date(date2) > new Date(Date.now()))
                {
                     osiguranje.append("<tr class='table-info StambOsig' data-bs-toggle='tooltip' data-bs-placement='top' title='Osiguranje se još nije aktiviralo'><td>Stambeno osiguranje</td><td>"+stamb.iznos+" kn</td><td>"+stamb.period+"</td><td>Ponovno aktivno od: "+str.split('/')[0]+"</td><td><a onclick='SendOsigKey(\""+sStambKey+"\",\""+tip+"\")' href='OsigInfo.html'><i class='fas fa-info'></i></a></td></tr>");
                }
                }

            })
        });


    });
}


function DeactiveOsig()
{
     var osiguranje = $("#OsigInfo");

  var Key = sessionStorage.getItem('SendKey');
  var oKlijentRef = oDb.ref('klijent/' + Key);  
    
    oKlijentRef.once('value', function(OdgovorKlijent)
    {
        var oKlijent = OdgovorKlijent.val();
        oDbAutoOsig.once('value',function(OdgovorAuto)
        {
            OdgovorAuto.forEach(function(value)
            {
                var auto = value.val();
                var sAutoKey = value.key;
                var tip = "Auto";
                if(auto.klijentOib == oKlijent.oib)
                {
                const str = auto.period
                const result = str.split('/').pop(); // rezultat perioda do kada traje
                var date = moment(result,"DD-MM-YYYY"); //formatiranje datuma
                if(new Date(date) < new Date(Date.now()))   
                {
                    osiguranje.append("<tr class='table-danger AutoOsig' data-bs-toggle='tooltip' data-bs-placement='top' title='Osiguranje je isteklo!'><td>Auto osiguranje</td><td>"+auto.cijena_osiguranja+" kn</td><td>"+auto.period+"</td><td>Neaktivno</td><td><a onclick='SendOsigKey(\""+sAutoKey+"\",\""+tip+"\")' href='OsigInfo.html'><i class='fas fa-info'></i></a></td></tr>");
                }

            }
        });
        });
        // -----------------------------------------------------
  oDbZivotOsig.once('value',function(OdgovorZivot)
        {
            OdgovorZivot.forEach(function(value)
            {
                var zivot = value.val();
                var sZivotKey = value.key;
                var tip = "Zivot";
                if(zivot.klijentOib == oKlijent.oib)
                {
                const str = zivot.period
                const result = str.split('/').pop();
                const result2 = str.split('/')[0];//Prvi dio datuma
                var date = moment(result,"DD-MM-YYYY"); //formatiranje datuma
                var date2 = moment(result2,"DD-MM-YYYY"); 
                if(new Date(date) < new Date(Date.now()) )
                {
                    osiguranje.append("<tr class ='table-danger ZivotOsig' data-bs-toggle='tooltip' data-bs-placement='top' title='Osiguranje je isteklo!'><td>Zivotno osiguranje</td><td>"+zivot.iznos+" kn</td><td>"+zivot.period+"</td><td>Neaktivno</td><td><a onclick='SendOsigKey(\""+sZivotKey+"\",\""+tip+"\")' href='OsigInfo.html'><i class='fas fa-info'></i></a></td></tr>");
                }
                }

            })
        });
//------------------------------------------------------------
oDbStambOsig.once('value',function(OdgovorStamb)
        {
            OdgovorStamb.forEach(function(value)
            {
                var stamb = value.val();
                var sStambKey = value.key;
                var tip = "Stamb";
                if(stamb.klijentOib == oKlijent.oib)
                {
                const str = stamb.period
                const result = str.split('/').pop();
                const result2 = str.split('/')[0];//Prvi dio datuma
                var date = moment(result,"DD-MM-YYYY"); //formatiranje datuma
                var date2 = moment(result2,"DD-MM-YYYY"); 
                if(new Date(date) < new Date(Date.now()))
                {
                    osiguranje.append("<tr class='table-danger StambOsig' data-bs-toggle='tooltip' data-bs-placement='top' title='Osiguranje je isteklo!'><td>Stambeno osiguranje</td><td>"+stamb.iznos+" kn</td><td>"+stamb.period+"</td><td>Neaktivno</td><td><a onclick='SendOsigKey(\""+sStambKey+"\",\""+tip+"\")' href='OsigInfo.html'><i class='fas fa-info'></i></a></td></tr>");
                }
                }

            })
        });


    });


}


function FilterOsig()
{
 var odabir = $("#FilterOption").val();
 if(odabir != "null")
 {
    var tablica = $("#OsigInfo").empty();
    if(odabir == "all")
    {
        console.log("all");
    OsiguranjaInfo();
    }
    else if(odabir == "active")
    {
        console.log("active");
        ActiveOsig();
    }
    else if(odabir == "notyet")
    {
        console.log("notyet");
        UntilActive();
    }
    else if(odabir == "notactive")
    {
        console.log("notactive");
        DeactiveOsig();
    }

 $('#FilterModal').modal('hide'); 
 }
 else
 {
    alert("Odaberite način filtriranja!");
 }

}

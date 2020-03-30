function doCall(typeRequest, urlPath, parametri, callbackOnSuccess) {
	$.ajax({
		url: urlPath,
		type: typeRequest,
		data: parametri,
		success: callbackOnSuccess
	});
}

function doCall(typeRequest, urlPath, parametri, callbackOnSuccess, callbackOnError) {
	$.ajax({
		url: urlPath,
		type: typeRequest,
		data: parametri,
		success: callbackOnSuccess,
		error: callbackOnError
	});
}

function buildDettaglioFromJson(json){
	var id = json["_id"];
	var nome = json["nome"];
	var cognome = json["cognome"];
	var dataNascita = json["dataNascita"];
	var settore = {codice: json["settore"]["codice"], descrizione: json["settore"]["descrizione"]};
	/*var regione = {codice: json["regione"]["codice"],descrizione: json["regione"]["descrizione"]};
	var provincia = {codice: json["provincia"]["codice"],descrizione: json["provincia"]["descrizione"]};
	var comune = {codice: json["comune"]["codice"],descrizione: json["comune"]["descrizione"]};*/
	var stipendio = json["stipendioRAL"];
	
	console.log("popolo dettaglio");
	$("#id").html(id);
	$("#nomeId").html(nome);
	$("#cognomeId").html(cognome);
	$("#dataNascitaId").html(dataNascita);
	$("#settoreId").html(settore.descrizione +" ("+settore.codice+")");
	$("#stipendioId").html(stipendio);
	
	$("div#dettaglio").show();
}

function spinner(){
	$("#fakeLoaderId").addClass("fakeLoader");
	$("#fakeLoaderId").show();
	
	$.fakeLoader({
                    bgColor: '#3498db',
                    spinner:"spinner4",
					timeToHide: 500
                });
}


function executeDettaglio(){
	var id = $("#idInput").val();
	spinner();
	
	doCall('GET', 'http://212.237.32.76:3000/risorsa/'+id, {}, function(resultJson){
		buildDettaglioFromJson(resultJson);
		//setTimeout(2000);
	});	
}

function indietro(){
	$("div#dettaglio").hide();
	$("#id").html("");
	$("#nomeId").html("");
	$("#cognomeId").html("");
	$("#dataNascitaId").html("");
	$("#settoreId").html("");
	$("#stipendioId").html("");
	
	$("#idInput").val("");
	
}
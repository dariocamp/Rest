const HOST = 'http://212.237.32.76:3000';

function doCall(typeRequest, urlPath, parametri, callbackOnSuccess, callbackOnError) {
	$.ajax({
		url: urlPath,
		type: typeRequest,
		data: JSON.stringify(parametri),
		contentType: "application/json",
		dataType: "json",
		success: callbackOnSuccess,
		error: callbackOnError
	});
}
	
function executeInsert(){
	var nome = $("#nomeInputId").val();
	var cognome = $("#cognomeInputId").val();
	var dataNascita = $("#dataNascitaInputId").val();
	var stipendio = $("#stipendioInputId").val();
	
	var settoreSelected = $('#settoreInputId').find(":selected");
	var settore = {"codice" : settoreSelected.val() , "descrizione": settoreSelected.text()};
	
	var regioneSelected = $('#regioneInputId').find(":selected");
	var regione = {"descrizione" : regioneSelected.text() , "codice" : regioneSelected.val()};
	
	var provinciaSelected = $('#provinciaInputId').find(":selected");
	var provincia = {"descrizione" : provinciaSelected.text() , "codice" : provinciaSelected.val()};
	
	var comuneSelected = $('#comuneInputId').find(":selected");
	var comune = {"descrizione" : comuneSelected.text() , "codice" : comuneSelected.val()};
	
	var residenza = {
		regione,
		provincia,
		comune
	};
	
	var param = {
		"nome": nome,
		"cognome": cognome,
		"dataNascita": dataNascita,
		"settore": settore,
		"residenza": residenza,
		"stipendioRAL": stipendio
		};
		
		spinner();
	
	 doCall('POST', HOST +'/risorsa', param, function(resultJson){
		console.log("inserimento avvenuto con successo");
	}, function(error){
		console.log("inserimento fallito: "+error);
	});
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

	
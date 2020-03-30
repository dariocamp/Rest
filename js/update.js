const HOST = 'http://212.237.32.76:3000';

function doCall(typeRequest, urlPath, parametri, callbackOnSuccess) {
	$.ajax({
		url: urlPath,
		type: typeRequest,
		data: JSON.stringify(parametri),
		contentType: "application/json",
		dataType: "json",
		success: callbackOnSuccess
	});
}

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


function executeUpdate(){
	var id = $("#inputId").val();
	
	var nome = $("#nomeInputId").val();
	var cognome = $("#cognomeInputId").val();
	var dataNascita = $("#dataNascitaInputId").val();
	var stipendio = $("#stipendioInputId").val();
	
	var settoreSelected = $('#settoreInputId').find(":selected");
	var settore = {"codice" : settoreSelected.val() , "descrizione": settoreSelected.text()};
	
	var regioneSelected = $('#regioneInputId').find(":selected");
	var regione = {"codice" : regioneSelected.val() , "descrizione" : regioneSelected.text()};
	
	var provinciaSelected = $('#provinciaInputId').find(":selected");
	var provincia = {"codice" : provinciaSelected.val() , "descrizione" : provinciaSelected.text()};
	
	var comuneSelected = $('#comuneInputId').find(":selected");
	var comune = {"codice" : comuneSelected.val() , "descrizione" : comuneSelected.text()};
	
	var residenza = {
		regione,
		provincia,
		comune
	};
	
	var param = {
		"_id" : id,
		"nome": nome,
		"cognome": cognome,
		"dataNascita": dataNascita,
		"settore": settore,
		"residenza": residenza,
		"stipendioRAL": stipendio
		};
		
		
	
	 doCall('PUT', HOST +'/risorsa', param, function(resultJson){
		  $("#idParagrafo").html("modifica avvenuta con successo");
	}, function(error){
		 $("#idParagrafo").html("modifica fallita");
	}); 
}

function prepareUpdate(){
	$("#idParagrafo").html("");
	var id = $("#inputId").val();
	spinner();
	
	doCall('GET', HOST +'/risorsa/'+id, undefined, populateUpdateInput ,function(error){
		$("#idParagrafoPrepareUpdate").html("Id errato o errore nella preparazione della modifica");
	}
	);
	
}

function populateUpdateInput(resultJson){
	$("#idParagrafoPrepareUpdate").html("");

	$("#nomeInputId").val(resultJson["nome"]);
	$("#cognomeInputId").val(resultJson["cognome"]);
	$("#dataNascitaInputId").val(resultJson["dataNascita"]);
	$("#stipendioInputId").val(resultJson["stipendioRAL"]);
	selectSettoreByCodice(resultJson["settore"]["codice"]);
	selectRegioneByCodice(resultJson["residenza"]["regione"]["codice"]);
	populateTendinaProvinceUpdate(resultJson["residenza"]["regione"]["codice"] , resultJson["residenza"]["provincia"]["codice"]);
	populateTendinaComuniUpdate(resultJson["residenza"]["provincia"]["codice"] , resultJson["residenza"]["comune"]["codice"]);
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
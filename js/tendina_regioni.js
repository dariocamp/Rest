function doCall(typeRequest, urlPath, parametri, callbackOnSuccess) {
	$.ajax({
		url: urlPath,
		type: typeRequest,
		data: parametri,
		success: callbackOnSuccess
	});
}

$(document).ready(function(){
		populateTendinaRegioni();
});

function populateTendinaRegioni(){
	doCall('GET', HOST +'/geo/regioni/', {}, function(resultJson){
		buildTendinaRegioniFromJson(resultJson);
	});
}

function buildTendinaRegioniFromJson(resultJson){
	var tendina = $("#regioneInputId");
	var regioni = '';
	$.each(resultJson, function(i, item){ //i = indice dell'oggetto nel json (da 0...n) , item = oggetto
		regioni += '<option value='+item.codice+'>'+item.descrizione+'</option>';
	});
	tendina.append(regioni);
}

function getRegioneSelected(){
	return $('#regioneInputId').find(":selected");
}

function getCodiceRegioneSelected(){
	return getRegioneSelected.val();
}

function getDescrizioneRegioneSelected(){
	return getRegioneSelected.text();
}

function selectRegioneByCodice(codiceRegione){
	$("#regioneInputId option[value='"+codiceRegione+"']").prop('selected', true);
}
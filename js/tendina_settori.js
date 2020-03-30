function doCall(typeRequest, urlPath, parametri, callbackOnSuccess) {
	$.ajax({
		url: urlPath,
		type: typeRequest,
		data: parametri,
		success: callbackOnSuccess
	});
}

$(document).ready(function(){
		populateTendinaSettori();
});

function populateTendinaSettori(){
	doCall('GET', HOST +'/settore/', {}, function(resultJson){
		buildTendinaSettoriFromJson(resultJson);
	});
}

function buildTendinaSettoriFromJson(resultJson){
	var tendina = $("#settoreInputId");
	var settori = '';
	$.each(resultJson, function(i, item){ //i = indice dell'oggetto nel json (da 0...n) , item = oggetto
		settori += '<option value='+item.codice+'>'+item.descrizione+'</option>';
	});
	tendina.append(settori);
}

function getSettoreSelected(){
	return $('#settoreInputId').find(":selected");
}

function getCodiceSettoreSelected(){
	return getSettoreSelected.val();
}

function getDescrizioneSettoreSelected(){
	return getSettoreSelected.text();
}

function selectSettoreByCodice(codiceSettore){
	$("#settoreInputId option[value='"+codiceSettore+"']").prop('selected', true);
}
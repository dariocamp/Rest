function doCall(typeRequest, urlPath, parametri, callbackOnSuccess) {
	$.ajax({
		url: urlPath,
		type: typeRequest,
		data: parametri,
		success: callbackOnSuccess
	});
}

function populateTendinaComuni(){
	$('#comuneInputId').empty();
	$("#comuneInputId").append('<option value="">Seleziona Comune</option>');
	var codiceProvincia = $("#provinciaInputId").val();
	
	doCall('GET', HOST +'/geo/comuni/'+codiceProvincia, {}, function(resultJson){
		buildTendinacomuniFromJson(resultJson);
	});
}

function populateTendinaComuniUpdate(codiceProvincia, codiceComune){
	spinner();
	doCall('GET', HOST +'/geo/comuni/'+codiceProvincia, {}, function(resultJson){
		buildTendinacomuniFromJson(resultJson);
		selectComune(codiceComune);
	});
}

function buildTendinacomuniFromJson(resultJson){
	var tendina = $("#comuneInputId");
	var comuni = '';
	$.each(resultJson, function(i, item){ //i = indice dell'oggetto nel json (da 0...n) , item = oggetto
		comuni += '<option value='+item.codice+'>'+item.descrizione+'</option>';
	});
	tendina.append(comuni);
}

function getComuneSelected(){
	return $('#comuneInputId').find(":selected");
}

function getCodiceComuneSelected(){
	return getComuneSelected.val();
}

function getDescrizioneComuneSelected(){
	return getComuneSelected.text();
}

function selectComune(codiceComune){
	$("#comuneInputId option[value='"+codiceComune+"']").prop('selected', true);
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
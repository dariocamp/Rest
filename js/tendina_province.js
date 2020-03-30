function doCall(typeRequest, urlPath, parametri, callbackOnSuccess) {
	$.ajax({
		url: urlPath,
		type: typeRequest,
		data: parametri,
		success: callbackOnSuccess
	});
}

function populateTendinaProvince(){
	$("#provinciaInputId").empty();
	$("#provinciaInputId").append('<option value="">Seleziona Provincia</option>');
	$("#comuneInputId").empty();
	$("#comuneInputId").append('<option value="">Seleziona Comune</option>');
	var codiceRegione = $("#regioneInputId").val();
	
	
	doCall('GET', HOST +'/geo/province/'+codiceRegione, {}, function(resultJson){
		buildTendinaProvinceFromJson(resultJson);
	});
}

function populateTendinaProvinceUpdate(codiceRegione, codiceProvincia){
	spinner();
	doCall('GET', HOST +'/geo/province/'+codiceRegione, {}, function(resultJson){
		buildTendinaProvinceFromJson(resultJson);
		selectProvincia(codiceProvincia);
	});
}

function buildTendinaProvinceFromJson(resultJson){
	var tendina = $("#provinciaInputId");
	var province = '';
	$.each(resultJson, function(i, item){ //i = indice dell'oggetto nel json (da 0...n) , item = oggetto
		province += '<option value='+item.codice+'>'+item.descrizione+'</option>';
	});
	tendina.append(province);
}

function getProvinciaSelected(){
	return $('#provinciaInputId').find(":selected");
}

function getCodiceProvinciaSelected(){
	return getProvinciaSelected.val();
}

function getDescrizioneProvinciaSelected(){
	return getProvinciaSelected.text();
}

function selectProvincia(codiceProvincia){
	$("#provinciaInputId option[value='"+codiceProvincia+"']").prop('selected', true);
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




















const HOST = 'http://212.237.32.76:3000';

function doCall(typeRequest, urlPath, parametri, callbackOnSuccess, callbackOnError) {
	$.ajax({
		url: urlPath,
		type: typeRequest,
		data: parametri,
		success: callbackOnSuccess,
		error: callbackOnError
	});
}


function executeDelete(){
	var id = $("#inputId").val();
	spinner();
	
	 doCall('DELETE', HOST +'/risorsa/'+ id, undefined, function(resultJson){
		 $("#idParagrafo").html("cancellazione avvenuta con successo");
	}, function(error){
		$("#idParagrafo").html("cancellazione fallita");
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
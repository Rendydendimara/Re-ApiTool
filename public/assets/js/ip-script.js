// ip finder script

// fungsi untuk melakukan request ke server menggunakan ajax untuk mendapatkan info ip address
function findIp() {
	// membersihkan info ip sebelumnya
	 $('#tbody').html('');	
 	const ipFind = $('#search-input').val();  
	$.ajax({ 
	 	type: 'POST', 
	 	url: '/api/ip', 
		data: {type: 'search-ip-info', item: ipFind},
		// ketika sukses post item, ajax otomatis reload page
	 	success: function(result){ 
			console.log(result);
			if(result.type === true) {
				// response from server valid/ok
				const ipData = result.data;
				let resultIpInfoTitle = 0;
				for(infoTitle in ipData) {
					// perulangan untuk non object nested
 					if(infoTitle !==  'currency' && infoTitle !==  'time_zone' && infoTitle !== 'country_flag') {
						resultIpInfoTitle++;
						$('#tbody').append(`
			            	<tr>
			            		<td scope="row">` + resultIpInfoTitle + `</td>
		              			<td scope="row"> ` + infoTitle + `</td>
		              			<td>` + ipData[infoTitle] + `</td>
		            		</tr>
		            	`);
 					}
 					if(infoTitle === 'country_flag') {
 						$('#tbody').append(`
			            	<tr>
			            		<td scope="row">` + resultIpInfoTitle + `</td>
		              			<td scope="row"> ` + infoTitle + `</td>
		              			<td> <img src="` + ipData[infoTitle] + `" ></td>
		            		</tr>
		            	`);	
 					}
				}
				for(infoTitleCurrency in ipData.currency) {
					// perulangan untuk object nested - currency

					resultIpInfoTitle++;
 					$('#tbody').append(`
			           	<tr>
			           		<td scope="row">` + resultIpInfoTitle + `</td>
		           			<td scope="row"> currency - ` + infoTitleCurrency + `</td>
		           			<td>` + ipData.currency[infoTitleCurrency] + `</td>
		           		</tr>
		           	`);

 				}
				
				for(infoTitleTimeZone in ipData.time_zone) {
					// perulangan untuk object nested - time_zone

					resultIpInfoTitle++
 					$('#tbody').append(`
			           	<tr>
			           		<td scope="row">` + resultIpInfoTitle + `</td>
		           			<td scope="row"> time_zone - ` + infoTitleTimeZone + `</td>
		           			<td>` + ipData.time_zone[infoTitleTimeZone] + `</td>
		           		</tr>
		           	`);
 				}

	   	        $('#search-input').val('');
			} else {
				// response from server invalid/error
				$('#ip-info').html(`
					<div class="col">
						<h1 class="text-center">` + result.error + `</h1>
					</div>
				`);
			}
	    }
	});
}

$('#search-button').on('click', function() { findIp() });

$('#search-input').on('keyup', function(key) { if(key.keyCode === 13) findIp() });

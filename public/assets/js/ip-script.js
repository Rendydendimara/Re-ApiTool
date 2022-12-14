function findIp() {
 	const ipFind = $('#search-input').val();  

    if(ipFind.length === 0) {
    	$('#errorMessage').html('Link is empty :('); 
    } else {
	    $('#errorMessage').html('');
	    $('#hr').html(`<h1 class="mt-5">` + ipFind + `</h1>`);	
	    // efect loading saat request ajax
		$('#ip-info').html(`<center><img src="/public/assets/img/ajax-loader.gif" alt="ajax-loader" srcset"" width="50" height="50"></center>`);	 
		$.ajax({ 
		 	type: 'POST', 
		 	url: '/api/ip', 
			data: {type: 'search-ip-info', item: ipFind},
			// ketika sukses post item, ajax otomatis reload page
		 	success: function(result){ 
				$('#ip-info').html(`
				    <div class="col-md-12 mb-5">
				        <table class="table table-hover" id="table">
				          <thead class="thead-dark">
				            <tr>
				              <th scope="col">No</th>
				              <th scope="col">Title</th>
				              <th scope="col">Info</th>
				            </tr>
				          </thead>
				          <tbody id="tbody">
				          </tbody>
				        </table>
				    <hr class="bg-dark">
			     	</div>
				`);
				if(result.type === true) {
					// response from server valid/ok
					const ipData = result.data;
					let resultIpInfoTitle = 0;

					// ambil data untuk kebutuhan google map
					const latitude = ipData.latitude;
					const longitude = ipData.longitude;
					const lokasi = ipData.district + ' - ' + ipData.city;	

					for(infoTitle in ipData) {
						if(infoTitle === 'city') {
							resultIpInfoTitle++;
							$('#tbody').append(`
				            	<tr>
				            		<td scope="row">` + resultIpInfoTitle + `</td>
			              			<td scope="row"> ` + infoTitle + `</td>
			              			<td>` + ipData[infoTitle] + ` <button class="ml-4 btn btn-primary" id="buttonClickMap" type="button" data-toggle="modal" data-target="#modalMapCity" data-lokasi="`+ lokasi +`" data-latitude="`+ latitude +`" data-longitude="`+ longitude +`">Buka Map</button> </td>
			            		</tr>
			            	`);
						}
						// perulangan untuk non object nested
	 					if(infoTitle !==  'currency' && infoTitle !==  'time_zone' && infoTitle !== 'country_flag' && infoTitle !=='city') {
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
		    }, 
		    error: function(err) {
		    	console.log(`error -> ${err}`);
		    }
		});
	}
}
 
$('#search-button').on('click', function() { findIp() });
$('#search-input').on('keyup', function(key) { if(key.keyCode === 13) findIp() });

  
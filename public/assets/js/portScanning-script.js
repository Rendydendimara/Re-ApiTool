function portScanning() {
 	const hostScan = $('#search-input').val();  

    if(hostScan.length === 0) {
    	$('#errorMessage').html('Link is empty :('); 
    } else {
    	$('#errorMessage').html('');
		$('#hr').html(`<h1 class="mt-5">` + hostScan + `</h1>`);	
		// efect loading saat request ajax
	 	$('#portscanning-info').html(`<center><img src="/public/assets/img/ajax-loader.gif" alt="ajax-loader" srcset"" width="50" height="50"></center>`);
		$.ajax({ 
		 	type: 'POST', 
		 	url: '/api/port-scanning', 
			data: {type: 'scanning-port-info', item: hostScan},
			// ketika sukses post item, ajax otomatis reload page
		 	success: function(result){ 
				// menambahkan tabel pada hasil portscanning
				 $('#portscanning-info').html(`
				 	<div class="col-md-12 mb-5">
				        <table class="table table-hover" id="table">
				          <thead class="thead-dark">
				            <tr>
				              <th scope="col">No</th>
				              <th scope="col">Status</th>
				              <th scope="col">Service</th>
				              <th scope="col">Port</th>
				              <th scope="col">Description</th>
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
					const portScanningData = result.data;
					let resultPortScanningDataSum = 0;
					
					portScanningData.forEach((info) => {
						resultPortScanningDataSum++;
						$('#tbody').append(`
					       	<tr>
				          		<td scope="row">` + resultPortScanningDataSum + `</td>
				       			<td scope="row"> ` + info.status + `</td>
				          		<td scope="row">` + info.service + `</td>
				          		<td scope="row">` + info.port + `</td>
				          		<td scope="row">` + info.description + `</td>	
				        	</tr>
						`);					
					})	

		   	        $('#search-input').val('');
				} else {
					// response from server invalid/error
					$('#portscanning-info').html(`
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

$('#search-button').on('click', function() { portScanning() });
$('#search-input').on('keyup', function(key) { if(key.keyCode === 13) portScanning() });

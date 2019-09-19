function dnsHistoryChecker() {
 	const domain = $('#search-input').val();  
 	
 	if(domain.length === 0) {
    	$('#errorMessage').html('Domain is empty :('); 
    } else {
    	$('#errorMessage').html('');
    	// efect loading saat request ajax
 	  	$('#dnshistorychecker-info').html(`<center><img src="/public/assets/img/ajax-loader.gif" alt="ajax-loader" srcset"" width="50" height="50"></center>`);
 	  	$('#hr').html(`<h1 class="mt-5">` + domain + `</h1>`);	

		$.ajax({ 
		 	type: 'POST', 
		 	url: '/api/dnshistory-checker', 
			data: {type: 'dnshistory-checker-info', item: domain},
			// ketika sukses post item, ajax otomatis reload page
		 	success: function(result){ 
		    	// menambahkan tabel pada hasil portscanning
				 $('#dnshistorychecker-info').html(`
				 	<div class="col-md-12 mb-5">
				        <table class="table table-hover" id="table">
				          <thead class="thead-dark">
				            <tr>
				              <th scope="col">No</th>
				              <th scope="col">IP</th>
				              <th scope="col">Type</th>
				              <th scope="col">Organization</th>
				              <th scope="col">Firts Seen</th>
				              <th scope="col">Last Seen</th>
				            </tr>
				          </thead>
				          <tbody id="tbody"></tbody>
				        </table>
				        <hr class="bg-dark">
				    </div>
				 `);	
				if(result.type === true) {
					// response from server valid/ok
					const dnsHistoryCheckerData = result.data;
					let resultDnsHistoryCheckerData = 0;

					dnsHistoryCheckerData.forEach((info) => {
						resultDnsHistoryCheckerData++;
						$('#tbody').append(`
					       	<tr>
				          		<td scope="row">` + resultDnsHistoryCheckerData + `</td>
				       			<td scope="row">` + info.ip + `</td>
				       			<td scope="row">` + info.type + `</td>
				       			<td scope="row">` + info.organization + `</td>
				       			<td scope="row">` + info.firstSeen + `</td>
				       			<td scope="row">` + info.lastSeen + `</td>
				        	</tr>
						`);					
					})	

		   	        $('#search-input').val('');
				} else {
					// response from server invalid/error
					$('#dnshistorychecker-info').html(`
						<div class="col">
							<h1 class="text-center">` + result.error + `</h1>
						</div>
					`);
				}
		    }
		});
	}
 
}

$('#search-button').on('click', function() { dnsHistoryChecker() });

$('#search-input').on('keyup', function(key) { if(key.keyCode === 13) dnsHistoryChecker() });

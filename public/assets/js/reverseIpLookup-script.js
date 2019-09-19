function reverseIpLookup() {
 	const domain = $('#search-input').val();  

    if(domain.length === 0) {
    	$('#errorMessage').html('Link is empty :('); 
    } else {
    	$('#errorMessage').html('');
	  	$('#hr').html(`<h1 class="mt-5">` + domain + `</h1>`);	
	  	// efect loading saat request ajax
	  	$('#reverseiplookup-info').html(`<center><img src="/public/assets/img/ajax-loader.gif" alt="ajax-loader" srcset"" width="50" height="50"></center>`);
		$.ajax({ 
		 	type: 'POST', 
		 	url: '/api/reverse-ip-lookup', 
			data: {type: 'reverse-ip-lookup-info', item: domain},
			// ketika sukses post item, ajax otomatis reload page
		 	success: function(result){ 
				// menambahkan tabel pada hasil portscanning
				 $('#reverseiplookup-info').html(`
				 	<div class="col-md-12 mb-5">
				        <table class="table table-hover" id="table">
				          <thead class="thead-dark">
				            <tr>
				              <th scope="col">No</th>
				              <th scope="col">Domain</th>
				              <th scope="col">Firts Seen</th>
				              <th scope="col">Last Seen</th>
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
					const reverseIpLookupData = result.data;
					let resultReverseIpLookup = 0;
					
					reverseIpLookupData.forEach((info) => {
						resultReverseIpLookup++;
						$('#tbody').append(`
					       	<tr>
				          		<td scope="row">` + resultReverseIpLookup + `</td>
				       			<td scope="row"> <a class="btn-link" href="` + info.domainLink  + `"> ` + info.domain + `</td>
				          		<td scope="row">` + info.firstSeen + `</td>
				          		<td scope="row">` + info.lastSeen + `</td>
				        	</tr>
						`);					
					});	

		   	        $('#search-input').val('');
				} else {
					// response from server invalid/error
					$('#reverseiplookup-info').html(`
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

$('#search-button').on('click', function() { reverseIpLookup() });
$('#search-input').on('keyup', function(key) { if(key.keyCode === 13) reverseIpLookup() });
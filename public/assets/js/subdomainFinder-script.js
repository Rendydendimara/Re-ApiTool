function subdomainFinder() {
 	const domain = $('#search-input').val();  

    if(domain.length === 0) {
    	$('#errorMessage').html('Link is empty :('); 
    } else {
    	$('#errorMessage').html('');
		$('#hr').html(`<h1 class="mt-5">` + domain + `</h1>`);	
		// efect loading saat request ajax
	 	$('#subdomainfinder-info').html(`<center><img src="/public/assets/img/ajax-loader.gif" alt="ajax-loader" srcset"" width="50" height="50"></center>`);
	 	$.ajax({ 
		 	type: 'POST', 
		 	url: '/api/subdomain-finder', 
			data: {type: 'subdomain-finder-info', item: domain},
			// ketika sukses post item, ajax otomatis reload page
		 	success: function(result){ 
				// menambahkan tabel pada hasil portscanning
				 $('#subdomainfinder-info').html(`
				 	<div class="col-md-12 mb-5">
				        <table class="table table-hover" id="table">
				          <thead class="thead-dark">
				            <tr>
				              <th scope="col">No</th>
				              <th scope="col">Subdomain</th>
				              <th scope="col">Hosting Provider</th>
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
					const subdomainFinderData = result.data;
					let resultsubdomainFinderData = 0;
					
					subdomainFinderData.forEach((info) => {
						resultsubdomainFinderData++;
						$('#tbody').append(`
					       	<tr>
				          		<td scope="row">` + resultsubdomainFinderData + `</td>
				       			<td scope="row"> <a class="btn-link" href="` + info.subdomainLink  + `"> ` + info.subdomain + `</td>
				          		<td scope="row">` + info.hostingProvider + `</td>
				        	</tr>
						`);					
					})	

		   	        $('#search-input').val('');
				} else {
					// response from server invalid/error
					$('#subdomainfinder-info').html(`
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

$('#search-button').on('click', function() { subdomainFinder() });
$('#search-input').on('keyup', function(key) { if(key.keyCode === 13) subdomainFinder() });

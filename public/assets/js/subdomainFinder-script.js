// ip finder script

// fungsi untuk melakukan request ke server menggunakan ajax untuk mendapatkan info ip address
function subdomainFinder() {
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
 	const domain = $('#search-input').val();  
	$.ajax({ 
	 	type: 'POST', 
	 	url: '/api/subdomain-finder', 
		data: {type: 'subdomain-finder-info', item: domain},
		// ketika sukses post item, ajax otomatis reload page
	 	success: function(result){ 
			console.log(result);
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
	    }
	});
}

$('#search-button').on('click', function() { subdomainFinder() });

$('#search-input').on('keyup', function(key) { if(key.keyCode === 13) subdomainFinder() });

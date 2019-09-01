// email finder script

// fungsi untuk melakukan request ke server menggunakan ajax untuk mendapatkan info email
function findEmail() {
	const emailFind = $('#search-input').val();  

	$('#email-info').html(`
	      <div class="col-md-12 mb-5">
	        <table class="table table-hover" id="table">
	          <thead class="thead-dark">
	            <tr>
	              <th scope="col">No</th>
	              <th scope="col">Title</th>
	              <th scope="col">Info</th>
	            </tr>
	          </thead>
	          <tbody id="tbody"></tbody>
	        </table>
	        <hr class="bg-dark">
	      </div>
	    </div>
	`);
   	$('#hr').html(`<h1 class="mt-5">` + emailFind + `</h1>`);	

 	$.ajax({ 
	 	type: 'POST', 
	 	url: '/api/email', 
		data: {type: 'find-email-info', item: emailFind},
		// ketika sukses post item, ajax otomatis reload page
	 	success: function(result){ 
			if(result.type === true) {
				console.log(result);
				// data result valid
				const emailData = result.data;
				let resultEmailTitle = 0;
				for(emailInfoTitle in emailData) {
					resultEmailTitle++;
					$('#tbody').append(`
				      	<tr>
			           		<td scope="row">` + resultEmailTitle + `</td>
		           			<td scope="row"> ` + emailInfoTitle + `</td>
		              		<td>` + emailData[emailInfoTitle] + `</td>
		            	</tr>
					`);
				}

				$('#search-input').val(''); // membersihkan input search movie sebelumnya
			} else {
				// data result invalid
				$('#email-info').html(`
					<div class="col">
						<h1 class="text-center">` + result.error + `</h1>
					</div>
				`);	
			}
	 	} 
	}); 	
}

$('#search-button').on('click', function() { findEmail() });

$('#search-input').on('keyup', function(key) { if(key.keyCode === 13) findEmail() });

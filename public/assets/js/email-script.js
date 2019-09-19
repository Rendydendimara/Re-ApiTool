function findEmail() {
	const emailFind = $('#search-input').val();  

    if(emailFind.length === 0) {
    	$('#errorMessage').html('Email is empty :('); 
    } else {
    	$('#errorMessage').html('');
    	// efect loading saat request ajax
    	$('#email-info').html(`<center><img src="/public/assets/img/ajax-loader.gif" alt="ajax-loader" srcset"" width="50" height="50"></center>`);
	   	$('#hr').html(`<h1 class="mt-5">` + emailFind + `</h1>`);	

	 	$.ajax({ 
		 	type: 'POST', 
		 	url: '/api/email', 
			data: {type: 'find-email-info', item: emailFind},
		 	success: function(result){ 
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
				if(result.type === true) {
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
		 	}, 
		 	error: function(err) {
		 		console.log(`error -> ${err}`);
		 	} 
		}); 	
	}
}

$('#search-button').on('click', function() { findEmail() });

$('#search-input').on('keyup', function(key) { if(key.keyCode === 13) findEmail() });

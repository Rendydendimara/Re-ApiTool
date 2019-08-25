// email finder script

// fungsi untuk melakukan request ke server menggunakan ajax untuk mendapatkan info email
function findEmail() {
	const ipFind = $('#search-input').val();  
	$.ajax({ 
	 	type: 'POST', 
	 	url: '/api/email', 
		data: {type: 'find-email-info', item: ipFind},
		// ketika sukses post item, ajax otomatis reload page
	 	success: function(result){ 
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
	 	} 
	}); 	
}

$('#search-button').on('click', function() { findEmail() });

$('#search-input').on('keyup', function(key) { if(key.keyCode === 13) findEmail() });

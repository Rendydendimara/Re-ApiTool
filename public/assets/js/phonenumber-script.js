function findPhoneNumber() {
	const phonenumberFind = $('#search-input').val();
 
    if(phonenumberFind.length === 0) {
    	$('#errorMessage').html('Link is empty :('); 
    } else {
    	$('#errorMessage').html('');
	    $('#hr').html(`<h1 class="mt-5">` + phonenumberFind + `</h1>`);	
	    // efect loading saat request ajax
	    $('#phonenumber-info').html(`<center><img src="/public/assets/img/ajax-loader.gif" alt="ajax-loader" srcset"" width="50" height="50"></center>`);
		$.ajax({
			type: 'POST',
			url: '/api/phonenumber',
			data: {type: 'search-phonenumber-info', item: phonenumberFind},
			success: function(result) {
				$('#phonenumber-info').html(`
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
					const phoneNumberData = result.data;
					let resultPhoneNumberInfoTitle = 0;
					
					for(titlePhoneNumberInfo in phoneNumberData) {
						if(titlePhoneNumberInfo !== 'timezones' && titlePhoneNumberInfo !== 'formats') {
							resultPhoneNumberInfoTitle++;
							$('#tbody').append(`
					           	<tr>
					           		<td scope="row">` + resultPhoneNumberInfoTitle + `</td>
				           			<td scope="row"> ` + titlePhoneNumberInfo + `</td>
				              		<td>` + phoneNumberData[titlePhoneNumberInfo] + `</td>
				            	</tr>
							`);
						} 
					}

					if(phoneNumberData.timezones) {
						resultPhoneNumberInfoTitle++;
						$('#tbody').append(`
					      	<tr>
				           		<td scope="row">` + resultPhoneNumberInfoTitle + `</td>
				       			<td scope="row"> timezones </td>
				          		<td>` + phoneNumberData.timezones[0] + `</td>
				        	</tr>
						`);
					}

					for(formatsTitle in phoneNumberData.formats) {
						resultPhoneNumberInfoTitle++;
						$('#tbody').append(`
					      	<tr>
				           		<td scope="row">` + resultPhoneNumberInfoTitle + `</td>
				       			<td scope="row"> ` + formatsTitle + `</td>
				          		<td>` + phoneNumberData.formats[formatsTitle] + `</td>
				        	</tr>	
						`);
					}

					$('#search-input').val('');
				} else {
					// response from server invalid/error
					$('#phonenumber-info').html(`
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

$('#search-button').on('click', function() { findPhoneNumber() });
$('#search-input').on('keyup', function(key) { if(key.keyCode === 13) findPhoneNumber() });

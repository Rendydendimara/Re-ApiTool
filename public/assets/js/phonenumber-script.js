// phonenumber script

// fungsi untuk melakukan request ke server menggunakan ajax untuk mendapatkan info phonenumber
function findPhoneNumber() {
	$('#tbody').html(' ');
	const phonenumberFind = $('#search-input').val();
 	const ipFind = $('#search-input').val();  

	$.ajax({
		type: 'POST',
		url: '/api/phonenumber',
		data: {type: 'search-phonenumber-info', item: phonenumberFind},
		success: function(result) {
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
		}	
	});
}

$('#search-button').on('click', function() { findPhoneNumber() });

$('#search-input').on('keyup', function(key) { if(key.keyCode === 13) findPhoneNumber() });

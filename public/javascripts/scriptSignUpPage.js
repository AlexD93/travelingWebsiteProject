// check_fields
function validate_fields(field_id, error_id, error_message, error_message_upper_case, error_message_numbers){
	
	var error_field = document.getElementById(error_id); //(error_id)= <span id="first_name_error"></span> , <span id="last_name_error"></span>
	
    var first_name_field = document.getElementById(field_id);
	
	if (first_name_field.value.length < 3 )    /* || !/^[A-Z][a-z-]+$/.test(first_name_field.value)) *///--->>> (could be here but error message will be so long)//
	{
	    error_field.innerHTML = error_message;
		return false;
	};
	
	if (/^[a-z]+$/.test(first_name_field.value))
	{
		error_field.innerHTML = error_message_upper_case;
		return false;
	};
	if	(!/^[A-Z][a-z]+$/.test(first_name_field.value))
	{
		error_field.innerHTML = error_message_numbers;
		return false;
	};
		error_field.innerHTML = "";
		return true;
	}



//return validate
function validate(){
	
    var valid = validate_fields("first_name_field", "first_name_error", "Your first name should be at least 3 character", 
	"First letter of first name should be Uppercase", 
	"First name cannot contain numbers");
    
	var valid_last = validate_fields("last_name_field", "last_name_error", "Your last name should be at least 3 character", 
	"First letter of last name should be Uppercase", 
	"Last name cannot contain numbers");
	

	return valid && valid_last;
}
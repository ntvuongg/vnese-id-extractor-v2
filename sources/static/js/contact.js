$('form').on('submit', function(e){
    var name = $('#name').val();
    var email = $('#email').val();
    var phoneNumber = $('#phone').val();
    var message = $('message').val();

    if (!name){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please type your name!'
          })
          e.preventDefault();
    }
    else if (!email){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please type your email!'
          })
          e.preventDefault();
    }
    else if (message == ''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please type your message!'
          })
          e.preventDefault();
    }
    else{
        var formData = {
            name: $("#name").val().toString(),
            email: $("#email").val().toString(),
            phone: $("#phone").val().toString(),
            message: $("#message").val().toString(),
          };
        $.ajax({
            type: 'POST',
            url: '/contact',
            data: JSON.stringify(formData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Thanks for contacting!',
          })
    }
})

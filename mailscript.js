function SendMail(event) {
    event.preventDefault(); // Prevent form from submitting and refreshing the page

    var params = {
        from_name: document.getElementById("name").value,
        email_id: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    emailjs.send("service_eadi44t", "template_wg40ftx", params).then(function(res) {
        alert("Success: " + res.status);
    }).catch(function(error) {
        alert("Error: " + error);
    });
}

document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const data = {
        name: name,
        email: email
    };

    fetch('https://example.com/api/submit', {  // Zde zadej URL, kam chceš data odesílat
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerHTML = 'Data úspěšně odeslána: ' + JSON.stringify(data);
    })
    .catch((error) => {
        document.getElementById('response').innerHTML = 'Chyba při odesílání: ' + error;
    });
});

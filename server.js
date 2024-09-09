const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 8080; // Nastavení portu

// Middleware pro parsování JSON těla
app.use(bodyParser.json());

// Soubor, do kterého budeme ukládat data
const dataFile = 'data.json';

// Funkce pro načtení dat ze souboru
function readDataFromFile() {
    try {
        const data = fs.readFileSync(dataFile, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        // Pokud soubor neexistuje nebo je prázdný, vrátíme prázdné pole
        return [];
    }
}

// Funkce pro uložení dat do souboru
function writeDataToFile(data) {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf-8');
}

// Nastavení statických souborů
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint pro zpracování dat z formuláře
app.post('/submit', (req, res) => {
    const { name, surname, dob, address, phone, email } = req.body;

    if (!name || !surname || !dob || !address || !phone || !email) {
        return res.status(400).send('Chybí některá z povinných polí.');
    }

    // Načtení aktuálních dat ze souboru
    let users = readDataFromFile();

    // Přidání nového uživatele do pole
    users.push({ name, surname, dob, address, phone, email });

    // Uložení dat zpět do souboru
    writeDataToFile(users);

    res.status(200).send('Data byla uložena.');
});

// Endpoint pro získání všech uživatelů
app.get('/users', (req, res) => {
    // Načtení uživatelů ze souboru
    const users = readDataFromFile();
    res.json(users); // Vrácení uživatelů jako JSON
});

// Nastavení hlavní stránky
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Spuštění serveru
app.listen(port, () => {
    console.log(`Server běží na http://localhost:${port}`);
});


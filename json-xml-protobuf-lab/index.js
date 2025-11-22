const fs = require('fs');
const convert = require('xml-js');
const protobuf = require('protobufjs');

// Charger la définition Protobuf depuis employee.proto
const root = protobuf.loadSync('employee.proto');
const EmployeeList = root.lookupType('Employees');

// Construire la liste d'employés
const employees = [];

employees.push({
  id: 1,
  name: 'Ali',
  salary: 9000
});

employees.push({
  id: 2,
  name: 'Kamal',
  salary: 22000
});

employees.push({
  id: 3,
  name: 'Amalp',
  salary: 23000
});
employees.push({
  id: 4,
  name: 'Amalw',
  salary: 13000
});
employees.push({
  id: 5,
  name: 'Yacine',
  salary: 23000
});
employees.push({
  id: 6,
  name: 'Amalvvx',
  salary: 23000
});
employees.push({
  id: 7,
  name: 'Amalxb',
  salary: 23000
});
employees.push({
  id: 8,
  name: 'Amalxv',
  salary: 23000
});
employees.push({
  id: 9,
  name: 'Amalxc',
  salary: 23000
});
employees.push({
  id: 10,
  name: 'Amalcc',
  salary: 23000
});

employees.push({
  id: 11,
  name: 'Amalz',
  salary: 23000
});
employees.push({
  id: 12,
  name: 'Amalx',
  salary: 23000
});
employees.push({
  id: 13,
  name: 'Amaln',
  salary: 23000
});
employees.push({
  id: 14,
  name: 'Amalk',
  salary: 23000
});
employees.push({
  id: 15,
  name: 'Amalwo',
  salary: 23000
});
employees.push({
  id: 16,
  name: 'Amalt',
  salary: 23000
});
employees.push({
  id: 17,
  name: 'Amala',
  salary: 23000
});
employees.push({
  id: 18,
  name: 'Amalv',
  salary: 23000
});
employees.push({
  id: 19,
  name: 'Amalq',
  salary: 23000
});
employees.push({
  id: 20,
  name: 'Amala',
  salary: 23000
});
employees.push({
  id: 21,
  name: 'Amalw',
  salary: 23000
});
employees.push({
  id: 22,
  name: 'hamza',
  salary: 23000
});


// Objet racine compatible avec message Employees
let jsonObject = { employee: employees };

// ---------- JSON ----------

// Sérialisation en JSON
let jsonData = JSON.stringify(jsonObject);

// ---------- XML ----------

// Options de conversion JSON -> XML
const options = {
  compact: true,
  ignoreComment: true,
  spaces: 0
};

// Conversion en XML, avec balise racine <root>
let xmlData = "<root>\n" + convert.json2xml(jsonObject, options) + "\n</root>";

// ---------- Protobuf ----------

// Vérification de conformité avec le schéma Protobuf
let errMsg = EmployeeList.verify(jsonObject);
if (errMsg) {
  throw Error(errMsg);
}

// Création du message Protobuf
let message = EmployeeList.create(jsonObject);

// Encodage en binaire Protobuf
let buffer = EmployeeList.encode(message).finish();

// ---------- Écriture des fichiers ----------

fs.writeFileSync('data.json', jsonData);
fs.writeFileSync('data.xml', xmlData);
fs.writeFileSync('data.proto', buffer);

// ---------- Mesure des tailles ----------

const jsonFileSize = fs.statSync('data.json').size;
const xmlFileSize = fs.statSync('data.xml').size;
const protoFileSize = fs.statSync('data.proto').size;

console.log(`Taille de 'data.json' : ${jsonFileSize} octets`);
console.log(`Taille de 'data.xml'  : ${xmlFileSize} octets`);
console.log(`Taille de 'data.proto': ${protoFileSize} octets`);

// ---------- JSON : encodage ----------
console.time('JSON encode');
jsonData = JSON.stringify(jsonObject);
console.timeEnd('JSON encode');

// ---------- JSON : décodage ----------
console.time('JSON decode');
let jsonDecoded = JSON.parse(jsonData);
console.timeEnd('JSON decode');


// ---------- XML : encodage ----------
console.time('XML encode');
xmlData = "<root>\n" + convert.json2xml(jsonObject, options) + "\n</root>";
console.timeEnd('XML encode');

// ---------- XML : décodage ----------
console.time('XML decode');
// Conversion XML -> JSON (texte) -> objet JS
let xmlJson = convert.xml2json(xmlData, { compact: true });
let xmlDecoded = JSON.parse(xmlJson);
console.timeEnd('XML decode');



// ---------- Protobuf : encodage ----------
console.time('Protobuf encode');
message = EmployeeList.create(jsonObject);
buffer = EmployeeList.encode(message).finish();
console.timeEnd('Protobuf encode');

// ---------- Protobuf : décodage ----------
console.time('Protobuf decode');
let decodedMessage = EmployeeList.decode(buffer);
// Optionnel : conversion vers objet JS "classique"
let protoDecoded = EmployeeList.toObject(decodedMessage);
console.timeEnd('Protobuf decode');


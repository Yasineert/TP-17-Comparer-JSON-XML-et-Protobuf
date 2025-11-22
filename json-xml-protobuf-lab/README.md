# Comparaison des formats de sérialisation : JSON, XML et Protobuf

Ce projet démontre la sérialisation de données d'employés en trois formats différents (JSON, XML et Protobuf) et compare leurs performances en termes de taille de fichier et de vitesse d'encodage/décodage.

## Structure du projet

- `index.js` - Script principal de démonstration
- `employee.proto` - Définition du schéma Protobuf
- `package.json` - Configuration et dépendances du projet

## Prérequis

- Node.js (v22 ou supérieur recommandé)
- npm

## Installation

```bash
npm install
```

## Exécution

```bash
node index.js
```

## Résultats

### Comparaison des tailles de fichiers

Le script génère trois fichiers contenant les mêmes données :

```
Taille de 'data.json' : 127 octets
Taille de 'data.xml'  : 224 octets
Taille de 'data.proto': 41 octets
```

**Observation** : Protobuf est le format le plus compact (41 octets), suivi de JSON (127 octets) et XML (224 octets). Protobuf utilise 67% moins d'espace que JSON et 82% moins que XML.

### Comparaison des performances

#### Encodage (Sérialisation)
```
JSON encode: 0.028ms
XML encode: 1.502ms
Protobuf encode: 0.211ms
```

#### Décodage (Désérialisation)
```
JSON decode: 0.03ms
XML decode: 6.143ms
Protobuf decode: 1.04ms
```

**Observations** :
- **JSON** est le plus rapide pour l'encodage et le décodage (natif JavaScript)
- **XML** est le plus lent pour les deux opérations
- **Protobuf** offre un bon compromis entre vitesse et taille

## Données de test

Le script teste avec une liste de 3 employés :

```javascript
[
  { id: 1, name: 'Ali', salary: 9000 },
  { id: 2, name: 'Kamal', salary: 22000 },
  { id: 3, name: 'Amal', salary: 23000 }
]
```

## Schéma Protobuf

```protobuf
syntax = "proto3";

message Employee {
  int32 id = 1;
  string name = 2;
  int32 salary = 3;
}

message Employees {
  repeated Employee employee = 1;
}
```

## Dépendances

- `protobufjs` - Pour la sérialisation/désérialisation Protobuf
- `xml-js` - Pour la conversion JSON ↔ XML

## Conclusion

Chaque format a ses avantages :

- **JSON** : Lisible, rapide, supporté nativement par JavaScript
- **XML** : Verbeux mais flexible, standard dans de nombreux systèmes legacy
- **Protobuf** : Compact et efficace, idéal pour la communication réseau et le stockage

Le choix dépend du cas d'usage :
- Pour les APIs web : JSON
- Pour l'interopérabilité avec des systèmes anciens : XML
- Pour la performance et l'efficacité du réseau : Protobuf
  les resultats obtenus :
<img width="1263" height="729" alt="2" src="https://github.com/user-attachments/assets/dd73546f-7e60-4400-9ea6-562b41b58e57" />
<img width="1366" height="726" alt="3" src="https://github.com/user-attachments/assets/78ddf101-17dc-42bc-8d85-c295049ffa14" />



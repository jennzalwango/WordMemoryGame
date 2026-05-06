<?php
require "database_connect.php";

//create sample data in word table
$insertWords_sql = "INSERT INTO Words(word_name)VALUES
('Astronomy'),
('Asterism'),
('Apogee'),
('Binary star'),
('Comet'),
('Dark matter'),
('Deneb'),
('Eclipse'),
('Mars'),
('Health'),
('Medicine'),
('Indigestion'),
('Infection'),
('Influenza'),
('Aspirin'),
('Bandage'),
('Chromosome'),
('Cellulose'),
('Chloroplast'),
('Cytoplasm'),
('Diffusion'),
('Eukaryote'),
('Lysosome'),
('Molecule'),
('Atom'),
('Profound'),
('Stimulating'),
('Enlightening'),
('Resonate'),
('Intriguing')";

//check if words are inserted
if($conn->query($insertWords_sql) === TRUE){
    echo "Records created successfully";

}else{
    echo "Error:" .$insertWords_sql. "<br>" . $conn->error;
}

$conn->close();
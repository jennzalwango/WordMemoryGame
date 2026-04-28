<?php
require "database_connect.php";

$insertWords_sql = "INSERT INTO Words(word_name)VALUES
('Astronomy'),
('asterism'),
('apogee'),
('binary star'),
('chromosome'),
('cellulose'),
('eclipse'),
('comet'),
('cytoplasm'),
('chloroplast'),
('Molecule'),
('Intriguing'),
('Profound'),
('Atom'),
('eukaryote')";

//check if words are inserted
if($conn->query($insertWords_sql) === TRUE){
    echo "Records created successfully";

}else{
    echo "Error:" .$insertWords_sql. "<br>" . $conn->error;
}

$conn->close();
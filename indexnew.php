<?php
$servername = "localhost";
$username = "root";
$password = "";

$conn = new mysqli($servername, $username, $password);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

$querydb = "CREATE DATABASE AttendanceSystem";
$conn->query($querydb);

$dbname = "AttendanceSystem";
$conn = new mysqli($servername, $username, $password,$dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

$query1 = "CREATE TABLE Admins(
    Id int(2) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Username varchar(30)  UNIQUE NOT NULL,
    Pass varchar(30)  UNIQUE NOT NULL
  )";
$conn->query($query1);


  
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>iNDIGO-Attendance Monitoring System</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <meta content="Free HTML Templates" name="keywords">
    <meta content="Free HTML Templates" name="description">

    <!-- Favicon -->
    <link href="img/favicon.ico" rel="icon">

    <!-- Google Web Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Oswald:wght@400;500;600&display=swap" rel="stylesheet"> 

    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">

    <!-- Flaticon Font -->
    <link href="lib/flaticon/font/flaticon.css" rel="stylesheet">

    <!-- Libraries Stylesheet -->
    <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">
    <link href="lib/lightbox/css/lightbox.min.css" rel="stylesheet">

    <!-- Customized Bootstrap Stylesheet -->
    <link href="css/style.css" rel="stylesheet">
</head>
<body>
<div class="container-fluid p-0">
    
      
            <div class="carousel-item active">
                <img class="w-100" src="img/drahomir-posteby-mach-n4y3eiQSIoc-unsplash.jpg" alt="Image">
                <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div class="p-3" style="max-width: 1000px;">
                        <a href="loginstudent.html" class="btn btn-primary py-md-3 px-md-5 mt-2 mt-md-4">Login as a Student</a><br>
                        <a href="loginteacher.html" class="btn btn-primary py-md-3 px-md-5 mt-2 mt-md-4">Login as a Teacher</a><br>
                        <a href="attendance.html" class="btn btn-primary py-md-3 px-md-5 mt-2 mt-md-4">Record your Attendance</a>
                    </div>
                </div>
            </div>
           
        
    
</div>
</body>
</html>

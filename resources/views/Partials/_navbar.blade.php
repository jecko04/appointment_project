<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/_navbar.css">
    <title>Document</title>
</head>
<body>
<div class="controller">
        <nav class="navigation">
            <div class="logo">
                <img src="{{ asset('images/image.png') }}" alt="SMTC Dental Care Logo">
            </div>
            <div class="logo-text">
              <span>SMTC Dental Care</span>
            </div>
            <div class="navigation-link">
              <ul>
                  <li><a href="{{ route('home') }}">Home</a></li>
                  <li><a href="about.php">About</a></li>
                  <li><a href="service.php">Service</a></li>
                  <li><a href="contact.php">Contact</a></li>
                  <li class="active"><a href="{{ route('signup') }}">Sign up</a></li>
              </ul>
            </div>
            
        </nav>
    </div>
</body>
</html>
<?php
$backgroundImage = 'C:\Users\Flor\Documents\GitHub\appointment_project\images\gradientbg.png';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial scale=1.0">
    <meta http-equiv="X-UA-Compatible"content="IE-edge">
    <title>SMTC Dental Care</title>
    <link rel="icon" href="images/v48_1110.png" type="image/png"/>

    <style>
        body {
            background-image: url('<?php echo $backgroundImage; ?>');
            background-size: cover;
        }
    </style>
</head>
<body style="background-image: url('<?php echo $backgroundImage; ?>'); background-size: cover;">
  
<div class="controller">
      <nav>
        <ul>
          <li><a href="home.php">Home</a></li>
          <li><a href="about.php">About</a></li>
          <li><a href="service.php">Service</a></li>
          <li><a href="contact.php">Contact</a></li>
          <li><a href="signup.php">Sign up</a></li>
        </ul>
      </nav>
</div>
</body>
</html>
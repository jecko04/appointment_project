<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/signup.css') }}">
    <title>Sign up</title>
</head>
<body>
    <div class="controller">
        @include('partials._navbar')
    </div>
    <div class="content">
        <div class="login-container">
            <h2>Login</h2>
            <form action="{{ route('login') }}" method="POST">
                @csrf 
                
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="{{ route('Users.register') }}">Register here</a></p>
        </div>
    </div>
</body>
</html>
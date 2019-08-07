<!DOCTYPE html>
    <html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Notes App</title>
        <!-- Styles -->
        <script src="https://kit.fontawesome.com/fc318db01a.js"></script>
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    </head>
    <body>
        <div id="app">
	        	<div style="text-align: center; margin-top:18rem;">
	        		<i class="fal fa-circle-notch fa-spin" style="font-size:96px"></i>
		        </div>
	    </div>

        <script src="{{ asset('js/app.js') }}"></script>
    </body>
    </html>
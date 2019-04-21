<!DOCTYPE html>
<html>
<head>

    <!-- Meta -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Visualisasi Kawal Pemilu</title>
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
    <meta name="author" content="Muhammad Farid">
    <meta name="description" content="Visualisasi Kawal Pemilu">
    <meta http-equiv="Refresh" content="5">
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet">

    <!-- CSS -->
    <link rel="stylesheet" type="text/css" media="screen" href="src/css/main.css">

    <!-- Scripts -->
    <script type="text/javascript" src="src/assets/scripts/d3.min.js"></script>
    <script src="https://d3js.org/topojson.v2.min.js"></script>

</head>
<body>


    <div class="container" style="margin-bottom: 30px;">
        <div class="ballot-container">
            <img src="src/assets/img/valid.png" style="width: 100px;">
            <div class="validity-description">
                <!-- <h3>SUARA SAH</h3> -->
                <h1 id="valid-votes">0</h1>
                <h3 id="valid-votes-percentage">0%</h3>
            </div>
        </div>
        <div class="ballot-container">
            <img src="src/assets/img/ballot_box.png" style="width: 200px; padding: 0 40px 20px 40px;">
            <div class="ballot-description">
                <!-- <h3>TOTAL SUARA MASUK</h3> -->
                <h1 style="font-size: 75px;" id="total-votes">0</h1>
                <p style="font-size: 25px; font-weight: bold;">SUARA</p>
                <p style="font-size: 15px;">Dari <span style="font-weight: bold;" id="received-TPS">0</span> TPS dengan
                    <span id="unprocessed-TPS" style="font-weight: bold;">0</span> belum diproses dan <span id="error-TPS"
                        style="font-weight: bold;">0</span> <a style="font-weight: 100; color: #D34E24"
                        href="https://kawalpemilu.org/">bermasalah</a></p>
                <p>Update terakhir pada <span id="last-update"></span></p>
            </div>
        </div>
        <div class="ballot-container">
            <img src="src/assets/img/invalid.png" style="width: 100px;">
            <div class="validity-description">
                <!-- <h3>SUARA SAH</h3> -->
                <h1 id="invalid-votes">0</h1>
                <h3 id="invalid-votes-percentage">0%</h3>
            </div>
        </div>
    </div>
    <div class="container" id="president">
        <div class="vote-container">
            <img src="src/assets/img/jokowi_maruf.png" style="width: 200px;">
            <div class="vote-description">
                <h3>JOKOWI-MA'RUF</h3>
                <h1 id="jokomaruf-vote">0</h1>
                <h3 id="jokomaruf-vote-percentage">0%</h3>
            </div>
        </div>
        <div class="vote-container">
            <div class="vote-description">
                <h3>PRABOWO-SANDI</h3>
                <h1 id="prabowosandi-vote">0</h1>
                <h3 id="prabowosandi-vote-percentage">0%</h3>
            </div>
            <img src="src/assets/img/prabowo_sandi.png" style="width: 200px;">
        </div>
    </div> 
    <div id="map" style="text-align: center; margin-bottom: 40px;">
    </div>
    <div class="container">
        <p text-align: center;">Built using Js and <a href="http://kawalpemilu.org">KawalPemilu</a> API by <a href="#">Muhammad Farid H</a>.</p>
    </div>


    <div id="window-panel">
    </div>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>      
     <script type="module" src="src/js/main.js"></script>
     <script>
     $(document).ready(function() {
        setInterval(function() {
            cache_clear()
        }, 3000);
     });

    function cache_clear() {
        window.location.reload(true);
    }
     </script>
</body>
</html>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productos</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }

        #formulario {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            margin: auto;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
        }

        input[type="text"],
        input[type="number"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }

        input[type="submit"], input[type="reset"] {
            background-color: #5cb85c;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
            margin-top: 2%;
        }

        .error{
            border-color: red !important;
        }

        img{
            max-width: 150px;
        }

        #caja_padre_productos{
            padding: 5%;
        } 

        #caja_padre_productos div{
            text-align: center;
            border: 2px solid black;
            border-radius: 10px;
            padding: 2%;
            margin-bottom: 5%;
            background-color: #ececec7c;
        }

        #caja_padre_productos div:hover{
            transform: translateY(-5px);
        }

        #caja_padre_productos div button{
            margin: 2%;
            border-radius: 5px;
        }

        #titulo{
            text-align: center;
        }

        select{
            margin-bottom: 5%;
        }

        #aceptar_cambios{
            display: none;
        }
    </style>
</head>
<body>
    <form id="formulario">
        <div id="titulo">
            <h4>Formulario</h4>
        </div>
        <label for="id">ID</label>
        <input type="number" id="id">

        <label for="descripcion">Descripción</label>
        <input type="text" id="descripcion">

        <label for="categoria">Categoria</label>
        <select name="categoria" id="categoria">
            <?php
                //Realizamos la conexión
                $host="localhost";
                $nombre_bd="productos";
                $usuario_bd="root";
                $pass_bd="";

                $base_datos = new mysqli($host, $usuario_bd, $pass_bd, $nombre_bd);
                // Verificar conexión
                if ($base_datos->connect_error) {
                    die("Error en la conexión: " . $mysqli->connect_error);
                }

                $resultado = $base_datos->query("SELECT * FROM productos.categoria");

                while($producto = $resultado->fetch_assoc()){
                    echo "<option value='".$producto["nombre"]."'>".$producto["nombre"]."</option>";
                }

                $base_datos->close();
            ?>
        </select>

        <label for="imagen">URL de la Imagen</label>
        <input type="text" id="url_imagen">

        <label for="precio">Precio</label>
        <input type="number" id="precio">

        <label for="stock">Stock</label>
        <input type="number" id="stock">

        <input type="submit" id="enviar">
        <input type="reset" id="resetear">
        <input type="submit" id="aceptar_cambios" value="Aceptar cambios">
        <div id="caja_padre_productos"></div>
    </form>
</body>
<script src="productos_javascript.js"></script>
</html>
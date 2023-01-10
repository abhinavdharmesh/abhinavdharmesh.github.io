<?php

  // Open the "count.txt" file for reading and writing

  $file = fopen("count.txt", "r+");

  

  // Lock the file to prevent concurrent access

  flock($file, LOCK_EX);

  

  // Read the current count from the file

  $count = intval(fread($file, filesize("count.txt")));

  

  // Increment the count

  $count++;

  

  // Write the new count back to the file

  fseek($file, 0);

  fwrite($file, $count);

  

  // Release the lock and close the file

  flock($file, LOCK_UN);

  fclose($file);

  

  // Return the current count

  echo $count;

?>


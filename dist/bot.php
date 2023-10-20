<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once('./config.php');

$botToken = $TOKEN;
$chatId = $CHAT_ID; 

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Compose the message
    $telegramMessage = "Name: $name\nEmail: $email\nMessage: $message";

    // Create the Telegram API URL
    $telegramApiUrl = "https://api.telegram.org/bot$botToken/sendMessage";

    // Prepare the data to send
    $postData = array(
        'chat_id' => $chatId,
        'text' => $telegramMessage,
    );

    // Initialize cURL session
    $ch = curl_init($telegramApiUrl);

    // Set cURL options
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Execute cURL session and get response
    $result = curl_exec($ch);

    // Check for cURL errors
    if (curl_errno($ch)) {
        $response = array(
            'success' => false,
            'error' => 'cURL Error: ' . curl_error($ch),
        );
    } else {
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if ($httpCode === 200) {
            $response = array(
                'success' => true,
                'message' => 'Thank you for your interest. You\'ll be contacted shortly.',
            );
        } else {
            $response = array(
                'success' => false,
                'error' => 'HTTP Error: ' . $httpCode,
            );
        }
    }

    // Close cURL session
    curl_close($ch);

    // Convert the response to JSON and echo it
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}
?>

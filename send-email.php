
<?php

// =====================================================
// GET DATA FROM FORM
// =====================================================

$project      = isset($_POST['project']) ? trim($_POST['project']) : '';
$name         = isset($_POST['name']) ? trim($_POST['name']) : '';
$email        = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone_number = isset($_POST['phone_number']) ? trim($_POST['phone_number']) : '';
$ip           = getUserIP();


// =====================================================
// 1. SEND LEAD TO ZOHO FLOW / CRM
// =====================================================

$zoho_webhook = "https://flow.zoho.in/60079714926/flow/webhook/incoming?zapikey=1001.883751ab621afa64ea0a10eed8c86572.8424d3baf6fa6625648d9b927e897350&isdebug=false";


// Data according to Zoho Flow
$data = array(
    "Project"    => $project,
    "Email"      => $email,
    "LeadSource" => "Google",
    "Phone"      => $phone_number,
    "Name"       => $name
);


// Convert data to JSON
$json_data = json_encode($data);


// cURL request to Zoho
$ch = curl_init($zoho_webhook);

curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Content-Type: application/json",
    "Content-Length: " . strlen($json_data)
));

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);


// Execute Zoho request
$zoho_response = curl_exec($ch);

$zoho_http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

$zoho_error = curl_error($ch);

curl_close($ch);


// Log Zoho response
error_log("Zoho HTTP Code: " . $zoho_http_code);
error_log("Zoho Response: " . $zoho_response);

if ($zoho_error) {
    error_log("Zoho CURL Error: " . $zoho_error);
}


// =====================================================
// 2. SEND EMAIL
// =====================================================

$to = "suneel@property-first.com";

$subject = "New CRM Lead - " . $project;


// Email message
$txt = "NEW LEAD INQUIRY\r\n";
$txt .= "================\r\n\r\n";

$txt .= "Project: " . $project . "\r\n";
$txt .= "Name: " . $name . "\r\n";
$txt .= "Email: " . $email . "\r\n";
$txt .= "Telephone: " . $phone_number . "\r\n";
$txt .= "IP Address: " . $ip . "\r\n";
$txt .= "Submission Date: " . date('Y-m-d H:i:s') . "\r\n";


// Email headers
$headers = "From: propertyfirstads@gmail.com\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";


if (!empty($email)) {

    if (mail($to, $subject, $txt, $headers)) {
        error_log("Email sent successfully");
    } else {
        error_log("Email failed to send");
    }

}


// =====================================================
// 3. REDIRECT TO THANK YOU PAGE
// =====================================================

header("Location: thankyou.html");
exit();


// =====================================================
// FUNCTION: GET USER IP
// =====================================================

function getUserIP()
{
    // Cloudflare IP
    if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
        return $_SERVER["HTTP_CF_CONNECTING_IP"];
    }


    // Client IP
    if (
        isset($_SERVER['HTTP_CLIENT_IP']) &&
        filter_var($_SERVER['HTTP_CLIENT_IP'], FILTER_VALIDATE_IP)
    ) {
        return $_SERVER['HTTP_CLIENT_IP'];
    }


    // Forwarded IP
    if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {

        $forwarded_ips = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);

        foreach ($forwarded_ips as $forwarded_ip) {

            $forwarded_ip = trim($forwarded_ip);

            if (filter_var($forwarded_ip, FILTER_VALIDATE_IP)) {
                return $forwarded_ip;
            }
        }
    }


    // Remote IP
    return $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
}

?>


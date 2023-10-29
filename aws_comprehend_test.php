<?php

require 'vendor/autoload.php';
use Aws\Comprehend\ComprehendClient;

$client = new ComprehendClient([
    'region' => 'ap-northeast-1',
    'version' => 'latest'
]);

$result = $client->detectSentiment([
    'LanguageCode' => 'ja', // REQUIRED
    'Text' => '続きが気になる', // REQUIRED
]);

echo $result;
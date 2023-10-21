<?php
require 'vendor/autoload.php';
use Aws\Comprehend\ComprehendClient;

$client = new ComprehendClient([
    'region' => 'ap-northeast-1',
    'version' => 'latest'
]);

// $detectedEntities = $client->detectEntities([
//     'LanguageCode' => 'ja',
//     'Text' => 'MCの徳井青空さんが「ウマ娘」を育成！『ファミ通presents ウマ娘研究会！』は4月25日（日）生放送　ゲストは青木瑠璃子さん'
// ]);

$result = $client->detectSentiment([
    'LanguageCode' => 'ja', // REQUIRED
    'Text' => '私はとても楽しいです', // REQUIRED
]);

echo $result;
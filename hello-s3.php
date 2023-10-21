<?php
require 'vendor/autoload.php';

use Aws\S3\S3Client;  
use Aws\Exception\AwsException;


/**
 * List your Amazon S3 buckets.
 *
 * This code expects that you have AWS credentials set up per:
 * https://docs.aws.amazon.com/sdk-for-php/v3/developer-guide/guide_credentials.html
 */

//Create a S3Client 
$s3Client = new S3Client([
    'profile' => 'default',
    'region' => 'ap-southeast-2',
    'version' => '2006-03-01'
]);

//Listing all S3 Bucket
$buckets = $s3Client->listBuckets();
foreach ($buckets['Buckets'] as $bucket) {
    echo $bucket['Name'] . "\n";
}
echo $buckets;
 
 

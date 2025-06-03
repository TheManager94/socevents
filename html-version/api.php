<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$method = $_SERVER['REQUEST_METHOD'];
$dataFile = 'events-data.json';

// Initialize default data if file doesn't exist
if (!file_exists($dataFile)) {
    $defaultData = [
        'upcoming' => [
            [
                'id' => 1,
                'title' => 'Booster',
                'subtitle' => '2025',
                'venue' => 'S12',
                'date' => 'Juho 1.22',
                'price' => '553',
                'status' => 'Art',
                'image' => 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&q=80',
                'cardType' => 'blue',
                'buttonStyle' => 'default',
                'description' => 'Ein unvergessliches Konzert-Erlebnis mit internationalen Künstlern und einer spektakulären Bühnenshow.',
                'fullDate' => '1. Juli 2022',
                'startTime' => '20:00',
                'endTime' => '02:00',
                'category' => 'Konzert',
                'ageRestriction' => '18+',
                'ticketsAvailable' => 1250
            ]
        ],
        'past' => [
            [
                'id' => 4,
                'title' => 'Summer',
                'subtitle' => 'Festival 2024',
                'venue' => 'Stadtpark',
                'date' => 'Aug 15.24',
                'price' => '75',
                'status' => 'Sold Out',
                'image' => 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80',
                'cardType' => 'blue',
                'buttonStyle' => 'default',
                'description' => 'Ein unvergessliches Sommerfestival mit über 20 Künstlern aus verschiedenen Genres.',
                'fullDate' => '15. August 2024',
                'startTime' => '14:00',
                'endTime' => '02:00',
                'category' => 'Festival',
                'ageRestriction' => '16+',
                'ticketsAvailable' => 0
            ]
        ]
    ];
    file_put_contents($dataFile, json_encode($defaultData, JSON_PRETTY_PRINT));
}

switch ($method) {
    case 'GET':
        // Return all events
        $events = json_decode(file_get_contents($dataFile), true);
        echo json_encode($events);
        break;

    case 'POST':
        // Add or update events
        $input = json_decode(file_get_contents('php://input'), true);

        if (isset($input['events'])) {
            // Full events update
            file_put_contents($dataFile, json_encode($input['events'], JSON_PRETTY_PRINT));
            echo json_encode(['success' => true, 'message' => 'Events updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid data format']);
        }
        break;

    case 'DELETE':
        // Reset to default data
        unlink($dataFile);
        echo json_encode(['success' => true, 'message' => 'Events reset to default']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>

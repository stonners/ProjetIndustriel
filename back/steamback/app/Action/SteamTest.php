<?php


namespace App\Action;

use App\Core\Controller\AbstractController;
use Elasticsearch\ClientBuilder;

class SteamTest extends AbstractController
{
    public function __invoke()
    {
        $games = [];
        $test = [];
        for ($i = 1; $i < 100; $i++) {
            $client = ClientBuilder::create()->build();
            $params = [
                'index' => 'steam',
                'id' => $i
            ];
            $response = $client->get($params);
            array_push($games, $response);
        };
        print_r($games);

        return $this->render('steam/steamtest.html.twig', ['games' => $games]);
    }
}

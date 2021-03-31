<?php


namespace App\Action;

use App\Core\Controller\AbstractController;
use Elasticsearch\ClientBuilder;

class SteamGame extends AbstractController
{
    public function __invoke()
    {
        $games = [];

        $client = ClientBuilder::create()->build();
        $params = [
            'index' => 'steam',
            'id'    => '26000'
        ];
        $response = $client->get($params);
        array_push($games, $response);

        $params = [
            'index' => 'steam',
            'id'    => '1'
        ];
        $response = $client->get($params);
        array_push($games, $response);


        return $this->render('steam/steamgamelist.html.twig', ['games' => $games]);
    }
}

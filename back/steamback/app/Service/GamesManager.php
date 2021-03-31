<?php

namespace App\Service;

use Elasticsearch\ClientBuilder;

class GamesManager
{

    public function getFirstsGames($pageid){

        $games = [];

        if ($pageid == 1){
            $idgame = 1;
        } else {
            $idgame = 20 * $pageid;
        }

        for ($i = $idgame; $i < $idgame+20; $i++) {
            $client = ClientBuilder::create()->build();
            $params = [
                'index' => 'steam',
                'id' => $i
            ];
            $response = $client->get($params);
            array_push($games, $response);
        };

        return $games;
    }
}

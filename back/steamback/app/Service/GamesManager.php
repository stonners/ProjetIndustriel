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

            $paramsimg=[
                'index' => 'steam_media_data',
                'body' => [
                    'query' => [
                        'match' => [
                            'steam_appid' => $response['_source']['appid']
                        ]
                    ]
                ]
            ];

            $img = $client->search($paramsimg);
            $game = ['appid' =>$response['_source']['appid'],
                'name' => $response['_source']['name'],
                'publisher'=>$response['_source']['publisher'],
                'header_image'=>$img['hits']['hits'][0]['_source']['header_image']
            ];
            array_push($games, $game);
        };

        return $games;
    }

    public function getGame($appid){
        $client = ClientBuilder::create()->build();
        $params=[
            'index' => 'steam',
            'body' => [
                'query' => [
                    'match' => [
                        'appid' => $appid
                    ]
                ]
            ]
        ];
        $gameinfo = $client->search($params);

        $paramsdescription=[
            'index' => 'steam_description_data',
            'body' => [
                'query' => [
                    'match' => [
                        'steam_appid' => $appid
                    ]
                ]
            ]
        ];
        $gamedescription = $client->search($paramsdescription);

        $paramsmedia=[
            'index' => 'steam_media_data',
            'body' => [
                'query' => [
                    'match' => [
                        'steam_appid' => $appid
                    ]
                ]
            ]
        ];
        $gamemedia = $client->search($paramsmedia);

        $paramsrequirement=[
            'index' => 'steam_requirements_data',
            'body' => [
                'query' => [
                    'match' => [
                        'steam_appid' => $appid
                    ]
                ]
            ]
        ];
        $gamerequirements = $client->search($paramsrequirement);

        $paramssupportinfo=[
            'index' => 'steam_support_info',
            'body' => [
                'query' => [
                    'match' => [
                        'steam_appid' => $appid
                    ]
                ]
            ]
        ];
        $gamesupportinfo = $client->search($paramssupportinfo);


        $game = [
            'steam' => $gameinfo['hits']['hits'][0]['_source'],
            'description' => $gamedescription['hits']['hits'][0]['_source'],
            'media' => $gamemedia['hits']['hits'][0]['_source'],
            'requirements' => $gamerequirements['hits']['hits'][0]['_source'],
            'support' => $gamesupportinfo['hits']['hits'][0]['_source']
        ];

        return $game;

    }
}

<?php

use App\Action\Home;
use App\Action\User;
use App\Core\Routing\Route;
use App\Action\SteamGame;
use App\Action\SteamTest;

use App\Action\API\GetFirstsGames;

return [
    new Route('/', Home::class, 'GET'),
    new Route('/user/{userName}', User::class, 'GET'),
    new Route('/steamlist', SteamGame::class, 'GET'),
    new Route('/steamtest', SteamTest::class, 'GET'),

    new Route('/api/getfirstgames', GetFirstsGames::class, 'GET'),
];


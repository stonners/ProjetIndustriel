<?php

use App\Action\Home;
use App\Action\User;
use App\Core\Routing\Route;
use App\Action\SteamGame;

return [
    new Route('/', Home::class, 'GET'),
    new Route('/user/{userName}', User::class, 'GET'),
    new Route('/steamlist', SteamGame::class, 'GET'),
];


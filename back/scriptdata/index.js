const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200/' });
const csv = require('csv-parser');
const fs = require('fs');
let results= [];
let compteur = 0;

fs.createReadStream('steam_csvs/steam.csv')
    .pipe(csv({}))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        results.forEach(result => {
                compteur++;
                createSteam(result, compteur).catch(console.log);
            }
        );
        compteur=0;
        results=[];
    });

fs.createReadStream('steam_csvs/steam_description_data.csv')
    .pipe(csv({}))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        results.forEach(result => {
                compteur++;
                createSteamDescription(result, compteur).catch(console.log);
            }
        );
        compteur=0;
        results=[];
    });

fs.createReadStream('steam_csvs/steam_media_data.csv')
    .pipe(csv({}))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        results.forEach(result => {
                compteur++;
                createSteamMedia(result, compteur).catch(console.log);
            }
        );
        compteur=0;
        results=[];
    });

fs.createReadStream('steam_csvs/steam_requirements_data.csv')
    .pipe(csv({}))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        results.forEach(result => {
                compteur++;
                createSteamRequirements(result, compteur).catch(console.log);
            }
        );
        compteur=0;
        results=[];
    });

fs.createReadStream('steam_csvs/steam_support_info.csv')
    .pipe(csv({}))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        results.forEach(result => {
                compteur++;
                createSteamSupport(result, compteur).catch(console.log);
            }
        );
        compteur=0;
        results=[];
    });

// fs.createReadStream('steam_csvs/steamspy_tag_data.csv')
//     .pipe(csv({}))
//     .on('data', (data) => results.push(data))
//     .on('end', () => {
//         console.log(results);
//     });

async function createSteam(result, id) {
    const { response } = await client.create({
        index: 'steam',
        id: id,
        body: {
            appid: result.appid,
            name: result.name,
            release_date: result.release_date,
            english: result.english,
            developer: result.developer,
            publisher: result.publisher,
            platforms: result.platforms,
            required_age: result.required_age,
            categories: result.categories,
            genres: result.genres,
            steamspy_tags: result.steamspy_tags,
            achievements: result.achievements,
            positive_ratings: result.positive_ratings,
            negative_ratings: result.negative_ratings,
            average_playtime: result.average_playtime,
            median_playtime: result.average_playtime,
            owners: result.owners,
            price: result.price
        }
    });
}

async function createSteamDescription(result, id) {
    const { response } = await client.create({
        index: 'steam_description_data',
        id: id,
        body: {
            steam_appid: result.steam_appid,
            detailed_description: result.detailed_description,
            about_the_game: result.about_the_game,
            short_description: result.short_description,
        }
    });
}

async function createSteamMedia(result, id) {
    const { response } = await client.create({
        index: 'steam_media_data',
        id: id,
        body: {
            steam_appid: result.steam_appid,
            header_image: result.header_image,
            screenshots: result.screenshots,
            background: result.background,
            movies: result.movies,
        }
    });
}

async function createSteamRequirements(result, id) {
    const { response } = await client.create({
        index: 'steam_requirements_data',
        id: id,
        body: {
            steam_appid: result.steam_appid,
            pc_requirements: result.pc_requirements,
            mac_requirements: result.mac_requirements,
            linux_requirements: result.linux_requirements,
            minimum: result.minimum,
            recommended: result.recommended,
        }
    });
}

async function createSteamSupport(result, id) {
    const { response } = await client.create({
        index: 'steam_support_info',
        id: id,
        body: {
            steam_appid: result.steam_appid,
            website: result.website,
            support_url: result.support_url,
            support_email: result.support_email,
        }
    });
}

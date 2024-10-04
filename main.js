import {BentoCache, bentostore} from "bentocache";
import {memoryDriver} from "bentocache/drivers/memory";
import {redisBusDriver, redisDriver} from "bentocache/drivers/redis";

const bento = new BentoCache({
    default: 'multi',
    stores: {
        multi: bentostore()
            .useL1Layer(memoryDriver({maxSize: 10_000}))
            .useL2Layer(redisDriver({}))
            .useBus(redisBusDriver({}))
    }
});


async function main() {
    await bento.namespace('products').set('some', 'value');

    setInterval(async () => {
        console.log(new Date(), await bento.namespace('products').get('some'));
    }, 500);
}


async function clear() {
    await bento.namespace('products').clear();
    console.log('cleared products');
}

if (process.argv[2] === 'clear') {
    clear().finally(() => process.exit(0))
} else {
    main();
}
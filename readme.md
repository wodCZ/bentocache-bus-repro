# How to start this

```bash
docker compose up -d # start redis
npm i
node main.js # start the loop that checks namespaced cache value

# in another terminal
node main.js clear # clear the namespace from another instance
```


## Expected result

The first instance should start logging `undefined` when the cache is cleared from the second instance.


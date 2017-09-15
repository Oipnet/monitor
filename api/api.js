const server = require('http').createServer()
const io = require('socket.io')(server)
const os = require('os');

function cpuAverage() {
    //Initialise sum of idle and time of cores and fetch CPU info
    var totalIdle = 0, totalTick = 0;
    var cpus = os.cpus();

    //Loop through CPU cores
    for(var i = 0, len = cpus.length; i < len; i++) {

    //Select CPU core
    var cpu = cpus[i];

    //Total up the time in the cores tick
    for(type in cpu.times) {
        totalTick += cpu.times[type];
    }     

    //Total up the idle time of the core
    totalIdle += cpu.times.idle;
    }

    //Return the average Idle and Tick times
    return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
}

io.on('connection', (client) => {
    var startMeasure = cpuAverage();
    setInterval(() => {
        var endMeasure = cpuAverage();

        var idleDifference = endMeasure.idle - startMeasure.idle;
        var totalDifference = endMeasure.total - startMeasure.total;

        var percentageCPU = 100 - (100 * idleDifference / totalDifference);
        io.sockets.emit('cpu:data', percentageCPU);
        
        startMeasure = cpuAverage();
    }, 10000)
});

io.on('connection', (client) => {
    setInterval(() => {
        var totalMemory = os.totalmem();
        var digit = totalMemory.toString()[0];
        console.log(digit);
        io.sockets.emit('totalMemory:data', digit);
    }, 10000)
});


server.listen(3000, () => {
    console.log('API listening on port 3000');
});
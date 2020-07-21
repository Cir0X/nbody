import simulate from './simulation.js';

function startSimulation() {
    const multiplier = 1;
    var n = parseInt(document.getElementById('n-input').value) * multiplier;
    console.log('simulating', n, 'planets');

    const result = [];

    for (var i = 0; i < 10; ++i ) {
        console.log(i);
        n *= 10;
        const start = performance.now();
        simulate(n, n);
        const end = performance.now();
        const timeTaken = end - start;
        console.log(n, 'runs with', n, 'planets took', timeTaken, 'ms');
        result.push({n: n, runs: n, timeTaken: timeTaken});
    }

    console.log(JSON.stringify(result));
    console.table(result);
}

window.startSimulation = startSimulation;
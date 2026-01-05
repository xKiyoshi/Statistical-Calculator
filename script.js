document.getElementById("calculate").addEventListener("click", function () {
    const dataset = document.getElementById("dataset").value.split(",").map(Number);
    const weights = document.getElementById("weights").value.split(",").map(Number);

    if (dataset.includes(NaN)) {
        alert("Please enter valid numbers in the dataset.");
        return;
    }

    // Mean
    const mean = dataset.reduce((a, b) => a + b, 0) / dataset.length;

    // Median
    const sorted = [...dataset].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    // Mode
    const freqMap = {};
    dataset.forEach((num) => (freqMap[num] = (freqMap[num] || 0) + 1));
    const maxFreq = Math.max(...Object.values(freqMap));
    const mode = Object.keys(freqMap).filter((key) => freqMap[key] === maxFreq);

    // Variance
    const variance = dataset.reduce((a, b) => a + (b - mean) ** 2, 0) / dataset.length;

    // Standard Deviation
    const stdDev = Math.sqrt(variance);

    // Weighted Mean
    let weightedMean = "N/A";
    if (weights.length === dataset.length) {
        const totalWeights = weights.reduce((a, b) => a + b, 0);
        weightedMean = dataset.reduce((sum, val, i) => sum + val * weights[i], 0) / totalWeights;
    }

    // Display results
    document.getElementById("meanResult").textContent = `Mean: ${mean.toFixed(2)}`;
    document.getElementById("medianResult").textContent = `Median: ${median}`;
    document.getElementById("modeResult").textContent = `Mode: ${mode.join(", ")}`;
    document.getElementById("varianceResult").textContent = `Variance: ${variance.toFixed(2)}`;
    document.getElementById("stdDevResult").textContent = `Standard Deviation: ${stdDev.toFixed(2)}`;
    document.getElementById("weightedMeanResult").textContent = `Weighted Mean: ${weightedMean}`;
});

document.getElementById("calculateCorrelation").addEventListener("click", function () {
    const datasetX = document.getElementById("datasetX").value.split(",").map(Number);
    const datasetY = document.getElementById("datasetY").value.split(",").map(Number);

    if (datasetX.length !== datasetY.length || datasetX.includes(NaN) || datasetY.includes(NaN)) {
        alert("Ensure both datasets are valid and have the same length.");
        return;
    }

    // Calculate correlation
    const n = datasetX.length;
    const meanX = datasetX.reduce((a, b) => a + b) / n;
    const meanY = datasetY.reduce((a, b) => a + b) / n;

    let numerator = 0, denominatorX = 0, denominatorY = 0;
    for (let i = 0; i < n; i++) {
        const diffX = datasetX[i] - meanX;
        const diffY = datasetY[i] - meanY;
        numerator += diffX * diffY;
        denominatorX += diffX ** 2;
        denominatorY += diffY ** 2;
    }

    const correlation = numerator / Math.sqrt(denominatorX * denominatorY);
    document.getElementById("correlationResult").textContent = `Correlation Coefficient: ${correlation.toFixed(2)}`;
});

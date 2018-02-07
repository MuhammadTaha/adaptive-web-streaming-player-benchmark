export class BenchmarkMetrics {
    constructor() {
        this.manifestLoad = 0;
        this.streamInitialised = 0;
        this.playbackStartDelay = 0;
        this.qualityChangeDelay = 0;
        this.playbackSeekingDelay = 0;
        this.playbackRate = 0;
        this.bufferStableTime = 0;
        this.droppedFrames = 0;
        this.bufferLevel = new Array();

    }
}
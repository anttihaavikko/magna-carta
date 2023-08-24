import { CPlayer } from "./audio-player";
import { zzfx } from "./zzfx";

export class AudioManager {
    private started = false;
    private audio: HTMLAudioElement;
    private loaded: boolean;

    public prepare(song: any): void {
        if(this.started) return;

        this.audio = document.createElement("audio");
        this.started = true;

        const player = new CPlayer();
        player.init(song);
        player.generate();
        this.loaded = false;

        const timer = setInterval(() => {
            if (this.loaded) return;
            this.loaded = player.generate() >= 1;
            if (this.loaded) {
                var wave = player.createWave();
                this.audio.src = URL.createObjectURL(new Blob([wave], { type: "audio/wav" }));
                this.audio.loop = true;
                clearInterval(timer);
            }
        }, 5);
    }

    public play(): void {
        const timer = setInterval(() => {
            if (!this.loaded) return;
            this.audio.play();
            clearInterval(timer);
        }, 5);
        
        // restart early for better looping
        // this.audio.addEventListener('timeupdate', () => {
        //     if(this.audio.currentTime > this.audio.duration - 0.21) {
        //         this.audio.currentTime = 0;
        //         this.audio.play();
        //     }
        // });
    }

    public bark(): void {
        // zzfx(...[1.28,,94,.03,,.06,2,.08,,,-311,.13,.03,,,.1,,.29,.04,.52]);
        // zzfx(...[2.39,,146,,,.19,1,1.91,,.9,,,.09,.9,-2.3,.4,.35]);

        // zzfx(...[1.01,,429,.03,.03,.04,2,.68,2.2,1.9,,,,.1,,.1,,.98,.01]);
        // zzfx(...[,,1520,.04,,.07,,2.78,24,49,,,,.7,36,,,.2,.11]);

        zzfx(...[1.06,,23,.1,,0,4,2.38,-0.5,14,,,.01,.2]);
        zzfx(...[1.02,,158,.14,,0,3,2.84,2,,,,.06,,-0.1,,,.29,,.39]);
        zzfx(...[2.46,,56,.03,.03,.12,1,2.59,-3.9,,,,,.8,,.4,.16,.63,.06]);
    }

    public thud(): void {
    }

    public pop(): void {
    }
}
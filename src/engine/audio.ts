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
        zzfx(...[1.06,,23,.1,,0,4,2.38,-0.5,14,,,.01,.2]);
        zzfx(...[1.02,,158,.14,,0,3,2.84,2,,,,.06,,-0.1,,,.29,,.39]);
        zzfx(...[2.46,,56,.03,.03,.12,1,2.59,-3.9,,,,,.8,,.4,.16,.63,.06]);
        zzfx(...[1,,79,.12,.03,.01,1,.69,60,,,,,.1,,.1,.42,,.11]);
    }

    public pick(): void {
        zzfx(...[1.03,,712,.01,.1,.06,,.2,-36,,,,,,,,,.05]);
        zzfx(...[2.03,,429,.03,.02,0,,3,-18,,,,,,,,.13,.76,.01]);
    }

    public drop(): void {
        zzfx(...[.3,,36,,.09,.12,,.35,,,-833,.05,.09,,,,,.77,,.01]);
        zzfx(...[.8,,712,.01,.1,.06,,.2,-36,,,,,,,,,.05]);
        zzfx(...[1.5,,538,,.01,.01,,.89,,-29,,,,.1,,,.11]);
    }

    public rotate(): void {
        zzfx(...[1,,26,.23,.02,.17,1,.44,-0.9,,,,,.1,,,.21,,,.01]);
        zzfx(...[20,,6,,,.02,4,.33,,,,,.09,,170,,.33,.48,.12]);
        zzfx(...[1.01,,437,.02,.05,.09,,1.55,7.5,3.5,,,,1,,,,.48,.01]);
    }

    public appear(): void {
        zzfx(...[.2,,233,.01,.06,.07,1,1.8,7.1,,,,,1.9,,,,.95,.05]);
        zzfx(...[.3,,93,.01,.08,.06,1,1.28,-14,,,,,,,,,.54,.1]);
        zzfx(...[.5,,365,.03,.02,.09,,1.2,-1,-0.5,,,,1.2,,,,.89,.07]);
    }

    public blip(): void {
        zzfx(...[1.5,,538,,.01,.01,,.89,,-29,,,,.1,,,.11]);
    }

    public thud(): void {
    }

    public pop(): void {
    }
}
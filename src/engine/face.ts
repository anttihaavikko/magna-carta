import { drawCircle, drawEllipse } from "./drawing";
import { Entity } from "./entity";
import { moveTowards } from "./math";
import { Mouse } from "./mouse";

export class Face extends Entity {
    private openess = 0;
    private targetOpeness = 0;
    private tick: number;
    private closeTimer: any;

    constructor(private blushColor: string) {
        super(0, 0, 0, 0);
    }

    public update(tick: number, mouse: Mouse): void {
        super.update(tick, mouse);
        this.tick = tick;
        // this.openess = Math.abs(Math.sin(tick * 0.01));
        this.openess = moveTowards(this.openess, this.targetOpeness, 0.075);
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        drawCircle(ctx, { x: -50, y: 0 }, 10, "#000");
        drawCircle(ctx, { x: 50, y: 0 }, 10, "#000");

        drawEllipse(ctx, { x: -65, y: 20 }, 15, 10, this.blushColor);
        drawEllipse(ctx, { x: 65, y: 20 }, 15, 10, this.blushColor);

        // mouth
        ctx.beginPath();
        ctx.lineWidth = 7;
        ctx.strokeStyle = "#000";
        ctx.fillStyle = "#000";
        ctx.moveTo(-40, 20);
        ctx.quadraticCurveTo(0, 40 - 20 * this.openess, 40, 20);
        ctx.quadraticCurveTo(0, 40 + 60 * this.openess, -40, 20);
        ctx.stroke();
        ctx.fill();
    }

    public openMouth(amount: number, closeDelay: number): void {
        clearTimeout(this.closeTimer);
        this.targetOpeness = amount;
        this.closeTimer = setTimeout(() => this.closeMouth(), closeDelay * 1000);
    }

    public closeMouth(): void {
        this.targetOpeness = 0;
    }
}
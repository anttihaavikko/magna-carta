import { roundRect } from "./engine/drawing";
import { Entity } from "./engine/entity";
import { Mouse } from "./engine/mouse";
import { transformTo } from "./engine/transformer";
import { ZERO } from "./engine/vector";

export class Bubble extends Entity {
    private messages: string[] = [];

    constructor(width: number, height: number) {
        super(0, 0, width, height);
    }

    public update(tick: number, mouse: Mouse): void {
        super.update(tick, mouse);
    }

    public show(messages: string[]): void {
        this.messages = messages;
        this.tween.scale({ x: 1, y: 1}, 0.5);
    }

    public hide(): void {
        this.tween.scale({ x: 0, y: 0}, 0.3);
        setTimeout(() => this.messages = [], 300);
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        transformTo(ctx, 20, this.s.y - 20, 0, this.scale.x, this.scale.y);

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 10;
        ctx.fillStyle = "#000";

        roundRect(ctx, 0, 0, this.s.x, this.s.y, 20);
        ctx.fill();

        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.moveTo(20, this.s.y - 20);
        ctx.quadraticCurveTo(50, this.s.y - 20, 0, this.s.y + 40);
        ctx.quadraticCurveTo(100, this.s.y, 100, this.s.y - 20);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#fff";
        roundRect(ctx, 10, 10, this.s.x - 20, this.s.y - 20, 20);
        ctx.fill();

        ctx.fillStyle = "#000";
        ctx.font = "30px arial black";
        const off = 22;
        if(this.messages[0]) ctx.fillText(this.messages[0], this.s.x * 0.5, this.s.y * 0.5 - 30 - off);
        if(this.messages[1]) ctx.fillText(this.messages[1], this.s.x * 0.5, this.s.y * 0.5 + 10 - off);
        if(this.messages[2]) ctx.fillText(this.messages[2], this.s.x * 0.5, this.s.y * 0.5 + 50 - off);
        if(this.messages[3]) ctx.fillText(this.messages[3], this.s.x * 0.5, this.s.y * 0.5 + 90 - off);

        ctx.restore();
    }
}
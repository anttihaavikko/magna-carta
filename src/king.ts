import { Bubble } from "./bubble";
import { blushColor, capeColor, crownColor, shirtColor, skinColor } from "./colors";
import { drawCircle } from "./engine/drawing";
import { Entity } from "./engine/entity";
import { Face } from "./engine/face";
import { Mouse } from "./engine/mouse";
import { transformTo } from "./engine/transformer";
import { Tween, easeQuadOut } from "./engine/tween";
import { offset } from "./engine/vector";

export class King extends Entity {
    private phase = 0;
    private face = new Face(blushColor);
    private bubble = new Bubble(430, 220);

    private showTimer: any;

    constructor() {
        super(200, 1150, 0, 0);
        this.tween = new Tween(this, easeQuadOut);
        this.bubble.scale = { x: 0, y: 0 };
        this.showTimer = setTimeout(() => this.show([
            "Hey there! Could",
            "you be so kind to",
            "fit all this content",
            "on that parchment?"
        ]), 500);
    }

    public hideBubble(): void {
        clearTimeout(this.showTimer);
        this.bubble.hide();
    }

    public showMessage(messages: string[]): void {
        this.bubble.show(messages);
    }

    public show(messages: string[]): void {
        this.tween.move({ x: 200, y: 650 }, 0.4);
        setTimeout(() => this.bubble.show(messages), 500);
    }

    public hide(): void {
        this.bubble.hide();
        this.tween.move({ x: 200, y: 1150}, 0.4);
    }

    public update(tick: number, mouse: Mouse): void {
        super.update(tick, mouse);
        this.phase = Math.abs(Math.sin(tick * 0.0025)) * 0.8;
        this.bubble.update(tick, mouse);
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        transformTo(ctx, this.p.x, this.p.y, 0, 0.9, 0.9);
        // head outline
        drawCircle(ctx, offset(this.p, 0, -300 - this.phase * 20), 100, "#000");
        // ears outline
        drawCircle(ctx, offset(this.p, -98, -300 - this.phase * 30), 25, "#000");
        drawCircle(ctx, offset(this.p, 98, -300 - this.phase * 30), 25, "#000");

        // body
        ctx.beginPath();
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 10;
        ctx.fillStyle = capeColor;
        ctx.moveTo(this.p.x - 150 + this.phase * 7, this.p.y + 20);
        ctx.quadraticCurveTo(this.p.x, this.p.y - 500 - this.phase * 50, this.p.x + 150 - this.phase * 7, this.p.y + 20);
        // ctx.lineTo(this.p.x - 100, this.p.y);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.moveTo(this.p.x - 55, this.p.y - 200 - this.phase * 15);
        ctx.quadraticCurveTo(this.p.x, this.p.y - 300, this.p.x + 55, this.p.y - 200 - this.phase * 15);
        ctx.quadraticCurveTo(this.p.x, this.p.y - 160 - this.phase * 10, this.p.x - 55, this.p.y - 200 - this.phase * 15);
        ctx.fill();

        // head filling
        drawCircle(ctx, offset(this.p, 0, -300 - this.phase * 20), 90, skinColor);
        // ears
        drawCircle(ctx, offset(this.p, -98, -300 - this.phase * 30), 15, skinColor);
        drawCircle(ctx, offset(this.p, 98, -300 - this.phase * 30), 15, skinColor);

        // crown
        ctx.lineWidth = 20;
        ctx.fillStyle = crownColor;
        ctx.beginPath();
        ctx.moveTo(this.p.x - 75, this.p.y - 370 - this.phase * 25);
        ctx.quadraticCurveTo(this.p.x, this.p.y - 360 - this.phase * 25, this.p.x + 75, this.p.y - 370 - this.phase * 25);
        ctx.lineTo(this.p.x + 75, this.p.y - 450 - this.phase * 25);
        ctx.lineTo(this.p.x + 37, this.p.y - 420 - this.phase * 25);
        ctx.lineTo(this.p.x, this.p.y - 460 - this.phase * 25);
        ctx.lineTo(this.p.x - 37, this.p.y - 420 - this.phase * 25);
        ctx.lineTo(this.p.x - 75, this.p.y - 450 - this.phase * 25);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        // shirt
        ctx.fillStyle = shirtColor;
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(this.p.x - 55, this.p.y - 200 - this.phase * 15);
        ctx.quadraticCurveTo(this.p.x, this.p.y - 90, this.p.x - 50, this.p.y + 30);
        ctx.lineTo(this.p.x + 50, this.p.y + 30);
        ctx.quadraticCurveTo(this.p.x, this.p.y - 90, this.p.x + 55, this.p.y - 200 - this.phase * 15);
        ctx.lineTo(this.p.x + 50, this.p.y - 200 - this.phase * 15);
        ctx.quadraticCurveTo(this.p.x, this.p.y - 150 - this.phase * 15, this.p.x - 55, this.p.y - 200 - this.phase * 15);
        ctx.fill();
        ctx.stroke();

        // collars
        ctx.lineWidth = 44;
        ctx.setLineDash([0, 25]);
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(this.p.x - 55, this.p.y - 200 - this.phase * 15);
        ctx.quadraticCurveTo(this.p.x, this.p.y - 90, this.p.x - 50, this.p.y + 30);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.p.x + 55, this.p.y - 200 - this.phase * 15);
        ctx.quadraticCurveTo(this.p.x, this.p.y - 90, this.p.x + 50, this.p.y + 30);
        ctx.stroke();

        ctx.lineWidth = 27;
        ctx.strokeStyle = "#fff";

        ctx.beginPath();
        ctx.moveTo(this.p.x - 55, this.p.y - 200 - this.phase * 15);
        ctx.quadraticCurveTo(this.p.x, this.p.y - 90, this.p.x - 50, this.p.y + 30);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.p.x + 55, this.p.y - 200 - this.phase * 15);
        ctx.quadraticCurveTo(this.p.x, this.p.y - 90, this.p.x + 50, this.p.y + 30);
        ctx.stroke();

        ctx.setLineDash([]);

        ctx.save();
        ctx.translate(this.p.x, this.p.y - 290 - this.phase * 45);
        this.face.draw(ctx);
        ctx.restore();

        ctx.save();
        ctx.translate(this.p.x + 130, this.p.y - 500 - this.phase * 60);
        this.bubble.draw(ctx);
        ctx.restore();

        ctx.restore();
    }
}
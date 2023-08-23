import { blushColor, capeColor, shirtColor, skinColor } from "./colors";
import { drawCircle, drawEllipse } from "./engine/drawing";
import { Entity } from "./engine/entity";
import { Face } from "./engine/face";
import { Mouse } from "./engine/mouse";
import { random } from "./engine/random";
import { transformTo } from "./engine/transformer";
import { Tween, easeBounceOut, easeQuadOut } from "./engine/tween";
import { offset } from "./engine/vector";

export class Dog extends Entity {
    private phase = 0;
    private face = new Face(blushColor);
    private visible = true;
    private diff = 250;
    private rotation = 0;

    constructor() {
        super(450, 1150, 0, 0);
        this.tween = new Tween(this, easeBounceOut);

        this.show();
    }

    public peek(): void {
        if(this.visible) {
            this.hide();
            return;
        }

        this.diff = random(-500, 500);
        this.rotation = Math.random() < 0.7 ? 0 : 1;
        this.show();
        setTimeout(() => this.hide(), 900);
    }

    public show(): void {
        this.visible = true;
        this.tween.move({ x: this.p.x, y: 650 }, 0.4);
    }

    public hide(): void {
        this.visible = false;
        this.tween.move({ x: this.p.x, y: 1150}, 0.9);
    }

    public update(tick: number, mouse: Mouse): void {
        super.update(tick, mouse);
        this.phase = Math.abs(Math.sin(tick * 0.0025)) * 0.8;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.lineDashOffset = 0;
        transformTo(ctx, 450, 325, Math.PI * this.rotation);
        transformTo(ctx, this.p.x - this.diff, this.p.y + 170, 0, 0.7, 0.7);
        // head outline
        ctx.lineWidth = 60;
        ctx.strokeStyle = "#000";
        ctx.setLineDash([0, 40]);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.ellipse(this.p.x, this.p.y - 300 - this.phase * 20, 80, 80, 0, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();

        // body
        ctx.beginPath();
        ctx.strokeStyle = "#000";
        ctx.moveTo(this.p.x - 150 + this.phase * 7, this.p.y + 20);
        ctx.lineDashOffset = -this.phase * 25;
        ctx.quadraticCurveTo(this.p.x, this.p.y - 500 - this.phase * 50, this.p.x + 150 - this.phase * 7, this.p.y + 20);
        ctx.stroke();

        ctx.setLineDash([]);

        // ears
        ctx.fillStyle = shirtColor;
        ctx.lineWidth = 13;
        ctx.strokeStyle = "#000";
        // right
        ctx.save();
        ctx.translate(this.p.x + 60, this.p.y - 340 - this.phase * 20);
        ctx.rotate(Math.PI * 0.25 + this.phase * 0.1);
        ctx.beginPath();
        ctx.moveTo(20, 0);
        ctx.quadraticCurveTo(30, -40, 0, -80);
        ctx.quadraticCurveTo(-30, -40, -20, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        // left
        ctx.save();
        ctx.translate(this.p.x - 60, this.p.y - 340 - this.phase * 20);
        ctx.rotate(-Math.PI * 0.25 - this.phase * 0.1);
        ctx.beginPath();
        ctx.moveTo(20, 0);
        ctx.quadraticCurveTo(30, -40, 0, -80);
        ctx.quadraticCurveTo(-30, -40, -20, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // head fill
        ctx.lineDashOffset = 0;
        ctx.lineWidth = 40;
        ctx.strokeStyle = shirtColor;
        ctx.fillStyle = shirtColor;
        ctx.setLineDash([0, 40]);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.ellipse(this.p.x, this.p.y - 300 - this.phase * 20, 80, 80, 0, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();

        // body fill
        ctx.beginPath();
        ctx.moveTo(this.p.x - 150 + this.phase * 7, this.p.y + 20);
        ctx.lineDashOffset = -this.phase * 25;
        ctx.quadraticCurveTo(this.p.x, this.p.y - 500 - this.phase * 50, this.p.x + 150 - this.phase * 7, this.p.y + 20);
        ctx.fill();
        ctx.stroke();

        // head filling
        drawCircle(ctx, offset(this.p, 0, -300 - this.phase * 20), 87, shirtColor);
        drawCircle(ctx, offset(this.p, 10, -300 - this.phase * 40), 70, "#fff1");
        drawEllipse(ctx, offset(this.p, 10, 0 - this.phase * 40), 80, 200, "#fff1");

        ctx.setLineDash([]);

        ctx.save();
        ctx.translate(this.p.x, this.p.y - 310 - this.phase * 45);
        this.face.draw(ctx);
        // nose
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.moveTo(0, 30);
        ctx.lineTo(-15, 0);
        ctx.lineTo(15, 0);
        ctx.closePath();
        ctx.fill();
        drawEllipse(ctx, { x: 0, y: 5}, 20, 12, "#000");

        ctx.restore();
        ctx.restore();
    }
}
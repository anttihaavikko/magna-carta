import { drawCircle, drawEllipse } from "./drawing";
import { Entity } from "./entity";
import { Mouse } from "./mouse";

export class Face extends Entity {
    constructor() {
        super(0, 0, 0, 0);
    }

    public update(tick: number, mouse: Mouse): void {
        super.update(tick, mouse);
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        drawCircle(ctx, { x: -50, y: 0 }, 10, "#000");
        drawCircle(ctx, { x: 50, y: 0 }, 10, "#000");

        drawEllipse(ctx, { x: -65, y: 20 }, 15, 10, "pink");
        drawEllipse(ctx, { x: 65, y: 20 }, 15, 10, "pink");

        ctx.beginPath();
        ctx.lineWidth = 7;
        ctx.strokeStyle = "#000";
        ctx.moveTo(-40, 20);
        ctx.quadraticCurveTo(0, 40, 40, 20);
        ctx.stroke();
    }
}
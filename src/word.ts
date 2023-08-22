import { Draggable } from "./engine/draggable";
import { Mouse } from "./engine/mouse";
import { Vector, offset } from "./engine/vector";
import { Game } from "./game";

export const TILE_SIZE = 30;

export class Word extends Draggable {
    private rotated = false;
    private rightClicked = false;

    constructor(private word: string, x: number, y: number, private game: Game) {
        super(x, y, TILE_SIZE * word.length, TILE_SIZE);
    }

    public update(tick: number, mouse: Mouse): void {
        super.update(tick, mouse);

        if(this.dragging && this.rightClicked && !mouse.right) {
            this.rotated = !this.rotated;
            this.offset = { x: this.offset.y, y: this.offset.x };
        }

        this.rightClicked = mouse.right;

        const dx = this.rotated ? 0 : 1;
        const dy = this.rotated ? 1 : 0;
        this.s = {
            x: TILE_SIZE + (this.word.length - 1) * TILE_SIZE * dx,
            y: TILE_SIZE + (this.word.length - 1) * TILE_SIZE * dy
        };
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.font = "15px arial black";
        ctx.textAlign = "center";

        ctx.fillStyle = "#000";
        const dx = this.rotated ? 0 : 1;
        const dy = this.rotated ? 1 : 0;
        ctx.fillRect(this.p.x - 3, this.p.y - 3, this.s.x + 3, this.s.y + 3);

        ctx.fillStyle = "#eee";
        ctx.fillRect(this.p.x, this.p.y, this.s.x - 3, this.s.y - 3);

        if(this.dragging) {
            const snap = this.getSnapPos();
            ctx.strokeStyle = "#fff6";
            ctx.lineWidth = 3;
            ctx.setLineDash([5, 5]);
            ctx.strokeRect(snap.x, snap.y, this.s.x, this.s.y);
        }

        this.word.split("").forEach((letter, i) => {
            const p = { x: this.p.x + i * TILE_SIZE * dx + TILE_SIZE * 0.5, y: this.p.y + i * TILE_SIZE * dy + TILE_SIZE * 0.5 };
            const others = this.game.collides(p, this);
            const clash = others.length > 0;
            const bad = clash && others.some(o => !o.is(offset(this.getSnapPos(), i * TILE_SIZE * dx, i * TILE_SIZE * dy), letter));
            ctx.fillStyle = "#fff";
            if(others.length) ctx.fillStyle = bad ? "pink" : "lime";
            ctx.fillRect(this.p.x + i * TILE_SIZE * dx, this.p.y + i * TILE_SIZE * dy, TILE_SIZE - 3, TILE_SIZE - 3);
            ctx.fillStyle = "#000";
            ctx.fillText(letter, this.p.x + i * TILE_SIZE * dx + TILE_SIZE * 0.5 - 1, this.p.y + 19 + i * TILE_SIZE * dy);
            if(clash) {
                ctx.strokeStyle = bad ? "red" : "green";
                ctx.setLineDash([]);
                ctx.lineWidth = 4;
                ctx.strokeRect(this.p.x + i * TILE_SIZE * dx - 2, this.p.y + i * TILE_SIZE * dy - 2, TILE_SIZE + 1, TILE_SIZE + 1);
            }
        });
    }

    private is(point: Vector, letter: string): boolean {
        const index = this.rotated ? (point.y - this.p.y) / TILE_SIZE : (point.x - this.p.x) / TILE_SIZE;
        return this.word.at(index) === letter;
    }

    protected hover(): void {
    }

    protected exit(): void {
    }

    protected pick(): void {
        this.game.currentDepth++;
        this.d = this.game.currentDepth;
    }

    protected click(): void {
    }

    protected drop(): void {
        this.p = this.getSnapPos();
    }

    private getSnapPos(): Vector {
        return {
            x: Math.round(this.p.x / TILE_SIZE) * TILE_SIZE,
            y: Math.round(this.p.y / TILE_SIZE) * TILE_SIZE
        };
    }
}
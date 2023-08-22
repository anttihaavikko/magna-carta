import { bgColor } from "./colors";
import { Blinders } from "./engine/blinders";
import { Camera } from "./engine/camera";
import { Container } from "./engine/container";
import { Entity, sortByDepth } from "./engine/entity";
import { Mouse } from "./engine/mouse";
import { random } from "./engine/random";
import { RectParticle } from "./engine/rect";
import { Vector, ZERO } from "./engine/vector";
import { HEIGHT, WIDTH } from "./index";
import { King } from "./king";
import { TextEntity } from "./text";
import { TILE_SIZE, Word } from "./word";

const text = [
    "JOHN",
    "by",
    "the",
    "grace",
    "of",
    "God",
    "King",
    "of",
    "England",
    "Lord",
    "of",
    "Ireland",
    "Duke",
    "of",
    "Normandy",
    "and",
    "Aquitaine",
    "and",
    "Count",
    "of",
    "Anjou",
    "to",
    "his",
    "archbishops",
    "bishops",
    "abbots",
    "earls",
    "barons",
    "justices",
    "foresters",
    "sheriffs",
    "stewards",
    "servants",
    "and",
    "to",
    "all",
    "his",
    "officials",
    "and",
    "loyal",
    "subjects",
    "Greeting"
];

const wordsPerLine = [7,5,4,4,4,1,1,2,1,1,1,1,1,4,1,2,1,1];

export class Game extends Entity {
    public currentDepth = 0;

    private words: Word[] = [];
    private king = new King();
    private blinders: Blinders;
    private ui = new Container(0, 0, [
        new TextEntity("0% DONE", 18, 745, 587, -1, ZERO, { shadow: 2, align: "right" }),
        new TextEntity("0", 35, 745, 225, -1, ZERO, { shadow: 3, align: "right" })
    ]);
    private hasRotated: boolean;
    private effects = new Container();
    
    constructor(private camera: Camera) {
        super(0, 0, 0, 0);
        let x = 0;
        let y = 0;
        let count = 0;
        text.forEach((w, i) => {
            this.words.push(new Word(w.toUpperCase(), TILE_SIZE + TILE_SIZE * x, TILE_SIZE + y * TILE_SIZE, this));
            count++;
            x += w.length;
            if(count >= wordsPerLine[y]) {
                count = 0;
                x = 0;
                y++;
            }
        });
        this.blinders = new Blinders(800, 600);
    }

    public addEffect(e: Entity): void {
        this.effects.add(e);
    }

    public addBits(pos: Vector, amount: number): void {
        for(let i = 0; i < amount; i++) {
            this.effects.add(new RectParticle(pos.x, pos.y, 5, 5, 1, { x: random(-3, 3), y: random(-8, 0) }, { force: { x: 0, y: 0.2 }, color: "#fff3" }));
        }
    }

    public update(tick: number, mouse: Mouse): void {
        super.update(tick, mouse);
        [...this.words].sort((a, b) => b.d - a.d).forEach(w => w.update(tick, mouse));
        this.king.update(tick, mouse);
        this.effects.update(tick, mouse);
        this.blinders.update(tick, mouse);
        this.ui.update(tick, mouse);
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        ctx.fillStyle = "#fff3";
        for(let i = 0; i < 11 * 11; i++) {
            ctx.fillRect(
                TILE_SIZE * 14 + (i % 11) * TILE_SIZE,
                TILE_SIZE * 8 + Math.floor(i / 11) * TILE_SIZE,
                TILE_SIZE - 3,
                TILE_SIZE - 5
            );
        }

        this.ui.draw(ctx);
        [...this.words].sort(sortByDepth).forEach(w => w.draw(ctx));
        this.effects.draw(ctx);
        this.king.draw(ctx);
        this.blinders.draw(ctx);
    }

    public isInGrid(point: Vector): boolean {
        return point.x > TILE_SIZE * 13 && point.x < TILE_SIZE * 25 && point.y > TILE_SIZE * 7 && point.y < TILE_SIZE * 19;
    }

    public collides(point: Vector, ignore: Word): Word[] {
        return this.words.filter(w => !w.isDragging() && w !== ignore && w.isInside(point));
    }

    public markRotate(): void {
        this.hasRotated = true;
    }

    public evaluate(): void {
        const score = this.words.reduce((total, w) => total + w.getScore(), 0);
        let frees = 0;
        for(let x = 0; x < 11; x++) {
            for(let y = 0; y < 11; y++) {
                if(this.collides({ x: TILE_SIZE * 14.5 + x * TILE_SIZE, y: TILE_SIZE * 8.5 + y * TILE_SIZE }, null).length == 0) frees++;
            }
        }
        const ratio = score / text.join("").length;
        const totalScore = Math.floor(score * score + frees * score);
        (this.ui.getChild(0) as TextEntity).content = Math.floor(ratio * 100) + "% DONE";
        (this.ui.getChild(1) as TextEntity).content = totalScore.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

        if(totalScore > 2000 && !this.hasRotated) {
            this.king.show();
            return;
        }

        if(totalScore > 0) {
            this.king.hide();
            return;
        }
    }
}
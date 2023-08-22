import { Camera } from "./engine/camera";
import { Entity, sortByDepth } from "./engine/entity";
import { Mouse } from "./engine/mouse";
import { Vector } from "./engine/vector";
import { HEIGHT, WIDTH } from "./index";
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
    }

    public update(tick: number, mouse: Mouse): void {
        super.update(tick, mouse);
        [...this.words].sort((a, b) => b.d - a.d).forEach(w => w.update(tick, mouse));
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "#ccc";
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

        [...this.words].sort(sortByDepth).forEach(w => w.draw(ctx));
    }

    public isInGrid(point: Vector): boolean {
        return point.x > TILE_SIZE * 13 && point.x < TILE_SIZE * 25 && point.y > TILE_SIZE * 7 && point.y < TILE_SIZE * 19;
    }

    public collides(point: Vector, ignore: Word): Word[] {
        return this.words.filter(w => !w.isDragging() && w !== ignore && w.isInside(point));
    }

    public evaluate(): void {
        const score = this.words.reduce((total, w) => total + w.getScore(), 0);
        console.log(score);
    }
}
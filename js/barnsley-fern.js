/**
 * A Barnsley Fern transformation
 *
 * @property {String} name - The name of the portion generated
 * @property {Number} a - The 'a' value
 * @property {Number} b - The 'b' value
 * @property {Number} c - The 'c' value
 * @property {Number} d - The 'd' value
 * @property {Number} e - The 'e' value
 * @property {Number} f - The 'f' value
 * @property {Number} p - The probability of this transformation being chosen
 * @author Matthew Page <work@mjp.co>
 */
class BarnsleyTransformation {
    /**
     * Make a new Barnsley Fern transformation
     *
     * @param {String} n - The name of the portion generated
     * @param {Number} a - The 'a' value
     * @param {Number} b - The 'b' value
     * @param {Number} c - The 'c' value
     * @param {Number} d - The 'd' value
     * @param {Number} e - The 'e' value
     * @param {Number} f - The 'f' value
     * @param {Number} p - The probability of this transformation being chosen
     */
    constructor(a, b, c, d, e, f, p, n) {
        this.name = n;
        this.a = parseFloat(a);
        this.b = parseFloat(b);
        this.c = parseFloat(c);
        this.d = parseFloat(d);
        this.e = parseFloat(e);
        this.f = parseFloat(f);
        this.p = parseFloat(p);
    }
    /**
     * Apply this transformation to the supplied x and y values
     *
     * @param {Number} x - The x value to transform
     * @param {Number} y - The y value to transform
     * @returns {Object} The transformed x and y values
     */
    applyTo(x, y) {
        let x1 = this.a * x + this.b * y;
        let y1 = this.c * x + this.d * y + this.f;
        return {x: x1, y: y1};
    }
}

class BarnsleyFern {
    constructor() {
        this.transformations = [];
        this.x = 0;
        this.y = 0;
        this.max = 50000;
        this.ticks = 0;
        this.makeTrans();
    }
    // w	a	b	c	d	e	f	p	Portion generated
    // ƒ1	0	0	0	0.16	0	0	0.01	Stem
    // ƒ2	0.85	0.04	−0.04	0.85	0	1.60	0.85	Successively smaller leaflets
    // ƒ3	0.20	−0.26	0.23	0.22	0	1.60	0.07	Largest left-hand leaflet
    // ƒ4	−0.15	0.28	0.26	0.24	0	0.44	0.07	Largest right-hand leaflet
    makeTrans() {
        this.transformations.push(new BarnsleyTransformation(0, 0, 0, 0.16, 0, 0, 0.01,'Stem'));
        this.transformations.push(new BarnsleyTransformation(0.85, 0.04, -0.04, 0.85, 0, 1.60, 0.85,'Smaller leafs'));
        this.transformations.push(new BarnsleyTransformation(0.20, -0.26, 0.23, 0.22, 0, 1.60, 0.07,'Left leaf'));
        this.transformations.push(new BarnsleyTransformation(-0.15, 0.28, 0.26, 0.24, 0, 0.44, 0.07,'Right leaf'));
    }
    /**
     * Choose a random transformation based on their probability
     *
     * @returns {BarnsleyTransformation} The transformation chosen
     */
    chooseTransformation() {
        let r = Math.random(), from = 0, to = 0, choice = false;
        this.transformations.forEach((t)=>{
            to += t.p;
            if( r > from && r < to ) {
                choice = t;
            }
            from += t.p;
        });
        return(choice);
    }
    setXY(v) {
        this.x = v.x;
        this.y = v.y;
    }
    /**
     * Calculate the next iteration
     *
     */
    tick() {
        if(this.ticks < this.max) {
            this.setXY(this.chooseTransformation().applyTo(this.x, this.y));
            this.ticks += 1;
        }
    }
}

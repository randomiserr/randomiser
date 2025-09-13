// Seeded random number generator (mulberry32)
export function mulberry32(a: number) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

export const accentColors = [
  { name: "electric-blue", value: "#3B82F6", css: "rgb(59 130 246)" },
  { name: "mint", value: "#10B981", css: "rgb(16 185 129)" },
  { name: "purple", value: "#8B5CF6", css: "rgb(139 92 246)" },
  { name: "coral", value: "#F97316", css: "rgb(249 115 22)" },
  { name: "pink", value: "#EC4899", css: "rgb(236 72 153)" },
  { name: "lime", value: "#84CC16", css: "rgb(132 204 22)" },
];

export class RandomnessManager {
  private rng: () => number;
  private seed: number;

  constructor(initialSeed?: number) {
    this.seed = initialSeed || Math.floor(Math.random() * 1000000);
    this.rng = mulberry32(this.seed);
  }

  public reseed(newSeed?: number) {
    this.seed = newSeed || Math.floor(Math.random() * 1000000);
    this.rng = mulberry32(this.seed);
  }

  public getSeed() {
    return this.seed;
  }

  public random() {
    return this.rng();
  }

  public randomInt(min: number, max: number) {
    return Math.floor(this.random() * (max - min + 1)) + min;
  }

  public randomFloat(min: number, max: number) {
    return this.random() * (max - min) + min;
  }

  public pick<T>(array: T[]): T {
    return array[Math.floor(this.random() * array.length)];
  }

  public shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(this.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  public getAccentColor() {
    return this.pick(accentColors);
  }

  public getRotation() {
    return this.randomFloat(-0.3, 0.3);
  }

  public getJitter() {
    return {
      x: this.randomFloat(-2, 2),
      y: this.randomFloat(-2, 2),
    };
  }

  public getParticleOffset() {
    return {
      x: this.randomFloat(-10, 10),
      y: this.randomFloat(-10, 10),
    };
  }
}

// Global instance
export const randomness = new RandomnessManager();
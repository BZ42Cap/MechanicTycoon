const LevelSystem = {
  level: 1,
  xp: 0,
  xpToNext: 100,
  unlockedTools: [],
  unlockedJobTiers: [1],

  init() {
    this.level = 1;
    this.xp = 0;
    this.xpToNext = 100;
    this.unlockedTools = ["Basic Wrench"];
    this.unlockedJobTiers = [1];
  },

  addXP(amount) {
    this.xp += amount;
    console.log(`Gained ${amount} XP`);

    while (this.xp >= this.xpToNext) {
      this.levelUp();
    }
  },

  levelUp() {
    this.xp -= this.xpToNext;
    this.level++;
    this.xpToNext = Math.floor(this.xpToNext * 1.5);
    console.log(`Level Up! Now at Level ${this.level}`);

    this.checkUnlocks();
  },

  checkUnlocks() {
    // Unlock job tiers and tools based on level
    if (this.level === 2) {
      this.unlockTool("OBD-II Scanner");
      this.unlockJobTier(2);
    }

    if (this.level === 3) {
      this.unlockTool("Hydraulic Jack");
      this.unlockJobTier(3);
    }

    // Add more unlocks here as needed
  },

  unlockTool(toolName) {
    if (!this.unlockedTools.includes(toolName)) {
      this.unlockedTools.push(toolName);
      console.log(`Unlocked Tool: ${toolName}`);
    }
  },

  unlockJobTier(tier) {
    if (!this.unlockedJobTiers.includes(tier)) {
      this.unlockedJobTiers.push(tier);
      console.log(`Unlocked Job Tier ${tier}`);
    }
  },

  canAccessJob(tier) {
    return this.unlockedJobTiers.includes(tier);
  },

  hasTool(toolName) {
    return this.unlockedTools.includes(toolName);
  }
};

export default LevelSystem;

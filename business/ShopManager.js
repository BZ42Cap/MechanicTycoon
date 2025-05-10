export const ShopManager = {
  name: "Player's Garage",
  level: 1,
  upgradeCost: 1000,

  upgrade() {
    this.level++;
    this.upgradeCost *= 1.5;
  }
};

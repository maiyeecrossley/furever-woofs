export default

function referenceGenerator() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let ref = "";
    for (let idx = 0; idx < 6; idx++) {
      let char = chars[Math.floor(Math.random() * chars.length)];
      ref += char;
    }
    return ref;
  }
  
export function generateReference(next) {
    if (!this.reference) {
        this.reference = referenceGenerator()
    }
    next()
}
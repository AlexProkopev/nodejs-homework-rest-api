const generateNanoId =(length = 21) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
    let id = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      id += alphabet[randomIndex];
    }
  
    return id;
  }

  module.exports = { generateNanoId };
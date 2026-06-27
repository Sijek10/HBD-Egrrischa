function fireworks(){
  const canvas = document.createElement('canvas');
  canvas.id = 'fireworksCanvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999';
  document.body.appendChild(canvas);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  const colors = ['#ff6b81', '#ffd700', '#7bed9f', '#70a1ff', '#ff6348'];
  let particles = [];

  function createBurst(x, y){
    for(let i = 0; i < 40; i++){
      const angle = (Math.PI * 2 * i) / 40;
      const speed = Math.random() * 4 + 2;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 60
      });
    }
  }

  function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.life--;
      ctx.globalAlpha = Math.max(p.life / 60, 0);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
    particles = particles.filter(p => p.life > 0);
    ctx.globalAlpha = 1;

    if(particles.length > 0 || burstCount < 4){
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }

  let burstCount = 0;
  const burstInterval = setInterval(() => {
    createBurst(
      Math.random() * canvas.width,
      Math.random() * canvas.height * 0.6
    );
    burstCount++;
    if(burstCount >= 4) clearInterval(burstInterval);
  }, 400);

  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

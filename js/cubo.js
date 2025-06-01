// Cubo mágico 3D básico usando Three.js

// Para facilitar, vamos usar a biblioteca Three.js via CDN
// Então primeiro, no seu index.html, adicione este script antes do cubo.js:
// <script src="https://cdn.jsdelivr.net/npm/three@0.151.3/build/three.min.js"></script>

(() => {
  const canvas = document.getElementById('cubo3D');
  const scene = new THREE.Scene();

  // Câmera
  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  // Renderizador
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0); // transparente

  // Luz
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(5, 10, 7);
  scene.add(directionalLight);

  // Cores do cubo mágico
  const cores = [0xffffff, 0xffff00, 0xff0000, 0x0000ff, 0xff8000, 0x00ff00]; // branco, amarelo, vermelho, azul, laranja, verde

  // Criar cubinhos do cubo mágico (3x3x3)
  const cubos = [];
  const tamanho = 0.9;
  const espacamento = 1;

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const group = new THREE.Group();

        // Criar 6 faces para cada cubo
        for (let i = 0; i < 6; i++) {
          let cor = new THREE.Color(0x222222); // cinza escuro padrão

          // Atribuir cor se estiver na face externa
          if (i === 0 && y === 1) cor = new THREE.Color(cores[1]); // cima - amarelo
          else if (i === 1 && y === -1) cor = new THREE.Color(cores[0]); // baixo - branco
          else if (i === 2 && z === 1) cor = new THREE.Color(cores[2]); // frente - vermelho
          else if (i === 3 && z === -1) cor = new THREE.Color(cores[3]); // trás - azul
          else if (i === 4 && x === 1) cor = new THREE.Color(cores[4]); // direita - laranja
          else if (i === 5 && x === -1) cor = new THREE.Color(cores[5]); // esquerda - verde

          const material = new THREE.MeshBasicMaterial({ color: cor });
          const geom = new THREE.PlaneGeometry(tamanho, tamanho);
          const mesh = new THREE.Mesh(geom, material);

          // Posicionar as faces
          switch (i) {
            case 0: mesh.position.y = tamanho / 2; mesh.rotation.x = -Math.PI / 2; break;
            case 1: mesh.position.y = -tamanho / 2; mesh.rotation.x = Math.PI / 2; break;
            case 2: mesh.position.z = tamanho / 2; break;
            case 3: mesh.position.z = -tamanho / 2; mesh.rotation.y = Math.PI; break;
            case 4: mesh.position.x = tamanho / 2; mesh.rotation.y = -Math.PI / 2; break;
            case 5: mesh.position.x = -tamanho / 2; mesh.rotation.y = Math.PI / 2; break;
          }

          group.add(mesh);
        }

        group.position.set(x * espacamento, y * espacamento, z * espacamento);
        scene.add(group);
        cubos.push(group);
      }
    }
  }

  // Animação de rotação
  function animate() {
    requestAnimationFrame(animate);
    scene.rotation.x += 0.005;
    scene.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();

  // Ajustar canvas quando redimensionar
  window.addEventListener('resize', () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
})();

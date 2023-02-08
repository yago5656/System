async function startScanner() {
    const video = document.getElementById("video");
    const scanner = new Instascan.Scanner({ video: video });
    scanner.addListener("scan", function(content) {
      alert("Conteúdo escaneado: " + content);
    });
  
    try {
      const cameras = await Instascan.Camera.getCameras();
      if (cameras.length > 0) {
        scanner.start(cameras[0]);
      } else {
        console.error("Nenhuma câmera encontrada.");
      }
    } catch (e) {
      console.error(e);
    }
  }
  
  async function requestCameraPermission() {
    try {
      const result = await navigator.permissions.request({ name: "camera" });
      if (result === "granted") {
        startScanner();
      } else if (result === "denied") {
        console.error("Permissão da câmera negada.");
      }
    } catch (e) {
      console.error(e);
    }
  }
  
  async function checkCameraPermission() {
    try {
      const result = await navigator.permissions.query({ name: "camera" });
      if (result.state === "granted") {
        startScanner();
      } else if (result.state === "prompt") {
        requestCameraPermission();
      } else if (result.state === "denied") {
        console.error("Permissão da câmera negada.");
      }
    } catch (e) {
      console.error(e);
    }
  }
  
  checkCameraPermission();


const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let scanner = new Instascan.Scanner(video);
scanner.addListener("scan", function(content) {
  alert("Conteúdo escaneado: " + content);
});
Instascan.Camera.getCameras().then(function(cameras) {
  if (cameras.length > 0) {
    scanner.start(cameras[1]);
  } else {
    console.error("Nenhuma câmera encontrada.");
  }
}).catch(function(e) {
  console.error(e);
});

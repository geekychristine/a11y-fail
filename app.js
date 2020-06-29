class App {
  init() {
    // Initialize on Load.
    window.onload = event => {
      console.log(event);
    };
  }
}

// Run the App
const app = new App();
app.init();
